import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Sparkles,
  Crown,
  Shield,
  Maximize2
} from 'lucide-react';

export const WebRtcCallModal: React.FC = () => {
  const { activeCall, endCall } = useApp();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeCall?.status === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [activeCall?.status]);

  if (!activeCall) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#111116] border border-purple-900/50 rounded-2xl overflow-hidden shadow-2xl text-white">
        {/* Top Bar */}
        <div className="p-4 bg-[#16161D] border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-royal text-xs font-bold text-amber-400">
              WebRTC Royal Peer-to-Peer Encryption
            </span>
          </div>
          <div className="font-mono text-xs text-stone-400">
            {activeCall.status === 'connected' ? formatTimer(callDuration) : 'Connecting signaling...'}
          </div>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {activeCall.isVideo && !isVideoOff ? (
            <div className="relative w-full h-full bg-gradient-to-br from-stone-900 to-purple-950 flex items-center justify-center">
              {/* Simulated video frame */}
              <img
                src="/src/assets/images/royal_ambassador_summit_1793931073802.jpg"
                alt="Ambassador Video"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Picture in picture self preview */}
              <div className="absolute bottom-4 right-4 w-32 h-24 rounded-lg overflow-hidden border-2 border-amber-400/80 bg-stone-900 shadow-lg">
                <img
                  src="/src/assets/images/founder_prophet_do_all_1793931072030.jpg"
                  alt="Self Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-black/60 text-[9px] px-1 rounded text-stone-200">
                  You
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#3B0764] to-[#581C87] border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-xl">
                <Crown className="w-12 h-12" />
              </div>
              <h4 className="font-royal font-bold text-lg text-white">
                {activeCall.callerTitle}
              </h4>
              <p className="text-xs text-stone-400">
                {activeCall.status === 'calling' ? 'Ringing Royal Sanctuary Node...' : 'Secure Audio Link Established'}
              </p>
            </div>
          )}

          {/* Connected Identity Stamp */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <div className="font-bold text-white font-royal">{activeCall.callerName}</div>
            <div className="text-[10px] text-amber-400 font-medium">Royal Ambassador Peer</div>
          </div>
        </div>

        {/* Bottom Call Controls */}
        <div className="p-4 bg-[#16161D] flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-colors cursor-pointer ${
              isMuted ? 'bg-red-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-white'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {activeCall.isVideo && (
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3.5 rounded-full transition-colors cursor-pointer ${
                isVideoOff ? 'bg-red-600 text-white' : 'bg-stone-800 hover:bg-stone-700 text-white'
              }`}
              title={isVideoOff ? 'Turn Video On' : 'Turn Video Off'}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>
          )}

          <button
            onClick={endCall}
            className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
