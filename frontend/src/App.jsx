import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, patchTask, fetchInsights } from './api/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', sort: '' });
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadTasks() {
    setLoading(true);
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.sort) params.sort = filters.sort;
    const res = await fetchTasks(params);
    if (res.success) setTasks(res.data);
    setLoading(false);
  }

  async function loadInsights() {
    const res = await fetchInsights();
    if (res.success) setInsights(res.data);
  }

  useEffect(() => {
    loadTasks();
    loadInsights();
    // eslint-disable-next-line
  }, [filters]);

  async function handleCreate(values) {
    const res = await createTask(values);
    if (res.success) {
      await loadTasks();
      await loadInsights();
    } else {
      alert('Error: ' + res.error);
    }
  }

  async function handlePatch(id, payload) {
    const res = await patchTask(id, payload);
    if (res.success) {
      await loadTasks();
      await loadInsights();
    } else alert(res.error);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Task Tracker</h1>
        <p className="sub">Eco-friendly · Minimal · Animated UI</p>
      </header>

      <main className="main-grid">
        <section className="left">
          <TaskForm onCreate={handleCreate} />
          <div className="controls">
            <label>Status:</label>
            <select value={filters.status} onChange={e => setFilters(s => ({ ...s, status: e.target.value }))}>
              <option value="">All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
              <option>Archived</option>
            </select>

            <label>Priority:</label>
            <select value={filters.priority} onChange={e => setFilters(s => ({ ...s, priority: e.target.value }))}>
              <option value="">All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label>Sort:</label>
            <select value={filters.sort} onChange={e => setFilters(s => ({ ...s, sort: e.target.value }))}>
              <option value="">Newest</option>
              <option value="due_date_asc">Due date ↑</option>
              <option value="due_date_desc">Due date ↓</option>
            </select>

            <button className="btn" onClick={() => { setFilters({ status: '', priority: '', sort: '' }); }}>Reset</button>
          </div>

          <TaskList tasks={tasks} onPatch={handlePatch} loading={loading} />
        </section>

        <aside className="right">
          <InsightsPanel insights={insights} refresh={loadInsights} />
        </aside>
      </main>

      <footer className="footer">Made with ♻️ — lightweight, minimal, and responsive.</footer>
    </div>
  );
}
