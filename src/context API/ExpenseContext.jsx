import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  getExpenses as apiGetExpenses,
  addExpense as apiAddExpense,
  deleteExpense as apiDeleteExpense,
} from "../utils/budget.utils";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGetExpenses();
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expenseData) => {
    setLoading(true);
    try {
      const response = await apiAddExpense(expenseData);
      setExpenses((prev) => [...prev, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error adding expense:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExpense = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiDeleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error deleting expense:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data when provider mounts
  useEffect(() => {
    refreshExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        deleteExpense,
        refreshExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
