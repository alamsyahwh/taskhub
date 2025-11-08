import React, { useState } from 'react';
import api from '../services/api';

export default function TaskForm({ onAdd }) {
  const [form, setForm] = useState({ judul: '', deskripsi: '', tanggal_deadline: '', prioritas: 'sedang' });
  const [err, setErr] = useState('');
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setErr('');

    try {
      const res = await api.post('/tasks', form);
      onAdd(res.data);

      setForm({
        judul: '',
        deskripsi: '',
        tanggal_deadline: '',
        prioritas: 'sedang',
      });
    } catch (error) {
      setErr('Gagal menambahkan task.');
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <i className="bi bi-plus-circle me-2"></i>Tambah Task
      </div>
      <div className="card-body">
        {err && <div className="alert alert-danger py-2">{err}</div>}
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Judul Task</label>
            <input type="text" className="form-control" name="judul"
              value={form.judul} onChange={handle} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <textarea className="form-control" rows="2"
              name="deskripsi" value={form.deskripsi} onChange={handle}></textarea>
          </div>

          <input
            type="date"
            className="form-control"
            name="tanggal_deadline"
            min={new Date().toISOString().split("T")[0]}
            value={form.tanggal_deadline}
            onChange={handle}
            required
          />
          
          <div className="mb-3">
            <label className="form-label">Prioritas</label>
            <select className="form-select" name="prioritas" value={form.prioritas} onChange={handle}>
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            <i className="bi bi-check-circle me-2"></i>Simpan Task
          </button>
        </form>
      </div>
    </div>
  );
}
