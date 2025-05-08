import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const API = import.meta.env.VITE_API_URL

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, login, userLoading, userError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email i hasło są wymagane.');
            return;
        }
        try {
            const response = await axios.post(`${API}/auth/login`, { email, password }, { withCredentials: true });
            console.log(response.data.message);
            setError('');
            login();
        }
        catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Niepoprawny email lub hasło.');
            } else {
                setError('Wystąpił błąd. Spróbuj ponownie później.');
            }
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Logowanie</h1>
            {userError && <h3 className='text-red-500'>{userError}</h3>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    autoComplete='current-password'
                    placeholder="Hasło"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <p>Nie masz konta? <Link to={"/register"} className='font-bold hover:text-blue-500'>Zarejestruj się!</Link></p>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={userLoading}
                >
                    {userLoading ? 'Ładowanie użytkownika' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
};

export default Login;