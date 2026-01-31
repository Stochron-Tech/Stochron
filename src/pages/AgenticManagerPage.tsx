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
  const [timePeriod, setTimePeriod] = useState('7days');
  const [isRunning, setIsRunning] = useState(false);
  const [runningModules, setRunningModules] = useState<RunningModule[]>([]);
  const [dominantColor, setDominantColor] = useState('from-blue-600 to-teal-600');

  const modules = [
    { name: 'RSS Feeds', color: '#3B82F6', bgColor: 'from-blue-500 to-blue-600', icon: '📰' },
    { name: 'Geo Shock Simulator', color: '#F59E0B', bgColor: 'from-amber-500 to-orange-600', icon: '⚡', link: '/dashboard' },
    { name: 'Digital Twin', color: '#10B981', bgColor: 'from-green-500 to-emerald-600', icon: '🔄', link: '/digital-twin' },
  ];

  const handleRun = async () => {
    setIsRunning(true);
    setRunningModules([]);

    // Simulate sequential module activation
    for (let i = 0; i < modules.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setRunningModules(prev => [...prev, modules[i]]);
      
      // Update background color based on the running module
      if (i === 0) setDominantColor('from-blue-600 to-blue-700');
      else if (i === 1) setDominantColor('from-amber-600 to-orange-700');
      else if (i === 2) setDominantColor('from-green-600 to-emerald-700');
    }

    // Simulate completion
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRunning(false);
    setRunningModules([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold text-white">Agentic Workflow Manager</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Agentic Decision Workflow</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Watch how our AI agent orchestrates multiple tools to synthesize geopolitical intelligence and deliver pricing recommendations
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-8 mb-16">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-3">
                Analysis Time Period
              </label>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                disabled={isRunning}
                className="w-full md:w-64 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>

            <button
              onClick={handleRun}
              disabled={isRunning}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running Analysis...' : 'Run Analysis'}
            </button>
          </div>
        </div>

        {/* Visualization Section */}
        <div className={`rounded-3xl border border-slate-700 p-12 transition-all duration-500 ${isRunning ? `bg-gradient-to-br ${dominantColor} bg-opacity-10 border-opacity-50` : 'bg-slate-800/30'}`}>
          <div className="flex flex-col items-center justify-center space-y-12 min-h-96">
            {/* Central Agent Node */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 opacity-20 ${isRunning ? 'animate-pulse' : ''}`}></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 flex items-center justify-center shadow-lg border-2 border-blue-300/50">
                <Activity className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-spin" style={{ animationDuration: '4s' }}></div>
            </div>

            <div className="text-center text-slate-200 font-semibold">Agentic Manager</div>

            {/* Tool Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {modules.map((module) => {
                const isRunning = runningModules.some(m => m.name === module.name);
                return (
                  <div key={module.name} className="flex flex-col items-center">
                    {/* Connection line */}
                    <div className={`h-12 w-1 ${isRunning ? `bg-gradient-to-b ${module.bgColor}` : 'bg-slate-600'} transition-all`}></div>

                    {/* Tool Node */}
                    <button
                      onClick={() => {
                        const link = (module as any).link;
                        if (link && !isRunning) navigate(link);
                      }}
                      className={`relative w-24 h-24 rounded-full flex items-center justify-center text-3xl transition-all ${
                        isRunning
                          ? `bg-gradient-to-br ${module.bgColor} shadow-2xl scale-110`
                          : 'bg-slate-700 hover:bg-slate-600 shadow-lg'
                      } border-2 ${isRunning ? 'border-white/50' : 'border-slate-600'} group`}
                    >
                      {module.icon}

                      {/* LED Light Effect */}
                      {isRunning && (
                        <>
                          <div className="absolute inset-0 rounded-full opacity-50 animate-pulse" style={{ background: module.color }}></div>
                          <div className="absolute -inset-1 rounded-full border-2" style={{ borderColor: module.color, opacity: 0.7 }}></div>
                        </>
                      )}

                      {/* Tooltip for clickable modules */}
                      {(module as any).link && !isRunning && (
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-slate-700 text-xs text-slate-200 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Click to explore
                        </div>
                      )}
                    </button>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-slate-200">{module.name}</p>
                      {isRunning && (
                        <p className="text-xs text-emerald-400 mt-1 font-semibold">● Running</p>
                      )}
                    </div>
                  </div>
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
              icon: '📊'
            },
            {
              title: 'Step 2: Shock Analysis',
              description: 'The Geopolitical Shock Simulator analyzes how current events could impact business operations and supply chains',
              icon: '⚡'
            },
            {
              title: 'Step 3: Digital Twin Simulation',
              description: 'The Digital Twin models your business under different geopolitical scenarios to predict pricing impacts',
              icon: '🔄'
            }
          ].map((step, idx) => (
            <div key={idx} className="bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors">
              <div className="text-2xl mb-3">{step.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to see your pricing recommendations?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Run the workflow above to see how the agent synthesizes data. Then explore your Digital Twin to understand the specific impact on your business.
          </p>
          <button
            onClick={() => navigate('/digital-twin')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold"
          >
            Explore Digital Twin
          </button>
        </div>
      </main>
    </div>
  );
}
