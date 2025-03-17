import React from "react";
import { Card } from "antd";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Card title="Card title" variant="borderless" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
      <Card title="Card title" variant="borderless" style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default Dashboard;