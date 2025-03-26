import React from "react";
import { Card, List, Button, Avatar, Typography,Col } from "antd";
import { useNavigate } from "react-router-dom";
import categoryIcons from "../utils/categoryIcons";

const { Title, Text } = Typography;

const RecentTransactions = ({ recentExpenses }) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Recent Transactions
          </Title>
        }
        extra={
          <Button
            type="link"
            onClick={() => navigate("/users/expense")}
            style={{
              backgroundColor: "#CDDBFE",
              color: "#5850EC",
            }}
          >
            See All
          </Button>
        }
        className="shadow-lg rounded-lg"
        style={{ minHeight: "380px" }}
      >
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <List
            dataSource={recentExpenses}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={categoryIcons[item.category] || <DollarOutlined />}
                      className={
                        item.category === "Salary" ? "bg-green-500" : "bg-red-500"
                      }
                    />
                  }
                  title={item.category}
                  description={new Date(item.date).toLocaleDateString()}
                />
                <Text
                  className={
                    item.category === "Salary" ? "text-green-500" : "text-red-500"
                  }
                >
                  {item.category === "Salary"
                    ? `+Rs.${item.expenseAmount.toLocaleString()}`
                    : `-Rs.${item.expenseAmount.toLocaleString()}`}
                </Text>
              </List.Item>
            )}
          />
        </div>
      </Card>
    </Col>
  );
};

export default RecentTransactions;