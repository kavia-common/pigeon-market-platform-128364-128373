//
// PUBLIC_INTERFACE
// Exports design tokens and a helper to set CSS variables dynamically.
export const theme = {
  light: {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8f9fa',
    '--text-primary': '#1b1f24',
    '--text-secondary': '#4B8E4B',
    '--border-color': '#e9ecef',
    '--button-bg': '#4B8E4B',
    '--button-text': '#ffffff',
    '--accent': '#FFB800',
    '--primary': '#4B8E4B',
    '--secondary': '#E0C097',
    '--card-bg': '#ffffff',
    '--muted': '#6b7280',
  },
  dark: {
    '--bg-primary': '#0f1216',
    '--bg-secondary': '#171B21',
    '--text-primary': '#f3f4f6',
    '--text-secondary': '#9ca3af',
    '--border-color': '#2a2f36',
    '--button-bg': '#2b7a2b',
    '--button-text': '#ffffff',
    '--accent': '#FFB800',
    '--primary': '#4B8E4B',
    '--secondary': '#E0C097',
    '--card-bg': '#1b2027',
    '--muted': '#9ca3af',
  }
};

// PUBLIC_INTERFACE
export function applyTheme(mode = 'light') {
  const vars = theme[mode] || theme.light;
  Object.entries(vars).forEach(([k, v]) => {
    document.documentElement.style.setProperty(k, v);
  });
  document.documentElement.setAttribute('data-theme', mode);
}
