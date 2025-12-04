import { useEffect, useState } from 'react';
import './styles/globals.css';
import { Activity, TrendingUp, Shield, Map, Calendar, BarChart, Zap, Menu, BarChart3, BookOpen } from 'lucide-react';
import { Button } from './components/ui/button';
import ModelIntroduction from './components/ModelIntroduction';
import ForecastingEngine from './components/ForecastingEngine';
import ForebodingLagModule from './components/ForebodingLagModule';
import SupplyChainVulnerability from './components/SupplyChainVulnerability';
import RiskExposureMap from './components/RiskExposureMap';
import MacroCorrelationEngineEnhanced from './components/MacroCorrelationEngineEnhanced';
import EventTimelineTracker from './components/EventTimelineTracker';
import ShockSimulator from './components/ShockSimulator';
import api, { API_BASE } from "./api";
import Login from "./components/Login";

const modules = [
  { id: 'introduction', name: 'Platform Overview', icon: BookOpen },
  { id: 'forecasting', name: 'Forecasting Engine', icon: Activity },
  { id: 'foreboding', name: 'Foreboding-Lag Module', icon: TrendingUp },
  { id: 'risk-exposure', name: 'Risk Exposure Map', icon: Map },
  { id: 'supply-chain', name: 'Supply Chain Vulnerability', icon: Shield },
  { id: 'macro-correlation', name: 'Macro-Correlation Engine', icon: BarChart },
  { id: 'events', name: 'Event Timeline Tracker', icon: Calendar },
  { id: 'simulation', name: 'Shock Simulator', icon: Zap },
];

export default function App() {
  const [activeModule, setActiveModule] = useState('introduction');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Bootstrap CSRF cookie
  useEffect(() => {
    fetch(`${API_BASE}/api/csrf/`, {
      method: "GET",
      credentials: "include",
    }).catch(console.error);
    // Attempt to fetch current session
    api.get("/api/me/").then(() => {
      setIsLoggedIn(true);
    }).catch(() => {
      setIsLoggedIn(false);
    });
  }, []);

  // Optional: expose logout via header/menu later


  const renderModule = () => {
    switch (activeModule) {
      case 'introduction': return <ModelIntroduction />;
      case 'forecasting': return <ForecastingEngine />;
      case 'foreboding': return <ForebodingLagModule />;
      case 'risk-exposure': return <RiskExposureMap />;
      case 'supply-chain': return <SupplyChainVulnerability />;
      case 'macro-correlation': return <MacroCorrelationEngineEnhanced />;
      case 'events': return <EventTimelineTracker />;
      case 'simulation': return <ShockSimulator />;
      default: return <ModelIntroduction />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLoggedIn={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Professional Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-foreground">
                    Financial Markets Intelligence
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Apple Inc. (AAPL) Strategic Analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="hidden sm:block text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-[89px] left-0 w-64 h-[calc(100vh-89px)] bg-card border-r border-border transition-transform duration-300 z-40 overflow-y-auto`}>
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-primary text-sm mb-1">Analysis Modules</h2>
              <p className="text-muted-foreground text-xs">Select a module to view insights</p>
            </div>
            <nav className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <button
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all rounded-lg ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    <span className="text-sm">{module.name}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-8 p-4 bg-secondary border border-border rounded-lg">
              <div className="text-primary text-xs mb-3">System Status</div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Data Currency</span>
                  <span className="text-green-400">Current</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Modules</span>
                  <span className="text-green-400">8/8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Update</span>
                  <span className="text-foreground">Nov 10, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/40 z-30 top-[89px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 min-h-[calc(100vh-89px)] bg-background">
          <div className="mb-6">
            <h2 className="text-foreground mb-2">
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
            <div className="h-1 w-16 bg-primary rounded-full"></div>
          </div>
          {renderModule()}
        </main>
      </div>
    </div>
  );
}