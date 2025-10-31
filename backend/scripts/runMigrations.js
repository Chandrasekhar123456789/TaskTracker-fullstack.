const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
require('dotenv').config();

const MIGRATION = fs.readFileSync(path.join(__dirname, '..', 'migrations', 'init.sql'), 'utf8');
const dbFile = process.env.DATABASE_FILE || path.join(__dirname, '..', 'task_tracker.db');

console.log('Running migrations on', dbFile);
const db = new Database(dbFile);
db.exec(MIGRATION);
console.log('Migrations applied.');
db.close();
