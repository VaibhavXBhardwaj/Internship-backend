const Task = require('../../models/task.model');

exports.createTask = async (data, userId) => {
  return Task.create({ ...data, owner: userId });
};

exports.getUserTasks = async (userId) => {
  return Task.find({ owner: userId }).sort({ createdAt: -1 });
};

exports.getAllTasks = async () => {
  return Task.find().populate('owner', 'name email').sort({ createdAt: -1 });
};

exports.updateTask = async (taskId, userId, role, updates) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }

  // Admins can update any task; users only their own
  if (role !== 'admin' && task.owner.toString() !== userId.toString()) {
    const err = new Error('Not authorized to update this task');
    err.status = 403;
    throw err;
  }

  Object.assign(task, updates);
  await task.save();
  return task;
};

exports.deleteTask = async (taskId, userId, role) => {
  const task = await Task.findById(taskId);
  if (!task) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }

  if (role !== 'admin' && task.owner.toString() !== userId.toString()) {
    const err = new Error('Not authorized to delete this task');
    err.status = 403;
    throw err;
  }

  await task.deleteOne();
};