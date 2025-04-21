import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Sound } from '../data/sounds';

interface AudioPlayerProps {
  sound: Sound;
  isPlaying: boolean;
  volume: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  sound,
  isPlaying,
  volume,
  onPlayPause,
  onVolumeChange,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, sound.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Set up audio element with new sound source
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = sound.audioUrl;
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [sound.id]);

  return (
    <div>
      <audio ref={audioRef} loop />
      
      <div className="flex items-center space-x-4">
        <button
          className="rounded-full bg-primary w-10 h-10 flex items-center justify-center text-white"
          onClick={onPlayPause}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="flex-1">
          <h4 className="text-sm font-medium">{sound.name}</h4>
          <p className="text-xs text-secondary">{sound.description}</p>
        </div>
        
        <div className="flex items-center space-x-2 w-1/3">
          <Volume2 size={16} className="text-secondary" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};