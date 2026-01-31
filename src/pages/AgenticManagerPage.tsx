import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Activity } from 'lucide-react';

interface RunningModule {
  name: string;
  color: string;
  bgColor: string;
  icon: string;
}

export default function AgenticManagerPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(7);
  const [isRunning, setIsRunning] = useState(false);
  const [runningModules, setRunningModules] = useState<Set<string>>(new Set());

  const modules = [
    { name: 'RSS Feeds', color: '#3B82F6', bgColor: 'bg-blue-500', textColor: 'text-blue-600', icon: '📰', position: 'top' },
    { name: 'Geo Shock Simulator', color: '#F59E0B', bgColor: 'bg-amber-500', textColor: 'text-amber-600', icon: '⚡', link: '/geopolitical-analysis', position: 'left' },
    { name: 'Digital Twin', color: '#10B981', bgColor: 'bg-emerald-500', textColor: 'text-emerald-600', icon: '🔄', link: '/digital-twin', position: 'right' },
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setRunningModules(new Set());

    // Simulate sequential module activation
    for (const module of modules) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setRunningModules(prev => new Set([...prev, module.name]));
    }

    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRunning(false);
    setRunningModules(new Set());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-slate-900">Agentic Workflow Manager</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full border border-blue-300 mb-4">
            <span className="text-sm font-semibold text-blue-700">AI Decision Engine</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900">Agentic Decision Workflow</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Watch how our AI agent orchestrates multiple tools to synthesize geopolitical intelligence and deliver pricing recommendations
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 mb-16 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Number of Days to Analyze
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                disabled={isRunning}
                min="1"
                max="365"
                className="w-full md:w-48 px-4 py-3 bg-slate-50 border-2 border-slate-300 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold inline-flex items-center gap-2 w-full md:w-auto justify-center"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Analysis'}
            </button>
          </div>
        </div>

        {/* Visualization Section - Graph Layout */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md mb-16">
          <div className="relative w-full h-96 flex items-center justify-center">
            {/* SVG for connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#cbd5e1" />
                </marker>
              </defs>
              {/* Top to Center */}
              <line x1="50%" y1="15%" x2="50%" y2="38%" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" />
              {/* Left to Center */}
              <line x1="15%" y1="50%" x2="34%" y2="50%" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" />
              {/* Right to Center */}
              <line x1="66%" y1="50%" x2="85%" y2="50%" stroke="#cbd5e1" strokeWidth="3" markerEnd="url(#arrowhead)" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center" style={{ zIndex: 2 }}>
              {/* Central Agent Node */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className={`w-32 h-28 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center shadow-lg border-3 border-white transition-all ${isRunning ? 'animate-pulse ring-4 ring-blue-300' : ''}`}>
                  <div className="text-center">
                    <Activity className="w-10 h-10 text-white mx-auto mb-1" />
                    <p className="text-xs font-bold text-white">Agent</p>
                  </div>
                </div>
              </div>

              {/* Tool Nodes */}
              {modules.map((module) => {
                const isRunningModule = runningModules.has(module.name);
                let positionClass = '';
                
                if (module.position === 'top') positionClass = 'top-0 left-1/2 transform -translate-x-1/2';
                else if (module.position === 'left') positionClass = 'left-0 top-1/2 transform -translate-y-1/2';
                else if (module.position === 'right') positionClass = 'right-0 top-1/2 transform -translate-y-1/2';

                return (
                  <button
                    key={module.name}
                    onClick={() => {
                      const link = (module as any).link;
                      if (link && !isRunning) navigate(link);
                    }}
                    className={`absolute ${positionClass} group z-10`}
                  >
                    <div className={`w-32 h-28 rounded-2xl ${module.bgColor} flex flex-col items-center justify-center shadow-lg border-3 border-white transition-all duration-300 relative ${
                      isRunningModule ? 'ring-4 ring-yellow-300 scale-110 shadow-2xl' : 'hover:shadow-xl hover:scale-105'
                    }`}>
                      <div className="text-3xl mb-1">{module.icon}</div>
                      <p className="text-xs font-bold text-white text-center px-2 leading-tight">{module.name}</p>
                      
                      {isRunningModule && (
                        <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300 animate-pulse"></div>
                      )}

                      {(module as any).link && !isRunningModule && (
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-800 text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium z-20">
                          Click to explore
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Step 1: Data Aggregation',
              description: 'The agent pulls real-time data from RSS feeds tracking geopolitical events, market movements, and supply chain disruptions',
              icon: '📊',
              color: 'from-blue-100 to-cyan-100',
              border: 'border-blue-300'
            },
            {
              title: 'Step 2: Shock Analysis',
              description: 'The Geopolitical Shock Simulator analyzes how current events could impact business operations and supply chains',
              icon: '⚡',
              color: 'from-amber-100 to-orange-100',
              border: 'border-amber-300'
            },
            {
              title: 'Step 3: Digital Twin Simulation',
              description: 'The Digital Twin models your business under different geopolitical scenarios to predict pricing impacts',
              icon: '🔄',
              color: 'from-emerald-100 to-teal-100',
              border: 'border-emerald-300'
            }
          ].map((step, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${step.color} rounded-xl border-2 ${step.border} p-6 hover:shadow-md transition-all`}>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-700 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-100 to-teal-100 border-2 border-blue-300 rounded-2xl p-12 text-center shadow-md">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to explore the system?</h3>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto text-lg">
            Run the workflow above to see how the agent orchestrates the analysis. Then click on the modules to explore each component in detail.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/geopolitical-analysis')}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              Geo Shock Simulator
            </button>
            <button
              onClick={() => navigate('/digital-twin')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              Digital Twin
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
