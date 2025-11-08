import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Filters from '../components/Filters';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: 'semua', prioritas: 'semua', sort: '' });
  const nav = useNavigate();

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filters.prioritas !== 'semua') params.prioritas = filters.prioritas;
      if (filters.status !== 'semua') params.status = filters.status;
      if (filters.sort) params.sort = filters.sort;
      const res = await api.get('/tasks', { params });
      setTasks(res.data);
    } catch (e) {
      if (e.response?.status === 401) {
        localStorage.removeItem('token');
        nav('/login');
      }
    }
  };

  useEffect(() => { fetchTasks(); }, [filters]);

  const handleAdd = (newTask) => setTasks(prev => [newTask, ...prev]);
  const handleComplete = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, selesai: true } : t));
  const logout = () => { localStorage.removeItem('token'); nav('/login'); };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold"><i className="bi bi-check2-square me-2"></i>TaskHub+</span>
          <button onClick={logout} className="btn btn-outline-light ms-auto">
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <TaskForm onAdd={handleAdd} />
          </div>
          <div className="col-md-8">
            <Filters value={filters} onChange={setFilters} />
            <TaskList tasks={tasks} onComplete={handleComplete} refresh={fetchTasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
