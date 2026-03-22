"use client";

export default function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-1 h-16">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-purple-500 rounded ${
            active ? "animate-wave" : ""
          }`}
          style={{
            height: active
              ? `${Math.random() * 60 + 10}px`
              : "10px",
            animationDelay: `${i * 0.05}s`,
          }}
        ></div>
      ))}
    </div>
  );
}