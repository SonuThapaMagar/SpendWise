import React, { useState, useEffect } from "react";
import { Timeline, Typography } from "antd";
import { useAdmin } from "../../context API/admin.context";

const { Text } = Typography;

const TopExpense = () => {
  const { metrics, loading } = useAdmin();
  const [topExpenses, setTopExpenses] = useState([]);
  const dotColors = ["purple", "blue", "cyan", "magenta"];

  useEffect(() => {
    if (metrics.topExpenses && metrics.topExpenses.length > 0) {
      const formattedExpenses = metrics.topExpenses.map((expense, index) => ({
        description: `Expense: ${expense.expenseName || "Uncategorized"}`,
        color: dotColors[index % dotColors.length],
        category: expense.category || "General",
      }));
      setTopExpenses(formattedExpenses);
    }
  }, [metrics.topExpenses]);

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
                    <div className="flex gap-2 items-center">
                      <Text className="text-xs text-gray-500">
                        ({expense.category})
                      </Text>
                    </div>
                    <Text className="text-xs text-gray-400">
                      {expense.time}
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