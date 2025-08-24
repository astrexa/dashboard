/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import { Outlet } from "react-router-dom";



function Dashboard() {
  
  const [isOpen, setIsOpen] = useState(() => {
    // read from localStorage when component mounts
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);


  const [role, setRole] = useState("admin"); // admin | sale | associate
  return (
    <div className="flex h-dvh">
      <Sidebar role={role} isOpen={isOpen}  />
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? "pl-64" : "pl-16"
        }`}>
        <Header className="h-16 bg-white sticky  top-0 z-50"  isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-6 pt-20 bg-gray-50 overflow-x-hidden">
          <Outlet isOpen={isOpen}/>
        </main>
      </div>
    </div>

  );
}

export default Dashboard