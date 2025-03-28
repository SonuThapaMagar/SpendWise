import React from "react";
import { Row, Col, Divider, Button, Card } from "antd";
import AdminCards from "./adminComponents/AdminCards";
import ExpenseTrends from "./ExpenseTrends";
import CategoryBreakdown from "./CategoryBreakdown";
import RecentUsers from "./RecentUsers";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Section 1: Summary Cards */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Card
          title="Financial Summary"
          style={{
            backgroundColor: "#E5EDFF",
          }}
        >
          <AdminCards />
        </Card>
      </div>

      <Divider className="my-6 sm:my-8 md:my-10 border-gray-200" />

      {/* Section 2: Expense Analysis */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Card style={{ backgroundColor: "#E5EDFF" }} className="p-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Expense Analysis
          </h2>
          <Row gutter={[16, 16]} className="w-full">
            <Col xs={24} lg={12} className="w-full h-full">
              <Card className="bg-white p-4 rounded-lg shadow-sm h-full">
                <ExpenseTrends />
              </Card>
            </Col>
            <Col xs={24} lg={12} className="w-full h-full">
              <Card className="bg-white p-4 rounded-lg shadow-sm h-full">
                <CategoryBreakdown />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>

      <Divider className="my-6 sm:my-8 md:my-10 border-gray-200" />

      {/* Section 3: Recent Users */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <Card
          style={{
            backgroundColor: "#E5EDFF",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              User Activity
            </h2>
            <Button
              type="primary"
              shape="round"
              className="w-full sm:w-auto"
              style={{
                backgroundColor: "#6875f5",
              }}
              onClick={() => navigate("/admin/users")}
            >
              View All
            </Button>
          </div>
          <RecentUsers />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
