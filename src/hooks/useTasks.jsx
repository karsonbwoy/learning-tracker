import { useState, useEffect } from "react";

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [successRemoved, setSuccessRemoved] = useState(false);
    const [successAdded, setSuccessAdded] = useState('');

    const fetchTasks = async () => {
        const fetchedTasks = await fetch('http://localhost:5000/tasks', { method: 'GET', }).then(res => res.json()).then(data => data)
        console.log(fetchedTasks)
        setTasks(fetchedTasks);
    };


    const handleAddTask = async (task) => {
        await fetch('http://localhost:5000/tasks', {
            method: 'POST', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })
        setSuccessAdded(task.title);
        setTimeout(() => { setSuccessAdded('') }, 2000)
        fetchTasks();
    };

    const updateNotes = async (index, newNote) => {
        await fetch(`http://localhost:5000/tasks/${index}`, {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ notes: newNote })
        })
        fetchTasks();
    }

    const removeTask = async (index) => {
        await fetch(`http://localhost:5000/tasks/${index}`, { method: 'DELETE' })
        setSuccessRemoved(index);
        setTimeout(() => { setSuccessRemoved('') }, 2000)
        fetchTasks();
    };
    const changeStatus = async (index, status) => {
        const statuses = ['Do zrobienia', 'W trakcie', 'Ukończone'];
        console.log(tasks);

        const currentIndex = statuses.indexOf(status);
        const newStatus = statuses[(currentIndex + 1) % statuses.length];
        await fetch(`http://localhost:5000/tasks/${index}`, {
            method: 'PUT', headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus })
        })
        fetchTasks();
    };

    const clearTasks = async () => {
        // await fetch('htttp://localhost:5000/tasks', { method: '' })
        console.log('to be implemented: clear tasks')
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