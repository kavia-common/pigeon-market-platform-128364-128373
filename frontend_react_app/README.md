# Pigeon Market – React Frontend

Modern, light-themed React app for browsing and purchasing pigeons.

## Features
- User registration and login (mock session)
- Browse pigeon listings with search/filter
- Add pigeons for sale
- Shopping cart
- Checkout with Stripe (Elements scaffold; uses mock session for demo)
- Order history

## Getting Started
- Install: `npm install`
- Run: `npm start` (http://localhost:3000)

## Environment
Copy `.env.example` to `.env` and set:
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` – Stripe publishable key for Elements (demo defaults if unset)
- `REACT_APP_SITE_URL` – App URL for potential auth redirects

## Structure
- `src/services/api.js` – Mock API for auth/listings/cart/orders/payments
- `src/context/*` – Auth and Cart contexts
- `src/pages/*` – Pages: Home, Listings, AddListing, Auth, Cart, Checkout, Orders
- `src/components/*` – Header, Footer, FiltersSidebar, ListingCard
- `src/theme.js`, `src/styles.css` – Theme tokens and styles
- `src/App.jsx` – Routing and layout

## Notes
- Replace `services/api.js` with real backend calls when API is available.
- For real Stripe Checkout, create a PaymentIntent or Checkout Session on the backend and pass clientSecret to Elements.
