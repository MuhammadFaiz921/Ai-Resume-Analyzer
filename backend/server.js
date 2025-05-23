require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const cors = require('cors');
const path = require('path');
const { analyzeResume, chatWithGemini, suggestImprovements } = require('./gemini');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('resume'), async (req, res) => {
  console.log('Received upload request');
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const mimeType = req.file.mimetype;
    let text = '';

    if (mimeType === 'application/pdf') {
      const data = await pdfParse(req.file.buffer);
      text = data.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    const jobDescription = req.body.jobDescription || '';
    const analysisResult = await analyzeResume(text, jobDescription);

    // We keep the keywords as-is (arrays of strings)
    res.json({ analysis: analysisResult.analysis, resumeText: analysisResult.rawText });
  } catch (err) {
    console.error('Error in /api/upload:', err);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, resumeText } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const reply = await chatWithGemini(message, resumeText);
    res.json({ response: reply });
  } catch (err) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: 'Chatbot error' });
  }
});

app.post('/api/suggestions', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const suggestions = await suggestImprovements(resumeText, jobDescription);
    res.json({ suggestions });
  } catch (err) {
    console.error('Error in /api/suggestions:', err);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// Serve static files from frontend dist folder
app.use(express.static(path.join(__dirname,'..', 'frontend', 'dist')));

// Serve frontend for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
