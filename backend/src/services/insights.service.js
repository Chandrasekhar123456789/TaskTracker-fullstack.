const db = require('../db');

function countsByPriority() {
  const rows = db.prepare('SELECT priority, COUNT(*) AS cnt FROM tasks GROUP BY priority').all();
  const result = { Low:0, Medium:0, High:0 };
  for (const r of rows) result[r.priority] = r.cnt;
  return result;
}

function countsByStatus() {
  const rows = db.prepare('SELECT status, COUNT(*) AS cnt FROM tasks GROUP BY status').all();
  const result = {};
  for (const r of rows) result[r.status] = r.cnt;
  return result;
}

function dueSoonCount(days = 3) {
  const sql = `SELECT COUNT(*) AS cnt FROM tasks WHERE due_date IS NOT NULL AND date(due_date) <= date('now', @offset) AND status != 'Done'`;
  const offset = `+${days} days`;
  const row = db.prepare(sql).get({ offset });
  return row.cnt || 0;
}

function busiestDay(nextDays = 7) {
  const sql = `
    SELECT date(due_date) AS day, COUNT(*) AS cnt
    FROM tasks
    WHERE due_date IS NOT NULL
      AND date(due_date) >= date('now')
      AND date(due_date) <= date('now', @offset)
    GROUP BY day
    ORDER BY cnt DESC
    LIMIT 1
  `;
  const offset = `+${nextDays} days`;
  const row = db.prepare(sql).get({ offset });
  return row ? { day: row.day, count: row.cnt } : null;
}

function generateSummary() {
  const byPriority = countsByPriority();
  const byStatus = countsByStatus();
  const openCount = (byStatus['Open'] || 0) + (byStatus['In Progress'] || 0);
  const dueSoon = dueSoonCount(3);
  const busy = busiestDay(7);

  const entries = Object.entries(byPriority);
  entries.sort((a,b) => b[1] - a[1]);
  const dominantPriority = entries[0] && entries[0][1] > 0 ? entries[0][0] : null;

  let summaryParts = [];
  summaryParts.push(`You have ${openCount} open/in-progress tasks.`);
  if (dominantPriority) summaryParts.push(`Most tasks are ${dominantPriority} priority.`);
  if (dueSoon > 0) summaryParts.push(`${dueSoon} task(s) are due within 3 days.`);
  if (busy) summaryParts.push(`Busiest upcoming day: ${busy.day} (${busy.count} due).`);

  const summary = summaryParts.join(' ');
  return {
    counts_by_priority: byPriority,
    counts_by_status: byStatus,
    due_soon_count: dueSoon,
    busiest_day: busy,
    summary
  };
}

module.exports = {
  countsByPriority,
  countsByStatus,
  dueSoonCount,
  busiestDay,
  generateSummary
};
