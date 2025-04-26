import React from 'react';

const TaskItem = ({
    task,
    index,
    changeStatus,
    removeTask,
    updateNotes,
}) => {
    const [note, setNote] = React.useState(task.notes || '');
    const [isEditing, setIsEditing] = React.useState(false);

    const handleNoteChange = (value) => {
        setNote(value);
    }

    const saveNotes = () => {
        updateNotes(index, note);
        setIsEditing(false);
    }

    const getStatusBgColor = (status) => {
        switch (status) {
            case 'Do zrobienia':
                return 'bg-gray-200';
            case 'W trakcie':
                return 'bg-yellow-200';
            case 'Ukończone':
                return 'bg-green-200';
            default:
                return 'bg-white';
        }
    };

    return (
        <li className={`border p-4 rounded-md shadow-sm ${getStatusBgColor(task.status)}`}>
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
                {isEditing ? (
                    <div>
                        <textarea
                            value={note}
                            onChange={(e) => handleNoteChange(e.target.value)}
                            className="border rounded-md w-full mt-1 p-2"
                        />
                        <button
                            onClick={() => saveNotes()}
                            className="bg-green-500 text-white px-2 py-1 rounded-md mt-2"
                        >
                            Zapisz
                        </button>
                    </div>
                ) : (
                    <p>
                        {task.notes || 'Brak notatek.'}
                        <button
                            onClick={() => setIsEditing(true)}
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
    );
};

export default TaskItem;