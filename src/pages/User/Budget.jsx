import React, { useEffect, useState } from "react";
import { Typography, Table, Button, ConfigProvider, Flex } from "antd";
import { useResponsive } from "antd-style";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Budget = () => {
  const { xxl } = useResponsive();
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets from localStorage when component loads
  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
    setBudgets(storedBudgets);
  }, []);

  // Define table columns
  const columns = [
    {
      title: "Budget Name",
      dataIndex: "budgetName",
      key: "budgetName",
    },
    {
      title: "Budget Amount",
      dataIndex: "budgetAmount",
      key: "budgetAmount",
      render: (amount) => `Rs. ${amount}`, // Formatting as currency
    },
  ];

  const handleAddBudget = () => {
    navigate("/users/budget/addBudget");
  };

  return (
    <>
      <Title level={3}>Budgets</Title>
      <ConfigProvider componentSize={xxl ? "middle" : "small"}>
        <Flex vertical gap="small">
          <Flex gap="small" wrap>
            <Button type="primary" className="rounded-full" onClick={handleAddBudget}>
              Add Budget
            </Button>
          </Flex>

          {/* Display budget list */}
          <Table 
            dataSource={budgets} 
            columns={columns} 
            rowKey="budgetName" 
            style={{ marginTop: 20 }} 
          />
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Budget;
