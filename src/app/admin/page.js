"use client";

import { useState, useEffect, useMemo } from "react";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterEducation, setFilterEducation] = useState("");
  const [filterWorks, setFilterWorks] = useState("");

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      fetch("/api/users")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // latest users first
            setUsers(
              data.users.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              )
            );
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery) ||
        u.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEducation = filterEducation
        ? u.education === filterEducation
        : true;
      const matchesWorks =
        filterWorks ? (filterWorks === "Yes" ? u.works : !u.works) : true;

      return matchesSearch && matchesEducation && matchesWorks;
    });
  }, [users, searchQuery, filterEducation, filterWorks]);

  // Analytics calculations
  const totalUsers = users.length;
  const workingUsers = users.filter((u) => u.works).length;
  const studyingUsers = users.filter((u) => ["Bachelor", "Master", "PhD"].includes(u.education)).length;
  const worksInField = users.filter((u) => u.worksInField).length;
  
  const percentWorking = totalUsers ? ((workingUsers / totalUsers) * 100).toFixed(1) : 0;
  const percentStudying = totalUsers ? ((studyingUsers / totalUsers) * 100).toFixed(1) : 0;
  const percentWorksInField = totalUsers ? ((worksInField / totalUsers) * 100).toFixed(1) : 0;

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-200">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Admin Login
          </h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <AnalyticsCard title="Total Users" value={totalUsers} percent={100} color="bg-gray-500" />
        <AnalyticsCard title="Working Users" value={workingUsers} percent={percentWorking} color="bg-green-500" />
        <AnalyticsCard title="Studying Users" value={studyingUsers} percent={percentStudying} color="bg-yellow-500" />
        <AnalyticsCard title="Works In Field" value={worksInField} percent={percentWorksInField} color="bg-purple-500" />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name, phone, or state"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 text-black"
        />
        <select
          value={filterEducation}
          onChange={(e) => setFilterEducation(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="">All Education Levels</option>
          {["Primary", "Secondary", "Bachelor", "Master", "PhD"].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <select
          value={filterWorks}
          onChange={(e) => setFilterWorks(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="">All Work Status</option>
          <option value="Yes">Works</option>
          <option value="No">Doesn't Work</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-black">Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">State</th>
                <th className="p-3 border">Education</th>
                <th className="p-3 border">Faculty</th>
                <th className="p-3 border">Works</th>
                <th className="p-3 border">Field</th>
                <th className="p-3 border">Salary</th>
                <th className="p-3 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className={i % 2 === 0 ? "bg-white hover:bg-gray-100 transition" : "bg-gray-50 hover:bg-gray-100 transition"}
                >
                  <td className="p-2 border text-black">{u.fullName}</td>
                  <td className="p-2 border text-black">{u.phone}</td>
                  <td className="p-2 border text-black">{u.state}</td>
                  <td className="p-2 border text-black">{u.education}</td>
                  <td className="p-2 border text-black">{u.faculty || <span className="text-red-600 font-bold">❌</span>}</td>
                  <td className="p-2 border text-black">{u.works ? "Yes" : "No"}</td>
                  <td className="p-2 border text-black">{u.worksInField === null ? <span className="text-red-600 font-bold">❌</span> : u.worksInField ? "Yes" : "No"}</td>
                  <td className="p-2 border text-black">{u.salary || <span className="text-red-600 font-bold">❌</span>}</td>
                  <td className="p-2 border text-black">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-4 text-center text-black">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

// Analytics Card Component
function AnalyticsCard({ title, value, percent, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold mb-2 text-black">{title}</h3>
      <p className="text-3xl font-bold text-black mb-2">{value}</p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${color} h-4 rounded-full`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm mt-1 text-black">{percent}%</p>
    </div>
  );

}