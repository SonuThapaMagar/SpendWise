import React from "react";
import { Card, Spin } from "antd";
import { useAdmin } from "../../context API/admin.context";
import ExpenseCharts from "./ExpenseCharts";
import RecentUsers from "./RecentUsers";

const Reports = () => {
  const { loading } = useAdmin(); // Changed to useAdmin

  if (loading) {
    return <Spin tip="Loading reports..." size="large" className="mt-8" />;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reports & Analytics
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Expense Charts Section - No changes to the component itself */}
        <div className="mb-4">
          <ExpenseCharts />
        </div>

        {/* Recent Users Section - No changes to the component itself */}
        <div className="mt-4">
          <RecentUsers />
        </div>
      </div>
    </div>
  );
};

export default Reports;