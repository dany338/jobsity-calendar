import React, { Suspense, lazy } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import ErrorBoundary from './components/ErrorBoundary';
import { useCalendar } from './infrastructure/hooks';
const ModalReminder = lazy(() => import('./components/ModalReminder'));
/* Hooks */

const App = () => {
  const { calendarModalChangeVisibleDispatch } = useCalendar();

  const handleCloseModal = async () => {
    await calendarModalChangeVisibleDispatch(false);
  };

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <div className="app__body">
            <Sidebar />
            <Content />
            <ModalReminder onClose={handleCloseModal} />
          </div>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

export default App;
