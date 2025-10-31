import React from 'react';

export default function TaskList({ tasks = [], onPatch, loading }) {
  if (loading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <div className="task-main">
            <div>
              <strong>{task.title}</strong> <span className="muted">({task.priority})</span>
              <div className="desc">{task.description}</div>
            </div>
            <div className="task-actions">
              <div className="due">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No due date'}</div>
              <select value={task.status} onChange={e => onPatch(task.id, { status: e.target.value })} className="select-small">
                <option>Open</option>
                <option>In Progress</option>
                <option>Done</option>
                <option>Archived</option>
              </select>
              <select value={task.priority} onChange={e => onPatch(task.id, { priority: e.target.value })} className="select-small">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="meta">Created: {new Date(task.created_at).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
