// Budget.utils.js
import axios from "axios";

export const getBudgets = () => axios.get("http://localhost:4000/budgets");
export const addBudget = (data) => axios.post("http://localhost:4000/budgets", data);
export const updateBudget = (id, data) => axios.put(`http://localhost:4000/budgets/${id}`, data);
export const deleteBudget = (id) => axios.delete(`http://localhost:4000/budgets/${id}`);


// Expense endpoints
export const getExpenses = () => axios.get("http://localhost:4000/expenses");
export const addExpense = (data) => axios.post("http://localhost:4000/expenses/", data);
export const deleteExpense = (id) => axios.delete(`http://localhost:4000/expenses/${id}`);