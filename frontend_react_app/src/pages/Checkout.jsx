import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { ordersApi, paymentsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Checkout() {
  const { items, total, clear } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const session = await paymentsApi.createCheckoutSession({ items });
      setClientSecret(session.clientSecret);
    })();
  }, [items]);

  const pay = async () => {
    setProcessing(true);
    try {
      // In a real impl, confirm payment with Stripe using clientSecret.
      const paymentRef = clientSecret;
      await ordersApi.create({ items, total, paymentRef });
      clear();
      navigate('/orders');
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="card">Your cart is empty.</div>
      </div>
    );
  }

  const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_12345'; // For development only; set env in deployment.

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h2>Checkout</h2>
      <div className="card">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700 }}>Order Summary</div>
          <ul>
            {items.map(i => (<li key={i.id}>{i.title} - ${i.price}</li>))}
          </ul>
          <div style={{ fontWeight: 800 }}>Total: ${total.toFixed(2)}</div>
        </div>
        <Elements stripe={loadStripe(stripeKey)} options={{ clientSecret }}>
          <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 8, marginBottom: 12 }}>
            Payment details (Stripe Elements would render here with your backend-provided clientSecret).
          </div>
        </Elements>
        <button className="btn" onClick={pay} disabled={processing || !clientSecret}>
          {processing ? 'Processing...' : 'Pay now'}
        </button>
      </div>
    </div>
  );
}
