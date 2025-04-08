import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from './config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return { user, loading };
} 