import React from 'react';
import { useStudy } from '../context/StudyContext';
import { TOPICS } from '../data/topics';
import { TopicStatus, UserProgress } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const { progress } = useStudy();

  // Calculate stats
  const totalTopics = TOPICS.length;
  const mastered = Object.values(progress).filter((p: UserProgress) => p.status === TopicStatus.Mastered).length;
  const inReview = Object.values(progress).filter((p: UserProgress) => p.status === TopicStatus.InReview).length;
  const pending = totalTopics - mastered - inReview;

  const pieData = [
    { name: 'Estudiado', value: mastered, color: '#22c55e' }, // green-500
    { name: 'En Repaso', value: inReview, color: '#f59e0b' }, // amber-500
    { name: 'Pendiente', value: pending, color: '#e2e8f0' }, // slate-200
  ];

  const categoryStats = TOPICS.reduce((acc, topic) => {
    if (!acc[topic.category]) acc[topic.category] = { total: 0, completed: 0 };
    acc[topic.category].total += 1;
    if (progress[topic.id]?.status === TopicStatus.Mastered) {
      acc[topic.category].completed += 1;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const barData = Object.entries(categoryStats).map(([name, stats]) => ({
    name: name.split(' ')[0], // Shorten name
    completed: stats.completed,
    total: stats.total
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de Progreso</h1>
        <p className="text-gray-500 dark:text-gray-400">Estadísticas de tu preparación OPE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
           <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Progreso Global</h3>
           <div className="w-full h-48">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={pieData}
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {pieData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                   ))}
                 </Pie>
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="text-center mt-2">
             <span className="text-3xl font-bold text-sermas-600">{Math.round((mastered / totalTopics) * 100)}%</span>
             <p className="text-sm text-gray-500">Completado</p>
           </div>
        </div>

        {/* Detailed Stats */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Por Categoría</h3>
          <div className="w-full h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={100} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                 />
                 <Bar dataKey="total" fill="#f1f5f9" radius={[0, 4, 4, 0]} barSize={20} stackId="a" />
                 <Bar dataKey="completed" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} stackId="a" />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Actionable Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Temas Totales', val: totalTopics, color: 'text-gray-600 dark:text-gray-300' },
          { label: 'Estudiados', val: mastered, color: 'text-green-600' },
          { label: 'En Revisión', val: inReview, color: 'text-amber-500' },
          { label: 'Pendientes', val: pending, color: 'text-gray-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm text-center">
            <p className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.val}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};