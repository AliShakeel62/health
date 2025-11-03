// src/pages/UploadReport.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import UploadBox from '../components/UploadBox';
import Button from '../components/Button';
import Input from '../components/Input';
import { FiCheck, FiArrowLeft } from 'react-icons/fi';

const UploadReport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [reportType, setReportType] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const reportTypes = [
    'Blood Test',
    'X-Ray',
    'MRI',
    'CT Scan',
    'Ultrasound',
    'ECG',
    'Pathology Report',
    'Other',
  ];

  const handleFileUpload = (selectedFile: File) => {
    setFile(selectedFile);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!file || !reportType) {
    alert("Please select a file and report type");
    return;
  }

  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, or PDF files are allowed");
    return;
  }

  setIsUploading(true);
  setUploadProgress(0);

  try {
    // 1️⃣ Upload file to Cloudinary first
    const cloudForm = new FormData();
    cloudForm.append("file", file);
    cloudForm.append("upload_preset", "unsigned_upload"); // ⚠️ Replace with your Cloudinary preset name

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/duxpmcpw0/auto/upload`, // ⚠️ Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: cloudForm,
      }
    );

    const cloudData = await cloudRes.json(); // ✅ define here

    if (!cloudData.secure_url) {
      console.error("Cloudinary upload failed:", cloudData);
      alert("Cloudinary upload failed!");
      setIsUploading(false);
      return;
    }

    // 2️⃣ Now send the Cloudinary URL to your backend
    const formData = new FormData();
    formData.append("fileUrl", cloudData.secure_url); // ✅ now defined properly
    formData.append("reportType", reportType);

    const token = localStorage.getItem("token");

   const response = await fetch(
  "https://health-mate-backend-zeta.vercel.app/api/image/upload",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileUrl: cloudData.secure_url,
      reportType,
    }),
  }
);


    const data = await response.json();

    if (!response.ok) {
      setIsUploading(false);
      alert(data.message || "Upload failed");
      return;
    }

    console.log("✅ Upload Success:", data);

    setUploadProgress(100);

    // 🔥 Optional AI Analysis Call
    setTimeout(async () => {
      setIsUploading(false);
      setIsSuccess(true);

      const aiResponse = await fetch(
        "https://health-mate-backend-zeta.vercel.app/api/report/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reportId: data.reportId }),
        }
      );

      const aiData = await aiResponse.json();
      console.log("🤖 AI Result:", aiData);

      setTimeout(() => {
        navigate(`/viewreport/${data.reportId}`);
      }, 1000);
    }, 500);
  } catch (error) {
    console.error("Upload error:", error);
    setIsUploading(false);
    alert("Server Error");
  }
};


  const resetForm = () => {
    setFile(null);
    setReportType('');
    setUploadProgress(0);
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
              Upload Medical Report
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Upload your medical report to get an AI-powered summary and insights.
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
                  <FiCheck className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Upload Successful!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Your report has been uploaded and is being processed. You'll receive a notification when the analysis is complete.
                </p>
                <Button onClick={resetForm}>Upload Another Report</Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Select Report File
                  </h2>
                  <UploadBox onFileUpload={handleFileUpload} />
                </div>

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Report Type
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {reportTypes.map((type) => (
                      <motion.button
                        key={type}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          reportType === type
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                        }`}
                        onClick={() => setReportType(type)}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {isUploading && (
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300 mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <motion.div
                        className="bg-blue-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isUploading || !file || !reportType}
                    loading={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Analyze with AI'}
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

export default UploadReport;