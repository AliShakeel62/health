// src/pages/Signup.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mt-8 glass rounded-2xl p-7 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Join MediAI to understand your health reports
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<FiUser />}
                  required
                  className='my-2'

                />
                
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<FiMail />}
                  required
                  className='my-2'
                  
                />
                
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<FiLock />}
                    required
                    className='my-2'
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<FiLock />}
                    required
                    className='my-2'
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>

                <div className="flex items-start py-2">
                  <label className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600 mt-0.5"
                      required
                      
                    />
                    <span className="ml-2">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  loading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;