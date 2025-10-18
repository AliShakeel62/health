// src/pages/AddVitals.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import { FaWeight } from 'react-icons/fa';
import { FiHeart, FiActivity, FiClock, FiArrowLeft } from 'react-icons/fi';

const AddVitals = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [sugar, setSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1500);
  };

  const resetForm = () => {
    setSystolic('');
    setDiastolic('');
    setPulse('');
    setSugar('');
    setWeight('');
    setHeight('');
    setNotes('');
    setIsSuccess(false);
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
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Add Vitals
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Record your vital signs to track your health over time.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                  <FiActivity className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Vitals Saved Successfully!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Your vital signs have been recorded and added to your health timeline.
                </p>
                <Button onClick={resetForm}>Add More Vitals</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Blood Pressure
                    </h3>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        placeholder="Systolic (e.g., 120)"
                        value={systolic}
                        onChange={(e) => setSystolic(e.target.value)}
                        icon={<FiActivity />}
                        label="Systolic"
                      />
                      <Input
                        type="number"
                        placeholder="Diastolic (e.g., 80)"
                        value={diastolic}
                        onChange={(e) => setDiastolic(e.target.value)}
                        icon={<FiActivity />}
                        label="Diastolic"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Heart Rate
                    </h3>
                    <Input
                      type="number"
                      placeholder="Beats per minute (e.g., 72)"
                      value={pulse}
                      onChange={(e) => setPulse(e.target.value)}
                      icon={<FiHeart />}
                      label="Pulse"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Blood Sugar
                    </h3>
                    <Input
                      type="number"
                      placeholder="mg/dL (e.g., 100)"
                      value={sugar}
                      onChange={(e) => setSugar(e.target.value)}
                      icon={<FiActivity />}
                      label="Blood Sugar Level"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Body Measurements
                    </h3>
                    <div className="space-y-4">
                      <Input
                        type="number"
                        placeholder="kg (e.g., 70)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        icon={<FaWeight />}
                        label="Weight"
                      />
                      <Input
                        type="number"
                        placeholder="cm (e.g., 175)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        icon={<FaWeight />}
                        label="Height"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Additional Notes
                  </h3>
                  <textarea
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-blue-500"
                    rows={4}
                    placeholder="Add any additional notes about how you're feeling or any symptoms..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    loading={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Vitals'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddVitals;