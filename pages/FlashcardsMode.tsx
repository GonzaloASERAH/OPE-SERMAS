import React, { useState, useEffect } from 'react';
import { TOPICS, getTopicContent } from '../data/topics';
import { TopicStatus } from '../types';
import { useStudy } from '../context/StudyContext';
import { RefreshCw, Check, X, Brain } from 'lucide-react';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topicId: number;
}

export const FlashcardsMode: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionOver, setSessionOver] = useState(false);
  const { updateTopicStatus } = useStudy();

  useEffect(() => {
    // Generate flashcards from topics (Simplified for demo: Use Topic 1 real data, others generic)
    const generatedCards: Flashcard[] = [];
    
    // Process real data from Topic 1
    const topic1 = getTopicContent(1);
    topic1.subtopics.forEach(sub => {
      generatedCards.push({
        id: sub.id,
        question: `¿Qué abarca el apartado: ${sub.title}?`,
        answer: sub.content.substring(0, 150) + "...", // Snippet as answer
        topicId: 1
      });
    });

    // Add generic cards for other topics
    TOPICS.slice(1, 6).forEach(t => {
       generatedCards.push({
         id: `t${t.id}`,
         question: `Resume el objetivo principal de: ${t.title}`,
         answer: "Contenido pendiente de estudio. Revisa el tema completo.",
         topicId: t.id
       });
    });

    // Shuffle
    setCards(generatedCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleNext = (remembered: boolean) => {
    if (remembered) {
      // Logic to update spaced repetition could go here
      // For now, mark parent topic as 'In Review' if it was pending
      updateTopicStatus(cards[currentIndex].topicId, TopicStatus.InReview);
    }

    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setSessionOver(true);
      }
    }, 200);
  };

  const restart = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setSessionOver(false);
    setIsFlipped(false);
  };

  if (cards.length === 0) return <div className="p-8 text-center">Generando tarjetas...</div>;

  if (sessionOver) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-6">
          <Brain className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">¡Repaso completado!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Has revisado {cards.length} tarjetas.</p>
        <button 
          onClick={restart}
          className="flex items-center gap-2 px-6 py-3 bg-sermas-600 text-white rounded-xl hover:bg-sermas-700 transition-colors shadow-lg"
        >
          <RefreshCw className="w-5 h-5" /> Repasar otra vez
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6 px-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Tarjeta {currentIndex + 1} de {cards.length}
        </span>
        <span className="text-xs bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
           Tema {currentCard.topicId}
        </span>
      </div>

      {/* Card Container */}
      <div 
        className="relative w-full h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-sermas-600 font-bold uppercase tracking-wider mb-4">Pregunta</p>
            <h3 className="text-xl font-medium text-gray-800 dark:text-white">{currentCard.question}</h3>
            <p className="mt-8 text-xs text-gray-400">(Toca para ver respuesta)</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-sermas-50 dark:bg-slate-900 border-2 border-sermas-200 dark:border-slate-700 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-sermas-600 font-bold uppercase tracking-wider mb-4">Respuesta</p>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">{currentCard.answer}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-8 w-full max-w-sm">
        <button 
          onClick={() => handleNext(false)}
          className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40"
        >
          <X className="w-5 h-5" /> Difícil
        </button>
        <button 
          onClick={() => handleNext(true)}
          className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl bg-green-100 hover:bg-green-200 text-green-700 font-medium transition-colors dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/40"
        >
          <Check className="w-5 h-5" /> Fácil
        </button>
      </div>
    </div>
  );
};