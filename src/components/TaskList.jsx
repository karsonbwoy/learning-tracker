
import TaskItem from './TaskItem';
import { useState } from 'react';

const TaskList = ({ tasks, updateNotes, removeTask, clearTasks, changeStatus }) => {

    const [isClearing, setIsClearing] = useState(false);

    const handleClearTasks = async () => {
        setIsClearing(true);
        await clearTasks();
        setTimeout(() => {
            setIsClearing(false);
        }, 300)
    }

    return (
        <div className="relative max-w-2xl mt-4 mx-auto bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
            {!tasks || tasks.length === 0 ? (
                <h2 className="text-2xl font-bold mt-4 mb-4">Brak zadań do wyświetlenia.</h2>
            ) : (<><h2 className="text-2xl font-bold mb-2">Lista zadań</h2>
                <button
                    onClick={handleClearTasks}
                    className="absolute top-6 right-6 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
                    disabled={isClearing}
                >
                    {isClearing ? 'Czyszczenie...' : 'Wyczyść wszystkie zadania'}
                </button>
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <TaskItem
                            task={task}
                            key={task._id}
                            changeStatus={changeStatus}
                            removeTask={removeTask}
                            updateNotes={updateNotes}
                        />
                    ))}
                </ul></>)}

        </div>
    );
};

export default TaskList;