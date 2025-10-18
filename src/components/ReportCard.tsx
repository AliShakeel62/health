// src/components/ReportCard.tsx
import { motion } from 'framer-motion';
import { FiFile, FiCalendar, FiEye, FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface ReportCardProps {
  id: string;
  title: string;
  date: string;
  type: string;
  status: 'analyzed' | 'pending' | 'uploaded';
}

const ReportCard = ({ id, title, date, type, status }: ReportCardProps) => {
  const statusColors = {
    analyzed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    uploaded: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  };

  const statusText = {
    analyzed: 'Analyzed',
    pending: 'Processing',
    uploaded: 'Uploaded',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3">
              <FiFile className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px]">
                {title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{type}</p>
            </div>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
          >
            {statusText[status]}
          </span>
        </div>

        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <FiCalendar className="mr-2" />
          <span>{date}</span>
        </div>

        <div className="flex justify-between">
          <Link
            to={`/report/${id}`}
            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <FiEye className="mr-1" />
            View Report
          </Link>
          <button className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200">
            <FiDownload className="mr-1" />
            Download
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;