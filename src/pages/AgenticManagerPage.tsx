import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Activity, ExternalLink } from 'lucide-react';

// Custom Node Components
interface NodeComponentProps {
  module: {
    id: string;
    name: string;
    description: string;
    bgColor: string;
    icon: string;
    link?: string;
  };
  isRunningModule: boolean;
  isRunning: boolean;
  onNavigate: () => void;
  position: { x: number; y: number };
}

function AgentNode({ isRunning }: { isRunning: boolean }) {
  return (
    <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
      <div className={`w-60 h-32 rounded-2xl bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center shadow-lg border-4 border-white transition-all ${isRunning ? 'animate-pulse ring-4 ring-blue-300' : ''}`}>
        <Activity className="w-10 h-10 text-blue mb-2" />
        <p className="text-sm font-bold text-blue text-center">AI Agent</p>
        <p className="text-xs text-blue/90 text-center px-2">Decision Orchestrator</p>
        <p className="text-xs text-blue/80 text-center">
          {isRunning ? 'Running Analysis...' : 'Ready'}
        </p>
      </div>
    </div>
  );
}

function ToolNode({ module, isRunningModule, isRunning, onNavigate, position }: NodeComponentProps) {
  return (
    <div className="absolute" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
      <button 
        onClick={onNavigate}
        disabled={!module.link || isRunning}
        className={`w-60 h-32 rounded-2xl ${module.bgColor} flex flex-col items-center justify-center shadow-lg border-4 border-white transition-all duration-300 relative ${
          isRunningModule ? 'ring-4 ring-yellow-300 scale-105 shadow-2xl' : 'hover:shadow-xl hover:scale-102'
        } ${module.link ? 'cursor-pointer' : 'cursor-default'} ${!module.link || isRunning ? 'disabled:opacity-50' : ''}`}
      >
        <div className="text-3xl mb-1">{module.icon}</div>
        <p className="text-sm font-bold text-blue text-center px-2 leading-tight">{module.name}</p>
        <p className="text-xs text-blue/90 text-center px-2 leading-tight">{module.description}</p>
        <p className="text-xs text-blue/80 text-center">
          {isRunningModule ? 'Processing...' : 'Idle'}
        </p>

        {isRunningModule && (
          <div className="absolute inset-0 rounded-2xl border-2 border-yellow-300 animate-pulse"></div>
        )}

        {module.link && (
          <div className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 shadow-md">
            <ExternalLink className="h-3 w-3" />
            Open
          </div>
        )}
      </button>
    </div>
  );
}

