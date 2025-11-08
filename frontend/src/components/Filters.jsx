import React from 'react';

export default function Filters({ value, onChange }) {
  const change = (k, v) => onChange({ ...value, [k]: v });

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label">Status</label>
            <select className="form-select" value={value.status} onChange={e => change('status', e.target.value)}>
              <option value="semua">Semua</option>
              <option value="selesai">Selesai</option>
              <option value="belum">Belum</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Prioritas</label>
            <select className="form-select" value={value.prioritas} onChange={e => change('prioritas', e.target.value)}>
              <option value="semua">Semua</option>
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Urutkan</label>
            <select className="form-select" value={value.sort} onChange={e => change('sort', e.target.value)}>
              <option value="">Default</option>
              <option value="deadline">Berdasarkan Deadline</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
