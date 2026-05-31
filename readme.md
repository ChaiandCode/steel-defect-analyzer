# 🔬 SteelScan.ai — AI Steel Surface Defect Analyzer

![SteelScan Banner](https://img.shields.io/badge/AI-Computer%20Vision-blue?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.14-green?style=for-the-badge&logo=python)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![Groq](https://img.shields.io/badge/Groq-Llama%204%20Vision-orange?style=for-the-badge)

---

## 📌 About The Project

**SteelScan.ai** is a full-stack AI-powered web application that detects and classifies defects on steel surfaces using Computer Vision. Built for industrial quality control, it allows quality engineers to upload a steel surface image and instantly receive:

- ✅ Defect name and classification
- ✅ Confidence score with visual progress bar
- ✅ Severity rating (Critical / Warning / Minor)
- ✅ Detailed defect description
- ✅ Actionable recommendation
- ✅ Alternative possibilities with scores

---

## 🎯 Defect Catalogue

| Defect | Severity |
|--------|----------|
| Scratches | ⚠️ Warning |
| Patches | ⚠️ Warning |
| Slivers | 🔴 Critical |
| Rolled-in Scale | 🔴 Critical |
| Pits / Pitting | ⚠️ Warning |
| Cracks | 🔴 Critical |
| Inclusion | 🔴 Critical |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + Vite |
| Backend | Python FastAPI |
| AI Model | Groq Llama 4 Scout Vision |
| API | REST API |
| Styling | CSS Variables + Framer Motion |
| HTTP Client | Axios |

---

## 🏗️ Project Structure

```
steel-defect-analyzer/
├── backend/
│   ├── main.py
│   ├── defect_catalogue.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   └── src/
├── .gitignore
└── README.md
```
---

## 🚀 How To Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API Key (free at https://console.groq.com)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/steel-defect-analyzer.git
cd steel-defect-analyzer
```

### 2. Setup Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:
GROQ_API_KEY=your_groq_api_key_here

Run the backend:
```bash
uvicorn main:app --reload
```
Backend runs at: http://127.0.0.1:8000

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## 📸 How It Works

1. **Upload** — User uploads a steel surface image
2. **Analyze** — Image is sent to FastAPI backend via REST API
3. **AI Scan** — Groq Llama 4 Vision model analyzes the image
4. **Result** — Defect name, confidence score, severity and recommendation displayed

---

## 🔒 Security

- API keys stored in `.env` file
- `.env` is in `.gitignore` — never committed to GitHub
- CORS configured for local development

---

## 👨‍💻 Author

**Satyam Anand**
- Built with ❤️ for industrial AI applications
- © 2026 All Rights Reserved

---

## 📄 License

This project was developed for educational and portfolio purposes during my internship with the Tata Group, where I worked on AI-powered car panel defect detection for Tata Motors.

