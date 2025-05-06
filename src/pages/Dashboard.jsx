
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import SuccessfullyAddedAlert from '../components/SuccessfulyAddedAlert';
import SuccessfullyRemovedAlert from '../components/SuccessfulyRemovedAlert';

const Dashboard = () => {
    const { tasks, successRemoved, successAdded, handleAddTask, updateNotes, removeTask, changeStatus, clearTasks } = useTasks();

    const navigate = useNavigate();

    const handleLogout = () => {
        // Implement logout functionality here
        navigate('/login');
    }

    return (
        <div>
            <div className="relative bg-blue-300 text-white p-4 text-center mb-10 ">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <button className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {successAdded && <SuccessfullyAddedAlert name={successAdded} />}
            <TaskForm addTask={handleAddTask} />
            {successRemoved && <SuccessfullyRemovedAlert name={successRemoved} />}
            <TaskList tasks={tasks} updateNotes={updateNotes} removeTask={removeTask} clearTasks={clearTasks} changeStatus={changeStatus} />
        </div>
    );
};

export default Dashboard;