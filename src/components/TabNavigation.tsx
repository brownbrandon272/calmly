import React from 'react';
import { Music, ListChecks, UserCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { user, signIn, signOut } = useAuth();

  const handleProfileClick = async () => {
    if (user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-around">
          <button
            className={`flex-1 py-4 flex flex-col items-center space-y-1 tab-transition ${
              activeTab === 'music' ? 'tab-active' : 'tab-inactive'
            }`}
            onClick={() => onTabChange('music')}
          >
            <Music size={20} />
            <span className="text-xs font-medium">Music</span>
          </button>
          
          <button
            className={`flex-1 py-4 flex flex-col items-center space-y-1 tab-transition ${
              activeTab === 'habits' ? 'tab-active' : 'tab-inactive'
            }`}
            onClick={() => onTabChange('habits')}
          >
            <ListChecks size={20} />
            <span className="text-xs font-medium">Habits</span>
          </button>

          <button
            className="flex-1 py-4 flex flex-col items-center space-y-1 tab-transition text-secondary hover:text-primary-dark"
            onClick={handleProfileClick}
          >
            <UserCircle2 size={20} className={user ? 'text-primary' : ''} />
            <span className="text-xs font-medium">
              {user ? 'Profile' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};