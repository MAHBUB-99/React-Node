const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access Denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
    } catch (error) {
        return res
            .status(401)
            .json({ message: 'Invalid Token' });
    }
    next();
}

module.exports = verifyToken;