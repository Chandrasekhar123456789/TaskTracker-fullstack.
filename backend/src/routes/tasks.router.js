const express = require('express');
const router = express.Router();
const tasksService = require('../services/tasks.service');
const insightsService = require('../services/insights.service');

// POST /tasks
router.post('/', (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    const task = tasksService.createTask({ title, description, priority, due_date });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /tasks
router.get('/', (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    const tasks = tasksService.listTasks({ status, priority, sort });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PATCH /tasks/:id
router.patch('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = tasksService.updateTask(id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET /tasks/:id
router.get('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const task = tasksService.getTaskById(id);
    if (!task) return res.status(404).json({ success: false, error: 'Not found' });
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
