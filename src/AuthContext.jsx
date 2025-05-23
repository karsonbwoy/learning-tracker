import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);
    const [message, setMessage] = useState(null);

    const checkUser = async () => {
        const timeoutId = setTimeout(() => {
            setUserError('Serwer się wybudza... Proszę czekać.');
        }, 8000);
        try {
            const response = await axios.get(`${API}/auth/me`, { withCredentials: true });
            setUser(response.data);
            setUserLoading(false);
            setUserError(null);
            clearTimeout(timeoutId);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized without logging an error
                console.log('User not authenticated:', error.response.data);
            } else {
                // Log other errors
                setUserError('Błąd serwera. Spróbuj ponownie później.');
                console.error('Error checking user:', error);
            }
            clearTimeout(timeoutId);
            setUserLoading(false);
            setTimeout(() => {
                setUserError(null);
            }, 5000); // Clear error message after 5 seconds
            setUser(null);
        }
    };

    const login = () => {
        checkUser();
    };

    const updateUser = (newUser) => {
        return axios.post(`${API}/auth/updateuser`, newUser, { withCredentials: true })
            .then((response) => {
                setUser(response.data);
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    }

    const logout = () => {
        axios.post(`${API}/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    const deleteUser = () => {
        axios.post(`${API}/auth/deleteuser`, {}, { withCredentials: true })
            .then((data) => {
                setUser(null);
                setMessage(data.data.message);
                setTimeout(() => {
                    setMessage(null);
                }, 5000);

            })
            .catch((error) => {
                console.error('Delete user failed:', error);
            });
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, message, login, logout, deleteUser, updateUser, checkUser, userLoading, userError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
