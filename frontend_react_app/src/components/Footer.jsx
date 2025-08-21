import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div>© {new Date().getFullYear()} Pigeon Market</div>
        <div>Contact: hello@pigeonmarket.example</div>
        <div>About: A modern marketplace for enthusiasts.</div>
      </div>
    </footer>
  );
}
