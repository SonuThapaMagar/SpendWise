import React from "react";
import { Card, Col, Row, Typography, Button, Space } from "antd";
import AdminCards from "./adminComponents/AdminCards";
const { Title, Text } = Typography;

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <AdminCards />
    </div>
  );
};

export default AdminDashboard;
