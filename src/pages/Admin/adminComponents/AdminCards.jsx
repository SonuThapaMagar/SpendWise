import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { TeamOutlined, DollarOutlined, PieChartOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const AdminCards = ({ totalUsers, totalExpenses, totalBudgets }) => {
  return (
    <Row gutter={[8, 8]} className="mb-4">
      {/* Users Card */}
      <Col xs={24} sm={12} md={8}>
        <Card
          className="shadow-sm"
          style={{
            height: "104.49px",
            padding: "0.25rem",
          }}
          stylesbody={{ padding: 0 }} // Corrected from 'stylesbody'
        >
          <div
            className="flex items-center gap-3"
            style={{ padding: "0.5rem", height: "100%" }}
          >
            <div
              className="rounded-full bg-[#6875F5] flex items-center justify-center"
              style={{ padding: "0.5rem" }}
            >
              <TeamOutlined
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)", // Adjusted for balance
                  color: "white",
                }}
              />
            </div>
            <div className="overflow-hidden">
              <Text
                className="uppercase text-gray-500"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(10px, 1.2vw, 12px)",
                }}
              >
                Total Users
              </Text>
              <Title
                level={3}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  color: "#000",
                  margin: 0,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {totalUsers || 0}
              </Title>
            </div>
          </div>
        </Card>
      </Col>

      {/* Expenses Card */}
      <Col xs={24} sm={12} md={8}>
        <Card
          className="shadow-sm"
          style={{
            height: "104.49px",
            padding: "0.25rem",
          }}
          stylesbody={{ padding: 0 }}
        >
          <div
            className="flex items-center gap-3"
            style={{ padding: "0.5rem", height: "100%" }}
          >
            <div
              className="rounded-full bg-[#FF4D4F] flex items-center justify-center"
              style={{ padding: "0.5rem" }}
            >
              <DollarOutlined
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  color: "white",
                }}
              />
            </div>
            <div className="overflow-hidden">
              <Text
                className="uppercase text-gray-500"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(10px, 1.2vw, 12px)",
                }}
              >
                Total Expenses
              </Text>
              <Title
                level={3}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  color: "#000",
                  margin: 0,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Rs.{totalExpenses || 0}
              </Title>
            </div>
          </div>
        </Card>
      </Col>

      {/* Budgets Card */}
      <Col xs={24} sm={12} md={8}>
        <Card
          className="shadow-sm"
          style={{
            height: "104.49px",
            padding: "0.25rem",
          }}
          stylesbody={{ padding: 0 }}
        >
          <div
            className="flex items-center gap-3"
            style={{ padding: "0.5rem", height: "100%" }}
          >
            <div
              className="rounded-full bg-[#52C41A] flex items-center justify-center"
              style={{ padding: "0.5rem" }}
            >
              <PieChartOutlined
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  color: "white",
                }}
              />
            </div>
            <div className="overflow-hidden">
              <Text
                className="uppercase text-gray-500"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(10px, 1.2vw, 12px)",
                }}
              >
                Total Budgets
              </Text>
              <Title
                level={3}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  color: "#000",
                  margin: 0,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Rs.{totalBudgets || 0}
              </Title>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminCards;