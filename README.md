# AI Resume Analyzer

An AI-powered web application that analyzes your resume, identifies strengths and weaknesses, and compares it to a given job description. It also includes a smart AI chat assistant to provide tailored resume feedback.

## ✨ Features

- 📄 Upload your resume (PDF or DOCX)
- 📌 Add a job description for targeted feedback
- 📊 See resume score, strengths, areas for improvement
- 🧠 Keyword comparison (present vs missing keywords)
- 💬 AI chat assistant for personalized resume advice

---

## 🧱 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express + Gemini API
- **AI**: Google Gemini (1.5 Flash or Pro)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/MuhammadFaiz921/Ai-Resume-Analyzer.git
cd ai-resume-analyzer
```

### 2. Install Dependencies

#### For Frontend

```bash
cd client
npm install
npm start
```

#### For Backend

```bash
cd server
npm install
node index.js
```

### 3. Set up Environment

Create a `.env` file in the `backend/` directory:

```env
GEMINI_API_KEY=your-gemini-api-key
```

---

## 📁 Project Structure

```
.
├── client/
│   └── src/
│       ├── components/
│       └── App.jsx
├── server/
│   ├── gemini.js
│   └── index.js
├── .env
└── README.md
```

---

## 🌐 API Endpoints

- `POST /api/upload`: Uploads and analyzes the resume
- `POST /api/chat`: Sends user query and gets AI response
- `POST /api/suggestions`: Gets resume improvement tips

---

## 📝 License

MIT License. Feel free to use, modify, and share!

---

> Built with ❤️ to help job seekers create smarter, stronger resumes.