import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Brak tokena, dostęp zabroniony' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // { id: user._id } from the token
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Nieprawidłowy token' });
    }
};
