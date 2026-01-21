
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Authorization ----> ", authHeader);
    console.log("-----------------------------------------------------------------")
    console.log("-----------------------------------------------------------------")

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    //   console.log("splitted token", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        console.log("decoded ------> ", req.user);
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
}