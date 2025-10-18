// src/pages/Landing.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { FiCheck, FiShield, FiGlobe, FiUser } from 'react-icons/fi';

const Landing = () => {
  const features = [
    {
      icon: FiCheck,
      title: 'AI Summary',
      description: 'Get instant, easy-to-understand summaries of your medical reports.',
    },
    {
      icon: FiGlobe,
      title: 'Bilingual Reports',
      description: 'View reports in both English and Roman Urdu for better understanding.',
    },
    {
      icon: FiUser,
      title: 'Doctor Questions',
      description: 'Automatically generate questions to ask your doctor based on your reports.',
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and kept completely confidential.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Understand Your Health Reports <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Smarter</span> with AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Upload your medical reports and get instant AI-powered summaries, insights, and questions for your doctor in both English and Roman Urdu.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto px-8 py-4">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4">
                  Login
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Powerful Features for Your Health
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Our AI-powered platform makes understanding your medical reports easier than ever.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 p-4 dark:bg-slate-800 rounded-xl p-10 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 h-full flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <feature.icon className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
            >
              Ready to Take Control of Your Health?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of users who are already using MediAI to understand their health reports better.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8 py-4">
                  Sign Up for Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3 mb-4 ">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-white p-3">MediAI</span>
              </div>
              <p className="text-sm text-center md:text-left max-w-xs">
                Making health reports understandable for everyone.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            © {new Date().getFullYear()} MediAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;