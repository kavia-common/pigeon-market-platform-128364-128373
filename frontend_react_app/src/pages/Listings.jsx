import React, { useEffect, useState } from 'react';
import FiltersSidebar from '../components/FiltersSidebar';
import ListingCard from '../components/ListingCard';
import { listingsApi } from '../services/api';

// PUBLIC_INTERFACE
export default function Listings() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await listingsApi.list({ search, filters });
    setItems(res);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters]);

  return (
    <div className="container">
      <div style={{ margin: '12px 0 16px', display: 'flex', gap: 12 }}>
        <input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pigeons by title, color, or description..."
          aria-label="Search pigeons"
        />
        <button className="btn" onClick={load}>Search</button>
      </div>

      <div className="layout">
        <FiltersSidebar onChange={setFilters} />
        <div>
          {loading ? (
            <div className="card">Loading listings...</div>
          ) : items.length === 0 ? (
            <div className="card">No pigeons found.</div>
          ) : (
            <div className="grid cols-3">
              {items.map((item) => (
                <ListingCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
