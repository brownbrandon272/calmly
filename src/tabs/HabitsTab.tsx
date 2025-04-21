import React, { useState, useEffect } from 'react';
import { HabitList } from '../components/HabitList';
import { HabitForm } from '../components/HabitForm';
import { Plus } from 'lucide-react';
import { Habit } from '../types/habit';

export const HabitsTab: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  // Load habits from localStorage on init
  useEffect(() => {
    const savedHabits = localStorage.getItem('calmly-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    } else {
      // Add some default habits if none exist
      const defaultHabits: Habit[] = [
        {
          id: '1',
          name: 'Meditate',
          color: '#2A9D8F',
          trackedDays: {},
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Journal',
          color: '#8E9AAF',
          trackedDays: {},
          createdAt: new Date().toISOString(),
        },
      ];
      setHabits(defaultHabits);
      localStorage.setItem('calmly-habits', JSON.stringify(defaultHabits));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calmly-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      trackedDays: {},
    };
    
    setHabits([...habits, newHabit]);
    setShowForm(false);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(h => (h.id === updatedHabit.id ? updatedHabit : h)));
    setEditingHabit(null);
    setShowForm(false);
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const toggleDay = (habitId: string, dateKey: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newTrackedDays = { ...habit.trackedDays };
        
        // Toggle the completion status
        if (newTrackedDays[dateKey]) {
          delete newTrackedDays[dateKey];
        } else {
          newTrackedDays[dateKey] = true;
        }
        
        return { ...habit, trackedDays: newTrackedDays };
      }
      return habit;
    }));
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setShowForm(true);
  };

  return (
    <div className="pb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Mindful Habits</h2>
        <button 
          className="btn btn-primary flex items-center space-x-1"
          onClick={() => {
            setEditingHabit(null);
            setShowForm(!showForm);
          }}
        >
          <Plus size={18} />
          <span>New Habit</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <HabitForm 
            onSubmit={editingHabit ? updateHabit : addHabit} 
            onCancel={() => {
              setShowForm(false);
              setEditingHabit(null);
            }}
            initialValues={editingHabit || undefined}
          />
        </div>
      )}
      
      <HabitList 
        habits={habits} 
        onToggleDay={toggleDay} 
        onEdit={handleEdit}
        onDelete={deleteHabit}
      />
    </div>
  );
};