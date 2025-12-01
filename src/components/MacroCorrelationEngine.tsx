import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, DollarSign, Zap, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Correlation matrix data
const correlationMatrix = [
  { variable: 'Oil Prices (WTI)', correlation: -0.42, significance: 'High', elasticity: -0.38 },
  { variable: 'Interest Rates (Fed Funds)', correlation: -0.67, significance: 'Very High', elasticity: -1.24 },
  { variable: '10Y Treasury Yield', correlation: -0.58, significance: 'High', elasticity: -0.92 },
  { variable: 'CPI (Inflation)', correlation: -0.51, significance: 'High', elasticity: -0.76 },
  { variable: 'USD Index', correlation: 0.34, significance: 'Moderate', elasticity: 0.48 },
  { variable: 'USD/CNY Exchange Rate', correlation: -0.48, significance: 'High', elasticity: -0.63 },
  { variable: 'Consumer Confidence', correlation: 0.56, significance: 'High', elasticity: 0.71 },
  { variable: 'PMI Manufacturing', correlation: 0.61, significance: 'High', elasticity: 0.84 },
  { variable: 'VIX (Market Volatility)', correlation: -0.74, significance: 'Very High', elasticity: -1.18 },
  { variable: 'NASDAQ Index', correlation: 0.89, significance: 'Very High', elasticity: 0.94 },
  { variable: 'Semiconductor Index (SOX)', correlation: 0.76, significance: 'Very High', elasticity: 0.88 },
];

// Rolling correlation data (36-month window)
const rollingCorrelation = [
  { date: 'Q1 2022', nasdaq: 0.92, vix: -0.76, rates: -0.54, oil: -0.38 },
  { date: 'Q2 2022', nasdaq: 0.88, vix: -0.81, rates: -0.68, oil: -0.42 },
  { date: 'Q3 2022', nasdaq: 0.85, vix: -0.79, rates: -0.72, oil: -0.45 },
  { date: 'Q4 2022', nasdaq: 0.87, vix: -0.77, rates: -0.69, oil: -0.41 },
  { date: 'Q1 2023', nasdaq: 0.91, vix: -0.73, rates: -0.64, oil: -0.39 },
  { date: 'Q2 2023', nasdaq: 0.93, vix: -0.71, rates: -0.61, oil: -0.37 },
  { date: 'Q3 2023', nasdaq: 0.90, vix: -0.75, rates: -0.66, oil: -0.43 },
  { date: 'Q4 2023', nasdaq: 0.89, vix: -0.72, rates: -0.59, oil: -0.40 },
  { date: 'Q1 2024', nasdaq: 0.91, vix: -0.74, rates: -0.62, oil: -0.41 },
  { date: 'Q2 2024', nasdaq: 0.89, vix: -0.76, rates: -0.67, oil: -0.44 },
  { date: 'Q3 2024', nasdaq: 0.89, vix: -0.74, rates: -0.67, oil: -0.42 },
];

// Scenario elasticity data
const scenarioData = [
  { scenario: 'Fed Rate +100bps', aaplImpact: -12.4, probability: 25, timeframe: '12 months' },
  { scenario: 'Recession (GDP -2%)', aaplImpact: -18.6, probability: 30, timeframe: '12 months' },
  { scenario: 'Oil Spike (+50%)', aaplImpact: -5.7, probability: 20, timeframe: '6 months' },
  { scenario: 'VIX Spike (>40)', aaplImpact: -22.4, probability: 15, timeframe: '3 months' },
  { scenario: 'Tech Rally (NASDAQ +20%)', aaplImpact: +18.8, probability: 35, timeframe: '12 months' },
  { scenario: 'USD Strengthening (+10%)', aaplImpact: +4.8, probability: 40, timeframe: '12 months' },
];

// Historical macro events and stock response
const macroEvents = [
  { date: 'Mar 2022', event: 'Fed Rate Hike Cycle Begins', macro: '+0.25%', aapl: '-3.2%', recovery: '45 days' },
  { date: 'Jun 2022', event: 'Inflation Peaks (9.1% CPI)', macro: 'CPI 9.1%', aapl: '-8.4%', recovery: '120 days' },
  { date: 'Sep 2022', event: 'Fed Rate +0.75% (Hawkish)', macro: '+0.75%', aapl: '-5.1%', recovery: '60 days' },
  { date: 'Mar 2023', event: 'Silicon Valley Bank Collapse', macro: 'Banking Crisis', aapl: '-2.8%', recovery: '15 days' },
  { date: 'Jul 2023', event: 'Inflation Moderates (3% CPI)', macro: 'CPI 3.0%', aapl: '+6.2%', recovery: 'N/A' },
  { date: 'Nov 2023', event: 'Fed Signals Rate Pause', macro: 'Pause Signal', aapl: '+7.8%', recovery: 'N/A' },
  { date: 'Apr 2024', event: 'Sticky Inflation Concerns', macro: 'CPI 3.5%', aapl: '-4.1%', recovery: '30 days' },
];

