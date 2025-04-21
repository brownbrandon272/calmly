import React from 'react';
import { HabitCard } from './HabitCard';
import { Habit } from '../types/habit';

interface HabitListProps {
  habits: Habit[];
  onToggleDay: (habitId: string, dateKey: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export const HabitList: React.FC<HabitListProps> = ({ 
  habits, 
  onToggleDay,
  onEdit,
  onDelete
}) => {
  if (habits.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-secondary">No habits added yet.</p>
        <p className="text-xs text-gray-400 mt-1">Click "New Habit" to start tracking.</p>
      </div>
    );
  }

  return (
    <div>
      {habits.map((habit) => (
        <HabitCard 
          key={habit.id} 
          habit={habit} 
          onToggleDay={onToggleDay}
          onEdit={() => onEdit(habit)}
          onDelete={() => onDelete(habit.id)}
        />
      ))}
    </div>
  );
};