import React from "react";
import { Card, List, Button, Avatar, Typography, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RecentTransactions = ({ recentTransactions }) => {
  const navigate = useNavigate();
  console.log("Recent Transactions in Component:", recentTransactions);

  return (
    <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column" }}>
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
          {recentTransactions && recentTransactions.length > 0 ? (
            <List
              dataSource={recentTransactions}
              renderItem={(item) => (
                <List.Item style={{ padding: "8px 0" }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.icon ? (
                            <span>{item.icon}</span>
                          ) : (
                            <DollarOutlined />
                          )
                        }
                        className={
                          item.type === "budget" ? "bg-green-500" : "bg-red-500"
                        }
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
                  <Text
                    className={
                      item.type === "budget" ? "text-green-500" : "text-red-500"
                    }
                    style={{ fontSize: "14px" }}
                  >
                    {item.amount !== undefined && item.amount !== null
                      ? item.type === "budget"
                        ? `+Rs.${item.amount.toLocaleString()}`
                        : `-Rs.${item.amount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description={<span style={{ fontSize: "14px" }}>No recent transactions</span>}
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default RecentTransactions;