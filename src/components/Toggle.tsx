// src/components/Toggle.tsx
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ToggleProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  label?: string;
  className?: string;
}

const Toggle = ({ enabled, setEnabled, label, className }: ToggleProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      <button
        type="button"
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          enabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
        )}
        onClick={() => setEnabled(!enabled)}
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          initial={false}
          animate={{ x: enabled ? 20 : 4 }}
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        />
      </button>
      {label && (
        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;