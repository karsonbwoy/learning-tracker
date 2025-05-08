import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Użytkownik o tym adresie email już istnieje' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        return res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
    }
    catch (error) {
        console.log(error);

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
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        return res.status(200).json({ message: 'Zalogowano pomyślnie' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Błąd serwera' });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({ message: 'Wylogowano pomyślnie' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Błąd serwera' });
    }
}

export const getUser = async (req, res) => {
    try {
        // Mock delay to simulate server response time
        await new Promise(resolve => setTimeout(resolve, 30000));

        const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'Użytkownik nie znaleziony' });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Błąd serwera' });
    }
}