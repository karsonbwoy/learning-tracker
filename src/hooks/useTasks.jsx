import { useState } from "react";

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [successRemoved, setSuccessRemoved] = useState(false);
    const [successAdded, setSuccessAdded] = useState(false);
    const handleAddTask = (task) => {
        setSuccessAdded(true);
        setTimeout(() => { setSuccessAdded(false) }, 2000)
        setTasks([...tasks, task]);
    };

    const updateNotes = (index, newNote) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].notes = newNote;
        setTasks(updatedTasks);
    }

    const removeTask = (index) => {
        setSuccessRemoved(true);
        setTimeout(() => { setSuccessRemoved(false) }, 2000)
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };
    const changeStatus = (index) => {
        const updatedTasks = [...tasks];
        const statuses = ['Do zrobienia', 'W trakcie', 'Ukończone'];
        const currentIndex = statuses.indexOf(updatedTasks[index].status);
        updatedTasks[index].status = statuses[(currentIndex + 1) % statuses.length];
        setTasks(updatedTasks);
    };

    const clearTasks = () => {
        setTasks([]);
    }
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