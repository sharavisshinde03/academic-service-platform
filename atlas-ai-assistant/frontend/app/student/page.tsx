"use client";

import { useState, useRef , useEffect} from "react";

export default function VoiceBot() {

  useEffect(() => {
    speechSynthesis.getVoices();
  }, []);
{
  
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"idle" | "awaiting_doc">("idle");

  const [name, setName] = useState("");
  const [appId, setAppId] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // 🔊 SPEAK
  const speak = (msg: string) => {
    setResponse(msg);
    const speech = new SpeechSynthesisUtterance(msg);
    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  };

  // 🎙️ START RECORDING
  const startRecording = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chrome browser");
      return;
    }

    const rec = new SpeechRecognition();
    recognitionRef.current = rec;

    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;

    setIsRecording(true);
    setLoading(true);

    rec.onresult = async (e: any) => {
      const speech = e.results[0][0].transcript;
      setText(speech);
      await process(speech);
    };

    rec.onend = () => {
      setIsRecording(false);
      setLoading(false);
    };

    rec.onerror = () => {
      setIsRecording(false);
      setLoading(false);
    };

    rec.start();
  };

  // ⏹ STOP RECORDING
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  // 🧠 PROCESS
  const process = async (input: string) => {
    speak("Thinking...");

    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      speak(data.content);

      // 💰 TRANSACTION
      if (data.content.toLowerCase().includes("payment")) {
        setPaymentStatus("💰 Payment Verified");
        setAttendanceStatus("");
        setStep("idle");
      }

      // 🏥 MEDICAL
      else if (data.content.toLowerCase().includes("document")) {
        setAttendanceStatus("📄 Upload medical proof");
        setStep("awaiting_doc");
      }

      // ❌ INFORMAL
      else if (data.content.toLowerCase().includes("25%")) {
        setAttendanceStatus("❌ Use your 25% attendance");
        setStep("idle");
      }
    } catch {
      speak("AI server error");
    }
  };

  // 📄 FILE UPLOAD
  const handleFile = async (e: any) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const validTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (!validTypes.includes(uploadedFile.type)) {
      speak("Please upload JPG, PNG or PDF file only");
      return;
    }

    if (!name) {
      speak("Enter your name first");
      return;
    }

    if (step !== "awaiting_doc") {
      speak("Please request leave first");
      return;
    }

    setLoading(true);
    speak("Analyzing document...");

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("text", text);
    formData.append("name", name);

    try {
      const res = await fetch(
        "/api/voice",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      speak(data.ai_response);

      if (data.status === "approved") {
        setAttendanceStatus("✅ Attendance Approved");
      } else {
        setAttendanceStatus(`❌ ${data.ai_response}`);
      }

      setStep("idle");
    } catch {
      speak("Error processing document");
    }

    setLoading(false);
  };

  // 🎨 UI
  return (
  <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e3a8a]">

    <div className="w-[420px] p-6 rounded-2xl text-white 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      shadow-[0_8px_32px_rgba(0,0,0,0.5)]">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide">
          Atlas AI Assistant
        </h1>
        <p className="text-xs text-gray-300 mt-1">
          Voice • OCR • Gemini AI • Automation
        </p>
      </div>

      {/* INPUTS */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Name"
          className="w-1/2 p-2 rounded-lg bg-white/10 border border-white/20 outline-none text-sm"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="App ID"
          className="w-1/2 p-2 rounded-lg bg-white/10 border border-white/20 outline-none text-sm"
          onChange={(e) => setAppId(e.target.value)}
        />
      </div>

      {/* 🎙 RECORD BUTTON */}
      <div className="flex flex-col items-center mt-4">

        {!isRecording ? (
          <button
  onClick={startRecording}
  className="bg-blue-600 hover:bg-blue-700 p-5 rounded-full shadow-lg transition flex items-center justify-center"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="white"
    viewBox="0 0 24 24"
  >
    <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
    <path d="M19 11a7 7 0 01-14 0H3a9 9 0 0018 0h-2z" />
  </svg>
</button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 p-5 rounded-full shadow-lg animate-pulse"
          >
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="white"
  viewBox="0 0 24 24"
>
  <rect x="6" y="6" width="12" height="12" rx="2" />
</svg>
          </button>
        )}

        <p className="text-sm text-gray-300 mt-2">
          {isRecording ? "Listening..." : "Tap to speak"}
        </p>
      </div>

      {/* USER */}
      <div className="mt-5 bg-white/10 border border-white/20 p-3 rounded-lg">
        <p className="text-xs text-gray-300">You</p>
        <p className="text-sm">{text || "..."}</p>
      </div>

      {/* BOT */}
      <div className="mt-3 bg-blue-700/40 border border-blue-400/30 p-3 rounded-lg">
        <p className="text-xs text-gray-200">Assistant</p>
        <p className="text-sm">{response || "Waiting..."}</p>
      </div>

      {/* STATUS */}
      <div className="mt-4 space-y-2">
        {paymentStatus && (
          <div className="bg-green-500/20 border border-green-400/30 p-2 rounded-lg text-sm">
            {paymentStatus}
          </div>
        )}

        {attendanceStatus && (
          <div className="bg-blue-500/20 border border-blue-400/30 p-2 rounded-lg text-sm">
            {attendanceStatus}
          </div>
        )}
      </div>

      {/* 📄 FILE UPLOAD */}
      <div className="mt-4">
  <label className="block text-xs text-gray-300 mb-1">
    Upload Document (JPG / PDF)
  </label>

  <input
    type="file"
    accept=".jpg,.jpeg,.png,.pdf"
    onChange={handleFile}
    className={`w-full text-sm p-2 rounded-lg border 
      ${step === "awaiting_doc"
        ? "bg-white/10 border-white/20 cursor-pointer"
        : "bg-gray-500/20 border-gray-400/20 cursor-not-allowed opacity-50"
      }`}
  />

  {step !== "awaiting_doc" && (
    <p className="text-xs text-gray-400 mt-1">
      Request leave first to enable upload
    </p>
  )}
</div>

      {/* FOOTER */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Atlas AI • Agentic System
      </div>

    </div>
  </div>

);
}
}