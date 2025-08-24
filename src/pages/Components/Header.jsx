// components/Header.jsx
import React, { useRef, useEffect, useState } from "react";
import { Search, Bell, User, LogOut, Command, PanelLeftClose, ChevronLeft, Menu, PanelLeftOpen, BellRing, OctagonAlert } from "lucide-react";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";


export default function Header({ isOpen, setIsOpen }) {
    const searchRef = useRef(null);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const menuRef = useRef(null);
    const notifRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
        if (notifRef.current && !notifRef.current.contains(event.target)) {
            setNotifOpen(false);
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    // Ctrl + K to focus search
    useEffect(() => {
        const handleKey = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <header className={`flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white fixed top-0 z-50 transition-all duration-300 ease-in-out ${isOpen ? "left-64 w-[calc(100%-16rem)]" : "left-16 w-[calc(100%-4rem)]"
            }`}
        >
            {/* Search */}
            <div className="flex items-center space-x-2 flex-1 max-w-md">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-sm cursor-pointer hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all duration-200 flex-shrink-0"
                >
                    {isOpen ? <PanelLeftClose size={24} strokeWidth={1.3} /> : <PanelLeftOpen size={24} strokeWidth={1.3} />}
                </button>
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-20 py-2 rounded-sm text-[14px] bg-gray-50 border border-gray-100 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#0477BF] focus:outline-none"
                    />

                    {/* Ctrl + K badge (properly centered & aligned) */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-3 my-auto flex items-center"
                    >
                        <span className="inline-flex  items-center justify-center text-[11px] leading-none text-gray-500">
                            <Command className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="text-sm ml-1 leading-none text-gray-500">+</span>
                        <span className="inline-flex text-mono  min-w-[1.25rem] items-center justify-center  px-1.5 font-mono text-[16px] leading-none text-gray-500">
                            K
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="p-2 rounded-full hover:bg-gray-100 relative cursor-pointer"
                    >
                        <Bell size={22} strokeWidth={1.5}/>
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                            3
                        </span>
                    </button>
                    {notifOpen && (
                        <div className="absolute right-0 mt-2 w-96 border border-gray-200 bg-white shadow-lg rounded-sm overflow-hidden z-50">
                            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
                                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                                <button className="text-xs text-gray-800 hover:cursor-pointer">Mark all as read</button>
                            </div>

                            {/* Notification Item */}
                            <div className="p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50">
                                <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-green-50 text-green-600 border border-green-100">
                                    <BellRing strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">New order received</p>
                                    <p className="text-xs text-gray-500">Order #1234 from John Doe</p>
                                    <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
                                </div>
                            </div>

                            {/* Notification Item */}
                            <div className="p-4 flex items-start gap-3 border-t border-gray-200 cursor-pointer hover:bg-gray-50">
                                <div className="w-10 h-10 flex items-center justify-center rounded-sm bg-yellow-50 text-yellow-600 border border-yellow-100">
                                    <OctagonAlert strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">Low stock alert</p>
                                    <p className="text-xs text-gray-500">Product: Wireless Mouse (5 left)</p>
                                    <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                                </div>
                            </div>

                            {/* View All Footer */}
                            <div className="px-4 py-2 text-center border-t border-gray-200">
                                <button className="text-sm text-gray-600 hover:cursor-pointer decoration-none">View all notifications</button>
                            </div>
                        </div>

                    )}
                </div>

                {/* User Panel */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setUserOpen(!userOpen)}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#0477BF] flex items-center justify-center text-white">
                            <User size={18} />
                        </div>
                    </button>
                    {userOpen && (
                        <div className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-sm overflow-hidden z-50 border border-gray-100">
                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                                <User className="w-4 h-4 mr-2 text-gray-600" />
                                Profile
                            </a>
                            <a
                                href="#"
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                            >
                                <Settings className="w-4 h-4 mr-2 text-gray-600" />
                                Settings
                            </a>
                            <Link
                                to="/"
                                className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
