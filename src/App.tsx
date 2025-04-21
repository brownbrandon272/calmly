import React, { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { MusicTab } from './tabs/MusicTab';
import { HabitsTab } from './tabs/HabitsTab';

function App() {
  const [activeTab, setActiveTab] = useState('music');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold text-primary">Calmly</h1>
          <p className="text-secondary text-sm">Find your peace, one breath at a time</p>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="page-transition" style={{ opacity: 1 }}>
          {activeTab === 'music' ? <MusicTab /> : <HabitsTab />}
        </div>
      </main>
      
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;