import { createContext, useEffect, useState, useCallback } from "react";

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// 🔹 Define User type (adjust fields based on your backend response)
export interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any; // optional fallback if backend has extra fields
}

// 🔹 Context type
interface UserAuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// 🔹 Create context with default value
export const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined,
);

// 🔹 Provider props type
interface Props {
  children: ReactNode;
}

export function UserAuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleApiCall = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/session`,
        {
          credentials: "include",
        },
      );

      if (response.ok) {
        const userDetails = await response.json();
        setUser(userDetails.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Context error ", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleApiCall();
  }, [handleApiCall]);

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}/user/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (response.ok) {
        setUser(null);
        alert("Logout successful");

        localStorage.clear();
        navigate("/login");
      } else {
        alert("Logout failed! Refresh the page and try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refreshUser: handleApiCall,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}
