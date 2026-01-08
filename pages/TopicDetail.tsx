import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicContent } from '../data/topics';
import { useStudy } from '../context/StudyContext';
import { Topic, TopicStatus } from '../types';
import { ArrowLeft, Play, Pause, Square, CheckCircle, RotateCcw, Type, MonitorDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

export const TopicDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { textSize, setTextSize, updateTopicStatus, getTopicProgress } = useStudy();
  
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeSubtopic, setActiveSubtopic] = useState<string | null>(null);
  
  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (id) {
      try {
        const data = getTopicContent(parseInt(id));
        setTopic(data);
        if (data.subtopics.length > 0) {
          setActiveSubtopic(data.subtopics[0].id);
        }
      } catch (e) {
        navigate('/');
      }
    }
  }, [id, navigate]);

  // TTS Logic
  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopSpeech();
    };
  }, [stopSpeech]);

  const toggleSpeech = () => {
    if (!topic || !activeSubtopic) return;

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    const subtopic = topic.subtopics.find(s => s.id === activeSubtopic);
    if (subtopic) {
      // Create text to read (strip basic markdown symbols for cleaner audio)
      const textToRead = subtopic.content.replace(/[#*]/g, '');
      
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'es-ES';
      utterance.rate = rate;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleExportPDF = () => {
    if (!topic) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(topic.title, 10, 10);
    doc.setFontSize(12);
    let y = 20;
    
    topic.subtopics.forEach(sub => {
       if (y > 270) { doc.addPage(); y = 20; }
       doc.setFont("helvetica", "bold");
       doc.text(sub.title, 10, y);
       y += 7;
       doc.setFont("helvetica", "normal");
       const lines = doc.splitTextToSize(sub.content.replace(/[#*]/g, ''), 180);
       doc.text(lines, 10, y);
       y += (lines.length * 5) + 10;
    });

    doc.save(`Tema_${topic.id}_OPE_SERMAS.pdf`);
  };

  if (!topic) return <div className="p-8 text-center">Cargando...</div>;

  const currentProgress = getTopicProgress(topic.id);
  const currentSubtopic = topic.subtopics.find(s => s.id === activeSubtopic);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar Navigation */}
      <aside className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 overflow-y-auto custom-scrollbar">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center text-sm text-gray-500 hover:text-sermas-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver al temario
        </button>

        <h2 className="font-bold text-gray-900 dark:text-white mb-4">{topic.title}</h2>
        
        <div className="space-y-2">
          {topic.subtopics.map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                stopSpeech();
                setActiveSubtopic(sub.id);
              }}
              className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                activeSubtopic === sub.id
                  ? 'bg-sermas-50 text-sermas-700 border border-sermas-200 dark:bg-sermas-900/30 dark:text-sermas-300 dark:border-sermas-800'
                  : 'hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="font-medium text-xs opacity-70 mb-0.5">{sub.id}</div>
              {sub.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="lg:col-span-3 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-wrap gap-4 items-center justify-between bg-gray-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isSpeaking && !isPaused
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-sermas-100 text-sermas-700 dark:bg-sermas-900/30 dark:text-sermas-300'
              }`}
            >
              {isSpeaking && !isPaused ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isSpeaking && !isPaused ? 'Pausar' : 'Escuchar'}
            </button>
            
            {isSpeaking && (
               <button onClick={stopSpeech} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700">
                 <Square className="w-4 h-4 text-gray-600 dark:text-gray-400 fill-current" />
               </button>
            )}

            <select 
              value={rate} 
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="bg-transparent border-none text-xs text-gray-600 dark:text-gray-400 focus:ring-0 cursor-pointer"
            >
              <option value="0.75">0.75x</option>
              <option value="1">1.0x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
             {/* Text Size Controls */}
             <div className="flex items-center gap-1 border-r border-gray-300 dark:border-slate-600 pr-3 mr-1">
               <Type className="w-3 h-3 text-gray-400" />
               <input 
                 type="range" 
                 min="80" 
                 max="150" 
                 value={textSize} 
                 onChange={(e) => setTextSize(parseInt(e.target.value))}
                 className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
               />
             </div>

             <button 
               onClick={handleExportPDF}
               title="Exportar PDF"
               className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500"
             >
               <MonitorDown className="w-5 h-5" />
             </button>

             <button
              onClick={() => {
                const newStatus = currentProgress.status === TopicStatus.Mastered ? TopicStatus.Pending : TopicStatus.Mastered;
                updateTopicStatus(topic.id, newStatus);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentProgress.status === TopicStatus.Mastered
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {currentProgress.status === TopicStatus.Mastered ? (
                <><CheckCircle className="w-4 h-4" /> Estudiado</>
              ) : (
                <><RotateCcw className="w-4 h-4" /> Marcar leído</>
              )}
            </button>
          </div>
        </div>

        {/* Content Render */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          {currentSubtopic ? (
            <div 
              className="prose dark:prose-invert prose-slate max-w-none transition-all duration-200"
              style={{ fontSize: `${textSize}%` }}
            >
              <h2 className="text-2xl font-bold mb-6 text-sermas-800 dark:text-sermas-200">
                {currentSubtopic.id} {currentSubtopic.title}
              </h2>
              <ReactMarkdown 
                components={{
                  h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-600 dark:text-gray-300" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-sermas-700 dark:text-sermas-300" {...props} />
                }}
              >
                {currentSubtopic.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Selecciona un subtema para comenzar
            </div>
          )}
        </div>
      </section>
    </div>
  );
};