const fetch = require('node-fetch');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-1.5-flash-latest'; // Or 'gemini-1.5-pro'

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(promptText) {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    })
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini API';
}

async function analyzeResume(resumeText, jobDescription = '') {
  // Updated prompt to emphasize keywords must be arrays of strings (words/phrases), NOT numbers
  const prompt = `
You are an expert resume analyzer. Given the resume text and an optional job description, analyze the resume and respond ONLY with valid JSON in the following format EXACTLY:

{
  "score": number,                  // A score from 0 to 100
  "strengths": [string],            // List of strengths found
  "improvements": [string],         // List of areas for improvement
  "keywords": {
    "present": [string],            // List of exact keywords or phrases from the job description found in the resume
    "missing": [string]             // List of exact keywords or phrases from the job description missing in the resume
  }
}

Do NOT return numeric values inside keywords arrays. Only return arrays of words or phrases as strings.

Resume Text:
${resumeText}

Job Description:
${jobDescription}

Respond ONLY with valid JSON, no explanations, no extra text, no markdown.
  `;

  try {
    let responseText = await callGemini(prompt);
    responseText = responseText.trim();

    // Remove markdown backticks if present
    if (responseText.startsWith('```')) {
      const lines = responseText.split('\n');
      lines.shift();
      lines.pop();
      responseText = lines.join('\n').trim();
    }

    // Parse JSON
    const analysis = JSON.parse(responseText);

    return { analysis, rawText: resumeText };
  } catch (err) {
    console.error('Analyze error:', err.message);
    return {
      analysis: {
        score: 0,
        strengths: [],
        improvements: [],
        keywords: { present: [], missing: [] }
      },
      rawText: resumeText
    };
  }
}

async function chatWithGemini(message, resumeText) {
  const prompt = `User: ${message}
Context Resume:
${resumeText}

AI:`;

  try {
    const response = await callGemini(prompt);
    return response;
  } catch (err) {
    console.error('Chat error:', err.message);
    return 'Sorry, I encountered an error processing your message.';
  }
}

async function suggestImprovements(resumeText, jobDescription = '') {
  const prompt = `
You are a career advisor. Based on the resume and job description, give specific and concise suggestions for improving the resume to better match the job.

Resume:
${resumeText}

Job Description:
${jobDescription}

Respond with 3-5 bullet points only.
  `;

  try {
    const response = await callGemini(prompt);
    return response;
  } catch (err) {
    console.error('Suggestions error:', err.message);
    return 'Unable to generate suggestions at this time.';
  }
}

module.exports = {
  analyzeResume,
  chatWithGemini,
  suggestImprovements
};
