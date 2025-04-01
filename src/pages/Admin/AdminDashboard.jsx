import React from "react";
import { Row, Col, Divider, Button, Card } from "antd";
import AdminCards from "./adminComponents/AdminCards";
import ExpenseTrends from "./ExpenseTrends";
import CategoryBreakdown from "./CategoryBreakdown";
import RecentUsers from "./RecentUsers";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context API/admin.context";
import UserRetention from "./UserRetention";
import TopExpense from "./TopExpense";

const AdminDashboard = () => {
  const { metrics, loading, error } = useAdmin();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Section 1: Summary Cards */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <AdminCards
          totalUsers={metrics.totalUsers}
          totalExpenses={metrics.totalExpenses}
          totalBudgets={metrics.totalBudgets}
        />
      </div>

      <Divider className="my-6 sm:my-8 md:my-10 border-gray-200" />

      {/* Section 2: Expense Analysis */}
      <div className="mb-6 sm:mb-8 md:mb-10">
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
            <Card
              className="bg-white p-4 rounded-lg shadow-sm"
              stylesbody={{ padding: 0, height: "400px" }}
            >
              <CategoryBreakdown />
            </Card>
          </Col>
        </Row>
      </div>
      <Divider className="my-6 sm:my-8 md:my-10 border-gray-200" />

      {/* Section 2: User Retention */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          User Retention
        </h2>
        <Row gutter={[16, 16]} className="w-full">
          <Col xs={24} lg={12} className="w-full">
            <Card
              className="bg-white p-4 rounded-lg shadow-sm h-full"
              stylesbody={{
                height: "400px", // Fixed height for consistency
                display: "flex",
                flexDirection: "column",
              }}
            >
              <UserRetention />
            </Card>
          </Col>
          <Col xs={24} lg={12} className="w-full">
            <Card
              className="bg-white p-4 rounded-lg shadow-sm h-full"
              stylesbody={{
                height: "400px", 
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TopExpense />
            </Card>
          </Col>
        </Row>
      </div>

      <Divider className="my-6 sm:my-8 md:my-10 border-gray-200" />

      {/* Section 3: Recent Users */}
      <div className="mb-6 sm:mb-8 md:mb-10">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
