import React from "react";
import { Card, Row, Col, Typography, Avatar } from "antd";
import { WalletOutlined, DollarOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const SummaryCards = ({ totalBudget, totalExpenses, remainingBalance }) => {
  const summaryData = [
    {
      title: "Total Balance",
      value: remainingBalance,
      icon: <WalletOutlined />,
      bgColor: "#6875F5",
    },
    {
      title: "Total Budget",
      value: totalBudget,
      icon: <DollarOutlined />,
      bgColor: "#6dbaa1",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: <DollarOutlined />,
      bgColor: "#D9534F",
    },
  ];

  return (
    <Row gutter={[16, 16]} className="mb-6">
      {summaryData.map((item, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            className="shadow-lg rounded-lg p-4"
            style={{
              border: "none",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row align="middle">
              <Col span={6}>
                <Avatar
                  size={50}
                  icon={item.icon}
                  style={{
                    backgroundColor: item.bgColor,
                  }}
                />
              </Col>
              <Col span={18}>
                <Text
                  className="text-gray-500 text-sm uppercase"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
                >
                  {item.title}
                </Text>
                <Title
                  level={4}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    color: "#000",
                    margin: 0,
                    fontSize: "1.5rem",
                  }}
                >
                  Rs.{item.value.toLocaleString()}
                </Title>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SummaryCards;