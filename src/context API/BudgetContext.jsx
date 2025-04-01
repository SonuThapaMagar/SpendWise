import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  getBudgets as apiGetBudgets,
  addBudget as apiAddBudget,
  updateBudget as apiUpdateBudget,
  deleteBudget as apiDeleteBudget,
} from "../utils/budget.utils";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGetBudgets();
      setBudgets(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBudget = useCallback(async (budgetData) => {
    setLoading(true);
    try {
      const response = await apiAddBudget(budgetData);
      setBudgets((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBudget = useCallback(async (id, budgetData) => {
    setLoading(true);
    try {
      const response = await apiUpdateBudget(id, budgetData);
      setBudgets((prev) => prev.map((b) => (b.id === id ? response.data : b)));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBudget = useCallback(async (id) => {
    setLoading(true);
    try {
      await apiDeleteBudget(id);
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    refreshBudgets();
  }, [refreshBudgets]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        error,
        addBudget,
        updateBudget,
        deleteBudget,
        refreshBudgets,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
