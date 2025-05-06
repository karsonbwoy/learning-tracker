import { useState, useEffect } from "react";

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [successRemoved, setSuccessRemoved] = useState(false);
    const [successAdded, setSuccessAdded] = useState('');

    const fetchTasks = async () => {
        const fetchedTasks = await fetch('http://localhost:5000/tasks', { method: 'GET', }).then(res => res.json()).then(data => data).catch(() => console.log("nie udało się pobrać danych z bazy ziomeczku"));
        fetchedTasks && setTasks(fetchedTasks);
    };


    const handleAddTask = async (task) => {
        await fetch('http://localhost:5000/tasks', {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        }).then(() => {
            setSuccessAdded(task.title);
            setTimeout(() => { setSuccessAdded('') }, 2000)
        }).catch(() => console.log("nie udało się ziomeczku"))
        fetchTasks();
    };

    const updateNotes = async (index, newNote) => {
        await fetch(`http://localhost:5000/tasks/${index}`, {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ notes: newNote })
        }).catch(() => console.log("nie udało się zapisać notatki ziomeczku"))
        fetchTasks();
    }

    const removeTask = async (index, title) => {
        await fetch(`http://localhost:5000/tasks/${index}`, { method: 'DELETE' }).then(() => {
            setSuccessRemoved(title);
            setTimeout(() => { setSuccessRemoved('') }, 2000)
        }).catch(() => console.log("nie udało się usunąć zadania ziomeczku"));
        fetchTasks();
    };
    const changeStatus = async (index, status) => {
        const statuses = ['Do zrobienia', 'W trakcie', 'Ukończone'];
        const currentIndex = statuses.indexOf(status);
        const newStatus = statuses[(currentIndex + 1) % statuses.length];

        await fetch(`http://localhost:5000/tasks/${index}`, {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus })
        }).catch(() => console.log("nie udało się zmienić statusu zadania ziomeczku"));
        fetchTasks();
    };

    const clearTasks = async () => {
        await fetch('http://localhost:5000/tasks', { method: 'DELETE' })
        fetchTasks();
    }

    useEffect(() => {
        fetchTasks();
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
    }
}