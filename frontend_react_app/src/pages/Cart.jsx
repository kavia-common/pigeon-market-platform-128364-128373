import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Cart() {
  const { items, remove, total, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <div className="card">Cart is empty. <Link to="/listings">Browse listings</Link></div>
      ) : (
        <div className="card">
          <div style={{ display: 'grid', gap: 12 }}>
            {items.map(i => (
              <div key={i.id} style={{ display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: 12 }}>
                <img src={i.image} alt={i.title} style={{ width: 96, height: 64, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{i.title}</div>
                  <div style={{ color: 'var(--muted)' }}>${i.price}</div>
                </div>
                <button className="btn secondary" onClick={() => remove(i.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Total: ${total.toFixed(2)}</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn secondary" onClick={clear}>Clear</button>
              <button className="btn" onClick={() => navigate('/checkout')}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
