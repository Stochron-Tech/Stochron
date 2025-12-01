import { useState } from 'react';
import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, ComposedChart, Scatter } from 'recharts';
import { Badge } from './ui/badge';
import { Info, TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

// Historical and forecast data for AAPL stock
const stockData = [
  { date: 'Jan 2020', actual: 77.38, label: 'Pre-COVID' },
  { date: 'Feb 2020', actual: 68.34, label: 'Pre-COVID' },
  { date: 'Mar 2020', actual: 63.70, label: 'COVID Crash' },
  { date: 'Apr 2020', actual: 73.45, label: 'COVID Recovery' },
  { date: 'May 2020', actual: 79.49, label: 'COVID Recovery' },
  { date: 'Jun 2020', actual: 91.20, label: 'Tech Rally' },
  { date: 'Jul 2020', actual: 106.26, label: 'Tech Rally' },
  { date: 'Aug 2020', actual: 129.04, label: 'Tech Rally' },
  { date: 'Sep 2020', actual: 115.81, label: 'Tech Rally' },
  { date: 'Oct 2020', actual: 108.86, label: 'Election Period' },
  { date: 'Nov 2020', actual: 119.05, label: 'Election Period' },
  { date: 'Dec 2020', actual: 132.69, label: 'Year End Rally' },
  { date: 'Jan 2021', actual: 131.96, label: 'Stimulus Era' },
  { date: 'Feb 2021', actual: 121.26, label: 'Stimulus Era' },
  { date: 'Mar 2021', actual: 122.15, label: 'Stimulus Era' },
  { date: 'Apr 2021', actual: 131.46, label: 'Recovery Trade' },
  { date: 'May 2021', actual: 124.61, label: 'Recovery Trade' },
  { date: 'Jun 2021', actual: 136.96, label: 'Recovery Trade' },
  { date: 'Jul 2021', actual: 145.86, label: 'Peak Growth' },
  { date: 'Aug 2021', actual: 151.83, label: 'Peak Growth' },
  { date: 'Sep 2021', actual: 141.50, label: 'Supply Chain Issues' },
  { date: 'Oct 2021', actual: 149.80, label: 'Supply Chain Issues' },
  { date: 'Nov 2021', actual: 165.30, label: 'All-Time Highs' },
  { date: 'Dec 2021', actual: 177.57, label: 'All-Time Highs' },
  { date: 'Jan 2022', actual: 174.78, label: 'Rate Hike Fears' },
  { date: 'Feb 2022', actual: 165.12, label: 'Ukraine War' },
  { date: 'Mar 2022', actual: 174.61, label: 'Ukraine War' },
  { date: 'Apr 2022', actual: 157.65, label: 'Tech Selloff' },
  { date: 'May 2022', actual: 148.84, label: 'Tech Selloff' },
  { date: 'Jun 2022', actual: 136.72, label: 'Bear Market' },
  { date: 'Jul 2022', actual: 162.51, label: 'Bear Rally' },
  { date: 'Aug 2022', actual: 157.22, label: 'Bear Rally' },
  { date: 'Sep 2022', actual: 138.20, label: 'Inflation Peak' },
  { date: 'Oct 2022', actual: 138.38, label: 'Inflation Peak' },
  { date: 'Nov 2022', actual: 148.03, label: 'Recovery Start' },
  { date: 'Dec 2022', actual: 129.93, label: 'China Reopening' },
  { date: 'Jan 2023', actual: 144.29, label: 'China Reopening' },
  { date: 'Feb 2023', actual: 147.41, label: 'Resilient Demand' },
  { date: 'Mar 2023', actual: 164.90, label: 'Banking Crisis' },
  { date: 'Apr 2023', actual: 169.68, label: 'AI Boom Starts' },
  { date: 'May 2023', actual: 177.25, label: 'AI Boom' },
  { date: 'Jun 2023', actual: 193.97, label: 'AI Boom' },
  { date: 'Jul 2023', actual: 195.58, label: 'Strong Earnings' },
  { date: 'Aug 2023', actual: 187.65, label: 'China Weakness' },
  { date: 'Sep 2023', actual: 171.21, label: 'China Weakness' },
  { date: 'Oct 2023', actual: 170.77, label: 'Higher for Longer' },
  { date: 'Nov 2023', actual: 189.95, label: 'Rally Returns' },
  { date: 'Dec 2023', actual: 192.53, label: 'Year End Strength' },
  { date: 'Jan 2024', actual: 184.40, label: 'Vision Pro Launch' },
  { date: 'Feb 2024', actual: 181.42, label: 'Mixed Signals' },
  { date: 'Mar 2024', actual: 171.48, label: 'DOJ Antitrust' },
  { date: 'Apr 2024', actual: 169.30, label: 'iPhone Weakness' },
  { date: 'May 2024', actual: 189.98, label: 'AI Announcements' },
  { date: 'Jun 2024', actual: 210.62, label: 'WWDC AI Features' },
  { date: 'Jul 2024', actual: 218.24, label: 'New Highs' },
  { date: 'Aug 2024', actual: 226.50, label: 'AI Momentum' },
  { date: 'Sep 2024', actual: 226.37, label: 'iPhone 16 Launch' },
  { date: 'Oct 2024', actual: 225.67, label: 'Current' },
  { date: 'Nov 2024', actual: null, arima: 231.20, var: 228.50, garch: 224.80, ml: 233.40, label: 'Forecast' },
  { date: 'Dec 2024', actual: null, arima: 237.50, var: 234.20, garch: 229.30, ml: 241.60, label: 'Forecast' },
  { date: 'Jan 2025', actual: null, arima: 242.80, var: 239.40, garch: 233.50, ml: 248.20, label: 'Forecast' },
  { date: 'Feb 2025', actual: null, arima: 245.30, var: 241.80, garch: 236.10, ml: 251.50, label: 'Forecast' },
  { date: 'Mar 2025', actual: null, arima: 248.60, var: 245.30, garch: 239.20, ml: 255.80, label: 'Forecast' },
  { date: 'Apr 2025', actual: null, arima: 252.10, var: 248.90, garch: 242.40, ml: 260.30, label: 'Forecast' },
];

const volatilityData = [
  { period: 'Q1 2023', actual: 18.2, forecast: null },
  { period: 'Q2 2023', actual: 21.5, forecast: null },
  { period: 'Q3 2023', actual: 24.8, forecast: null },
  { period: 'Q4 2023', actual: 19.3, forecast: null },
  { period: 'Q1 2024', actual: 22.7, forecast: null },
  { period: 'Q2 2024', actual: 26.4, forecast: null },
  { period: 'Q3 2024', actual: 23.1, forecast: null },
  { period: 'Q4 2024', actual: null, forecast: 25.8 },
  { period: 'Q1 2025', actual: null, forecast: 27.2 },
  { period: 'Q2 2025', actual: null, forecast: 24.6 },
];

const modelPerformance = [
  { 
    model: 'Machine Learning (Ensemble)', 
    mae: 3.24, 
    rmse: 4.87, 
    mape: 1.82,
    r2: 0.947,
    description: 'Random Forest + Gradient Boosting + LSTM ensemble. Best overall accuracy.',
    rank: 1,
    color: '#00b4d8'
  },
  { 
    model: 'ARIMA (5,1,3)', 
    mae: 4.18, 
    rmse: 6.23, 
    mape: 2.31,
    r2: 0.921,
    description: 'Classic time-series model. Strong trend capture, moderate accuracy.',
    rank: 2,
    color: '#90e0ef'
  },
  { 
    model: 'VAR (Vector AutoRegression)', 
    mae: 4.52, 
    rmse: 6.89, 
    mape: 2.54,
    r2: 0.912,
    description: 'Multi-variate model incorporating NASDAQ, USD, VIX correlations.',
    rank: 3,
    color: '#caf0f8'
  },
  { 
    model: 'GARCH (1,1)', 
    mae: 5.83, 
    rmse: 8.12, 
    mape: 3.21,
    r2: 0.882,
    description: 'Volatility-focused model. Excels at variance forecasting.',
    rank: 4,
    color: '#ade8f4'
  },
];

export default function ForecastingEngine() {
  const [selectedModel, setSelectedModel] = useState('all');
  const [timeHorizon, setTimeHorizon] = useState('6m');

  const getFilteredData = () => {
    const now = new Date('2024-10-01');
    if (timeHorizon === '1y') {
      return stockData.filter((_, idx) => idx >= stockData.length - 18);
    } else if (timeHorizon === '2y') {
      return stockData.filter((_, idx) => idx >= stockData.length - 30);
    } else if (timeHorizon === '5y') {
      return stockData;
    } else {
      // 6 months default
      return stockData.filter((_, idx) => idx >= stockData.length - 12);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Current Price</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">$225.67</div>
          <div className="flex items-center gap-1 mt-1 text-green-400 text-sm">
            <TrendingUp className="w-3 h-3" />
            <span>+2.34% (1D)</span>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">1-Month Forecast</span>
            <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">ML</Badge>
          </div>
          <div className="text-foreground text-2xl">$233.40</div>
          <div className="text-muted-foreground text-sm mt-1">+3.43% upside</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">6-Month Target</span>
            <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">ML</Badge>
          </div>
          <div className="text-foreground text-2xl">$260.30</div>
          <div className="text-muted-foreground text-sm mt-1">+15.36% potential</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Volatility (90D)</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-foreground text-2xl">23.1%</div>
          <div className="text-muted-foreground text-sm mt-1">Moderate risk</div>
        </Card>
      </div>

      {/* Main Forecast Chart */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-primary mb-1">Multi-Model Stock Price Forecast</h2>
            <p className="text-muted-foreground text-sm">Apple Inc. (AAPL) - Historical & Projected Prices</p>
          </div>
          <div className="flex gap-2">
            <select 
              className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
            >
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="2y">2 Years</option>
              <option value="5y">5 Years</option>
            </select>
          </div>
        </div>

        <div className="mb-6 h-[500px] bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={getFilteredData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Stock Price ($)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)'
                }}
              />
              <Legend />
              <ReferenceLine 
                x="Oct 2024" 
                stroke="#00b4d8" 
                strokeDasharray="3 3" 
                label={{ value: 'Current', fill: '#00b4d8', position: 'top' }} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#00b4d8" 
                strokeWidth={3}
                dot={{ fill: '#00b4d8', r: 3 }}
                name="Actual Price"
              />
              <Line 
                type="monotone" 
                dataKey="ml" 
                stroke="#48cae4" 
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ fill: '#48cae4', r: 4 }}
                name="ML Forecast"
              />
              <Line 
                type="monotone" 
                dataKey="arima" 
                stroke="#90e0ef" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="ARIMA"
              />
              <Line 
                type="monotone" 
                dataKey="var" 
                stroke="#ade8f4" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="VAR"
              />
              <Line 
                type="monotone" 
                dataKey="garch" 
                stroke="#caf0f8" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="GARCH"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary/20 border border-border rounded-lg p-4">
            <h3 className="text-foreground mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Forecast Interpretation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">Machine Learning ensemble</span> shows highest confidence with strongest upward trajectory based on recent AI momentum and iPhone upgrade cycle.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">ARIMA model</span> captures long-term trend but more conservative, reflecting historical mean reversion patterns.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">VAR model</span> incorporates market correlations, showing moderate growth tied to broader tech sector performance.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">GARCH model</span> most pessimistic, emphasizing volatility risks from geopolitical and macro uncertainties.</span>
              </li>
            </ul>
          </div>

          <div className="bg-secondary/20 border border-border rounded-lg p-4">
            <h3 className="text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              Key Assumptions & Risks
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-green-400">+</span>
                <span>Continued AI feature adoption driving Services revenue growth and margin expansion</span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">+</span>
                <span>Stable US-China relations maintaining manufacturing and sales in Greater China (~18% of revenue)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">±</span>
                <span>Fed maintains current rate policy; no unexpected tightening or easing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">−</span>
                <span>Downside risks: Taiwan supply disruption, DOJ antitrust escalation, consumer spending slowdown</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Model Performance Comparison */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-4">Model Performance Comparison</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Back-tested accuracy metrics on out-of-sample data (trailing 12 months). Lower MAE/RMSE/MAPE and higher R² indicate better performance.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground text-sm">Rank</th>
                <th className="text-left py-3 px-4 text-muted-foreground text-sm">Model</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">MAE ($)</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">RMSE ($)</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">MAPE (%)</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">R²</th>
              </tr>
            </thead>
            <tbody>
              {modelPerformance.map((model, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4">
                    <Badge 
                      variant="outline" 
                      className={idx === 0 ? 'border-cyan-500 text-cyan-400' : 'border-border text-muted-foreground'}
                    >
                      #{model.rank}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-foreground">{model.model}</div>
                    <div className="text-muted-foreground text-xs mt-1">{model.description}</div>
                  </td>
                  <td className="py-4 px-4 text-right text-foreground">{model.mae.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right text-foreground">{model.rmse.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right text-foreground">{model.mape.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={model.r2 > 0.93 ? 'text-green-400' : model.r2 > 0.90 ? 'text-cyan-400' : 'text-muted-foreground'}>
                      {model.r2.toFixed(3)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-secondary/20 border border-border rounded-lg">
          <h3 className="text-foreground mb-2 text-sm">Metric Definitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <span className="text-cyan-400">MAE (Mean Absolute Error):</span> Average prediction error in dollars. Lower is better.
            </div>
            <div>
              <span className="text-cyan-400">RMSE (Root Mean Squared Error):</span> Error metric penalizing large deviations. Lower is better.
            </div>
            <div>
              <span className="text-cyan-400">MAPE (Mean Absolute Percentage Error):</span> Average error as percentage of actual price. Lower is better.
            </div>
            <div>
              <span className="text-cyan-400">R² (Coefficient of Determination):</span> Proportion of variance explained by model. Higher is better (max 1.0).
            </div>
          </div>
        </div>
      </Card>

      {/* Volatility Forecast */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-1">Volatility Forecast (GARCH Model)</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Quarterly annualized volatility - critical for options pricing, risk management, and portfolio allocation
        </p>

        <div className="h-80 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={volatilityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="period" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Annualized Volatility (%)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                fill="#00b4d880"
                stroke="#00b4d8"
                strokeWidth={2}
                name="Historical Volatility"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                fill="#f7860080"
                stroke="#f78600"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Forecasted Volatility"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            GARCH model projects elevated volatility in Q4 2024 and Q1 2025 driven by election uncertainty, Fed policy decisions, 
            and iPhone 16 sales results. Volatility expected to moderate in Q2 2025 as macro uncertainties resolve.
          </p>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
        <h2 className="text-primary mb-4">Investment Implications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-foreground mb-3">Model Consensus View</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Moderate-to-strong upside potential (8-15% over 6 months) across all models</span>
              </li>
              <li className="flex gap-2">
                <Activity className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Volatility expected to remain elevated but manageable (23-27% annualized)</span>
              </li>
              <li className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>AI momentum and Services growth driving positive sentiment</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground mb-3">Risk Monitoring</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-red-400">•</span>
                <span>Watch for China demand indicators (monthly iPhone sales data)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">•</span>
                <span>Monitor Fed policy shifts and 10-year Treasury yields</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">•</span>
                <span>Track Taiwan geopolitical developments (supply chain risk)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400">•</span>
                <span>DOJ antitrust case progression (App Store revenue model)</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}