import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Habit } from '../types/habit';

interface HabitFormProps {
  onSubmit: (habit: Habit | Omit<Habit, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialValues?: Habit;
}

export const HabitForm: React.FC<HabitFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialValues
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [color, setColor] = useState(initialValues?.color || '#2A9D8F');

  const colors = [
    '#2A9D8F', // primary
    '#8E9AAF', // secondary
    '#CCD5AE', // accent
    '#76C893', // success
    '#F9C74F', // warning
    '#F94144', // error
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    if (initialValues) {
      onSubmit({
        ...initialValues,
        name,
        color,
      });
    } else {
      onSubmit({
        name,
        color,
        trackedDays: {},
      });
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">
          {initialValues ? 'Edit Habit' : 'New Habit'}
        </h3>
        <button
          className="text-secondary hover:text-foreground"
          onClick={onCancel}
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="habit-name" className="block text-sm font-medium text-secondary mb-1">
            Habit Name
          </label>
          <input
            id="habit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="e.g., Meditate"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary mb-1">
            Color
          </label>
          <div className="flex space-x-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                className={`w-8 h-8 rounded-full transition-all duration-200 ${
                  color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 text-secondary hover:text-foreground"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {initialValues ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};