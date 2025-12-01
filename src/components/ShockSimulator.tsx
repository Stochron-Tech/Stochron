import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Zap, Plus, X, Play, RotateCcw, Sparkles, TrendingDown, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Shock {
  id: string;
  type: 'geopolitical' | 'supply_chain' | 'macro' | 'regulatory' | 'competitive';
  name: string;
  magnitude: number; // 0-100
  duration: string;
  description: string;
}

const availableShocks = [
  {
    type: 'geopolitical' as const,
    name: 'Taiwan Invasion Scenario',
    defaultMagnitude: 85,
    description: 'Military conflict disrupts TSMC production; semiconductor supply halt; global tech supply chain collapse',
    impacts: { stock: -45, volatility: +180, recovery: '24+ months' }
  },
  {
    type: 'geopolitical' as const,
    name: 'US-China Tech Decoupling',
    defaultMagnitude: 70,
    description: 'Complete ban on China sales; export controls on advanced tech; forced supply chain exit',
    impacts: { stock: -28, volatility: +95, recovery: '18-24 months' }
  },
  {
    type: 'supply_chain' as const,
    name: 'Foxconn Shutdown (China)',
    defaultMagnitude: 75,
    description: 'COVID lockdowns or labor unrest closes primary manufacturing hub; 60-90 day production halt',
    impacts: { stock: -18, volatility: +65, recovery: '6-9 months' }
  },
  {
    type: 'supply_chain' as const,
    name: 'Rare Earth Export Ban',
    defaultMagnitude: 65,
    description: 'China restricts critical mineral exports; component shortage for displays/chips/batteries',
    impacts: { stock: -22, volatility: +72, recovery: '12-18 months' }
  },
  {
    type: 'macro' as const,
    name: 'Fed Emergency Rate Hike (+200bps)',
    defaultMagnitude: 60,
    description: 'Inflation shock forces aggressive Fed tightening; tech multiple compression; recession fears',
    impacts: { stock: -25, volatility: +88, recovery: '9-12 months' }
  },
  {
    type: 'macro' as const,
    name: 'Global Recession (GDP -3%)',
    defaultMagnitude: 70,
    description: 'Severe economic downturn; consumer spending collapse; iPhone/Services demand destruction',
    impacts: { stock: -32, volatility: +110, recovery: '18-24 months' }
  },
  {
    type: 'regulatory' as const,
    name: 'App Store Forced Divestiture',
    defaultMagnitude: 55,
    description: 'DOJ wins antitrust case; Apple forced to spin off App Store or allow sideloading',
    impacts: { stock: -15, volatility: +48, recovery: '12-18 months' }
  },
  {
    type: 'regulatory' as const,
    name: 'Global Data Localization Mandates',
    defaultMagnitude: 50,
    description: 'EU/China/India require local data storage; iCloud architecture overhaul; compliance costs',
    impacts: { stock: -8, volatility: +32, recovery: '6-12 months' }
  },
  {
    type: 'competitive' as const,
    name: 'iPhone Market Share Collapse',
    defaultMagnitude: 60,
    description: 'Samsung/Chinese OEMs gain significant share; failed product cycle; innovation stagnation',
    impacts: { stock: -20, volatility: +58, recovery: '12-18 months' }
  },
];

