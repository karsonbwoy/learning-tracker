import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Dashboard = () => {
    const [tasks, setTasks] = React.useState([]);

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <TaskForm addTask={handleAddTask} />
            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
};

export default Dashboard;