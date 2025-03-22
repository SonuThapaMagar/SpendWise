import React ,{useState,useEffect} from "react";
import { Card, Row, Col } from "antd";
import Budget from "./Budget/Budget";
import axios from "axios";
import ExpenseGraph from "./ExpenseGraph";

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets from the server
  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    axios
      .get("http://localhost:4000/budgets")
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets:", error);
      });
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1
        style={{ marginBottom: "30px", fontSize: "24px", fontWeight: "bold" }}
      >
        Dashboard
      </h1>
      <Row gutter={[16, 16]}>
        {budgets.map((budget) => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} key={budget.id}>
            <Card
              title={budget.budgetName}
              variant={false}
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#52c41a",
                  fontWeight: "bold",
                }}
              >
                Rs. {budget.budgetAmount}
              </p>
              <p style={{ color: "#666" }}>Budget</p>
            </Card>
          </Col>
        ))}
      </Row>
      <ExpenseGraph/>
      <Budget />
    </div>
  );
};

export default Dashboard;
