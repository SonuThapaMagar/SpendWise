import React from "react";
import { Card, Table } from "antd";
import { useAdmin } from "../../context API/admin.context";

const RecentUsers = () => {
  const { users, loading } = useAdmin();

  const safeUsers = Array.isArray(users) ? users : [];

  // Sort users by registration date (assuming a 'createdAt' field; adjust if different)
  const recentUsers = safeUsers
    .sort(
      (a, b) => new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id)
    )
    .slice(0, 5);
  const columns = [
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Registered On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => text || "N/A",
    },
  ];
  return (
    <Card className="mb-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recently Registered Users</h3>
      <Table
        columns={columns}
        dataSource={recentUsers}
        rowKey="id"
        pagination={false}
        scroll={{ x: "max-content" }} // Responsive horizontal scroll on mobile
        className="w-full"
      />
    </Card>
  );
};

export default RecentUsers;
