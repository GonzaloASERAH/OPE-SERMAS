import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StudyProvider } from './context/StudyContext';
import { Layout } from './components/Layout';
import { TopicList } from './pages/TopicList';
import { TopicDetail } from './pages/TopicDetail';
import { Dashboard } from './pages/Dashboard';
import { FlashcardsMode } from './pages/FlashcardsMode';

const App: React.FC = () => {
  return (
    <StudyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TopicList />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
            <Route path="/stats" element={<Dashboard />} />
            <Route path="/flashcards" element={<FlashcardsMode />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StudyProvider>
  );
};

export default App;