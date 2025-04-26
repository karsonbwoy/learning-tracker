
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {

    const updateNotes = (index, newNote) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].notes = newNote;
        setTasks(updatedTasks);
    }
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


    return (
        <div className="max-w-2xl mt-4 mx-auto bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
            {!tasks || tasks.length === 0 ? (
                <h2 className="text-2xl font-bold mt-4 mb-4">Brak zadań do wyświetlenia.</h2>
            ) : (<><h2 className="text-2xl font-bold mb-4">Lista zadań</h2>
                <ul className="space-y-4">
                    {tasks.map((task, index) => (
                        <TaskItem
                            task={task}
                            key={index}
                            index={index}
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