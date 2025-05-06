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
        <li className={`relative border p-4 rounded-md shadow-sm ${getStatusBgColor(task.status)}`}>
            <button
                onClick={() => removeTask(index, task.title)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-200"
            >
                Usuń
            </button>
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold">
                    {task.title}
                    <span className="font-normal text-gray-500"> - {task.status}</span>
                </h3>
                <p><strong>Kategoria:</strong> {task.category}</p>
                <div className="mt-2">
                    <strong>Notatki:</strong>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={note}
                                onChange={(e) => handleNoteChange(e.target.value)}
                                className="border rounded-md w-full mt-1 p-2 bg-white hover:bg-gray-100"
                            />
                            <button
                                onClick={() => saveNotes()}
                                className="bg-green-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-green-600 transition-all duration-200"
                            >
                                Zapisz
                            </button>
                        </div>
                    ) : (
                        <p>
                            {task.notes || 'Brak notatek.'}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-yellow-600 transition-all duration-200"
                            >
                                Edytuj
                            </button>
                        </p>
                    )}
                </div>
            </div>
            <button
                onClick={() => changeStatus(index, task.status)}
                className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600  transition-all duration-200"
            >
                Zmień status
            </button>
        </li>
    );
};

export default TaskItem;