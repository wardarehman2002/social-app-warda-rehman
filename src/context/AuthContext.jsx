import { createContext, useState } from 'react';
import { storage, generateId } from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialise straight from localStorage so a page refresh keeps the user logged in.
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());

  /**
   * Create a brand new user account.
   * Throws an Error if the email is already registered.
   */
  function signup({ name, email, password }) {
    const users = storage.getUsers();
    const emailTaken = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailTaken) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: generateId('usr'),
      name,
      email,
      password,
      bio: '',
      location: '',
      avatar: null,
      coverImage: null,
      joinedAt: new Date().toISOString(),
    };

    storage.setUsers([...users, newUser]);
    return newUser;
  }

  /**
   * Log in with email + password.
   * Throws an Error if credentials don't match any user.
   */
  function login(email, password) {
    const users = storage.getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!found) {
      throw new Error('Invalid email or password');
    }

    // Never keep the password in the "session" copy of the user.
    const { password: _password, ...safeUser } = found;
    setCurrentUser(safeUser);
    storage.setCurrentUser(safeUser);
    return safeUser;
  }

  function logout() {
    setCurrentUser(null);
    storage.clearCurrentUser();
  }

  /**
   * Merge updated fields into the current user, persisting to:
   * - React state (so UI reacts immediately, e.g. navbar avatar)
   * - localStorage currentUser (session)
   * - localStorage users array (so it survives future logins)
   */
  function updateCurrentUser(updatedData) {
    if (!currentUser) return;

    const merged = { ...currentUser, ...updatedData };
    setCurrentUser(merged);
    storage.setCurrentUser(merged);

    const users = storage.getUsers();
    const updatedUsers = users.map((u) =>
      u.id === currentUser.id ? { ...u, ...updatedData } : u
    );
    storage.setUsers(updatedUsers);

    return merged;
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
