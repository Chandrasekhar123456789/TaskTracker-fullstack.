import React from 'react';

export default function InsightsPanel({ insights, refresh }) {
  return (
    <div className="card insights">
      <h3>Smart Insights</h3>
      {!insights && <p>No data yet. Create tasks to see insights.</p>}
      {insights && (
        <>
          <p className="summary">{insights.summary}</p>
          <div className="grid">
            <div className="box">
              <div className="label">High</div>
              <div className="value">{insights.counts_by_priority.High || 0}</div>
            </div>
            <div className="box">
              <div className="label">Medium</div>
              <div className="value">{insights.counts_by_priority.Medium || 0}</div>
            </div>
            <div className="box">
              <div className="label">Low</div>
              <div className="value">{insights.counts_by_priority.Low || 0}</div>
            </div>
          </div>

          <div className="muted">Due soon (3d): {insights.due_soon_count}</div>
          <div className="muted">Busiest: {insights.busiest_day ? `${insights.busiest_day.day} (${insights.busiest_day.count})` : 'N/A'}</div>
        </>
      )}
      <div style={{ marginTop: 12 }}><button className="btn" onClick={refresh}>Refresh</button></div>
    </div>
  );
}
