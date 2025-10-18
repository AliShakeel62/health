// // src/components/Navbar.tsx
// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiMenu, FiX, FiUser, FiMoon, FiSun, FiSearch, FiBell } from 'react-icons/fi';
// import { useTheme } from '../hooks/useTheme';

// interface NavbarProps {
//   isAuth?: boolean;
// }

// const Navbar = ({ isAuth = false }: NavbarProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const { theme, toggleTheme } = useTheme();

//   const navLinks = isAuth
//     ? [
//         { name: 'Dashboard', path: '/dashboard' },
//         { name: 'Timeline', path: '/timeline' },
//         { name: 'Profile', path: '/profile' },
//       ]
//     : [
//         { name: 'Home', path: '/' },
//         { name: 'Features', path: '/#features' },
//         { name: 'About', path: '/#about' },
//       ];

//   return (
//     <motion.nav
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//       className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-3 gap-4">
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
//               <span className="text-white font-bold text-xl">M</span>
//             </div>
//             <span className="text-xl font-bold text-slate-900 dark:text-white">MediAI</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`font-medium transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
//                   location.pathname === link.path
//                     ? 'text-blue-600 dark:text-blue-400'
//                     : 'text-slate-600 dark:text-slate-300'
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right side actions */}
//           <div className="flex items-center space-x-4">
//             {isAuth ? (
//               <>
//                 <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
//                   <FiSearch className="text-slate-600 dark:text-slate-300" />
//                 </button>
//                 <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
//                   <FiBell className="text-slate-600 dark:text-slate-300" />
//                   <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
//                 </button>
//                 <button
//                   onClick={toggleTheme}
//                   className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   {theme === 'light' ? (
//                     <FiMoon className="text-slate-600 dark:text-slate-300" />
//                   ) : (
//                     <FiSun className="text-slate-600 dark:text-slate-300" />
//                   )}
//                 </button>
//                 <div className="hidden md:flex items-center space-x-3 cursor-pointer">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
//                     <FiUser className="text-white text-sm" />
//                   </div>
//                   <span className="text-sm font-medium text-slate-700 dark:text-slate-300">John Doe</span>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={toggleTheme}
//                   className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   {theme === 'light' ? (
//                     <FiMoon className="text-slate-600 dark:text-slate-300" />
//                   ) : (
//                     <FiSun className="text-slate-600 dark:text-slate-300" />
//                   )}
//                 </button>
//                 <Link
//                   to="/login"
//                   className="hidden md:block px-5 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="hidden md:block px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90 transition-opacity"
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}

//             {/* Mobile menu button */}
//             <button
//               className="md:hidden p-2 rounded-lg"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {isOpen ? (
//                 <FiX className="text-slate-600 dark:text-slate-300 text-xl" />
//               ) : (
//                 <FiMenu className="text-slate-600 dark:text-slate-300 text-xl" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
//         >
//           <div className="container mx-auto px-4 py-6 flex flex-col space-y-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`font-medium text-lg transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
//                   location.pathname === link.path
//                     ? 'text-blue-600 dark:text-blue-400'
//                     : 'text-slate-600 dark:text-slate-300'
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             {!isAuth && (
//               <>
//                 <Link
//                   to="/login"
//                   className="font-medium text-lg text-slate-600 dark:text-slate-300"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="font-medium text-lg text-blue-600 dark:text-blue-400"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// };

// export default Navbar;
// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiMoon, FiSun, FiSearch, FiBell } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  isAuth?: boolean;
}

const Navbar = ({ isAuth = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = isAuth
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Timeline', path: '/timeline' },
        { name: 'Profile', path: '/profile' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Features', path: '/#features' },
        { name: 'About', path: '/#about' },
      ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl md:text-2xl">M</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-wide">
              MediAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium p-4  text-base transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            {isAuth ? (
              <>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <FiSearch className="text-slate-600 dark:text-slate-300 text-lg" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                  <FiBell className="text-slate-600 dark:text-slate-300 text-lg" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'light' ? (
                    <FiMoon className="text-slate-600 dark:text-slate-300 text-lg" />
                  ) : (
                    <FiSun className="text-slate-600 dark:text-slate-300 text-lg" />
                  )}
                </button>
                <div className="hidden md:flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                    <FiUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-slate-700 dark:text-slate-300">
                    John Doe
                  </span>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'light' ? (
                    <FiMoon className="text-slate-600 dark:text-slate-300 text-lg" />
                  ) : (
                    <FiSun className="text-slate-600 dark:text-slate-300 text-lg" />
                  )}
                </button>
                <Link
                  to="/login"
                  className="hidden md:block px-5 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="hidden p-4 md:block px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FiX className="text-slate-600 dark:text-slate-300 text-2xl" />
              ) : (
                <FiMenu className="text-slate-600 dark:text-slate-300 text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="container mx-auto px-6 py-6 flex flex-col space-y-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-base sm:text-lg transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                  location.pathname === link.path
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isAuth && (
              <>
                <Link
                  to="/login"
                  className="font-medium text-base text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="font-medium text-base text-white bg-gradient-to-r from-blue-500 to-emerald-500 py-2 rounded-lg text-center hover:opacity-90 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
