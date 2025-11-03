import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Toggle from "../components/Toggle";
import { FiArrowLeft, FiDownload, FiShare2, FiPrinter } from "react-icons/fi";

type AnalysisSections = Record<
  string,
  {
    english: string;
    urdu: string;
  }
>;

const ViewReport = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEnglish, setIsEnglish] = useState(true);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analysisSections, setAnalysisSections] = useState<AnalysisSections | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`https://health-mate-backend-zeta.vercel.app/api/viewreport/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch report");
        setReportData(data.report || data);

        if (data?.analysis) {
          const parsed = parseAnalysis(data.analysis);
          setAnalysisSections(parsed);
        } else {
          setAnalysisSections(null);
        }
        console.log("Fetched report data:", data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  // Robust parser: finds **Heading** optional ":" then its content until next **Heading** or end.
  const parseAnalysis = (analysisText: string) => {
    const sections: AnalysisSections = {};
    if (!analysisText || typeof analysisText !== "string") return sections;

    // Regex: capture headings like **Heading** (with or without trailing ':') and content (including newlines).
    const sectionRegex = /\*\*(.+?)\*\*\s*:?\s*([\s\S]*?)(?=(\*\*.+?\*\*)|$)/g;
    let match;
    let found = false;

    while ((match = sectionRegex.exec(analysisText)) !== null) {
      found = true;
      const heading = match[1].trim();
      const content = match[2].trim();
      sections[heading] = { english: "", urdu: "" };

      // Split by lines and classify each line
      const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      lines.forEach((line) => {
        if (isProbablyRomanUrdu(line)) sections[heading].urdu += line + "\n";
        else sections[heading].english += line + "\n";
      });
    }

    // If no headings found, treat entire text as a single "Analysis" section
    if (!found) {
      const heading = "Analysis";
      sections[heading] = { english: "", urdu: "" };
      const lines = analysisText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      lines.forEach((line) => {
        if (isProbablyRomanUrdu(line)) sections[heading].urdu += line + "\n";
        else sections[heading].english += line + "\n";
      });
    }

    return sections;
  };

  // Heuristic to detect Roman Urdu lines. Matches common roman-Urdu words OR Urdu script characters.
  const isProbablyRomanUrdu = (line: string) => {
    // Check for Arabic/Persian/Urdu script characters
    if (/[؀-ۿ]/.test(line)) return true;

    // Common Roman Urdu words (a small heuristic list). Case-insensitive.
    const romanWords = [
      "hain",
      "hai",
      "kya",
      "ke",
      "ki",
      "ka",
      "mein",
      "mujhe",
      "mujhay",
      "hoon",
      "hota",
      "raha",
      "rahi",
      "rahe",
      "kar",
      "karnay",
      "karti",
      "haiy",
      "se",
      "pe",
      "ap",
      "aap",
      "hain?",
      "nahi",
      "tha",
      "thi",
    ];
    const regex = new RegExp(`\\b(${romanWords.join("|")})\\b`, "i");
    return regex.test(line);
  };

  const getText = (english: string, urdu: string) => {
    if (isEnglish) {
      if (english && english.trim()) return english.trim();
      // fallback to urdu if english missing
      return urdu && urdu.trim() ? urdu.trim() : "No English analysis available for this section.";
    } else {
      if (urdu && urdu.trim()) return urdu.trim();
      return english && english.trim() ? english.trim() : "Is section ke liye Roman Urdu available nahin hai.";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-600 dark:text-slate-300">
        Loading report details...
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 dark:text-red-400">
        Report not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar isAuth={true} />
      <Sidebar />

      <main className="md:ml-64 pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {reportData.title || "Report"}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <span>{reportData.createdAt ? new Date(reportData.createdAt).toLocaleDateString() : ""}</span>
                  <span>•</span>
                  <span>{reportData.reportType}</span>
                  <span>•</span>
                  <span>AI Analyzed</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm">
                  <FiDownload /> Download
                </Button>
                <Button variant="outline" size="sm">
                  <FiShare2 /> Share
                </Button>
                <Button variant="outline" size="sm">
                  <FiPrinter /> Print
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - File Preview */}
            <div className="lg:w-[48%] w-full">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Report Preview</h2>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg h-[420px] flex items-center justify-center overflow-hidden">
                  <iframe src={reportData.reportUrl} title="Report Preview" className="w-full h-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Right side - AI Analysis */}
            <div className="lg:w-[52%] w-full">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">AI Analysis</h2>
                  <Toggle enabled={isEnglish} setEnabled={setIsEnglish} label={isEnglish ? "English" : "Roman Urdu"} />
                </div>

                <div className="space-y-4">
                  {analysisSections && Object.keys(analysisSections).length > 0 ? (
                    // Make analysis scrollable if long
                    <div className="max-h-[420px] overflow-y-auto pr-2">
                      {Object.entries(analysisSections).map(([heading, content]) => (
                        <section key={heading} className="mb-4 last:mb-0">
                          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-2">{heading}</h3>
                          <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {getText(content.english, content.urdu)}
                          </div>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">No AI analysis available.</p>
                  )}
                </div>

                <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  ⚠️{" "}
                  {getText(
                    "Always consult your doctor before making any medical decision.",
                    "Hamesha apne doctor se mashwara karein kisi bhi faislay se pehle."
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewReport;
