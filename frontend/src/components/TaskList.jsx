import React from 'react';
import api from '../services/api';
import { toDMY } from '../utils/date';

export default function TaskList({ tasks, onComplete, refresh }) {
  const markComplete = async (id) => {
    try {
      await api.put(`/tasks/${id}/selesaikan`);
      onComplete(id);
      refresh && refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (!tasks.length)
    return <div className="alert alert-info mt-3">Belum ada task</div>;

  const getBadgeColor = (p) => {
    if (p === 'tinggi') return 'danger';
    if (p === 'sedang') return 'warning';
    return 'success';
  };

  return (
    <div className="mt-3">
      {tasks.map(task => (
        <div key={task.id} className={`card mb-3 shadow-sm ${task.selesai ? 'border-success' : ''}`}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className={`card-title mb-0 ${task.selesai ? 'text-decoration-line-through text-muted' : ''}`}>
                {task.judul}
              </h5>
              <span className={`badge bg-${getBadgeColor(task.prioritas)}`}>
                {task.prioritas.toUpperCase()}
              </span>
            </div>
            {task.deskripsi && <p className="mt-2 mb-1">{task.deskripsi}</p>}
            <p className="text-muted mb-1">
              <i className="bi bi-calendar-event me-1"></i>
              Deadline: {toDMY(task.tanggal_deadline)}
            </p>
            {task.butuh_perhatian && (
              <div className="alert alert-danger py-1 mt-2 mb-0">
                ⚠️ Butuh Perhatian
              </div>
            )}
            <div className="mt-3">
              {!task.selesai ? (
                <button onClick={() => markComplete(task.id)} className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-check2-square me-1"></i> Tandai Selesai
                </button>
              ) : (
                <span className="text-success fw-bold">
                  <i className="bi bi-check-circle me-1"></i> Selesai
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
