// src/pages/ViewReport.tsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import { FiDownload, FiShare2, FiPrinter, FiArrowLeft } from 'react-icons/fi';

const ViewReport = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEnglish, setIsEnglish] = useState(true);

  // Mock data
  const reportData = {
    title: 'Blood Test Results',
    date: 'May 15, 2023',
    type: 'Blood Test',
    doctor: 'Dr. Sarah Johnson',
    
    summary: {
      english: 'Your blood test results show that most of your values are within the normal range. However, your cholesterol levels are slightly elevated, which may indicate an increased risk of heart disease. Your blood sugar levels are normal, which is good news. We recommend discussing lifestyle changes with your doctor to help manage your cholesterol levels.',
      romanUrdu: 'Aap ke blood test ke natayje mein aksar values normal range mein hain. Lekin aap ke cholesterol levels thode zyada hain, jo heart disease ke khatre ko zyada kar sakta hai. Aap ke blood sugar levels normal hain, jo achhi khabar hai. Hum aap se recommend karte hain ke aap apne doctor se lifestyle changes ke bare mein baat karein ta ke aap apne cholesterol levels ko manage kar sakein.',
    },
    
    abnormalValues: [
      {
        name: 'Total Cholesterol',
        value: '240 mg/dL',
        normalRange: 'Less than 200 mg/dL',
        status: 'High',
      },
      {
        name: 'LDL Cholesterol',
        value: '160 mg/dL',
        normalRange: 'Less than 100 mg/dL',
        status: 'High',
      },
    ],
    
    doctorQuestions: [
      {
        question: 'What lifestyle changes can help lower my cholesterol?',
        answer: 'Your doctor may recommend dietary changes, increased physical activity, and possibly medication to help lower your cholesterol levels.',
      },
      {
        question: 'How often should I get my cholesterol checked?',
        answer: 'Adults should get their cholesterol checked every 4-6 years, but more frequently if you have risk factors or high cholesterol.',
      },
    ],
    
    tips: [
      'Eat a heart-healthy diet low in saturated and trans fats',
      'Exercise regularly - aim for at least 150 minutes of moderate-intensity activity per week',
      'Maintain a healthy weight',
      'Avoid smoking and limit alcohol consumption',
      'Consider talking to your doctor about cholesterol-lowering medications',
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isAuth={true} />
      <Sidebar />

      <main className="md:ml-64 pt-16 pb-20 md:pb-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {reportData.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <span>{reportData.date}</span>
                  <span>•</span>
                  <span>{reportData.type}</span>
                  <span>•</span>
                  <span>Dr. {reportData.doctor}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <FiDownload className="mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <FiShare2 className="mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <FiPrinter className="mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - File Preview */}
            <div className="lg:w-1/2">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Report Preview
                </h2>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">PDF</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {reportData.title}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Preview not available in this demo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - AI Summary */}
            <div className="lg:w-1/2">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    AI Analysis
                  </h2>
                  <Toggle
                    enabled={isEnglish}
                    setEnabled={setIsEnglish}
                    label={isEnglish ? 'English' : 'Roman Urdu'}
                  />
                </div>

                {/* AI Summary */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">🧠</span> AI Summary
                  </h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-slate-700 dark:text-slate-300">
                    <p>{isEnglish ? reportData.summary.english : reportData.summary.romanUrdu}</p>
                  </div>
                </div>

                {/* Abnormal Values */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">⚠️</span> Abnormal Values
                  </h3>
                  <div className="space-y-3">
                    {reportData.abnormalValues.map((value, index) => (
                      <div
                        key={index}
                        className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {value.name}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              value.status === 'High'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {value.status}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>Your Value: {value.value}</span>
                            <span>Normal: {value.normalRange}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doctor Questions */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">❓</span> Questions for Your Doctor
                  </h3>
                  <div className="space-y-4">
                    {reportData.doctorQuestions.map((item, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                      >
                        <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                          {item.question}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-md font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <span className="mr-2">🍎</span> Health Tips
                  </h3>
                  <ul className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 space-y-2">
                    {reportData.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-700 dark:text-slate-300 flex items-start"
                      >
                        <span className="text-emerald-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewReport;