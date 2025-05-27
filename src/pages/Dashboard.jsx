
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import SuccessfullyAddedAlert from '../components/SuccessfulyAddedAlert';
import SuccessfullyRemovedAlert from '../components/SuccessfulyRemovedAlert';
import LoadingComponent from '../components/LoadingComponent';
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { tasks, successRemoved, successAdded, handleAddTask, updateNotes, removeTask, changeStatus, clearTasks, isLoading } = useTasks();
    const { logout, user } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
    }

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div>
            <div className="relative bg-blue-300 text-white p-4 text-center mb-10 ">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <Link to="/user" className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Panel użytkownika
                </Link>
                <button className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Witaj {user?.name}!</h2>
            </div>
            {successAdded && <SuccessfullyAddedAlert name={successAdded} />}
            <TaskForm addTask={handleAddTask} />
            {successRemoved && <SuccessfullyRemovedAlert name={successRemoved} />}
            {isLoading ?
                <LoadingComponent />
                :
                <TaskList tasks={tasks} updateNotes={updateNotes} removeTask={removeTask} clearTasks={clearTasks} changeStatus={changeStatus} />}
        </div>
    );
};

export default Dashboard;