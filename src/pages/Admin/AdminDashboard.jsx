import React from 'react';
import { Row, Col, Divider } from 'antd';
import AdminCards from './/adminComponents/AdminCards';
import ExpenseTrends from './ExpenseTrends';
import CategoryBreakdown from './CategoryBreakdown';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      {/* Section 1: Summary Cards */}
      <div className="dashboard-section cards-section">
        <AdminCards 
          totalUsers={42} 
          totalExpenses={12500} 
          totalBudgets={15000} 
        />
      </div>

      <Divider className="section-divider" />

      {/* Section 2: Expense Trends */}
      <div className="dashboard-section trends-section">
        <h2 className="section-title">Expense Analysis</h2>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <ExpenseTrends />
          </Col>
          <Col xs={24} lg={8}>
            <CategoryBreakdown />
          </Col>
        </Row>
      </div>

      {/* Add more sections as needed */}
    </div>
  );
};

export default AdminDashboard