# Academic Service Platform

The Academic Service Platform is an AI-powered system designed to automate student services such as attendance exemption and fee verification. It integrates with the Atlas AI Assistant to provide intelligent voice and text-based interactions while maintaining a real-time query logging system using Supabase.

This platform helps the administrative department keep track of student queries and monitor their activity and interactions with the AI voice assistant, ensuring better visibility, control, and decision-making.

## Overview

The platform enables students to interact with an AI assistant for academic-related services. All interactions are processed intelligently and stored in Supabase, allowing administrators to monitor queries, responses, and system actions in real time.

## Key Features

- Voice and text-based interaction through Atlas AI Assistant  
- Attendance exemption system using document upload and OCR verification  
- Fee payment status verification with automated responses  
- Query logging system that records all interactions in Supabase  
- Real-time backend processing and automated decision-making  

## Query Logging (Supabase)

The system maintains a centralized log of all activities in Supabase, including:

- User queries  
- AI-generated responses  
- System decisions such as verified, exempted, or rejected statuses  

This ensures transparency, traceability, and efficient monitoring of system usage.

## System Architecture

User (Voice/Text Input)  
        ↓  
Atlas AI Assistant  
        ↓  
API Layer (Next.js / Backend)  
        ↓  
Processing Logic  
   - OCR Document Verification  
   - Payment Status Check  
   - AI Response Generation (Gemini)  
        ↓  
Supabase Database (Query Logs)  

## Tech Stack

- Frontend: Next.js (React)  
- Backend: API Routes / FastAPI  
- AI Engine: Google Gemini API  
- OCR: Tesseract.js  
- Database: Supabase  
- Voice Processing: Web Speech API  

## Project Structure

frontend/  
backend/  

## Use Cases

- Automated attendance exemption approval  
- AI-based academic query handling  
- Fee payment verification system  
- Academic workflow automation  

## Future Enhancements

- Admin dashboard for monitoring logs and system activity  
- Advanced document verification using AI vision models  
- Integration with student profiles and authentication systems  
- Analytics dashboard using Supabase data  

## Conclusion

The Academic Service Platform improves efficiency in academic institutions by automating repetitive processes using AI, OCR, and real-time data logging. It reduces manual intervention and enables a scalable and intelligent system for handling student services.