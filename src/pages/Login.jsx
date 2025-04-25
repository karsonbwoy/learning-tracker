import React from 'react';

const Login = () => {
    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Logowanie</h1>
            <form className="flex flex-col gap-4">
                <input type="email" placeholder="Email" className="border p-2 rounded" />
                <input type="password" placeholder="Hasło" className="border p-2 rounded" />
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Zaloguj się</button>
            </form>
        </div>
    )
};

export default Login;