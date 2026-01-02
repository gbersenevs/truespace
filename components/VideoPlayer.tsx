'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { FiPlay, FiPause } from 'react-icons/fi';

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  onProgress?: (progress: { played: number; playedSeconds: number }) => void;
  onEnded?: () => void;
}

export default function VideoPlayer({
  url,
  thumbnail,
  onProgress,
  onEnded,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    setHasStarted(true);
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      {!hasStarted && thumbnail && (
        <motion.div
          className="absolute inset-0 z-10 cursor-pointer"
          initial={{ opacity: 1 }}
          animate={{ opacity: hasStarted ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.button
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlay className="w-10 h-10 text-black ml-1" />
            </motion.button>
          </div>
        </motion.div>
      )}

      <ReactPlayer
        url={url}
        playing={playing}
        controls
        width="100%"
        height="100%"
        onProgress={onProgress}
        onEnded={onEnded}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
    </div>
  );
}

