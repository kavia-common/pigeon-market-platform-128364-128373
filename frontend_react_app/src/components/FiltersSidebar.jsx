import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function FiltersSidebar({ onChange }) {
  const [filters, setFilters] = useState({ age: '', sex: '', color: '', maxPrice: '' });

  const update = (k, v) => {
    const next = { ...filters, [k]: v };
    setFilters(next);
    onChange?.(next);
  };

  return (
    <aside className="card" aria-label="Filters">
      <h3 style={{ marginTop: 0 }}>Filters</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <select value={filters.age} onChange={(e) => update('age', e.target.value)}>
          <option value="">Age</option>
          <option>Young</option>
          <option>Adult</option>
          <option>Senior</option>
        </select>
        <select value={filters.sex} onChange={(e) => update('sex', e.target.value)}>
          <option value="">Sex</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select value={filters.color} onChange={(e) => update('color', e.target.value)}>
          <option value="">Color</option>
          <option>Blue</option>
          <option>Red</option>
          <option>White</option>
          <option>Speckled</option>
        </select>
        <input
          className="input"
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
        <button className="btn" onClick={() => { setFilters({ age: '', sex: '', color: '', maxPrice: '' }); onChange?.({}); }}>
          Clear
        </button>
      </div>
    </aside>
  );
}
