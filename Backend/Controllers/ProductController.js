const db = require("../Config/db");

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    const [rows] = await db.promise().query(
        "SELECT name, data FROM apparel_products WHERE id = ?",
        [id]
    );

    if (!rows.length) {
        return res.status(404).json({ message: "Product not found" });
    }

    return res.json(rows[0]);
};

exports.updateProduct = async (req, res) => {
    const { name, data } = req.body;
    const productId = req.params.id;

    const [rows] = await db.promise().query(
        "SELECT name, data FROM apparel_products WHERE id = ?",
        [productId]
    );

    if (!rows.length) {
        return res.status(404).json({ message: "Product not found" });
    }

    const existing = rows[0];
    const existingData =
        typeof existing.data === "string"
            ? JSON.parse(existing.data)
            : existing.data;

    const mergedData = {
        ...existingData,
        ...data,
    };

    const updatedName =
        name && name.trim() !== "" ? name.trim() : existing.name;

    await db.promise().query(
        "UPDATE apparel_products SET name = ?, data = ? WHERE id = ?",
        [updatedName, JSON.stringify(mergedData), productId]
    );

    return res.json({ message: "Product updated successfully" });
};
