import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Użytkownik o tym adresie email już istnieje' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        return res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
    }
    catch {
        return res.status(500).json({ message: 'Błąd serwera' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Niepoprawny adres email lub hasło' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Niepoprawny adres email lub hasło' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Zalogowano pomyślnie', token });
    }
    catch {
        return res.status(500).json({ message: 'Błąd serwera' });
    }
}
