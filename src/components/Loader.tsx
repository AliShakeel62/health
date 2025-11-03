// src/components/Loader.tsx
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Loader = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={cn('border-4 border-blue-200 rounded-full', sizeClasses[size])}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full border-t-4 border-blue-600 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default Loader;