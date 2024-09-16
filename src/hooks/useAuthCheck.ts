// hooks/useAuthCheck.ts

import { useEffect, useState } from "react";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
        setUserData(data.user);
      } catch (error) {
        console.error("Error checking auth status:", error);

      }
    };

    checkAuthStatus();
  }, []);

  return {isAuthenticated, userData};
};

export default useAuthCheck;
