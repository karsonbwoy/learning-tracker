import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const API = import.meta.env.VITE_API_URL

const UserPanel = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { user, userLoading, logout, deleteUser, updateUser } = useAuth();
    const [newUser, setNewUser] = useState(null);

    const handleDelete = async () => {
        try {
            deleteUser();
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Wystąpił błąd przy usuwaniu konta.");
        }
    };

    const handleEditing = () => {
        setIsEditing(true);
        setNewUser({ name: user.name, email: user.email });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) {
            setError('Imię i email są wymagane.');
            return;
        }
        try {
            updateUser(newUser);
            setError('');
            setIsEditing(false);
            setNewUser(null);
            setMessage("Dane zostały zaktualizowane.");
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (err) {
            console.log(err.response.status); // Clear error message after 5 seconds
        }
    };

    const handleLogout = async () => {
        logout();
    }

    useEffect(() => {
        if (!user && !userLoading) {
            navigate('/login');
        }
    }, [user, navigate, userLoading]);

    if (!user) return <p className="text-center mt-6">Ładowanie danych...</p>;


    return (<div>
        <div className="relative bg-blue-300 text-white p-4 text-center mb-10 ">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <Link to="/dashboard" className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Dashboard
            </Link>
            <button className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                Logout
            </button>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 mt-6 shadow-md rounded-md">
            {message && <div className="my-2 p-2 rounded-md bg-green-100 text-green-800 border border-green-200">
                <strong>{message}</strong>
            </div>}
            {error && <div className="my-2 p-2 rounded-md bg-red-100 text-red-800 border border-red-200">
                <strong>{error}</strong>
            </div>}
            <h1 className="text-3xl font-bold mb-4">Witaj, {user.name}!</h1>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Panel użytkownika</h2>

            {isEditing ?
                (
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">Edytuj dane</h3>
                        <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
                            <input
                                type="text"
                                placeholder="Imię"
                                className="border p-2 rounded"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...user, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border p-2 rounded"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...user, email: e.target.value })}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                                Zapisz zmiany
                            </button>
                        </form>
                    </div>
                )
                : (<div className="mb-6">
                    <p><span className="font-semibold">Imię:</span> {user.name}</p>
                    <p><span className="font-semibold">Email:</span> {user.email}</p>
                    <button
                        onClick={() => handleEditing()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2">
                        Edytuj dane
                    </button>

                </div>)}

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Statystyki zadań</h3>
                <ul className="list-disc list-inside">
                    <li><strong>Łącznie:</strong> {2}</li>
                    <li><strong>Do zrobienia:</strong> {3}</li>
                    <li><strong>W trakcie:</strong> {4}</li>
                    <li><strong>Zrobione:</strong> {5}</li>
                </ul>
            </div>

            <div className="mt-6">
                {!showConfirm ? (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Usuń konto
                    </button>
                ) : (
                    <div className="bg-red-100 p-4 rounded">
                        <p className="text-red-700 mb-2">Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć.</p>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mr-2">
                            Tak, usuń
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
                            Anuluj
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default UserPanel;
