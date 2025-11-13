import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 120, sales: 90 },
  { month: "Feb", users: 180, sales: 140 },
  { month: "Mar", users: 220, sales: 170 },
  { month: "Apr", users: 260, sales: 210 },
  { month: "May", users: 200, sales: 150 },
];

const Reports: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Reports & Analytics
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Monthly Growth
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Recent Activity
        </h3>
        <ul className="space-y-3">
          {["New user registered", "Report generated", "Admin updated settings", "Server backup completed"].map((activity, i) => (
            <li
              key={i}
              className="text-gray-700 dark:text-gray-300 border-b pb-2 border-gray-200 dark:border-gray-700 last:border-none"
            >
              • {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
