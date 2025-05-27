import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const STATUSES = ['Do zrobienia', 'W trakcie', 'Ukończone'];
const API = import.meta.env.VITE_API_URL

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [successRemoved, setSuccessRemoved] = useState(false);
    const [successAdded, setSuccessAdded] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const debounceTimeout = useRef(null);
    const { checkUser } = useAuth();

    const fetchTasks = useCallback((withLoading = false) => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        return new Promise((resolve) => {
            debounceTimeout.current = setTimeout(async () => {

                withLoading && setIsLoading(true);
                try {
                    const response = await axios.get(`${API}/tasks`, { withCredentials: true });
                    setTasks(response.data);
                } catch (error) {
                    console.error('Błąd podczas pobierania zadań:', error);
                    checkUser();
                }
                finally {
                    withLoading && setIsLoading(false);
                    resolve();
                }
            }, 300)
        })
    }, [checkUser]);

    const countTasks = () => {
        let stats = {
            total: tasks.length,
            completed: tasks.filter(task => task.status === 'Ukończone').length,
            inProgress: tasks.filter(task => task.status === 'W trakcie').length,
            notStarted: tasks.filter(task => task.status === 'Do zrobienia').length,
        }
        return stats;
    }


    const handleAddTask = async (task) => {
        try {
            const res = await axios.post(`${API}/tasks`, task, { withCredentials: true });
            await fetchTasks();
            setSuccessAdded(res.data.title);
            setTimeout(() => {
                setSuccessAdded('')
            }, 2000)
        }

        catch (error) {
            console.error('Błąd podczas dodawania zadania:', error);
            checkUser();
        }
    };

    const updateNotes = async (taskId, newNote) => {
        try {
            await axios.put(`${API}/tasks/${taskId}`, { notes: newNote }, { withCredentials: true });
        }
        catch (error) {
            console.error('Błąd podczas aktualizacji notatek:', error);
        }
        finally {
            fetchTasks();
        }
    }

    const removeTask = async (taskId, title) => {
        try {
            await axios.delete(`${API}/tasks/${taskId}`, { withCredentials: true });
            await fetchTasks();
            setSuccessRemoved(title);
            setTimeout(() => {
                setSuccessRemoved('')
            }, 2000)
        } catch (error) {
            console.error('Błąd podczas usuwania zadania:', error);
            checkUser();
        }
    };

    const changeStatus = async (taskId, status) => {
        const currentIndex = STATUSES.indexOf(status);
        const newStatus = STATUSES[(currentIndex + 1) % STATUSES.length];

        try {
            await axios.put(`${API}/tasks/${taskId}`, { status: newStatus }, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas zmiany statusu zadania:', error);
        }

        finally {
            fetchTasks();
        }
    };

    const clearTasks = async () => {
        try {
            await axios.delete(`${API}/tasks`, { withCredentials: true });
        } catch (error) {
            console.error('Błąd podczas usuwania wszystkich zadań:', error);
        }
        finally {
            fetchTasks();
        }
    }

    useEffect(() => {
        fetchTasks(true);
        return () => clearTimeout(debounceTimeout.current);
    }, [fetchTasks]);

    return {
        tasks,
        successRemoved,
        successAdded,
        handleAddTask,
        updateNotes,
        removeTask,
        changeStatus,
        clearTasks,
        isLoading,
        countTasks
    }
}