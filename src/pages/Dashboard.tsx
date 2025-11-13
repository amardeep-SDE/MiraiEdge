import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { FaUsers, FaUserCheck, FaGlobe, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";   


interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    uniqueDomains: 0,
    totalWebsites: 0,
  });

  const [chartData, setChartData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users: User[] = res.data;

      const domains = new Set(users.map((u) => u.email.split("@")[1]));
      const websites = new Set(users.map((u) => u.website));

      const data = users.map((u) => ({
        name: u.name.split(" ")[0],
        active: Math.floor(Math.random() * 100),
        visits: Math.floor(Math.random() * 200),
      }));

      setStats({
        totalUsers: users.length,
        activeUsers: Math.floor(users.length * 0.8),
        uniqueDomains: domains.size,
        totalWebsites: websites.size,
      });

      setChartData(data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = (
    title: string,
    value: string | number,
    color: string,
    icon: React.ReactNode
  ) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="relative overflow-hidden rounded-2xl p-5 backdrop-blur-lg 
                 bg-gradient-to-br from-white/30 to-white/5 
                 dark:from-gray-800/30 dark:to-gray-900/10
                 border border-white/20 dark:border-gray-700/40 shadow group"
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl font-bold ${color}`}
          >
            {value}
          </motion.p>
        </div>

        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 
                     to-purple-500/20 text-2xl text-blue-600 dark:text-blue-400"
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-10 transition-all duration-500">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-transparent 
                      bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
          >
            Dashboard Overview
          </motion.h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Insight summary and performance metrics
          </p>
        </div>

        <div
          className="flex items-center gap-3 bg-white/40 dark:bg-gray-800/40 
                     px-4 py-2 rounded-full border border-white/20 dark:border-gray-700/40 
                     backdrop-blur-md shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col items-center gap-3"
              >
                <Skeleton width="60%" height="1rem" />
                <Skeleton width="40%" height="1.5rem" />
              </div>
            ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {renderCard("Total Users", stats.totalUsers, "text-blue-500", <FaUsers />)}
          {renderCard("Active Users", stats.activeUsers, "text-green-500", <FaUserCheck />)}
          {renderCard("Unique Domains", stats.uniqueDomains, "text-purple-500", <FaGlobe />)}
          {renderCard("Total Websites", stats.totalWebsites, "text-yellow-500", <FaChartPie />)}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LINE CHART */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 backdrop-blur-md border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
              📈 User Activity Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 backdrop-blur-md border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
              📊 Engagement Overview
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="visits" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
