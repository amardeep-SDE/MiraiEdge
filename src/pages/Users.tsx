import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      await new Promise((resolve) => setTimeout(resolve, 600));
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
    setPage(1);
  }, [search, users]);

  const indexOfLast = page * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow">
          User Management
        </h2>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700
            dark:bg-gray-800 dark:text-gray-200 text-sm focus:ring-2 focus:ring-blue-500
            focus:border-transparent outline-none transition-all duration-300 shadow-sm"
          />
          <svg
            className="w-4 h-4 absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      <div
        className="
        bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl shadow-2xl 
        rounded-2xl border border-white/20 dark:border-gray-700/40 
        overflow-hidden transition-all
      "
      >
        {loading ? (
          <div className="p-4 space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b dark:border-gray-700 py-3"
                >
                  <Skeleton width="5%" height="1rem" />
                  <Skeleton width="20%" height="1rem" />
                  <Skeleton width="15%" height="1rem" />
                  <Skeleton width="25%" height="1rem" />
                  <Skeleton width="15%" height="1rem" />
                  <Skeleton width="10%" height="1rem" />
                </div>
              ))}
          </div>
        ) : error ? (
          <p className="p-6 text-center text-red-500 font-medium">{error}</p>
        ) : currentUsers.length > 0 ? (
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="min-w-[700px] lg:min-w-full w-full text-sm">
              <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 uppercase text-[11px] shadow-sm backdrop-blur-md">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Username</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Website</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`
                      transition-all duration-300 border-b dark:border-gray-800
                      ${
                        i % 2 === 0
                          ? "bg-white/70 dark:bg-gray-950/50"
                          : "bg-gray-50/70 dark:bg-gray-900/50"
                      }
                      hover:bg-blue-100 dark:hover:bg-gray-800 hover:scale-[1.01]
                    `}
                  >
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-200">
                      #{user.id}
                    </td>

                    <td className="p-4 font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {user.name}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {user.username}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {user.email}
                    </td>

                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {user.phone}
                    </td>

                    <td className="p-4 text-blue-600 dark:text-blue-400 underline cursor-pointer hover:opacity-80">
                      {user.website}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-center text-gray-500 dark:text-gray-400 font-medium">
            No users found.
          </p>
        )}
      </div>

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="flex items-center justify-center mt-6 gap-3 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm
                ${
                  page === num
                    ? "bg-blue-600 text-white scale-110 shadow-lg"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
                }
              `}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
