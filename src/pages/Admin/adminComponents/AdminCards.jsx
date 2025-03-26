import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { 
  TeamOutlined, 
  DollarOutlined, 
  PieChartOutlined 
} from '@ant-design/icons';

const { Text, Title } = Typography;

const AdminCards = ({ totalUsers, totalExpenses, totalBudgets }) => {
  return (
    <Row gutter={[16, 16]} className="mb-6">
      {/* Users Card */}
      <Col xs={24} sm={12} md={8}>
        <Card className="shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              <TeamOutlined className="text-blue-500 text-xl" />
            </div>
            <div>
              <Text type="primary">Total Users</Text>
              <Title level={3} className="mt-1 mb-0">
                {totalUsers}
              </Title>
            </div>
          </div>
        </Card>
      </Col>

      {/* Expenses Card */}
      <Col xs={24} sm={12} md={8}>
        <Card className="shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-50">
              <DollarOutlined className="text-red-500 text-xl" />
            </div>
            <div>
              <Text type="primary">Total Expenses</Text>
              <Title level={3} className="mt-1 mb-0">
                Rs.{totalExpenses}
              </Title>
            </div>
          </div>
        </Card>
      </Col>

      {/* Budgets Card */}
      <Col xs={24} sm={12} md={8}>
        <Card className="shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-50">
              <PieChartOutlined className="text-green-500 text-xl" />
            </div>
            <div>
              <Text type="primary">Total Budgets</Text>
              <Title level={3} className="mt-1 mb-0">
                Rs.{totalBudgets}
              </Title>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminCards;