import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch {
      setErr('Gagal mendaftar. Coba lagi dengan email lain.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #00b09b, #96c93d)',
      }}
    >
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-3">
          <i className="bi bi-person-plus text-success" style={{ fontSize: '3rem' }}></i>
          <h3 className="fw-bold mt-2">Daftar TaskHub+</h3>
          <p className="text-muted">Mulai kelola tugasmu hari ini</p>
        </div>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nama</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nama lengkap"
                value={form.name}
                onChange={handle}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handle}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Minimal 6 karakter"
                value={form.password}
                onChange={handle}
                required
              />
            </div>
          </div>

          <button className="btn btn-success w-100">
            <i className="bi bi-person-check me-1"></i> Daftar
          </button>
        </form>

        <p className="mt-3 text-center text-muted">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-decoration-none fw-semibold">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}
