import React from "react";
import { Card, List, Button, Avatar, Typography, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RecentTransactions = ({ recentTransactions }) => {
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
          {recentTransactions && recentTransactions.length > 0 ? (
            <List
              dataSource={recentTransactions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={item.icon ? <span>{item.icon}</span> : <DollarOutlined />}
                        className={
                          item.type === "budget" ? "bg-green-500" : "bg-red-500"
                        }
                      />
                    }
                    title={item.category}
                    description={
                      item.date
                        ? new Date(item.date).toLocaleDateString()
                        : "No date"
                    }
                  />
                  <Text
                    className={
                      item.type === "budget" ? "text-green-500" : "text-red-500"
                    }
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
              description="No recent transactions"
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default RecentTransactions;