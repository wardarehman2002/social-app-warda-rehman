// utils/helpers.js
// Small pure helper functions used across the app.

/** Turn "2025-01-15T10:00:00Z" into a friendly relative-ish date string. */
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Turn a joinedAt date into "Joined January 2025" */
export function formatJoinDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return `Joined ${date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  })}`;
}

/** Read a File object and resolve with a base64 data URL. */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/** Get initials from a full name, e.g. "Warda Khan" -> "WK" */
export function getInitial(name = '') {
  return name.trim().charAt(0).toUpperCase() || '?';
}

/** Simple email format check used alongside RHF pattern validation. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
