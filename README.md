# 💼 AI Resume Analyzer

An AI-powered web application that intelligently analyzes resumes, identifies strengths and weaknesses, and compares them to job descriptions for improved job alignment. Includes a smart AI chat assistant to provide real-time, personalized feedback.

---

## ✨ Features

- 📄 **Resume Upload & Parsing** – Upload PDF or DOCX resumes and extract structured data.
- 📌 **Job Description Matching** – Add a JD to get keyword-based relevance feedback.
- 📊 **Resume Scoring System** – Receive a score from 0–100 based on overall quality.
- 💡 **Strengths & Improvements** – Get AI-generated insights to optimize your resume.
- 🧠 **Keyword Matching** – Compare JD keywords that are present or missing.
- 💬 **AI Chat Assistant** – Chat with an AI bot to get tailored suggestions.

---

## 🧱 Tech Stack

- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **AI Integration:** Google Gemini API (1.5 Flash or Pro)

---

## 🚀 Live Demo

🌐 [Live Site](https://ai-resume-analyzer-lze1.onrender.com/)

---

## 📦 Getting Started

### Prerequisites

- Node.js and npm installed
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadFaiz921/Ai-Resume-Analyzer.git
cd Ai-Resume-Analyzer
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `/backend` directory:

```env
GEMINI_API_KEY=your-google-gemini-api-key
```

### 4. Run the App Locally

#### Backend

```bash
cd backend
npm run dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint             | Description                                  |
|--------|----------------------|----------------------------------------------|
| POST   | `/api/upload`        | Upload and analyze resume                    |
| POST   | `/api/chat`          | Get AI assistant chat response               |
| POST   | `/api/suggestions`   | Get bullet-point resume improvement tips     |

---

## 📁 Project Structure

```
Ai-Resume-Analyzer/
├── frontend/
│   └── src/
│       └── App.jsx
├── backend/
│   ├── server.js
│   ├── gemini.js
│   └── .env
├── README.md
```

---

## 📘 Key Concepts

- 🔍 Resume Text Extraction (PDF/DOCX parsing)
- 🧠 Prompt Engineering with Gemini API
- ⚡ Realtime AI Chat with Context
- 🎯 Keyword Matching for JD relevance

---

## 📝 License

This project is licensed under the MIT License.  
Feel free to fork, contribute, and enhance!

---

> Built with ❤️ to help job seekers land their dream jobs smarter and faster.
