/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  ClipboardList,
  FolderCog,
  Clock,
  Truck,
  Receipt,
  CreditCard,
  LineChart,
  Package,
  DollarSign,
  FileSpreadsheet,
  User,
  Menu,
  ChevronLeft,
} from "lucide-react";

import Logo from "../../assets/img/MMC-Logo.jpg";
import LogoSmall from "../../assets/img/MMC-Logo-small.jpg";

// Sidebar Items (Role-based)
const menuItems = {
  admin: [
    {
      section: "Dashboard",
      items: [
        { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
        // { name: "Reports", icon: BarChart3 },
      ],
    },
    {
      section: "Documents",
      items: [
        { name: "Quotations", icon: FileText, path: "/dashboard/quotation" },
        { name: "Production Orders", icon: ClipboardList ,path: "/dashboard/Purchase-Orders" },
      ],
    },
    {
      section: "Operations",
      items: [
        { name: "Work in Progress", icon: Clock },
        { name: "Deliveries", icon: Truck },
      ],
    },
    {
      section: "Finance",
      items: [
        { name: "Invoices", icon: Receipt },
        { name: "Payments", icon: CreditCard },
      ],
    },
    {
      section: "Reports",
      items: [
        { name: "Quotations Report", icon: LineChart },
        { name: "Delivery Report", icon: Package },
        { name: "Full Report", icon: FileSpreadsheet },
      ],
    },
  ],

  sale: [
    {
      section: "Sales",
      items: [
        { name: "Quotations", icon: FileText },
        { name: "Purchase Orders", icon: ClipboardList },
      ],
    },
    {
      section: "Operations",
      items: [{ name: "Deliveries", icon: Truck }],
    },
    {
      section: "Reports",
      items: [{ name: "Sales Report", icon: LineChart }],
    },
  ],

  associate: [
    {
      section: "Orders",
      items: [
        { name: "My Orders", icon: ClipboardList },
        { name: "Deliveries", icon: Truck },
      ],
    },
    {
      section: "Profile",
      items: [{ name: "Profile", icon: User }],
    },
  ],
};

export default function Sidebar({ role, isOpen, setIsOpen }) {
  // const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Overview");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <aside
      className={`sidebar fixed top-0 z-50 ${isOpen ? "w-64" : "w-16"
        } bg-white h-screen flex flex-col transition-all duration-300 ease-in-out border-r border-gray-200`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 ${isOpen ? "justify-between" : "justify-center"
          }`}
      >
        {isOpen ? (
          <img
            src={Logo}  // full logo when sidebar open
            alt="Logo"
            className="h-auto mx-auto transition-all duration-300"
          />
        ) : (
          <img
            src={LogoSmall}  // small/compact logo when collapsed
            alt="Logo"
            className="h-6 transition-all duration-300"
          />
        )}
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto sidebar">
        {menuItems[role]?.map((section, sIdx) => (
          <div key={sIdx} className="mb-4">
            {isOpen && (
              <h3 className="text-xs font-medium text-gray-400 mb-2 px-2">
                {section.section}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item, idx) => {
  const isActive = location.pathname === item.path;
  const isDisabled = !item.path; // check if path is not available

  return (
    <li key={idx}>
      <button
              onClick={() => !isDisabled && navigate(item.path)}
              disabled={isDisabled}
              className={`group cursor-pointer relative w-full flex items-center 
                ${isOpen ? "px-3 py-2.5 space-x-3" : "px-0 py-2.5 justify-center"}
                rounded-sm transition-all duration-200
                ${
                            isDisabled
                            ? "cursor-not-allowed disabled text-gray-400 opacity-60"
                            : isActive
                            ? "bg-blue-50 text-[#0477BF]"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <item.icon
                        size={17}
                        strokeWidth={1.5}
                        className={`transition-all duration-200 ${
                          isActive ? "text-[#0477BF] scale-110" : ""
                        } ${isDisabled ? "text-gray-400" : ""}`}
                      />
                      {isOpen && (
                        <span
                          className={`font-medium text-xs ${
                            isActive ? "text-[#0477BF]" : isDisabled ? "text-gray-400" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}

            </ul>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-gray-100">
        <div
          className={`group flex items-center ${isOpen ? "px-3 py-2 space-x-3" : "px-0 py-2 justify-center"
            } rounded-sm bg-gray-50 border border-gray-200 relative`}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-[#0477BF]" />
          </div>

          {isOpen && (
            <div>
              <p className="text-gray-900 font-medium text-sm capitalize">
                Pradeep
              </p>
              <p className="text-gray-500 text-xs">Admin</p>
            </div>
          )}

          {!isOpen && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {role} User
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
