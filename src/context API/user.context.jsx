import React, { createContext, useState, useCallback, useMemo } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    localStorage.getItem("isUserLoggedIn") === "1"
  );

  const updateUser = useCallback((updates) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  const initializeUserDates = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      const users = response.data;
      const needsUpdate = users.some((u) => !u.createdAt);
      if (!needsUpdate) return;

      await Promise.all(
        users
          .filter((u) => !u.createdAt)
          .map((u) =>
            axios.patch(`http://localhost:4000/users/${u.id}`, {
              createdAt: new Date().toISOString(),
            })
          )
      );
    } catch (error) {
      console.error("Error initializing user dates:", error);
    }
  }, []);

  const fetchUserData = useCallback(
    async (userId) => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${userId}`);
        updateUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    [updateUser]
  );

  const adminLogin = useCallback(async (username, password) => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      const adminUser = response.data.find(
        (u) =>
          u.username === username &&
          u.password === password &&
          (u.isAdmin === true || u.isAdmin === "true")
      );
      if (adminUser) {
        const userData = { ...adminUser, role: "admin" };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAdminLoggedIn", "1"); // Admin-specific
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    }
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      const foundUser = response.data.find(
        (u) => u.username === username && u.password === password && !u.isAdmin
      );
      if (foundUser) {
        const userData = { ...foundUser, role: "user" };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isUserLoggedIn", "1"); // User-specific
        setUser(userData);
        setIsUserLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("User login error:", error);
      return false;
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      const response = await axios.get("http://localhost:4000/users", {
        params: { email: userData.email },
      });
      if (response.data.length > 0) throw new Error("Email already exists");

      const signupResponse = await axios.post("http://localhost:4000/users", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isAdmin: false,
        createdAt: new Date().toISOString(),
      });
      const newUser = { ...signupResponse.data, role: "user" };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isUserLoggedIn", "1"); // User-specific
      setIsUserLoggedIn(true);
      return newUser;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.setItem("isUserLoggedIn", "0"); // User-specific
    localStorage.setItem("isAdminLoggedIn", "0"); // Clear admin too
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser: updateUser,
      signup,
      adminLogin,
      login,
      logout,
      fetchUserData,
      initializeUserDates,
      isUserLoggedIn,
    }),
    [
      user,
      updateUser,
      signup,
      adminLogin,
      login,
      logout,
      fetchUserData,
      initializeUserDates,
      isUserLoggedIn,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => React.useContext(UserContext);