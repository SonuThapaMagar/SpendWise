import React from "react";
import { Row } from "antd";
import SummaryCards from "../../components/SummaryCards";
import RecentTransactions from "../../components/RecentTransactions";
import FinancialOverview from "../../components/FinancialOverview";
import { useBudget } from "../../context API/BudgetContext";

const UserDashboard = () => {
  const { totalBudget, totalExpenses, remainingBalance, recentTransactions } =
    useBudget();

  // Data for the donut chart
  const chartData = [
    {
      name: "Total Balance",
      value: remainingBalance,
      color: "#6875f5",
      backgroundColor: "#6875f5",
    },
    {
      name: "Total Budget",
      value: totalBudget,
      color: "#6dbaa1",
      backgroundColor: "#6dbaa1",
    },
    {
      name: "Total Expenses",
      value: totalExpenses,
      color: "#d9534f",
      backgroundColor: "#d9534f",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Financial Summary Cards */}
      <SummaryCards
        totalBudget={totalBudget}
        totalExpenses={totalExpenses}
        remainingBalance={remainingBalance}
      />

      <Row gutter={[16, 16]}>
        <RecentTransactions recentTransactions={recentTransactions} />
        <FinancialOverview
          chartData={chartData}
          remainingBalance={remainingBalance}
        />
      </Row>
    </div>
  );
};

export default UserDashboard;
