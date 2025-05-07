import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkUser = async () => {
        try {
            const response = await axios.get(`${API}/auth/me`, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized without logging an error
                console.log('User not authenticated.');
            } else {
                console.error('Error fetching user:', error);
            }
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
        <AuthContext.Provider value={{ user, login, logout, checkUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};
