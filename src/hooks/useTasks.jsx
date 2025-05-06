import { useState, useEffect, useRef } from "react";
import axios from "axios";

const STATUSES = ['Do zrobienia', 'W trakcie', 'Ukończone'];

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [successRemoved, setSuccessRemoved] = useState(false);
    const [successAdded, setSuccessAdded] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const debounceTimeout = useRef(null);

    const fetchTasks = () => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Błąd podczas pobierania zadań:', error);
            }
            finally {
                setIsLoading(false);
            }
        }, 300)
    };


    const handleAddTask = async (task) => {
        try {
            const res = await axios.post('http://localhost:5000/tasks', task);
            setSuccessAdded(res.data.title);
            setTimeout(() => {
                setSuccessAdded('')
            }, 2000)
            fetchTasks();
        }

        catch (error) {
            console.error('Błąd podczas dodawania zadania:', error);
        }
    };

    const updateNotes = async (taskId, newNote) => {
        try {
            await axios.put(`http://localhost:5000/tasks/${taskId}`, { notes: newNote });
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
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            setSuccessRemoved(title);
            setTimeout(() => {
                setSuccessRemoved('')
            }, 2000)
        } catch (error) {
            console.error('Błąd podczas usuwania zadania:', error);
        }
        finally {
            fetchTasks();
        }
    };

    const changeStatus = async (taskId, status) => {
        const currentIndex = STATUSES.indexOf(status);
        const newStatus = STATUSES[(currentIndex + 1) % STATUSES.length];

        try {
            await axios.put(`http://localhost:5000/tasks/${taskId}`, { status: newStatus });
        } catch (error) {
            console.error('Błąd podczas zmiany statusu zadania:', error);
        }

        finally {
            fetchTasks();
        }
    };

    const clearTasks = async () => {
        try {
            await axios.delete('http://localhost:5000/tasks');
        } catch (error) {
            console.error('Błąd podczas usuwania wszystkich zadań:', error);
        }
        finally {
            fetchTasks();
        }
    }

    useEffect(() => {
        fetchTasks();
        return () => clearTimeout(debounceTimeout.current);
    }, []);

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
    }
}