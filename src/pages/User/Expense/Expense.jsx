import React, { useEffect, useState } from "react";
import { Typography, Table, Button, ConfigProvider, Flex } from "antd";
import { useResponsive } from "antd-style";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Expense = () => {

    const { xxl } = useResponsive();
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
  
    // Fetch budgets from localStorage when component loads
    useEffect(() => {
      const storedBudgets = JSON.parse(localStorage.getItem("expenses")) || [];
      setExpenses(storedBudgets);
    }, []);
  
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
    ];
  
    const handleAddExpense = () => {
      navigate("/users/budget/addExpense");
    };

    
  return (
    <>
      <Title level={3}>Expenses</Title>
      <ConfigProvider componentSize={xxl ? "middle" : "small"}>
        <Flex vertical gap="small">
          <Flex gap="small" wrap>
            <Button
              type="primary"
              className="rounded-full"
              onClick={handleAddExpense}
            >
              Add Expense
            </Button>
          </Flex>

          {/* Display budget list */}
          <Table
            dataSource={expenses}
            columns={columns}
            rowKey="expenseName"
            style={{ marginTop: 20 }}
          />
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Expense;
