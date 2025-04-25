import React from 'react';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email i hasło są wymagane.');
        } else {
            setError('');
            console.log('Email:', email, 'Password:', password);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Logowanie</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Zaloguj się
                </button>
            </form>
        </div>
    );
};

export default Login;