import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/doctor-dashboard" },
  { name: "Patients", path: "/patients" },
  { name: "Reports", path: "/reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-md fixed top-0 left-0 pt-20 px-4">
      <ul className="space-y-4">
        {links.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `block p-3 rounded hover:bg-gray-100 ${
                  isActive ? "bg-indigo-100 font-semibold" : ""
                }`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}