import React from "react";

export default function BlurredBackground({children}: {children: React.ReactNode}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background Gradient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* Foreground Content */}
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
    </div>
  );
}