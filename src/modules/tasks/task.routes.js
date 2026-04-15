const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const taskController = require('./task.controller');
const { protect, restrictTo } = require('../../middleware/auth');
const { handleValidation } = require('../../middleware/validate');

// All task routes require login
router.use(protect);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks (own tasks for users, all for admins)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 */
router.route('/')
  .get(taskController.getTasks)
  .post([
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['pending', 'in-progress', 'completed']).withMessage('Invalid status'),
    handleValidation
  ], taskController.createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 */
router.route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;