// src/pages/Dashboard.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ReportCard from '../components/ReportCard';
import Button from '../components/Button';
import { FiPlus, FiActivity, FiBarChart2, FiClock } from 'react-icons/fi';

const Dashboard = () => {
  const [reports, setReports] = useState([
    {
      id: '1',
      title: 'Blood Test Results',
      date: 'May 15, 2023',
      type: 'Blood Test',
      status: 'analyzed' as const,
    },
    {
      id: '2',
      title: 'Chest X-Ray',
      date: 'Apr 28, 2023',
      type: 'Radiology',
      status: 'analyzed' as const,
    },
    {
      id: '3',
      title: 'ECG Report',
      date: 'Apr 10, 2023',
      type: 'Cardiology',
      status: 'pending' as const,
    },
    {
      id: '4',
      title: 'Complete Blood Count',
      date: 'Mar 22, 2023',
      type: 'Blood Test',
      status: 'analyzed' as const,
    },
  ]);

  const stats = [
    {
      title: 'Total Reports',
      value: '12',
      icon: FiBarChart2,
      color: 'bg-blue-500',
    },
    {
      title: 'Recent Uploads',
      value: '3',
      icon: FiPlus,
      color: 'bg-emerald-500',
    },
    {
      title: 'Pending Analysis',
      value: '1',
      icon: FiClock,
      color: 'bg-amber-500',
    },
    {
      title: 'Vital Entries',
      value: '8',
      icon: FiActivity,
      color: 'bg-violet-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isAuth={true} />
      <Sidebar />

      <main className="md:ml-64 pt-16 pb-20 md:pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Welcome back! Here's an overview of your health reports.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mr-4`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Reports Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Recent Reports
              </h2>
              <Link to="/upload">
                <Button size="sm">
                  <FiPlus className="mr-2" />
                  Upload New
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <ReportCard {...report} />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/reports"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                View All Reports
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/upload">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                    <FiPlus className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                    Upload Report
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Add a new medical report
                  </p>
                </div>
              </Link>
              <Link to="/vitals">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-3">
                    <FiActivity className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                    Add Vitals
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Record your vital signs
                  </p>
                </div>
              </Link>
              <Link to="/timeline">
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-3">
                    <FiClock className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                    View Timeline
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    See your health history
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <Link
        to="/upload"
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 flex items-center justify-center shadow-lg z-30"
      >
        <FiPlus className="text-white text-2xl" />
      </Link>
    </div>
  );
};

export default Dashboard;