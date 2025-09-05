import React from 'react';
import { Wizard } from './components/Wizard';
import { Toast } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import './styles/colors.scss';

function App() {
  const { toast, hideToast } = useToast();

  return (
    <div className="App">
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