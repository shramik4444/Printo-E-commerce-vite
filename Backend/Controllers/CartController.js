
const db = require('../Config/db.js');

exports.addToCart = (req, res) => {

    const user_id = req.user.id;

    const {
        product_id,
        product_name,
        image,
        style,
        material,
        color,
        print_type,
        print_locations,
        print_size,
        quantity,
        price
    } = req.body;


    const sql = `INSERT INTO orders (
    user_id,
    product_id,
    product_name,
    image,
    style,
    material,
    color,
    print_type,
    print_locations,
    print_size,
    quantity,
    price,
    status)
    VALUES (?, ?, ?, ?, ?, ?, ?,?,?, ?, ?, ?,'cart'); `;


    db.query(sql, [
        user_id,
        product_id,
        product_name,
        image,
        style,
        material,
        color,
        print_type,
        JSON.stringify(print_locations),
        print_size,
        quantity,
        price
    ], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Added to cart", cartId: result.insertId });
    }
    );
}

exports.getCart = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [rows] = await db
            .promise()
            .query(
                "SELECT * FROM orders WHERE status = 'cart' AND user_id = ?",
                [user_id]
            );

        res.json(rows);
    } catch (err) {
        console.error("Get cart error:", err);
        res.status(500).json({ message: "Failed to fetch cart" });
    }
};


exports.removeFromCart = (req, res) => {
    const userId = req.user.id;   // from JWT middleware
    const orderId = req.params.id;

    db.query(
        "DELETE FROM orders WHERE id = ? AND user_id = ? AND status = 'cart'",
        [orderId, userId],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.json({ message: "Item Removed" });
        }
    );
};




