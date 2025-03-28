import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const UserRetention = () => {
  const [registrationData, setRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        const users = response.data;

        // Process data to group by month
        const monthlyCounts = users.reduce((acc, user) => {
          // Use current date if createdAt doesn't exist
          const date = user.createdAt ? new Date(user.createdAt) : new Date();
          const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          acc[monthYear] = (acc[monthYear] || 0) + 1;
          return acc;
        }, {});

        // Format for chart
        const chartData = Object.entries(monthlyCounts).map(([monthYear, count]) => {
          const [year, month] = monthYear.split('-');
          return {
            name: new Date(year, month-1).toLocaleString('default', { 
              month: 'short', 
              year: '2-digit' 
            }),
            users: count
          };
        }).sort((a, b) => new Date(a.name) - new Date(b.name));

        setRegistrationData(chartData);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Monthly User Registrations
      </h3>
      <div style={{ width: '100%', height: '350px' }}>
        {registrationData.length > 0 ? (
          <ResponsiveContainer>
            <BarChart
              data={registrationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} users`, 'Registrations']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Bar 
                dataKey="users" 
                name="New Users" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No registration data available
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRetention;