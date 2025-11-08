import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setErr('');
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/dashboard');
    } catch {
      setErr('Email atau password salah.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #4e54c8, #8f94fb)',
      }}
    >
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-3">
          <i className="bi bi-check2-circle text-primary" style={{ fontSize: '3rem' }}></i>
          <h3 className="fw-bold mt-2">Login ke TaskHub+</h3>
          <p className="text-muted">Kelola tugasmu dengan mudah</p>
        </div>

        {err && <div className="alert alert-danger">{err}</div>}

        <form onSubmit={submit}>
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
                placeholder="********"
                value={form.password}
                onChange={handle}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100">
            <i className="bi bi-box-arrow-in-right me-1"></i> Login
          </button>
        </form>

        <p className="mt-3 text-center text-muted">
          Belum punya akun?{' '}
          <Link to="/register" className="text-decoration-none fw-semibold">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
