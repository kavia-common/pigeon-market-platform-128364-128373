import React, { useEffect, useState } from 'react';
import { ordersApi } from '../services/api';

// PUBLIC_INTERFACE
export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    (async () => setOrders(await ordersApi.list()))();
  }, []);

  if (!orders) return <div className="container"><div className="card">Loading orders...</div></div>;

  return (
    <div className="container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="card">No orders yet.</div>
      ) : (
        <div className="grid" style={{ gap: 16 }}>
          {orders.map(o => (
            <div className="card" key={o.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><strong>Order:</strong> {o.id}</div>
                <div><strong>Total:</strong> ${o.total.toFixed(2)}</div>
              </div>
              <div style={{ color: 'var(--muted)' }}>
                {new Date(o.createdAt).toLocaleString()}
              </div>
              <ul>
                {o.items.map(i => <li key={i.id}>{i.title} - ${i.price}</li>)}
              </ul>
              <div><strong>Payment Ref:</strong> {o.paymentRef}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
