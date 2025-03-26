import React from "react";
import { Card, List, Button, Avatar, Typography, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Last30DaysExpenses = ({ expenses }) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Expenses
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
          {expenses && expenses.length > 0 ? (
            <List
              dataSource={expenses}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={item.icon ? <span>{item.icon}</span> : <DollarOutlined />}
                        className="bg-red-500"
                      />
                    }
                    title={item.category}
                    description={
                      item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "No date"
                    }
                  />
                  <Text className="text-red-500">
                    {item.amount !== undefined && item.amount !== null
                      ? `-Rs.${item.amount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="No expenses in the last 30 days"
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Last30DaysExpenses;