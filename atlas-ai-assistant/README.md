# Atlas AI Assistant

A voice-powered AI assistant for **attendance management, document validation, and transaction verification** — built with Next.js, Tailwind CSS, and Gemini AI.

---

## Features

### Voice Interaction

* Speak your queries using real-time speech recognition
* AI responds with voice output

### Attendance Exemption System

* Request leave using voice
* Upload medical proof (JPG / PDF)
* AI validates document
* Automatically marks attendance as **Exempted**

### Transaction Verification

* Check fee/payment status via voice
* System verifies and confirms payment

### AI-Powered Responses

* Rule-based + Gemini AI fallback
* Handles unknown queries intelligently

### System Status UI

* Displays real-time system updates:

  * Payment Approved
  * Attendance Exempted
  * Awaiting Verification

---

## Tech Stack

* **Frontend:** Next.js (App Router)
* **Styling:** Tailwind CSS (Glassmorphism UI)
* **Backend:** Next.js API Routes + FastAPI (for OCR validation)
* **AI:** Google Gemini API
* **Voice:** Web Speech API

---

## Project Structure

atlas-ai-assistant/
│
├── app/ # Next.js App Router
├── components/ # UI Components
├── public/ # Static assets
├── .env.local # API keys (not committed)
├── README.md
└── package.json

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/atlas-ai-assistant.git
cd atlas-ai-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create `.env.local`:

```env
GOOGLE_API_KEY=your_api_key_here
```

### 4. Run the app

```bash
npm run dev
```

---

## Important Notes

* Do NOT commit `.env.local`
* `node_modules` is ignored using `.gitignore`
* API keys should be kept secure

---

## Future Improvements

* Dashboard with analytics
* Attendance tracking history
* Advanced voice commands
* Drag & drop file upload
* Notification system

---

## Department-Wise Applications

This system can be integrated across multiple departments within an academic institution:

### Academic Department
- Attendance tracking and exemption handling
- Academic record updates
- Exam-related support

### Medical / Health Cell
- Verification of medical certificates
- Managing health-related leave requests
- Maintaining student medical records

### Accounts / Finance Department
- Fee payment verification
- Transaction history checks
- Reducing manual payment queries

### Administration Department
- Centralized request management
- Workflow automation
- Reducing paperwork and manual approvals

### Faculty / Teaching Staff
- Viewing approved attendance exemptions
- Managing student attendance efficiently
- Reducing manual intervention

### IT Department
- System integration with ERP
- Data management and security
- Scaling and maintaining the platform

---

## Additional Use Cases

Apart from attendance and transaction verification, Atlas AI Assistant can be extended to:

### Leave Approval System
- Handle different types of leave (medical, personal, academic)
- Automate approval workflows

### Academic Assistance
- Answer syllabus-related queries
- Provide exam preparation summaries
- Help students understand academic processes

### Timetable & Scheduling
- Voice-based timetable access
- Notify students about schedule changes

### Query Resolution System
- Handle student FAQs (fees, exams, rules)
- Reduce load on administrative staff

### Announcement Assistant
- Deliver important notices via voice
- Broadcast updates to students

### Document Verification System
- Verify certificates, forms, and applications
- Automate validation workflows

---

## Author

**Sharavi Shinde**

---

## 💡 Inspiration

Built as an **Academic Service Optimization Platform** to automate:

* Attendance approvals
* Document validation
* Payment verification

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
