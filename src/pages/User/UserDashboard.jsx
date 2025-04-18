import React,{useEffect} from "react";
import { Row } from "antd";
import SummaryCards from "../../components/SummaryCards";
import RecentTransactions from "../../components/RecentTransactions";
import FinancialOverview from "../../components/FinancialOverview";
import Last30DaysExpenses from "../../components/Last30DaysExpenses";
import ExpensesBarChart from "../../components/ExpensesBarChart";
import Last60DaysIncomeChart from "../../components/Last60DaysIncomeChart";
import RecentBudgets from "../../components/RecentBudgets";
import { useCombinedFinance } from "../../context API/CombinedFinanceContext";

const UserDashboard = () => {
  const {
    totalBudget,
    totalExpenses,
    remainingBalance,
    recentTransactions,
    last30DaysExpenses,
    last30DaysChartData,
    last60DaysBudgets,
    last60DaysIncomeChartData,
    budgets,
    expenses,
    loading,
    refreshData,
  } = useCombinedFinance();

  useEffect(() => {
    refreshData();
  }, []);

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
  if (loading) return <div>Loading dashboard data...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Financial Summary Cards */}
      <SummaryCards
        totalBudget={totalBudget}
        totalExpenses={totalExpenses}
        remainingBalance={remainingBalance}
      />

      {/* Recent Transactions and Financial Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <RecentTransactions recentTransactions={recentTransactions} />
        <FinancialOverview
          chartData={chartData}
          remainingBalance={remainingBalance}
        />
      </Row>

      {/* Last 30 Days Expenses and Bar Chart */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Last30DaysExpenses expenses={last30DaysExpenses} />
        <ExpensesBarChart chartData={last30DaysChartData} />
      </Row>

      {/* Last 60 Days Income and Recent Budgets */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Last60DaysIncomeChart chartData={last60DaysIncomeChartData} />
        <RecentBudgets budgets={last60DaysBudgets} />
      </Row>
    </div>
  );
};

export default UserDashboard;