export default function MacroCorrelationEngine() {
  const [selectedTab, setSelectedTab] = useState('matrix');

  const getCorrelationColor = (corr: number) => {
    const abs = Math.abs(corr);
    if (abs >= 0.7) return 'text-red-400';
    if (abs >= 0.5) return 'text-amber-400';
    if (abs >= 0.3) return 'text-cyan-400';
    return 'text-muted-foreground';
  };

  const getCorrelationBg = (corr: number) => {
    const abs = Math.abs(corr);
    if (abs >= 0.7) return '#d62828';
    if (abs >= 0.5) return '#f77f00';
    if (abs >= 0.3) return '#f7b801';
    return '#48cae4';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Strongest Correlation</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-base">NASDAQ Index</div>
          <div className="text-cyan-400 text-sm mt-1">r = 0.89 (Very High)</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Key Risk Factor</span>
            <Zap className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-foreground text-base">Market Volatility</div>
          <div className="text-red-400 text-sm mt-1">VIX: r = -0.74</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Rate Sensitivity</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-foreground text-2xl">-1.24</div>
          <div className="text-muted-foreground text-sm mt-1">Elasticity coefficient</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Macro Variables</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">11</div>
          <div className="text-muted-foreground text-sm mt-1">Tracked indicators</div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="matrix">Correlation Matrix</TabsTrigger>
          <TabsTrigger value="rolling">Rolling Correlations</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
        </TabsList>

        {/* Correlation Matrix */}
        <TabsContent value="matrix" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-1">AAPL Correlation with Macro Variables</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Pearson correlation coefficients, statistical significance, and elasticity mapping (% change in AAPL for 1% change in macro variable)
            </p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground text-sm">Macro Variable</th>
                    <th className="text-right py-3 px-4 text-muted-foreground text-sm">Correlation (r)</th>
                    <th className="text-center py-3 px-4 text-muted-foreground text-sm">Significance</th>
                    <th className="text-right py-3 px-4 text-muted-foreground text-sm">Elasticity</th>
                    <th className="text-center py-3 px-4 text-muted-foreground text-sm">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {correlationMatrix.map((item, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                      <td className="py-4 px-4 text-foreground">{item.variable}</td>
                      <td className={`py-4 px-4 text-right ${getCorrelationColor(item.correlation)}`}>
                        {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge 
                          variant="outline" 
                          className={
                            item.significance === 'Very High' ? 'border-red-500 text-red-400' :
                            item.significance === 'High' ? 'border-amber-500 text-amber-400' :
                            'border-cyan-500 text-cyan-400'
                          }
                        >
                          {item.significance}
                        </Badge>
                      </td>
                      <td className={`py-4 px-4 text-right ${getCorrelationColor(item.elasticity)}`}>
                        {item.elasticity > 0 ? '+' : ''}{item.elasticity.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <div className="w-24 h-3 bg-secondary rounded-full overflow-hidden relative">
                            <div 
                              className="h-3 absolute"
                              style={{ 
                                width: `${Math.abs(item.correlation) * 100}%`,
                                backgroundColor: getCorrelationBg(item.correlation),
                                left: item.correlation < 0 ? `${100 - Math.abs(item.correlation) * 100}%` : '0'
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 border border-border rounded-lg p-5">
                <h3 className="text-foreground mb-3">Key Insights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-cyan-400">•</span>
                    <span><span className="text-foreground">NASDAQ (r=0.89):</span> Strongest positive correlation; AAPL moves with broader tech sector</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><span className="text-foreground">VIX (r=-0.74):</span> Strong negative correlation; stock suffers during volatility spikes</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><span className="text-foreground">Interest Rates (r=-0.67):</span> Highly rate-sensitive; Fed policy is critical driver</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">•</span>
                    <span><span className="text-foreground">PMI (r=0.61):</span> Strong correlation with manufacturing activity and economic health</span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/20 border border-border rounded-lg p-5">
                <h3 className="text-foreground mb-3">Elasticity Interpretation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-amber-400">→</span>
                    <span>Fed Rate +1% (100bps) → AAPL -1.24% (high sensitivity)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-400">→</span>
                    <span>VIX +10% → AAPL -1.18% (fear-driven selloffs)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-cyan-400">→</span>
                    <span>NASDAQ +1% → AAPL +0.94% (beta near 1.0)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-400">→</span>
                    <span>10Y Yield +1% → AAPL -0.92% (discount rate impact)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Rolling Correlations */}
        <TabsContent value="rolling" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-1">Rolling 36-Month Correlation Analysis</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Dynamic correlation tracking to detect regime changes and structural breaks in relationships
            </p>

            <div className="h-96 bg-secondary/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rollingCorrelation}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    label={{ value: 'Correlation Coefficient', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    domain={[-1, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="nasdaq" 
                    stroke="#48cae4" 
                    strokeWidth={2.5}
                    dot={{ fill: '#48cae4', r: 3 }}
                    name="NASDAQ"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="vix" 
                    stroke="#d62828" 
                    strokeWidth={2}
                    dot={false}
                    name="VIX"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rates" 
                    stroke="#f7b801" 
                    strokeWidth={2}
                    dot={false}
                    name="Interest Rates"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="oil" 
                    stroke="#90e0ef" 
                    strokeWidth={2}
                    dot={false}
                    name="Oil Prices"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="text-foreground mb-2 text-sm">NASDAQ Correlation</h3>
                <p className="text-muted-foreground text-sm">
                  Consistently high (0.85-0.93) and stable. AAPL moves in lockstep with broader tech sector across all market regimes.
                </p>
              </div>
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="text-foreground mb-2 text-sm">Rate Sensitivity</h3>
                <p className="text-muted-foreground text-sm">
                  Correlation strengthened in 2022 (Q3: -0.72) during aggressive Fed tightening, moderating in 2023 as rate hike cycle ended.
                </p>
              </div>
              <div className="bg-secondary/20 border border-border rounded-lg p-4">
                <h3 className="text-foreground mb-2 text-sm">VIX Relationship</h3>
                <p className="text-muted-foreground text-sm">
                  Inverse correlation (-0.71 to -0.81) relatively stable. AAPL remains defensive during volatility spikes.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Scenario Analysis */}
        <TabsContent value="scenarios" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-1">Macro Scenario Impact Analysis</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Projected AAPL price impact under various macroeconomic scenarios with probability weightings
            </p>

            <div className="space-y-3 mb-6">
              {scenarioData.map((scenario, idx) => (
                <div key={idx} className="bg-secondary/20 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1">{scenario.scenario}</h3>
                      <p className="text-muted-foreground text-sm">Timeframe: {scenario.timeframe} • Probability: {scenario.probability}%</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl ${scenario.aaplImpact > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {scenario.aaplImpact > 0 ? '+' : ''}{scenario.aaplImpact}%
                      </div>
                      <div className="text-muted-foreground text-xs">Projected Impact</div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${scenario.aaplImpact > 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${scenario.probability}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-foreground mb-4">Historical Macro Event Responses</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">Date</th>
                      <th className="text-left py-3 px-4 text-muted-foreground text-sm">Event</th>
                      <th className="text-right py-3 px-4 text-muted-foreground text-sm">Macro Change</th>
                      <th className="text-right py-3 px-4 text-muted-foreground text-sm">AAPL Impact</th>
                      <th className="text-right py-3 px-4 text-muted-foreground text-sm">Recovery Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {macroEvents.map((event, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                        <td className="py-3 px-4 text-muted-foreground text-sm">{event.date}</td>
                        <td className="py-3 px-4 text-foreground">{event.event}</td>
                        <td className="py-3 px-4 text-right text-amber-400">{event.macro}</td>
                        <td className={`py-3 px-4 text-right ${event.aapl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {event.aapl}
                        </td>
                        <td className="py-3 px-4 text-right text-muted-foreground">{event.recovery}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
        <h2 className="text-primary mb-4">Investment Implications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="text-foreground mb-3">Primary Macro Drivers</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-cyan-400">1.</span>
                <span><span className="text-foreground">Fed Policy (r=-0.67):</span> Most critical variable; rate pause/cuts highly bullish for AAPL</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">2.</span>
                <span><span className="text-foreground">NASDAQ/Tech Sector (r=0.89):</span> AAPL magnifies tech sector moves; monitor SOX semiconductor index</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">3.</span>
                <span><span className="text-foreground">Market Volatility (r=-0.74):</span> Avoid during VIX &gt;30; strong performer in low-vol environments</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-3">Hedging Strategy</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Monitor Fed dot plot and 10Y Treasury yields as leading indicators</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Use VIX options to hedge volatility risk (spike &gt;40 = -22% AAPL impact)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Pairs trade: Long AAPL / Short NASDAQ futures to isolate idiosyncratic alpha</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Watch USD/CNY for China revenue exposure; strengthen USD = headwind to Greater China sales</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}