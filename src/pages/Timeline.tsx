// src/pages/Timeline.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Timeline from '../components/Timeline';
import Button from '../components/Button';
import {  FiCalendar, FiArrowLeft } from 'react-icons/fi';

const TimelinePage = () => {
  const [filter, setFilter] = useState('all');
  
  const timelineItems = [
    {
      id: '1',
      title: 'Blood Test Results',
      date: 'May 15, 2023',
      type: 'report' as const,
      description: 'Cholesterol levels slightly elevated. Overall good health.',
    },
    {
      id: '2',
      title: 'Vitals Recorded',
      date: 'May 10, 2023',
      type: 'vitals' as const,
      description: 'BP: 120/80, Pulse: 72, Weight: 70kg',
    },
    {
      id: '3',
      title: 'Chest X-Ray',
      date: 'Apr 28, 2023',
      type: 'report' as const,
      description: 'Normal chest X-ray with no abnormalities detected.',
    },
    {
      id: '4',
      title: 'Vitals Recorded',
      date: 'Apr 25, 2023',
      type: 'vitals' as const,
      description: 'BP: 118/78, Pulse: 70, Weight: 69.5kg',
    },
    {
      id: '5',
      title: 'ECG Report',
      date: 'Apr 10, 2023',
      type: 'report' as const,
      description: 'Normal sinus rhythm. No signs of cardiac abnormalities.',
    },
    {
      id: '6',
      title: 'Vitals Recorded',
      date: 'Apr 5, 2023',
      type: 'vitals' as const,
      description: 'BP: 122/82, Pulse: 75, Weight: 71kg',
    },
    {
      id: '7',
      title: 'Complete Blood Count',
      date: 'Mar 22, 2023',
      type: 'report' as const,
      description: 'All values within normal range. Good overall health.',
    },
  ];

  const filteredItems = filter === 'all' 
    ? timelineItems 
    : timelineItems.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isAuth={true} />
      <Sidebar />

      <main className="md:ml-64 pt-16 pb-20 md:pb-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Health Timeline
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              View your medical reports and vital signs in chronological order.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 md:mb-0">
                Your Health History
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'report' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('report')}
                >
                  Reports
                </Button>
                <Button
                  variant={filter === 'vitals' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('vitals')}
                >
                  Vitals
                </Button>
                <Button variant="outline" size="sm">
                  <FiCalendar className="mr-2" />
                  Date Range
                </Button>
              </div>
            </div>

            <Timeline items={filteredItems} />
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Health Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                  Blood Pressure Trend
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Your blood pressure has been stable within the normal range over the past 3 months.
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                  Weight Management
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  You've maintained a healthy weight with minimal fluctuation over the past 3 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimelinePage;