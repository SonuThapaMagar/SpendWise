import React from "react";
import { Card, List, Button, Avatar, Typography, Col, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { DollarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const RecentBudgets = ({ budgets }) => {
  const navigate = useNavigate();

  return (
    <Col xs={24} md={12}>
      <Card
        title={
          <Title level={4} className="m-0">
            Budget
          </Title>
        }
        extra={
          <Button
            type="link"
            onClick={() => navigate("/users/budget")}
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
        <div style={{ height: "300px", overflowY: "auto" }}>
          {budgets && budgets.length > 0 ? (
            <List
              dataSource={budgets}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={item.icon ? <span>{item.icon}</span> : <DollarOutlined />}
                        className="bg-green-500"
                      />
                    }
                    title={<span style={{ fontSize: "14px" }}>{item.category}</span>}
                    description={
                      item.date ? (
                        <span style={{ fontSize: "12px" }}>
                          {new Date(item.date).toLocaleDateString()}
                        </span>
                      ) : (
                        "No date"
                      )
                    }
                  />
                  <Text className="text-green-500" style={{ fontSize: "14px" }}>
                    {item.amount !== undefined && item.amount !== null
                      ? `+Rs.${item.amount.toLocaleString()}`
                      : "N/A"}
                  </Text>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="No Budget in the last 60 days"
              style={{ marginTop: "50px" }}
            />
          )}
        </div>
      </Card>
    </Col>
  );
};

export default RecentBudgets;