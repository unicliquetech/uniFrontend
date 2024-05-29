import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const verifyToken = async () => {
      try {
        if (token) {
          await axios.get('http://localhost:5000/api/v1/address/verify-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Frontendv1 verification error:', error);
        // localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();

    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleRouting = () => {
      if (isAuthenticated) {
        router.push('/checkout');
    };

    const debouncedRouting = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(handleRouting, 500); // Adjust the debounce delay as needed
    };

    debouncedRouting();
}}, []);

  return { isAuthenticated, isLoading };
};

export default useAuthentication;