import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';

const API = import.meta.env.VITE_API_URL

const Register = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Imię jest wymagane.';
        if (!formData.email) {
            newErrors.email = 'Email jest wymagany.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Nieprawidłowy format email.';
        }
        if (!formData.password) {
            newErrors.password = 'Hasło jest wymagane.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Hasło musi mieć co najmniej 6 znaków.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Potwierdzenie hasła jest wymagane.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Hasła muszą być takie same.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!validate()) {
            console.log('Form has errors:', errors);
            return
        }

        try {
            const response = await axios.post(`${API}/auth/register`, formData);
            console.log(response.data.message); // Log the response data for debugging
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Error during registration:', error.response.data); // Log the error response for debugging
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Rejestracja</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Imię"
                        className="border p-2 rounded w-full"
                        value={formData.name}
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="border p-2 rounded w-full"
                        autoComplete='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Hasło"
                        autoComplete='new-password'
                        className="border p-2 rounded w-full"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Potwierdź hasło"
                        className="border p-2 rounded w-full"
                        autoComplete='new-password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <p>Masz już konto? <Link to={"/login"} className='font-bold hover:text-blue-500'>Zaloguj się!</Link></p>
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default Register;