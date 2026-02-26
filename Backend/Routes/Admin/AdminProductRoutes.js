const express = require('express');
const db = require('../../Config/db.js');
const auth = require('../../Middleware/Auth.middleware.js');
const role = require('../../Middleware/Role.middleware.js');
const router = express.Router();


router.get('/products', auth, role('admin'), async (req, res) => {

    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM apparel_products"
        );


        if (!rows.length) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }



});






router.post("/products", auth, role("admin"), async (req, res) => {
    const { name, data } = req.body;

    if (!name || !data) {
        return res.status(400).json({ error: "Name and data required" });
    }

    try {
        const [result] = await db.promise().query(
            "INSERT INTO apparel_products (name, data) VALUES (?, ?)",
            [name, JSON.stringify(data)]
        );

        res.status(201).json({
            message: "Product created",
            productId: result.insertId
        });

    } catch (err) {
        console.error("CREATE PRODUCT ERROR:", err);
        res.status(500).json({ error: "Database error" });
    }
});











router.get("/products/:id", auth, role("admin"), async (req, res) => {
    const productId = req.params.id;

    try {
        const [rows] = await db.promise().query(`
      SELECT
        p.id,
        p.name,
        p.data,

        pd.tagline,
        pd.features,
        pd.key_feature,
        pd.delivery_info,
        pd.additional_info,

        ps.overview,
        ps.specifications,
        ps.design_guidelines,
        ps.wash_care

      FROM apparel_products p
      LEFT JOIN product_details pd ON pd.product_id = p.id
      LEFT JOIN product_specifications ps ON ps.product_id = p.id
      WHERE p.id = ?
    `, [productId]);

        if (!rows.length) {
            return res.status(404).json({ error: "Product not found" });
        }


        const primaryCarousel = [];
        const secondaryCarousel = [];

        const [carouselRows] = await db.promise().query(`SELECT 
        carousel_type,
        card_order,
        image_url,
        card_name,
        card_description
        FROM product_carousels
        WHERE product_id = ?
        ORDER BY carousel_type, card_order`, [productId]);



        carouselRows.forEach(row => {
            const formatted = {
                image: row.image_url,
                name: row.card_name,
                description: row.card_description
            };

            if (row.carousel_type === 'primary') {
                primaryCarousel.push(formatted);
            } else if (row.carousel_type === 'secondary') {
                secondaryCarousel.push(formatted);
            }
        });


        const row = rows[0];
        console.log("row data -------> ", row);
        res.json({
            id: row.id,
            name: row.name,
            data: row.data,
            details: {
                tagline: row.tagline,
                features: row.features,
                keyFeature: row.key_feature,
                delivery: row.delivery_info,
                additionalInfo: row.additional_info
            },
            specifications: {
                overview: row.overview,
                specifications: row.specifications,
                designGuidelines: row.design_guidelines,
                washCare: row.wash_care
            },
            carousels: {
                primary: primaryCarousel,
                secondary: secondaryCarousel
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});




router.put("/products/:id", auth, role("admin"), async (req, res) => {
    const { name, data } = req.body;
    const productId = req.params.id;

    try {
        // 1️⃣ Fetch existing product
        const [rows] = await db.promise().query(
            "SELECT name, data FROM apparel_products WHERE id = ?",
            [productId]
        );

        if (!rows.length) {
            return res.status(404).json({ error: "Product not found" });
        }

        const existing = rows[0];

        // ✅ PARSE JSON STRING
        const existingData =
            typeof existing.data === "string"
                ? JSON.parse(existing.data)
                : existing.data;

        // 2️⃣ Merge only provided fields
        const mergedData = {
            ...existingData,
            ...data
        };

        // 3️⃣ Name fallback
        const updatedName =
            name && name.trim() !== ""
                ? name.trim()
                : existing.name;

        // 4️⃣ Update DB
        await db.promise().query(
            "UPDATE apparel_products SET name = ?, data = ? WHERE id = ?",
            [updatedName, JSON.stringify(mergedData), productId]
        );

        return res.json({ message: "Product updated successfully" });

    } catch (err) {
        console.error("UPDATE ERROR:", err);
        return res.status(500).json({ error: "Database error" });
    }
});





router.put('/products/:id/details', auth, role('admin'), async (req, res) => {
    const { tagline, features, keyFeature, delivery, additionalInfo } = req.body;
    const { id } = req.params;

    try {
        await db.promise().query(`
      INSERT INTO product_details
      (product_id, tagline, features, key_feature, delivery_info, additional_info)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        tagline = VALUES(tagline),
        features = VALUES(features),
        key_feature = VALUES(key_feature),
        delivery_info = VALUES(delivery_info),
        additional_info = VALUES(additional_info)
    `, [
            id,
            tagline,
            JSON.stringify(features || []),
            keyFeature,
            delivery,
            additionalInfo
        ]);

        res.json({ message: 'Product details updated' });

    } catch (err) {
        console.error("DETAILS SAVE ERROR:", err);
        res.status(500).json({ error: 'Database error' });
    }
});





router.get(
    "/products/:id/carousels",
    auth,
    role("admin"),
    async (req, res) => {
        const { id } = req.params;

        try {
            const [rows] = await db.promise().query(
                `
        SELECT
          id,
          product_id,
          carousel_type,
          card_order,
          image_url,
          card_name,
          card_description
        FROM product_carousels
        WHERE product_id = ?
        ORDER BY carousel_type, card_order
        `,
                [id]
            );

            res.json(rows);
        } catch (err) {
            console.error("FETCH CAROUSELS ERROR:", err);
            res.status(500).json({ error: "Database error" });
        }
    }
);



router.put(
    "/products/:id/carousels",
    auth,
    role("admin"),
    async (req, res) => {
        const { id: productId } = req.params;
        const { carousels } = req.body;

        if (!Array.isArray(carousels)) {
            return res.status(400).json({ error: "Invalid payload" });
        }

        const conn = await db.promise().getConnection();

        try {
            await conn.beginTransaction();

            // 🔥 wipe existing
            await conn.query(
                "DELETE FROM product_carousels WHERE product_id = ?",
                [productId]
            );

            // ✅ USE carousels (NOT normalized)
            for (const c of carousels) {
                if (!c.image_url || !c.carousel_type) {
                    throw new Error("Invalid carousel data");
                }

                await conn.query(
                    `
        INSERT INTO product_carousels
        (
          product_id,
          carousel_type,
          card_order,
          image_url,
          card_name,
          card_description
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
                    [
                        productId,
                        c.carousel_type,
                        c.card_order || 1,
                        c.image_url,
                        c.card_name || null,
                        c.card_description || null
                    ]
                );
            }


            await conn.commit();
            res.json({ message: "Carousels saved successfully" });

        } catch (err) {
            await conn.rollback();
            console.error("SAVE CAROUSELS ERROR:", err);
            res.status(500).json({ error: "Database error" });
        } finally {
            conn.release();
        }
    }
);





router.delete(
    "/products/carousels/:id",
    auth,
    role("admin"),
    async (req, res) => {
        const { id } = req.params;

        try {
            await db.promise().query(
                "DELETE FROM product_carousels WHERE id = ?",
                [id]
            );

            res.json({ message: "Carousel deleted" });
        } catch (err) {
            console.error("DELETE CAROUSEL ERROR:", err);
            res.status(500).json({ error: "Database error" });
        }
    }
);





router.put('/products/:id/specs', auth, role('admin'), async (req, res) => {
    const { overview, specifications, designGuidelines, washCare } = req.body;
    const { id } = req.params;

    try {
        await db.promise().query(`
      INSERT INTO product_specifications
      (product_id, overview, specifications, design_guidelines, wash_care)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        overview = VALUES(overview),
        specifications = VALUES(specifications),
        design_guidelines = VALUES(design_guidelines),
        wash_care = VALUES(wash_care)
    `, [id, overview, specifications, designGuidelines, washCare]);

        res.json({ message: 'Specifications updated' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});





module.exports = router;