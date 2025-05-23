import React from 'react';
import CircularProgress from './CircularProgress';
import { CheckCircle, XCircle, Star, Tag } from 'lucide-react';

export default function AnalysisResults({ results, analyzed, jobDescription }) {
  if (!analyzed) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 italic">
        Upload and analyze your resume to see insights here.
      </div>
    );
  }

  const strengths = results.analysis?.strengths || [];
  const improvements = results.analysis?.improvements || [];
  const keywords = results.analysis?.keywords || { present: [], missing: [] };

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">

      {/* Resume Score Card */}
      <section
        aria-label="Resume score"
        className="bg-white dark:bg-gray-900 border border-blue-400 dark:border-blue-500 rounded-2xl shadow-md p-4 text-center"
      >
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-400 flex items-center justify-center gap-2">
          <Star className="w-5 h-5" /> Resume Score
        </h3>
        <CircularProgress score={Math.round(results.analysis?.score || 0)} />
      </section>

      {/* Strengths & Improvements side-by-side on medium+ screens */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Strengths */}
        <section
          aria-label="Strengths"
          className="flex-1 bg-white dark:bg-gray-900 border border-green-400 dark:border-green-500 rounded-2xl shadow-md p-4"
        >
          <h3 className="text-base font-semibold mb-2 text-green-700 dark:text-green-400 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Strengths
          </h3>
          {strengths.length === 0 ? (
            <p className="italic text-gray-500 dark:text-gray-400 text-sm">No specific strengths found.</p>
          ) : (
            <ul className="list-disc list-inside text-green-800 dark:text-green-300 space-y-0.5 text-sm">
              {strengths.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-green-100 dark:hover:bg-green-900 rounded px-1 py-0.5 transition-colors cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Improvements */}
        <section
          aria-label="Areas for improvement"
          className="flex-1 bg-white dark:bg-gray-900 border border-red-400 dark:border-red-500 rounded-2xl shadow-md p-4"
        >
          <h3 className="text-base font-semibold mb-2 text-red-700 dark:text-red-400 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Areas for Improvement
          </h3>
          {improvements.length === 0 ? (
            <p className="italic text-gray-500 dark:text-gray-400 text-sm">No specific improvement points found.</p>
          ) : (
            <ul className="list-disc list-inside text-red-800 dark:text-red-300 space-y-0.5 text-sm">
              {improvements.map((item, idx) => (
                <li
                  key={idx}
                  className="hover:bg-red-100 dark:hover:bg-red-900 rounded px-1 py-0.5 transition-colors cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Keyword Comparison */}
      {jobDescription && (
        <section
          aria-label="Keyword comparison"
          className="bg-white dark:bg-gray-900 border border-yellow-400 dark:border-yellow-500 rounded-2xl shadow-md p-4"
        >
          <h3 className="text-base font-semibold mb-4 text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
            <Tag className="w-5 h-5" /> Keyword Comparison
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Present Keywords */}
            <div>
              <h4 className="font-medium mb-2 text-green-600 dark:text-green-300 flex items-center gap-1 text-sm">
                <CheckCircle className="w-4 h-4" /> Keywords Present
              </h4>
              {keywords.present.length === 0 ? (
                <p className="italic text-gray-500 dark:text-gray-400 text-sm">No keywords from job description found.</p>
              ) : (
                <ul className="list-disc list-inside text-green-700 dark:text-green-300 space-y-0.5 text-sm">
                  {keywords.present.map((kw, idx) => (
                    <li
                      key={idx}
                      className="hover:bg-green-100 dark:hover:bg-green-900 rounded px-1 py-0.5 transition-colors cursor-default"
                    >
                      {kw}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Missing Keywords */}
            <div>
              <h4 className="font-medium mb-2 text-red-600 dark:text-red-300 flex items-center gap-1 text-sm">
                <XCircle className="w-4 h-4" /> Keywords Missing
              </h4>
              {keywords.missing.length === 0 ? (
                <p className="italic text-gray-500 dark:text-gray-400 text-sm">Great! No missing keywords.</p>
              ) : (
                <ul className="list-disc list-inside text-red-700 dark:text-red-300 space-y-0.5 text-sm">
                  {keywords.missing.map((kw, idx) => (
                    <li
                      key={idx}
                      className="hover:bg-red-100 dark:hover:bg-red-900 rounded px-1 py-0.5 transition-colors cursor-default"
                    >
                      {kw}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
