import React, { useEffect, useState } from "react";
import { Typography, Table, Button, ConfigProvider, Flex, Space } from "antd";
import { useResponsive } from "antd-style";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const Budget = () => {
  const { xxl } = useResponsive();
  const navigate = useNavigate();
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets from the server
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then(function (response) {
        setBudgets(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      render: (amount) => `Rs. ${amount}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          <NavLink to={`/users/budget/editBudget/${item.id}`}>Edit</NavLink>
          <Button type="button">Delete</Button>
        </Space>
      ),
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
            rowKey="id" 
            style={{ marginTop: 20 }} 
          />
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Budget;