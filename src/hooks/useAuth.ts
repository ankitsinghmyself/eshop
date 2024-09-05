// hooks/useAuth.ts
import { useState, useEffect } from 'react';

const checkAuthStatus = async (token: string) => {
  try {
    const response = await fetch('/api/check-auth', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Unauthorized');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return null;
  }
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const result = await checkAuthStatus(token);
        if (result) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
