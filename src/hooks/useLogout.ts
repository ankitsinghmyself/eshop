// src/hooks/useLogout.ts
"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Logged out successfully: ${data.message}`);
        // Redirect to homepage
        window.location.href = "/";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogout, loading };
};
