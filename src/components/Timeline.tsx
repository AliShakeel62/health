// src/components/Timeline.tsx
import { motion } from 'framer-motion';
import { FiFile, FiActivity, FiCalendar } from 'react-icons/fi';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  type: 'report' | 'vitals';
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-10"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-2 top-2 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                item.type === 'report'
                  ? 'bg-blue-500'
                  : 'bg-emerald-500'
              }`}
            ></div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {item.type === 'report' ? (
                    <FiFile className="text-blue-500 mr-2" />
                  ) : (
                    <FiActivity className="text-emerald-500 mr-2" />
                  )}
                  <h3 className="font-medium text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <FiCalendar className="mr-1" />
                  <span>{item.date}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;