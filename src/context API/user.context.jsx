import axios from "axios";
import React, { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fetchUserData = useCallback(async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${userId}`);
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, ...response.data };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
        console.log("Updated user after fetchUserData:", updatedUser);
        return updatedUser;
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

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
        localStorage.setItem("is_login", "1");
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
        localStorage.setItem("is_login", "1");
        setUser(userData);
        console.log("User logged in:", userData);
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

      if (response.data.length > 0) {
        throw new Error("Email already exists");
      }

      const signupResponse = await axios.post("http://localhost:4000/users", {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        isAdmin: false,
      });

      const newUser = { ...signupResponse.data, role: "user" };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("is_login", "1");
      return newUser;
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("is_login");
    console.log("User logged out");
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signup,
        adminLogin,
        login,
        logout,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export const useUser = () => useContext(UserContext);

// import axios from "axios";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";

// // Create the context
// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   //Fetching user data from JSON Server
//   const fetchUserData = useCallback(async (userId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/users/${userId}`);
//       setUser((prevUser) => {
//         const updatedUser = {
//           ...prevUser,
//           ...response.data,
//         };
//         console.log("Updated user after fetchUserData:", updatedUser);
//         return updatedUser;
//       });
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }, []);

//   useEffect(() => {
//     if (user?.id) {
//       console.log("Fetching user data for ID:", user.id);
//       fetchUserData(user.id);
//     }
//   }, [user?.id, fetchUserData]);

//   //Admin login function
//   const adminLogin = useCallback(async (username, password) => {
//     try {
//       const response = await axios.get("http://localhost:4000/users");
//       const adminUser = response.data.find(
//         (user) =>
//           user.username === username &&
//           user.password === password &&
//           (user.isAdmin === true || user.isAdmin === "true")
//       );

//       if (adminUser) {
//         const userData = { ...adminUser, role: "admin" };
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("is_login", "1");
//         setUser(userData);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("Admin login error:", error);
//       return false;
//     }
//   }, []);

//   //User login function
//   const login = useCallback(async (username, password) => {
//     try {
//       const response = await axios.get("http://localhost:4000/users");
//       const foundUser = response.data.find(
//         (user) =>
//           user.username === username &&
//           user.password === password &&
//           !user.isAdmin
//       );

//       if (foundUser) {
//         const userData = { ...foundUser, role: "user" };
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("is_login", "1");
//         setUser(userData);
//         console.log("User logged in:", userData);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error("User login error:", error);
//       return false;
//     }
//   }, []);

//   // Function to handle signup
//   const signup = useCallback(async (userData) => {
//     try {
//       const response = await axios.get("http://localhost:4000/users", {
//         params: { email: userData.email },
//       });

//       if (response.data.length > 0) {
//         throw new Error("Email already exists");
//       }

//       const signupResponse = await axios.post("http://localhost:4000/users", {
//         username: userData.username,
//         email: userData.email,
//         password: userData.password,
//         isAdmin: false, // Explicitly set isAdmin to false for new users
//       });

//       const newUser = { ...signupResponse.data, role: "user" };
//       setUser(newUser);
//       localStorage.setItem("is_login", "1");
//       return newUser;
//     } catch (error) {
//       throw error;
//     }
//   }, []);

//   //Logout Function
//   const logout = useCallback(() => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("is_login");
//     console.log("User logged out");
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         signup,
//         adminLogin,
//         login,
//         logout,
//         fetchUserData,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext };

// export const useUser = () => useContext(UserContext);
