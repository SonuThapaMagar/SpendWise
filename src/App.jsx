import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import Budget from "./pages/User/Budget/Budget";
import UserLayout from "./layout/UserLayout";
import AddBudget from "./pages/User/Budget/AddBudget";
import EditBudget from "./pages/User/Budget/EditBudget";
import AddExpense from "./pages/User/Expense/AddExpense";
import Expense from "./pages/User/Expense/Expense";
import About from "./content/About";
import Services from "./content/Services";
import Contact from "./content/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<UserLayout />}>
          <Route path="/users/dashboard" element={<UserDashboard />} />
          <Route path="/users/budget" element={<Budget />}></Route>
          <Route path="/users/budget/addBudget" element={<AddBudget />}></Route>
          <Route
            path="/users/budget/editBudget/:id"
            element={<EditBudget />}
          ></Route>

          <Route path="/users/expense" element={<Expense />}></Route>
          <Route
            path="/users/expense/addExpense"
            element={<AddExpense />}
          ></Route>
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin/" element={AdminLayout}> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
