import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '36px' }}>
        <h1 style={{ marginTop: 0 }}>Pigeon Market</h1>
        <p style={{ color: 'var(--muted)' }}>Buy and sell pigeons with ease. Browse top listings or start selling today.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
          <Link to="/listings" className="btn">Browse listings</Link>
          <Link to="/sell" className="btn secondary">Sell a pigeon</Link>
        </div>
      </div>
    </div>
  );
}
