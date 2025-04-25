import React from 'react';
import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', formData);
        }
    };

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
                        className="border p-2 rounded w-full"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default Register;