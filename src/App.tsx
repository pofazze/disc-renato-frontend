import React from 'react';
import { Wizard } from './components/Wizard';
import { Toast } from './components/ui/Toast';
import { useToast } from './hooks/useToast';

function App() {
  const { toast, hideToast } = useToast();

  return (
    <div className="h-screen-safe py-10 overflow-hidden bg-dark-950 text-white">
      <Wizard />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;