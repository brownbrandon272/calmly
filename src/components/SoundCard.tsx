import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Sound } from '../data/sounds';

interface SoundCardProps {
  sound: Sound;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: (sound: Sound) => void;
}

export const SoundCard: React.FC<SoundCardProps> = ({ 
  sound, 
  isActive, 
  isPlaying,
  onSelect 
}) => {
  return (
    <div 
      className={`sound-card ${isActive ? 'sound-card-active' : ''}`}
      onClick={() => onSelect(sound)}
    >
      <div className="relative">
        <img 
          src={sound.imageUrl} 
          alt={sound.name} 
          className="w-full h-32 object-cover rounded-lg mb-2"
        />
        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white/80 rounded-full p-2">
            {isPlaying ? <Pause className="text-primary" /> : <Play className="text-primary" />}
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium">{sound.name}</h3>
    </div>
  );
};