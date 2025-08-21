import React, { useState } from 'react';
import { listingsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function AddListing() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    age: '',
    color: '',
    sex: '',
    location: '',
    description: '',
    image: ''
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price) || 0 };
      await listingsApi.add(payload);
      navigate('/listings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <h2>Sell a Pigeon</h2>
      <form className="card" onSubmit={submit} style={{ display: 'grid', gap: 12 }}>
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => update('title', e.target.value)} required />
        <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => update('price', e.target.value)} required />
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3,minmax(0,1fr))' }}>
          <select value={form.age} onChange={(e) => update('age', e.target.value)} required>
            <option value="">Age</option>
            <option>Young</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>
          <select value={form.sex} onChange={(e) => update('sex', e.target.value)} required>
            <option value="">Sex</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select value={form.color} onChange={(e) => update('color', e.target.value)} required>
            <option value="">Color</option>
            <option>Blue</option>
            <option>Red</option>
            <option>White</option>
            <option>Speckled</option>
          </select>
        </div>
        <input className="input" placeholder="Location (e.g., NY)" value={form.location} onChange={(e) => update('location', e.target.value)} required />
        <input className="input" placeholder="Image URL" value={form.image} onChange={(e) => update('image', e.target.value)} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} />
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn" type="submit" disabled={saving}>{saving ? 'Publishing...' : 'Publish'}</button>
        </div>
      </form>
    </div>
  );
}
