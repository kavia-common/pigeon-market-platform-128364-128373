import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (mode === 'login') {
      await login({ email: form.email, password: form.password });
    } else {
      await register({ email: form.email, password: form.password, name: form.name });
    }
    navigate('/');
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
        <form onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
          {mode === 'register' && (
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          )}
          <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Please wait...' : (mode === 'login' ? 'Login' : 'Register')}</button>
        </form>
        <div style={{ marginTop: 12 }}>
          {mode === 'login' ? (
            <button className="btn secondary" onClick={() => setMode('register')}>Need an account? Register</button>
          ) : (
            <button className="btn secondary" onClick={() => setMode('login')}>Have an account? Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
