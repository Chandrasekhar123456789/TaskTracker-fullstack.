const db = require('../db');

const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['Open', 'In Progress', 'Done', 'Archived'];

function createTask({ title, description = null, priority = 'Medium', due_date = null }) {
  if (!title || typeof title !== 'string') throw new Error('Invalid title');
  if (!VALID_PRIORITIES.includes(priority)) throw new Error('Invalid priority');

  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date)
    VALUES (@title, @description, @priority, @due_date)
  `);
  const info = stmt.run({ title, description, priority, due_date });
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(info.lastInsertRowid);
  return task;
}

function listTasks({ status, priority, sort } = {}) {
  let where = [];
  let params = {};

  if (status) {
    where.push('status = @status');
    params.status = status;
  }
  if (priority) {
    where.push('priority = @priority');
    params.priority = priority;
  }

  let sql = 'SELECT * FROM tasks';
  if (where.length) sql += ' WHERE ' + where.join(' AND ');

  if (sort === 'due_date_asc') sql += ' ORDER BY due_date IS NULL, due_date ASC';
  else if (sort === 'due_date_desc') sql += ' ORDER BY due_date IS NULL, due_date DESC';
  else sql += ' ORDER BY created_at DESC';

  const stmt = db.prepare(sql);
  return stmt.all(params);
}

function updateTask(id, updates = {}) {
  if (!id) throw new Error('Missing id');
  const allowed = ['title', 'description', 'priority', 'status', 'due_date'];
  const set = [];
  const params = { id };

  for (const key of allowed) {
    if (key in updates) {
      if (key === 'priority' && !['Low','Medium','High'].includes(updates.priority)) {
        throw new Error('Invalid priority');
      }
      if (key === 'status' && !['Open','In Progress','Done','Archived'].includes(updates.status)) {
        throw new Error('Invalid status');
      }
      set.push(`${key} = @${key}`);
      params[key] = updates[key];
    }
  }
  if (!set.length) throw new Error('Nothing to update');
  params.updated_at = new Date().toISOString();
  const sql = `UPDATE tasks SET ${set.join(', ')}, updated_at = @updated_at WHERE id = @id`;
  const stmt = db.prepare(sql);
  const info = stmt.run(params);
  if (info.changes === 0) return null;
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function getTaskById(id) {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

module.exports = {
  createTask,
  listTasks,
  updateTask,
  getTaskById,
  VALID_PRIORITIES,
  VALID_STATUSES
};
