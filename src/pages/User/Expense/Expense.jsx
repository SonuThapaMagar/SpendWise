import React, { useEffect, useState } from "react";
import { Typography, Table, Button, Modal } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../../utils/toastify.util";

const { Title } = Typography;

const Expense = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const showModal = (id) => {
    setExpenseToDelete(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (expenseToDelete) {
      axios
        .delete(`http://localhost:4000/expenses/${expenseToDelete}`)
        .then(() => {
          fetchExpenses(); // Refresh the expenses list
          showSuccessToast("Expense deleted successfully!"); // Show success toast
        })
        .catch((error) => {
          console.error("Error deleting expense:", error);
          showErrorToast("Failed to delete expense."); // Show error toast
        })
        .finally(() => {
          setIsModalOpen(false);
          setExpenseToDelete(null); // Reset the expense to delete
        });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setExpenseToDelete(null);
  };

  // Fetch expenses and budgets from the server
  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const fetchExpenses = () => {
    axios
      .get("http://localhost:4000/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditExpense = (id) => {
    navigate(`/users/expense/editExpense/${id}`); // Navigate to the edit form
  };

  // Define table columns
  const columns = [
    {
      title: "Expense Name",
      dataIndex: "expenseName",
      key: "expenseName",
    },
    {
      title: "Expense Amount",
      dataIndex: "expenseAmount",
      key: "expenseAmount",
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: "Budget",
      dataIndex: "budgetId",
      key: "budgetId",
      render: (budgetId) => {
        const budget = budgets.find((b) => b.id === budgetId);
        return budget ? budget.budgetName : "N/A";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, item) => (
        <>
          <NavLink
            to={`/users/expense/editExpense/${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleEditExpense(item.id);
            }}
          >
            Edit
          </NavLink>
          <Button type="link" danger onClick={() => showModal(item.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleAddExpense = () => {
    navigate("/users/expense/addExpense");
  };

  return (
    <>
      <Title level={3}>Expenses</Title>
      <Button
        type="primary"
        onClick={handleAddExpense}
        style={{ marginBottom: 20 }}
      >
        Add Expense
      </Button>

      {/* Display expenses list */}
      <Table dataSource={expenses} columns={columns} rowKey="id" />

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this expense?</p>
      </Modal>
    </>
  );
};

export default Expense;
