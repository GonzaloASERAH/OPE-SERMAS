import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOPICS } from '../data/topics';
import { useStudy } from '../context/StudyContext';
import { TopicCategory, TopicStatus } from '../types';
import { Search, CheckCircle2, Clock, Circle, Filter } from 'lucide-react';

export const TopicList: React.FC = () => {
  const navigate = useNavigate();
  const { getTopicProgress } = useStudy();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | 'All'>('All');

  const filteredTopics = useMemo(() => {
    return TOPICS.filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            topic.id.toString().includes(searchTerm);
      const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = Object.values(TopicCategory);

  const getStatusIcon = (status: TopicStatus) => {
    switch (status) {
      case TopicStatus.Mastered:
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case TopicStatus.InReview:
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Temario Oficial</h1>
          <p className="text-gray-500 dark:text-gray-400">31 Temas de Auxiliar Administrativo</p>
        </div>
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sermas-500 focus:border-transparent outline-none"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TopicCategory | 'All')}
            className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sermas-500 outline-none"
          >
            <option value="All">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic) => {
          const progress = getTopicProgress(topic.id);
          return (
            <div
              key={topic.id}
              onClick={() => navigate(`/topic/${topic.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-sermas-300 dark:hover:border-sermas-700 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300">
                  Tema {topic.id}
                </span>
                {getStatusIcon(progress.status)}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-sermas-600 dark:group-hover:text-sermas-400 transition-colors">
                {topic.title}
              </h3>
              
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{topic.category}</span>
                {progress.timesReviewed > 0 && (
                  <span>Repasado: {progress.timesReviewed} veces</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No se encontraron temas con esos criterios.</p>
        </div>
      )}
    </div>
  );
};