import React from 'react';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function ListingCard({ item }) {
  const { add } = useCart();

  return (
    <div className="card" role="article" aria-label={item.title}>
      <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', display: 'block', aspectRatio: '3/2', objectFit: 'cover' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h3 style={{ margin: 0 }}>{item.title}</h3>
        <div style={{ fontWeight: 800 }}>${item.price}</div>
      </div>
      <div style={{ color: 'var(--muted)', margin: '6px 0 10px' }}>
        {item.age} • {item.sex} • {item.color} • {item.location}
      </div>
      <p style={{ marginTop: 0 }}>{item.description}</p>
      <button className="btn" onClick={() => add(item)}>Add to cart</button>
    </div>
  );
}
