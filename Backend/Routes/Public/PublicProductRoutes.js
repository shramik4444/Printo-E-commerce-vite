const express = require('express');
const router = express.Router();

const db = require('../../Config/db.js');

const auth = require('../../Middleware/Auth.middleware.js')
const role = require('../../Middleware/Role.middleware.js')






router.get('/products', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM apparel_products');
        res.json(rows);
        console.log("req.json.rows", rows)
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});





// router.get("/products/:id", async (req, res) => {
//     const productId = req.params.id;
//     console.log("backend id ----->", productId);

//     try {
//         const [rows] = await db.promise().query(
//             "SELECT id, name, data, images FROM apparel_products WHERE id = ?",
//             [productId]
//         );

//         if (!rows.length) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.json(rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Database error" });
//     }
// });



router.get("/products/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.promise().query(`
      SELECT
        p.id,
        p.name,
        p.data,
        p.images,

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
    `, [id]);

        if (!rows.length) {
            return res.status(404).json({ message: "Product not found" });
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
        ORDER BY carousel_type, card_order`, [id]);



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
            images: row.images,

            // customization options
            data: row.data,

            // product details section
            productData: {
                tagline: row.tagline,
                features: row.features,
                keyFeature: row.key_feature,
                delivery: row.delivery_info,
                additionalInfo: row.additional_info
            },

            // full specs tabs
            fullSpecifications: {
                overview: row.overview,
                specifications: row.specifications,
                designguidelines: row.design_guidelines,
                washcareinstructions: row.wash_care
            },
            carousels: {
                primary: primaryCarousel,
                secondary: secondaryCarousel
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
















module.exports = router;