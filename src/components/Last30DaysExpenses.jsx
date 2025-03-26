import React from "react";
import { Card, List, Button, Avatar, Typography, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Last30DaysExpenses = ({ expenses }) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column" }}>
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
              fontSize: "12px",
              padding: "4px 8px",
            }}
          >
            See All
          </Button>
        }
        className="shadow-lg rounded-lg"
        style={{
          minHeight: "380px",
          flex: 1, // Ensure the card stretches to fill available space
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          body: {
            flex: 1, // Ensure the card body takes up remaining space
            display: "flex",
            flexDirection: "column",
            padding: "16px", // Consistent padding
          },
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: "300px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {expenses && expenses.length > 0 ? (
            <List
              dataSource={expenses}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0" }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.icon ? <span>{item.icon}</span> : <DollarOutlined />
                        }
                        className="bg-red-500"
                        size="small"
                      />
                    }
                    title={
                      <span style={{ fontSize: "14px" }}>{item.category}</span>
                    }
                    description={
                      <span style={{ fontSize: "12px" }}>
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : "No date"}
                      </span>
                    }
                  />
                  <Text className="text-red-500" style={{ fontSize: "14px" }}>
                    {item.amount !== undefined && item.amount !== null
                      ? `-Rs.${item.amount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description={<span style={{ fontSize: "14px" }}>No expenses in the last 30 days</span>}
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default Last30DaysExpenses;