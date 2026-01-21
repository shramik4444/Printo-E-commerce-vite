const mysql = require("mysql2");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0112358",
    database: "printo_products"
});

db.connect(err => {
    if (err) {
        console.error("❌ DB connection failed:", err);
    } else {
        console.log("✅ MySQL connected");
    }
});

module.exports = db;
