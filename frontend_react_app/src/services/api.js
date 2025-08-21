/**
 * Mock API layer. Replace endpoints with real backend integration later.
 * Uses localStorage to persist basic auth session and mock data.
 */

const LS_USER = 'pm_user';
const LS_CART = 'pm_cart';
const LS_LISTINGS = 'pm_listings';
const LS_ORDERS = 'pm_orders';

function delay(ms = 400) {
  return new Promise(res => setTimeout(res, ms));
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function getLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed demo listings if empty
(function seed() {
  const existing = getLS(LS_LISTINGS, null);
  if (!existing) {
    const demo = Array.from({ length: 12 }).map((_, i) => ({
      id: uid(),
      title: `Racing Pigeon #${i + 1}`,
      price: 50 + i * 10,
      age: ['Young', 'Adult', 'Senior'][i % 3],
      color: ['Blue', 'Red', 'White', 'Speckled'][i % 4],
      sex: ['Male', 'Female'][i % 2],
      location: ['NY', 'CA', 'TX', 'WA'][i % 4],
      description: 'Healthy and strong with excellent lineage.',
      image: `https://picsum.photos/seed/pigeon${i}/600/400`,
      createdAt: Date.now() - i * 86400000
    }));
    setLS(LS_LISTINGS, demo);
  }
})();

// PUBLIC_INTERFACE
export const authApi = {
  /** Register a user and auto-login. */
  async register({ email, password, name }) {
    await delay();
    const user = { id: uid(), email, name };
    setLS(LS_USER, user);
    return user;
  },
  /** Login a user (mocked). */
  async login({ email }) {
    await delay();
    const user = { id: uid(), email, name: email.split('@')[0] };
    setLS(LS_USER, user);
    return user;
  },
  /** Logout current user. */
  async logout() {
    await delay(200);
    localStorage.removeItem(LS_USER);
    return true;
  },
  /** Get current session. */
  getSession() {
    return getLS(LS_USER, null);
  }
};

// PUBLIC_INTERFACE
export const listingsApi = {
  async list({ search = '', filters = {} } = {}) {
    await delay();
    const data = getLS(LS_LISTINGS, []);
    const s = search.trim().toLowerCase();
    let res = data;
    if (s) {
      res = res.filter(
        l =>
          l.title.toLowerCase().includes(s) ||
          l.description.toLowerCase().includes(s) ||
          l.color.toLowerCase().includes(s)
      );
    }
    if (filters.age) res = res.filter(l => l.age === filters.age);
    if (filters.sex) res = res.filter(l => l.sex === filters.sex);
    if (filters.color) res = res.filter(l => l.color === filters.color);
    if (filters.maxPrice) res = res.filter(l => l.price <= Number(filters.maxPrice));
    return res;
  },
  async add(payload) {
    await delay();
    const current = getLS(LS_LISTINGS, []);
    const newItem = { id: uid(), createdAt: Date.now(), ...payload };
    const next = [newItem, ...current];
    setLS(LS_LISTINGS, next);
    return newItem;
  }
};

// PUBLIC_INTERFACE
export const cartApi = {
  get() {
    return getLS(LS_CART, []);
  },
  set(items) {
    setLS(LS_CART, items);
  },
  add(item) {
    const curr = getLS(LS_CART, []);
    const exists = curr.find(c => c.id === item.id);
    const next = exists ? curr : [...curr, { ...item, qty: 1 }];
    setLS(LS_CART, next);
    return next;
  },
  remove(id) {
    const curr = getLS(LS_CART, []);
    const next = curr.filter(i => i.id !== id);
    setLS(LS_CART, next);
    return next;
  },
  clear() {
    setLS(LS_CART, []);
  }
};

// PUBLIC_INTERFACE
export const ordersApi = {
  async create({ items, total, paymentRef }) {
    await delay();
    const orders = getLS(LS_ORDERS, []);
    const order = {
      id: uid(),
      items,
      total,
      paymentRef,
      createdAt: Date.now()
    };
    setLS(LS_ORDERS, [order, ...orders]);
    cartApi.clear();
    return order;
  },
  async list() {
    await delay();
    return getLS(LS_ORDERS, []);
  }
};

// PUBLIC_INTERFACE
export const paymentsApi = {
  /**
   * Prepare a checkout session (mock). In real app, post to backend to create a Stripe Checkout Session.
   */
  async createCheckoutSession({ items }) {
    await delay();
    const total = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    return {
      clientSecret: `demo_secret_${uid()}`,
      total
    };
  }
};
