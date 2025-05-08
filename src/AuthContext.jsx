import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState(null);

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

    const logout = () => {
        axios.post(`${API}/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, checkUser, userLoading, userError }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
