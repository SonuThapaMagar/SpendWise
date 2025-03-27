import React from "react";
import { Card, Button, Spin } from "antd";
import { useBudget } from "../../context API/BudgetContext";
import ExpenseCharts from "./ExpenseCharts";
import RecentUsers from "./RecentUsers";

const Reports = () => {
  const { loading } = useBudget();

  if (loading)
    return <Spin tip="Loading reports..." size="large" className="mt-8" />;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Reports & Analytics
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        {/* Expense Charts Section */}
        <div className="mb-4">
          <ExpenseCharts />
        </div>

        {/* Recent Users Section */}
        <div className="mt-4">
          <RecentUsers />
        </div>
      </div>
    </div>
  );
};

export default Reports;
