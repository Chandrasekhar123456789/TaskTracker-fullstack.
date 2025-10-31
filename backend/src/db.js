const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

const dbFile = process.env.DATABASE_FILE || path.join(__dirname, '..', '..', 'task_tracker.db');
const db = new Database(dbFile);
db.pragma('foreign_keys = ON');

module.exports = db;
