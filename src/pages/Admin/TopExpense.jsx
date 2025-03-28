import React, { useState, useEffect } from "react";
import { Timeline, Typography } from "antd";
import { useBudget } from "../../context API/BudgetContext";

const { Text } = Typography;

const TopExpense = () => {
  const { expenses, loading } = useBudget();
  const [topExpenses, setTopExpenses] = useState([]);

  const dotColors = ["purple", "blue", "cyan", "magenta"];

  useEffect(() => {
    if (expenses && expenses.length > 0) {
      const sortedExpenses = [...expenses]
        .sort(
          (a, b) => parseFloat(b.expenseAmount) - parseFloat(a.expenseAmount)
        )
        .slice(0, 4);

      const formattedExpenses = sortedExpenses.map((expense, index) => ({
        time: new Date(expense.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        description: `Expense: ${expense.expenseName || "Uncategorized"}`,
        amount: parseFloat(expense.expenseAmount) || 0,
        color: dotColors[index % dotColors.length],
      }));

      setTopExpenses(formattedExpenses);
    }
  }, [expenses]);

  return (
    <div className="h-full flex flex-col font-poppins">
      {/* Title */}
      <Text
        className="text-xl md:text-2xl font-semibold mb-4 block"
        style={{
          fontSize: 20,
        }}
      >
        Top Expenses
      </Text>

      {/* Loading State */}
      {loading && (
        <Text className="text-base md:text-lg text-gray-500">
          Loading expenses...
        </Text>
      )}

      {/* No Expenses State */}
      {!loading && topExpenses.length === 0 && (
        <Text className="text-base md:text-lg text-gray-500">
          No expenses found.
        </Text>
      )}

      {/* Timeline */}
      {!loading && topExpenses.length > 0 && (
        <div className="flex-1 overflow-y-auto my-4">
          <Timeline
            className="w-full"
            items={topExpenses.map((expense) => ({
              color: expense.color,
              children: (
                <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                  {/* Description */}
                  <div
                    className="flex flex-col"
                    style={{
                      paddingTop: 2,
                    }}
                  >
                    <Text
                      className="text-base md:text-lg font-medium"
                      style={{
                        fontSize: 16,
                        fontFamily: "Poppins",
                      }}
                    >
                      {expense.description}
                    </Text>
                    <Text className="text-base md:text-lg text-gray-700">
                      Rs.{expense.amount.toFixed(2)}
                    </Text>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default TopExpense;