export default function AgenticManagerPage() {
  const navigate = useNavigate();
  const [days, setDays] = useState(7);
  const [isRunning, setIsRunning] = useState(false);
  const [runningModules, setRunningModules] = useState<Set<string>>(new Set());
  const runIntervalRef = useRef<number | null>(null);
  const runTimeoutRef = useRef<number | null>(null);

  const modules = useMemo(
    () => [
      {
        id: 'rss',
        name: 'RSS Feeds',
        description: 'Real-time News Data',
        color: '#3B82F6',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-600',
        icon: '📰',
        position: { x: 15, y: 50 },
      },
      {
        id: 'geoshock',
        name: 'Geo Shock Simulator',
        description: 'Event Impact Analysis',
        color: '#F59E0B',
        bgColor: 'bg-amber-500',
        textColor: 'text-amber-600',
        icon: '⚡',
        link: '/geopolitical-analysis',
        position: { x: 50, y: 15 },
      },
      {
        id: 'digitaltwin',
        name: 'Digital Twin',
        description: 'Business Simulation',
        color: '#10B981',
        bgColor: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        icon: '🔄',
        link: '/digital-twin',
        position: { x: 85, y: 50 },
      },
    ],
    []
  );

  const pickRandomModules = (count: number) => {
    const result = new Set<string>();
    while (result.size < count) {
      const idx = Math.floor(Math.random() * modules.length);
      result.add(modules[idx].name);
    }
    return result;
  };

  const handleRun = () => {
    if (isRunning) return;

    setIsRunning(true);
    setRunningModules(new Set());

    if (runIntervalRef.current) {
      window.clearInterval(runIntervalRef.current);
    }
    if (runTimeoutRef.current) {
      window.clearTimeout(runTimeoutRef.current);
    }

    runIntervalRef.current = window.setInterval(() => {
      const randomCount = 1 + Math.floor(Math.random() * 2);
      setRunningModules(pickRandomModules(randomCount));
    }, 500);

    runTimeoutRef.current = window.setTimeout(() => {
      if (runIntervalRef.current) {
        window.clearInterval(runIntervalRef.current);
      }
      setIsRunning(false);
      setRunningModules(new Set());
    }, 5200);
  };

  useEffect(() => {
    return () => {
      if (runIntervalRef.current) {
        window.clearInterval(runIntervalRef.current);
      }
      if (runTimeoutRef.current) {
        window.clearTimeout(runTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue" />
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
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-blue rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg inline-flex items-center gap-3 min-w-[140px] justify-center border-2 border-red-700 shadow-lg"
            >
              <Play className="w-5 h-5" />
              {isRunning ? 'Running...' : 'Run Analysis'}
            </button>
          </div>
        </div>

        {/* Visualization Section - Custom Star Graph */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-md mb-16">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Agent ↔ Tool Graph</h3>
            <p className="text-sm text-slate-600">The agent orchestrates three tools in a star topology.</p>
          </div>
          
          <div className="w-full" style={{ height: '600px' }}>
            <div className="h-full w-full border-2 border-slate-100 rounded-xl relative bg-gradient-to-br from-slate-50 to-blue-50 overflow-visible" style={{ position: 'relative', minHeight: '600px' }}>
            
            {/* Agent in Center */}
            <AgentNode isRunning={isRunning} />

            {/* Tool Nodes positioned around agent */}
            {modules.map((module) => (
              <ToolNode
                key={module.id}
                module={module}
                isRunningModule={runningModules.has(module.name)}
                isRunning={isRunning}
                onNavigate={() => module.link && navigate(module.link)}
                position={module.position}
              />
            ))}

            {/* Connection Lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ zIndex: 5 }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7" 
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon 
                    points="0 0, 10 3.5, 0 7" 
                    fill="#cbd5e1" 
                  />
                </marker>
              </defs>
              
              {/* Lines from center agent to each tool */}
              {modules.map((module) => {
                const isAnimated = isRunning && runningModules.has(module.name);
                return (
                  <line
                    key={`line-${module.id}`}
                    x1="50%"
                    y1="50%"
                    x2={`${module.position.x}%`}
                    y2={`${module.position.y}%`}
                    stroke={isAnimated ? '#f59e0b' : '#cbd5e1'}
                    strokeWidth={isAnimated ? 4 : 3}
                    markerEnd="url(#arrowhead)"
                    className={isAnimated ? 'animate-pulse' : ''}
                  />
                );
              })}
            </svg>

            {/* Status indicator */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg" style={{ zIndex: 30 }}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium text-slate-700">
                  {isRunning ? 'Analysis Running' : 'System Ready'}
                </span>
              </div>
              {runningModules.size > 0 && (
                <p className="text-xs text-slate-500 mt-1">
                  Active: {Array.from(runningModules).join(', ')}
                </p>
              )}
            </div>
          </div>
          </div>
        </div>
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
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-blue rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              Geo Shock Simulator
            </button>
            <button
              onClick={() => navigate('/digital-twin')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-blue rounded-lg hover:shadow-lg transition-shadow font-semibold"
            >
              Digital Twin
            </button>
          </div>
        </div>
      </main>
      
      <style>{`
        @keyframes dashArray {
          0% {
            stroke-dashoffset: 12;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}