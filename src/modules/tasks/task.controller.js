const taskService = require('./task.service');

exports.createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.user._id);
    res.status(201).json({ message: 'Task created', task });
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    // Admins see all tasks, users see only theirs
    const tasks = req.user.role === 'admin'
      ? await taskService.getAllTasks()
      : await taskService.getUserTasks(req.user._id);
    res.status(200).json({ count: tasks.length, tasks });
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user._id, req.user.role, req.body);
    res.status(200).json({ message: 'Task updated', task });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id, req.user.role);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) { next(err); }
};