import React, { useState } from "react";
import { Card, Button, Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useBudget } from "../../context API/BudgetContext";
import * as XLSX from "xlsx";

const ExpenseCharts = () => {
  const { expenses, loading } = useBudget();
  const [selectedMonth, setSelectedMonth] = useState("All");

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  const months = ["All", ...Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  })];

  const filteredExpenses = selectedMonth === "All"
    ? safeExpenses
    : safeExpenses.filter((exp) => {
        const expDate = new Date(exp.date);
        const monthYear = expDate.toLocaleString("default", { month: "long", year: "numeric" });
        return monthYear === selectedMonth;
      });

  const expensesByMonth = safeExpenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString("default", { month: "long", year: "numeric" });
    acc[month] = (acc[month] || 0) + parseFloat(exp.expenseAmount || 0);
    return acc;
  }, {});

  const barChartData = Object.keys(expensesByMonth).map((month) => ({
    month,
    amount: expensesByMonth[month],
  }));

  const expensesByCategory = filteredExpenses.reduce((acc, exp) => {
    const category = exp.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + parseFloat(exp.expenseAmount || 0);
    return acc;
  }, {});

  const pieChartData = Object.keys(expensesByCategory).map((category) => ({
    name: category,
    value: expensesByCategory[category],
  }));

  const COLORS = ["#4bc0c0", "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeead"];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(safeExpenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "expenses_report.xlsx");
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <Card className="mb-6 shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <h3 className="text-lg font-semibold">Expense Overview</h3>
          <div className="flex gap-4">
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              className="w-40"
              options={months.map((month) => ({ label: month, value: month }))}
            />
            <Button
              type="primary"
              onClick={downloadExcel}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Download Excel
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <BarChart
              width={400}
              height={300}
              data={barChartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              className="w-full min-w-[200px]"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4bc0c0" />
            </BarChart>
          </div>
          <div className="w-full md:w-1/2">
            <PieChart width={400} height={300} className="w-full min-w-[200px]">
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExpenseCharts;