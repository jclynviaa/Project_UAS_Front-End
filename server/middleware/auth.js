const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "No token provided" });

    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;