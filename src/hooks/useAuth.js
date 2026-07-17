import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/** Shortcut hook so components don't need to import useContext + AuthContext separately. */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
