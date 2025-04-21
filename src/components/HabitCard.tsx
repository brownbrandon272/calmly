import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Habit } from '../types/habit';
import { DayMarkers } from './DayMarkers';

interface HabitCardProps {
  habit: Habit;
  onToggleDay: (habitId: string, dateKey: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ 
  habit, 
  onToggleDay,
  onEdit,
  onDelete
}) => {
  // Calculate streak: consecutive completed days from today backward
  const getStreak = () => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      
      if (habit.trackedDays[dateKey]) {
        streak += 1;
      } else if (streak > 0) {
        // Break on first uncompleted day
        break;
      }
    }
    
    return streak;
  };

  const streak = getStreak();
  
  return (
    <div className="habit-card">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: habit.color }}
            />
            <h3 className="font-medium">{habit.name}</h3>
          </div>
          <div className="text-xs text-secondary mt-1">
            {streak > 0 ? (
              <span className="text-primary-dark font-medium">
                {streak} day streak! 🔥
              </span>
            ) : (
              "Start your streak today!"
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="text-secondary hover:text-primary-dark p-1 rounded-full"
            onClick={onEdit}
          >
            <Edit size={16} />
          </button>
          <button 
            className="text-secondary hover:text-error p-1 rounded-full"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <DayMarkers habit={habit} onToggleDay={onToggleDay} />
    </div>
  );
};