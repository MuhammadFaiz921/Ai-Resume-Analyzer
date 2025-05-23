import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import AnalysisResults from './components/AnalysisResults';
import ChatBox from './components/ChatBox';

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState({});
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! Upload your resume to get started with analysis. You can also add a job description for targeted feedback.',
    },
  ]);
  const [analyzing, setAnalyzing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeResume = async () => {
    if (!file) return;

    setAnalyzing(true);
    setChatMessages((prev) => [
      ...prev,
      { role: 'user', content: `Analyzing resume: ${file.name}` },
      { role: 'assistant', content: 'Analyzing your resume, please wait...' },
    ]);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      if (jobDescription.trim()) formData.append('jobDescription', jobDescription.trim());

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to analyze resume');

      const data = await response.json();
      setResults(data);
      setAnalyzed(true);

      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Analysis complete! Scroll down to see your results and chat with AI for advice.',
        },
      ]);
    } catch (error) {
      alert('Error analyzing resume: ' + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

 const sendMessage = async () => {
  if (!userMessage.trim()) return;

  const newMessage = { role: 'user', content: userMessage.trim() };
  setChatMessages((prev) => [...prev, newMessage]);
  setUserMessage('');
  setIsTyping(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: newMessage.content,
        resumeText: results.resumeText || '',
      }),
    });

    if (!response.ok) throw new Error('Failed to get AI response');

    const data = await response.json();

    // FIXED: use data.response instead of data.reply
    setChatMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
  } catch (error) {
    alert('Error communicating with AI: ' + error.message);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Upload + Analysis Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* File Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <FileUploader
              file={file}
              setFile={setFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              analyzing={analyzing}
              analyzeResume={analyzeResume}
              setChatMessages={setChatMessages}
            />
          </div>

          {/* Analysis Results Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[600px] hide-scrollbar">
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            <AnalysisResults
              results={results}
              analyzed={analyzed}
              jobDescription={jobDescription}
            />
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <ChatBox
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            userMessage={userMessage}
            setUserMessage={setUserMessage}
            sendMessage={sendMessage}
            isTyping={isTyping}
            analyzed={analyzed}
          />
        </div>
      </div>
    </div>
  );
}
