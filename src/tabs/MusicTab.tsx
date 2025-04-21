import React, { useState, useEffect } from 'react';
import { SoundCard } from '../components/SoundCard';
import { AudioPlayer } from '../components/AudioPlayer';
import { getSounds, Sound } from '../data/sounds';

export const MusicTab: React.FC = () => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [currentSound, setCurrentSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    // Load sounds data
    setSounds(getSounds());

    // Load saved preferences from localStorage if available
    const savedSound = localStorage.getItem('calmly-last-sound');
    const savedVolume = localStorage.getItem('calmly-volume');
    
    if (savedSound) {
      const soundData = JSON.parse(savedSound);
      setCurrentSound(soundData);
    }
    
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (currentSound) {
      localStorage.setItem('calmly-last-sound', JSON.stringify(currentSound));
    }
    localStorage.setItem('calmly-volume', volume.toString());
  }, [currentSound, volume]);

  const handleSoundSelect = (sound: Sound) => {
    if (currentSound?.id === sound.id) {
      // Toggle play/pause if the same sound is selected
      setIsPlaying(!isPlaying);
    } else {
      // Select new sound and start playing
      setCurrentSound(sound);
      setIsPlaying(true);
    }
  };

  return (
    <div className="pb-16">
      <h2 className="text-xl font-medium mb-6">Peaceful Sounds</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sounds.map((sound) => (
          <SoundCard
            key={sound.id}
            sound={sound}
            isActive={currentSound?.id === sound.id}
            isPlaying={isPlaying && currentSound?.id === sound.id}
            onSelect={handleSoundSelect}
          />
        ))}
      </div>

      {currentSound && (
        <div className="mt-8 fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 shadow-md p-4">
          <AudioPlayer
            sound={currentSound}
            isPlaying={isPlaying}
            volume={volume}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onVolumeChange={setVolume}
          />
        </div>
      )}
    </div>
  );
};