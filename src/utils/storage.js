// utils/storage.js
// Single source of truth for all localStorage reads/writes.
// No component should ever call localStorage directly - always go through this file.

const KEYS = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  LIKES: 'likes',
  CURRENT_USER: 'currentUser',
};

/** Generate a unique id like "post_1737012345678_ab12c" */
export function generateId(prefix = 'id') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${timestamp}_${random}`;
}

function safeGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`storage: failed to read "${key}"`, err);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`storage: failed to write "${key}"`, err);
    return false;
  }
}

export const storage = {
  // ---- Users ----
  getUsers() {
    return safeGet(KEYS.USERS, []);
  },
  setUsers(users) {
    return safeSet(KEYS.USERS, users);
  },
  getUserById(userId) {
    return storage.getUsers().find((u) => u.id === userId) || null;
  },

  // ---- Posts ----
  getPosts() {
    return safeGet(KEYS.POSTS, []);
  },
  setPosts(posts) {
    return safeSet(KEYS.POSTS, posts);
  },

  // ---- Comments ----
  getComments() {
    return safeGet(KEYS.COMMENTS, []);
  },
  setComments(comments) {
    return safeSet(KEYS.COMMENTS, comments);
  },

  // ---- Likes ----
  getLikes() {
    return safeGet(KEYS.LIKES, []);
  },
  setLikes(likes) {
    return safeSet(KEYS.LIKES, likes);
  },

  // ---- Current session user ----
  getCurrentUser() {
    return safeGet(KEYS.CURRENT_USER, null);
  },
  setCurrentUser(user) {
    return safeSet(KEYS.CURRENT_USER, user);
  },
  clearCurrentUser() {
    try {
      localStorage.removeItem(KEYS.CURRENT_USER);
      return true;
    } catch (err) {
      console.error('storage: failed to clear currentUser', err);
      return false;
    }
  },
};

export default storage;
