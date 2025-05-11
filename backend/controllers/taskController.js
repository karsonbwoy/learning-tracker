import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
    console.log('getTasks ', req.user.id)
    const tasks = await Task.find({ user: req.user.id }) //tu sie wywala
    res.json(tasks) //to sie nie wykonuje
}

export const createTask = async (req, res) => {
    const task = new Task({ ...req.body, user: req.user.id })
    await task.save()
    res.status(201).json(task)
}

export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
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