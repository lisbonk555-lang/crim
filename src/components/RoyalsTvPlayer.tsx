import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { TvVideo } from '../types';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  Tv,
  ListVideo,
  Sparkles,
  Heart
} from 'lucide-react';

export const RoyalsTvPlayer: React.FC = () => {
  const { tvPlaylist, currentVideo, setCurrentVideo, openDonationModal } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isShuffle, setIsShuffle] = useState(false);

  const categories = [
    'All',
    'Worship',
    'Praise',
    'Gospel Music',
    'Sermons',
    'Prayers',
    'Celestial',
  ];

  const filteredPlaylist = tvPlaylist.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const currentIndex = tvPlaylist.findIndex((v) => v.id === currentVideo.id);
    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * tvPlaylist.length);
    } else {
      nextIndex = (currentIndex + 1) % tvPlaylist.length;
    }
    setCurrentVideo(tvPlaylist[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const currentIndex = tvPlaylist.findIndex((v) => v.id === currentVideo.id);
    const prevIndex = (currentIndex - 1 + tvPlaylist.length) % tvPlaylist.length;
    setCurrentVideo(tvPlaylist[prevIndex]);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-[#0B0B0E] text-white min-h-screen pb-16">
      {/* 1. Header Banner */}
      <div className="border-b border-stone-800 bg-[#121217]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-[#581C87] flex items-center justify-center text-white shadow-md">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-royal text-xl sm:text-2xl font-black tracking-tight text-white">
                  THE ROYALS TV
                </h1>
                <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded animate-pulse">
                  <Radio className="w-3 h-3" />
                  LIVE ON AIR
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Continuous Christian Broadcast · Sermons, Praises & Celestial Ambient Frequencies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openDonationModal()}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-stone-950" />
              <span>Support Royals Broadcast</span>
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#581C87] text-white shadow-xs'
                    : 'bg-stone-800/80 hover:bg-stone-700 text-stone-300'
                }`}
              >
                {cat === 'Celestial' ? 'Celestial & Ambient' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Broadcast Layout (8 cols Video Player / 4 cols Upcoming Playlist) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Stage Video Player (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Screen Box */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-stone-800 shadow-2xl group">
              <video
                ref={videoRef}
                src={currentVideo.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                onEnded={handleNext}
                className="w-full h-full object-cover"
              />

              {/* Live Overlay watermark */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-amber-400 font-royal">ROYALS TV</span>
                <span className="text-stone-400">·</span>
                <span className="text-stone-300">{currentVideo.category}</span>
              </div>

              {/* Bottom Custom Playback Controls Overlay on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-5 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-opacity">
                {/* Now Playing Title */}
                <div className="mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Now Broadcasting
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                    {currentVideo.title}
                  </h3>
                  <div className="text-xs text-stone-300">
                    Minister: {currentVideo.speakerOrArtist} · Duration: {currentVideo.duration}
                  </div>
                </div>

                {/* Control bar */}
                <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-3 text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Previous"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handlePlayPause}
                      className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-bold hover:scale-105 transition-transform cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Next"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsShuffle(!isShuffle)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isShuffle ? 'text-amber-400 bg-white/10' : 'text-stone-400 hover:text-white'
                      }`}
                      title="Shuffle"
                    >
                      <Shuffle className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleMute}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Description Box */}
            <div className="bg-[#16161D] rounded-xl p-5 border border-stone-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Editorial Broadcast Notes</span>
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                {currentVideo.description}
              </p>
              <div className="p-3 bg-stone-900/60 rounded-lg border border-stone-800 flex items-center justify-between text-xs text-stone-400">
                <span>License: Open Creative Commons & Church of Royals Ministry Broadcast</span>
                <span className="font-mono text-amber-400">STREAM #ROYALS-{currentVideo.id}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Playlist Rail (4 cols) */}
          <div className="lg:col-span-4 bg-[#16161D] rounded-2xl p-5 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-amber-400" />
                <h3 className="font-royal font-bold text-sm text-white">
                  Broadcast Schedule
                </h3>
              </div>
              <span className="text-[11px] text-stone-400">{filteredPlaylist.length} Channels</span>
            </div>

            {/* Playlist Cards */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredPlaylist.map((video) => {
                const isSelected = video.id === currentVideo.id;
                return (
                  <div
                    key={video.id}
                    onClick={() => {
                      setCurrentVideo(video);
                      setIsPlaying(true);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                      isSelected
                        ? 'bg-[#581C87]/30 border-amber-400/80'
                        : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-950">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#581C87]/70 flex items-center justify-center">
                          <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
                        </div>
                      )}
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] px-1 rounded text-stone-300">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 truncate">
                        {video.category}
                      </div>
                      <h4 className="font-serif font-bold text-xs text-white line-clamp-2 leading-tight">
                        {video.title}
                      </h4>
                      <div className="text-[11px] text-stone-400 truncate mt-0.5">
                        {video.speakerOrArtist}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
