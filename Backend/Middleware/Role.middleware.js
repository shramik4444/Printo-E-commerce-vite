// module.exports = (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!allowedRoles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Forbidden" });
//         }
//         next();
//     };
// };


module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
