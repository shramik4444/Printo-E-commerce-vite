const db = require("../Config/db.js");
const { comparePassword } = require("../Utils/Passwords");
const { generateToken } = require("../Services/Token.service");

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log("ADMINS LOGIN ATTEMPT:", email, password);

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const [rows] = await db.promise().query(
            "SELECT id, email, password, role FROM admins WHERE email = ?",
            [email]
        );

        console.log("DB RESULT:", rows);

        if (!rows.length) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = rows[0];

        console.log("admin ---->", admin)

        if (admin.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const match = await comparePassword(password, admin.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }



        const token = generateToken({
            id: admin.id,
            role: admin.role,
        });

        console.log("this is my admin token ---> ", token);

        return res.json({
            token,
            role: admin.role,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};





exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const [rows] = await db.promise().query(
            "SELECT id, name, email, password, role FROM users WHERE email = ?",
            [email]
        );

        if (!rows.length) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken({
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name
        });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
