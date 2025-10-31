const db = new Database(dbFile);
db.pragma('foreign_keys = ON');

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Ensure 'priority' column exists
try {
  const columns = db.prepare("PRAGMA table_info(tasks)").all();
  const hasPriority = columns.some(c => c.name === 'priority');
  if (!hasPriority) {
    db.prepare("ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'medium'").run();
    console.log("✅ Added missing 'priority' column");
  }
} catch (err) {
  console.error("DB migration error:", err.message);
}




