import React, { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert('Title required.');
    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate || null
    };
    await onCreate(payload);
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  }

  return (
    <form onSubmit={submit} className="card form">
      <h3>Create task</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="input" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={3} className="textarea" />
      <div className="row">
        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)} className="select">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Due</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input-date" />
      </div>
      <button type="submit" className="btn">Add task</button>
    </form>
  );
}
