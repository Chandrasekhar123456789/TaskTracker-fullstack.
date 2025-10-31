require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const tasksRouter = require('./src/routes/tasks.router');
const insightsService = require('./src/services/insights.service');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/insights', (req, res) => {
  try {
    const data = insightsService.generateSummary();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send({ success: true, message: 'Task Tracker API' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
