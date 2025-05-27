import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ order: 1 })
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const task = new Task({ ...req.body, user: req.user.id })
    await task.save()
    res.status(201).json(task)
}

export const deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const deletedOrder = task.order;
    await Task.updateMany(
        { order: { $gt: deletedOrder } },
        { $inc: { order: -1 } }
    );
    res.status(204).end()
}

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true })
    res.json(task)
}

export const deleteAllTasks = async (req, res) => {
    await Task.deleteMany({ user: req.user.id })
    res.status(200).json({ message: 'All tasks deleted succesfully' })
}

export const reorderTasks = async (req, res) => {
    const { tasks } = req.body;
    const bulkOps = tasks.map((task, index) => ({
        updateOne: {
            filter: { _id: task._id, user: req.user.id },
            update: { order: index }
        }
    }));

    await Task.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Tasks reordered successfully' });
}