// src/pages/Profile.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Toggle from '../components/Toggle';
import { FiUser, FiMail, FiLock, FiCamera, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../hooks/useTheme';

const Profile = () => {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isAuth={true} />
      <Sidebar />

      <main className="md:ml-64 pt-16 pb-20 md:pb-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage your account settings and preferences.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white dark:border-slate-800">
                  <FiCamera className="text-white text-sm" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {name}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">{email}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      icon={<FiUser />}
                      label="Full Name"
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<FiMail />}
                      label="Email Address"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      icon={<FiLock />}
                      label="Current Password"
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      icon={<FiLock />}
                      label="New Password"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      icon={<FiLock />}
                      label="Confirm New Password"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Preferences
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center">
                      {theme === 'light' ? (
                        <FiSun className="text-amber-500 mr-3 text-xl" />
                      ) : (
                        <FiMoon className="text-indigo-400 mr-3 text-xl" />
                      )}
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          Dark Mode
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {theme === 'light' ? 'Currently off' : 'Currently on'}
                        </p>
                      </div>
                    </div>
                    <Toggle
                      enabled={theme === 'dark'}
                      setEnabled={toggleTheme}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    loading={isSaving}
                  >
                    {isSaving ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </form>

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800"
              >
                <p className="text-emerald-700 dark:text-emerald-400 text-center">
                  Your profile has been updated successfully!
                </p>
              </motion.div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Danger Zone
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Delete Account
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="danger" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;