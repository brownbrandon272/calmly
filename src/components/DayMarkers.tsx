import React from 'react';
import { Habit } from '../types/habit';

interface DayMarkersProps {
  habit: Habit;
  onToggleDay: (habitId: string, dateKey: string) => void;
}

export const DayMarkers: React.FC<DayMarkersProps> = ({ habit, onToggleDay }) => {
  // Generate array of the last 7 days
  const getDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1);
      const dateKey = date.toISOString().split('T')[0];
      const isCompleted = habit.trackedDays[dateKey] || false;
      
      days.push({
        date,
        dayName,
        dateKey,
        isCompleted,
      });
    }
    
    return days;
  };

  const days = getDays();

  return (
    <div className="mt-3">
      <div className="flex justify-between">
        {days.map((day) => (
          <div key={day.dateKey} className="flex flex-col items-center">
            <span className="text-xs text-secondary mb-1">{day.dayName}</span>
            <button
              className={`day-marker ${
                day.isCompleted ? 'day-marker-completed' : 'day-marker-incomplete'
              }`}
              onClick={() => onToggleDay(habit.id, day.dateKey)}
            >
              {day.isCompleted ? '✓' : ''}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};