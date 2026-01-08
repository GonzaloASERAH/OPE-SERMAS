import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, TopicStatus, UserProgress } from '../types';

interface StudyContextType extends AppState {
  toggleDarkMode: () => void;
  updateTopicStatus: (topicId: number, status: TopicStatus) => void;
  setTextSize: (size: number) => void;
  getTopicProgress: (topicId: number) => UserProgress;
}

const defaultState: AppState = {
  progress: {},
  darkMode: false,
  textSize: 100,
};

const StudyContext = createContext<StudyContextType | undefined>(undefined);

export const StudyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('sermas_app_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('sermas_app_state', JSON.stringify(state));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const setTextSize = (size: number) => {
    setState(prev => ({ ...prev, textSize: size }));
  };

  const updateTopicStatus = (topicId: number, status: TopicStatus) => {
    setState(prev => {
      const currentProgress = prev.progress[topicId] || { topicId, timesReviewed: 0 };
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [topicId]: {
            ...currentProgress,
            status,
            lastStudied: new Date().toISOString(),
            timesReviewed: currentProgress.timesReviewed + 1
          }
        }
      };
    });
  };

  const getTopicProgress = (topicId: number): UserProgress => {
    return state.progress[topicId] || { topicId, status: TopicStatus.Pending, timesReviewed: 0 };
  };

  return (
    <StudyContext.Provider value={{
      ...state,
      toggleDarkMode,
      updateTopicStatus,
      setTextSize,
      getTopicProgress
    }}>
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);
  if (!context) throw new Error("useStudy must be used within StudyProvider");
  return context;
};