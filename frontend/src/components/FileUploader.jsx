import React, { useRef } from 'react';
import { UploadCloud, FileCheck } from 'lucide-react';

export default function FileUploader({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  analyzing,
  analyzeResume,
  setChatMessages,
}) {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }

      setFile(selectedFile);
      setChatMessages((prev) => [
        ...prev,
        { role: 'user', content: `Uploaded file: ${selectedFile.name}` },
        {
          role: 'assistant',
          content:
            'Resume received! You can now analyze it or add a job description for better insights.',
        },
      ]);
    }
  };

  return (
    <div
      onClick={(e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag !== 'textarea' && tag !== 'button') {
          fileInputRef.current.click();
        }
      }}
      className={`relative p-8 rounded-2xl border-2 border-dashed transition-colors duration-300 ease-in-out
        cursor-pointer shadow-sm group
        ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}
        dark:bg-gray-900 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-gray-800`}
      aria-label="Resume upload area"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current.click();
        }
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

      {!file ? (
        <div className="text-center select-none">
          <UploadCloud className="mx-auto text-blue-500 w-12 h-12 mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Drag & drop your resume or <span className="underline">click to upload</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">PDF, DOC, DOCX — max 5MB</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 font-medium mb-4">
            <FileCheck className="w-5 h-5" />
            <span>Uploaded: {file.name}</span>
          </div>

          <textarea
            className="mt-2 w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional: Paste job description for better keyword analysis"
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button
            onClick={analyzeResume}
            disabled={analyzing || !file}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </div>
      )}
    </div>
  );
}
