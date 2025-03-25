import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  //Admin login function
  const adminLogin = async (username, password) => {
    try {
      const response = await axios.get("http://localhost:4000/users");
      const adminUser = response.data.find(
        (user) =>
          user.username === username &&
          user.password === password &&
          (user.isAdmin === true || user.isAdmin === "true")
      );

      if (adminUser) {
        const userData = {
          ...adminUser,
          role: "admin",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Admin login error:", error);
      return false;
    }
  };

  //Fetching user from the server
  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (user?.id) {
      fetchUserData(user.id);
    }
  }, [user?.id]);

  // Function to handle signup
  const signup = async (userData) => {
    try {
      // Check if the email already exists
      const response = await axios.get("http://localhost:4000/users", {
        params: {
          email: userData.email,
        },
      });

      if (response.data.length > 0) {
        throw new Error("Email already exists");
      }

      // Save the new user to JSON Server
      const signupResponse = await axios.post("http://localhost:4000/users", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      });

      setUser(signupResponse.data);
      return signupResponse.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, signup, setUser,adminLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };

export const useUser = () => useContext(UserContext);
