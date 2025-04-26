import React, { useState } from 'react';

const TaskList = ({ tasks, setTasks }) => {
    const [editedNotes, setEditedNotes] = useState({});

    const handleNoteChange = (index, value) => {
        setEditedNotes({ ...editedNotes, [index]: value });
    };

    const saveNotes = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].notes = editedNotes[index];
        setTasks(updatedTasks);
        setEditedNotes({ ...editedNotes, [index]: undefined });
    };

    const removeTask = (index) => {
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

    if (!tasks || tasks.length === 0) {
        return <p>Brak zadań do wyświetlenia.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4">Lista zadań</h2>
            <ul className="space-y-4">
                {tasks.map((task, index) => (
                    <li key={index} className="border p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p><strong>Kategoria:</strong> {task.category}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <button
                            onClick={() => changeStatus(index)}
                            className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
                        >
                            Zmień status
                        </button>
                        <div className="mt-2">
                            <strong>Notatki:</strong>
                            {editedNotes[index] !== undefined ? (
                                <div>
                                    <textarea
                                        value={editedNotes[index]}
                                        onChange={(e) => handleNoteChange(index, e.target.value)}
                                        className="border rounded-md w-full mt-1 p-2"
                                    />
                                    <button
                                        onClick={() => saveNotes(index)}
                                        className="bg-green-500 text-white px-2 py-1 rounded-md mt-2"
                                    >
                                        Zapisz
                                    </button>
                                </div>
                            ) : (
                                <p>
                                    {task.notes || 'Brak notatek.'}
                                    <button
                                        onClick={() => setEditedNotes({ ...editedNotes, [index]: task.notes || '' })}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-md ml-2"
                                    >
                                        Edytuj
                                    </button>
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => removeTask(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
                        >
                            Usuń zadanie
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;