export default function ShockSimulator() {
  const [selectedShocks, setSelectedShocks] = useState<Shock[]>([]);
  const [simulationRun, setSimulationRun] = useState(false);

  const addShock = (template: typeof availableShocks[0]) => {
    const newShock: Shock = {
      id: `shock-${Date.now()}`,
      type: template.type,
      name: template.name,
      magnitude: template.defaultMagnitude,
      duration: '6 months',
      description: template.description
    };
    setSelectedShocks([...selectedShocks, newShock]);
  };

  const removeShock = (id: string) => {
    setSelectedShocks(selectedShocks.filter(s => s.id !== id));
  };

  const updateMagnitude = (id: string, magnitude: number) => {
    setSelectedShocks(selectedShocks.map(s => 
      s.id === id ? { ...s, magnitude } : s
    ));
  };

  const runSimulation = () => {
    setSimulationRun(true);
  };

  const resetSimulation = () => {
    setSelectedShocks([]);
    setSimulationRun(false);
  };

  // Calculate aggregate impact
  const calculateImpact = () => {
    if (selectedShocks.length === 0) return { stock: 0, volatility: 0, recovery: 'N/A' };
    
    let totalStockImpact = 0;
    let totalVolatility = 0;
    
    selectedShocks.forEach(shock => {
      const template = availableShocks.find(s => s.name === shock.name);
      if (template) {
        const scaleFactor = shock.magnitude / template.defaultMagnitude;
        totalStockImpact += template.impacts.stock * scaleFactor;
        totalVolatility += template.impacts.volatility * scaleFactor;
      }
    });

    // Interaction effects (non-linear)
    if (selectedShocks.length > 1) {
      totalStockImpact *= 1.15; // Compounding negative effects
      totalVolatility *= 1.25;
    }

    const maxRecovery = Math.max(...selectedShocks.map(shock => {
      const template = availableShocks.find(s => s.name === shock.name);
      return parseInt(template?.impacts.recovery || '0');
    }));

    return {
      stock: Math.round(totalStockImpact * 10) / 10,
      volatility: Math.round(totalVolatility),
      recovery: maxRecovery >= 24 ? '24+ months' : maxRecovery >= 18 ? '18-24 months' : maxRecovery >= 12 ? '12-18 months' : '6-12 months'
    };
  };

  const impact = calculateImpact();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-card via-card to-secondary/20 border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-primary">Interactive Shock Simulator</h1>
            <p className="text-muted-foreground text-sm">
              Build custom scenarios by combining multiple market shocks and analyze integrated impact on AAPL
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Shock Library */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-card border-border">
            <h2 className="text-primary mb-4">Shock Library</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Click to add shocks to your scenario
            </p>

            <Tabs defaultValue="geopolitical">
              <TabsList className="grid w-full grid-cols-2 bg-secondary mb-4">
                <TabsTrigger value="geopolitical" className="text-xs">Geopolitical</TabsTrigger>
                <TabsTrigger value="supply_chain" className="text-xs">Supply Chain</TabsTrigger>
              </TabsList>
              <TabsList className="grid w-full grid-cols-3 bg-secondary mb-4">
                <TabsTrigger value="macro" className="text-xs">Macro</TabsTrigger>
                <TabsTrigger value="regulatory" className="text-xs">Regulatory</TabsTrigger>
                <TabsTrigger value="competitive" className="text-xs">Competitive</TabsTrigger>
              </TabsList>

              {['geopolitical', 'supply_chain', 'macro', 'regulatory', 'competitive'].map(category => (
                <TabsContent key={category} value={category} className="space-y-2">
                  {availableShocks
                    .filter(s => s.type === category)
                    .map((shock, idx) => (
                      <div 
                        key={idx}
                        className="bg-secondary/20 border border-border rounded-lg p-3 hover:border-primary/50 transition-colors cursor-pointer"
                        onClick={() => addShock(shock)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-foreground text-sm flex-1">{shock.name}</h3>
                          <Plus className="w-4 h-4 text-primary flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-muted-foreground text-xs">{shock.description}</p>
                        <div className="mt-2 text-xs">
                          <span className="text-red-400">{shock.impacts.stock}%</span>
                          <span className="text-muted-foreground mx-2">•</span>
                          <span className="text-muted-foreground">{shock.impacts.recovery}</span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Right: Scenario Builder & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Shocks */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-primary">Scenario Configuration</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetSimulation}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button 
                  size="sm" 
                  onClick={runSimulation}
                  disabled={selectedShocks.length === 0}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
              </div>
            </div>

            {selectedShocks.length === 0 ? (
              <div className="text-center py-12 bg-secondary/20 border border-dashed border-border rounded-lg">
                <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">
                  No shocks selected. Add shocks from the library to build your scenario.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedShocks.map((shock) => (
                  <div key={shock.id} className="bg-secondary/20 border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-foreground">{shock.name}</h3>
                          <Badge variant="outline" className="border-primary text-primary text-xs">
                            {shock.type.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{shock.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeShock(shock.id)}
                        className="ml-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-muted-foreground text-sm">Magnitude</span>
                        <span className="text-foreground">{shock.magnitude}%</span>
                      </div>
                      <Slider
                        value={[shock.magnitude]}
                        onValueChange={(values: number[]) => updateMagnitude(shock.id, values[0])}
                        min={10}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Simulation Results */}
          {simulationRun && selectedShocks.length > 0 && (
            <>
              <Card className="p-6 bg-card border-border">
                <h2 className="text-primary mb-4">Integrated Impact Assessment</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-red-400" />
                      <span className="text-muted-foreground text-sm">Stock Impact</span>
                    </div>
                    <div className="text-red-400 text-3xl mb-1">{impact.stock}%</div>
                    <div className="text-muted-foreground text-xs">Projected price change</div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      <span className="text-muted-foreground text-sm">Volatility Spike</span>
                    </div>
                    <div className="text-amber-400 text-3xl mb-1">+{impact.volatility}%</div>
                    <div className="text-muted-foreground text-xs">Annualized volatility</div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCcw className="w-5 h-5 text-cyan-400" />
                      <span className="text-muted-foreground text-sm">Recovery Period</span>
                    </div>
                    <div className="text-cyan-400 text-xl mb-1">{impact.recovery}</div>
                    <div className="text-muted-foreground text-xs">Time to baseline</div>
                  </div>
                </div>

                <div className="bg-secondary/20 border border-border rounded-lg p-5">
                  <h3 className="text-foreground mb-3">Module-Level Impacts</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Forecasting Models</span>
                      <span className="text-red-400">Re-calibration required</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Risk Exposure Map</span>
                      <span className="text-red-400">Critical update needed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Supply Chain Vulnerability</span>
                      <span className="text-red-400">Indices spike 20-40 points</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Macro Correlations</span>
                      <span className="text-amber-400">Regime change detected</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* AI-Generated Brief */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-primary">AI-Generated Scenario Brief</h2>
                  <Badge variant="outline" className="border-primary text-primary text-xs ml-auto">
                    ChatGPT Analysis
                  </Badge>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h3 className="text-foreground mb-2">Executive Summary</h3>
                    <p className="leading-relaxed">
                      This scenario simulates a {selectedShocks.length}-shock combination involving <strong className="text-foreground">{selectedShocks.map(s => s.name.toLowerCase()).join(', ')}</strong>. 
                      The aggregate projected impact is a <strong className="text-red-400">{impact.stock}% decline</strong> in AAPL stock price with volatility spiking <strong className="text-amber-400">+{impact.volatility}%</strong> above baseline. 
                      Recovery to pre-shock levels estimated at <strong className="text-cyan-400">{impact.recovery}</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-2">Transmission Mechanisms</h3>
                    <ul className="space-y-1">
                      <li>• <strong>Direct Revenue Impact:</strong> Supply disruptions reduce iPhone production capacity 30-60%; Greater China revenue at risk ($15-25B)</li>
                      <li>• <strong>Margin Compression:</strong> Alternative sourcing costs +8-12%; expedited logistics premiums; semiconductor spot market pricing</li>
                      <li>• <strong>Multiple Compression:</strong> Increased risk premium; lower forward P/E from 28x to 20-22x on heightened uncertainty</li>
                      <li>• <strong>Sentiment Deterioration:</strong> Analyst downgrades cascade; institutional selling pressure; options market repricing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-2">Mitigation Strategies</h3>
                    <ul className="space-y-1">
                      <li>• <strong>Hedging:</strong> Purchase VIX call options (strike 35-40); short NASDAQ futures to hedge systematic risk</li>
                      <li>• <strong>Portfolio Rebalancing:</strong> Reduce AAPL position sizing by 30-50%; rotate to defensive sectors (utilities, staples)</li>
                      <li>• <strong>Operational Monitoring:</strong> Track leading indicators: TSMC capacity utilization, Shanghai port throughput, Foxconn hiring data</li>
                      <li>• <strong>Contingency Planning:</strong> Establish price targets for re-entry ($180-190 range); options strategies (put spreads, collars)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-foreground mb-2">Historical Analogues</h3>
                    <p className="leading-relaxed">
                      Similar multi-factor shocks: <strong className="text-foreground">COVID-19 Supply Chain Disruption (Mar 2020)</strong> saw AAPL decline 32% with 120-day recovery; 
                      <strong className="text-foreground">2018-2019 Trade War</strong> produced 18% drawdown with protracted 18-month recovery. 
                      Current scenario severity suggests outcomes in this range depending on shock duration and policy responses.
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Instructions */}
      {!simulationRun && (
        <Card className="p-6 bg-card border-border">
          <h2 className="text-primary mb-4">How to Use the Shock Simulator</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="text-foreground mb-2">1. Select Shocks</h3>
              <p>Browse the shock library and click to add shocks to your scenario. You can combine multiple shocks to model complex scenarios.</p>
            </div>
            <div>
              <h3 className="text-foreground mb-2">2. Adjust Parameters</h3>
              <p>Use sliders to adjust shock magnitude (10-100%). Higher magnitudes represent more severe implementations of each shock type.</p>
            </div>
            <div>
              <h3 className="text-foreground mb-2">3. Run Simulation</h3>
              <p>Click "Run Simulation" to propagate shocks through all modules. AI generates detailed scenario brief with mitigation strategies.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
