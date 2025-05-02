import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = React.useState([]);
    const navigate = useNavigate();

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
    };

    const handleLogout = () => {
        // Implement logout functionality here
        navigate('/login');
    }

    return (
        <div>
            <div className="relative bg-blue-300 text-white p-4 text-center mb-10 ">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                <buttion className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                    Logout
                </buttion>
            </div>
            <TaskForm addTask={handleAddTask} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default Dashboard;