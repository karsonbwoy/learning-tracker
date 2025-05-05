import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
}

export const createTask = async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json(task)
}

export const deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).end()
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(task)
}

export const deleteAllTasks = async (req, res) => {
    await Task.deleteMany({})
    res.status(200).json({ message: 'All tasks deleted succesfully' })
}