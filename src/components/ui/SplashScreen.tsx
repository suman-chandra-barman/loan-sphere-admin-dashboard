"use client";

import Image from "next/image";

interface SplashScreenProps {
  message?: string;
}

export default function SplashScreen({ message = "INITIALIZING" }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[radial-gradient(circle_at_50%_110%,#8c0b0b_0%,#111518_70%,#171c20_100%)] p-6 select-none animate-in fade-in duration-300">
      {/* Top spacing to push logo center */}
      <div className="flex-1" />

      {/* Center Content Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        {/* Concentric rings wrapper */}
        <div className="relative flex items-center justify-center h-48 w-48">
          {/* Outermost pulsing ring */}
          <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-40 duration-3000" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-4 rounded-full border border-white/10 animate-pulse duration-2000" />
          
          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-xs flex items-center justify-center shadow-[inset_0_0_12px_rgba(255,255,255,0.03)]">
            <Image
              src="/logo.svg"
              alt="Dragon Finance Logo"
              width={75}
              height={75}
              priority
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="space-y-4 pt-2">
          <div>
            <h2 className="text-xl font-bold tracking-[0.25em] text-white font-space-grotesk drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              DRAGON
            </h2>
            <h2 className="text-xl font-bold tracking-[0.25em] text-white/90 font-space-grotesk drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] mt-1">
              FINANCE
            </h2>
          </div>

          {/* Separator line */}
          <div className="w-16 h-[1.5px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)] mx-auto" />

          {/* Loading status message */}
          <p className="text-[10px] tracking-[0.45em] font-extrabold text-white/50 uppercase animate-pulse select-none">
            {message}
          </p>
        </div>
      </div>

      {/* Bottom encryption footer */}
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-[9px] tracking-[0.15em] font-semibold text-white/25 uppercase">
          Secured by 256-bit encryption
        </p>
      </div>
    </div>
  );
}
