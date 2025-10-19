// src/components/Sidebar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiUpload,
  FiFileText,
  FiClock,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
    { name: 'Upload Report', icon: FiUpload, path: '/upload' },
    { name: 'Reports', icon: FiFileText, path: '/report' },
    { name: 'Timeline', icon: FiClock, path: '/timeline' },
    { name: 'Profile', icon: FiUser, path: '/profile' },
  ];

  return (
    <>
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 z-40">
        <div className="flex justify-around py-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <item.icon className="text-xl mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden md:flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 fixed left-0 top-0 z-30 pt-16"
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700 shadow-md"
        >
          {isCollapsed ? (
            <FiMenu className="text-slate-600 dark:text-slate-300" />
          ) : (
            <FiX className="text-slate-600 dark:text-slate-300" />
          )}
        </button>

        <div className="flex-1 overflow-y-auto py-6">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="text-xl flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 font-medium truncate">{item.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-700">
          <button className="flex items-center w-full px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <FiLogOut className="text-xl flex-shrink-0" />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;