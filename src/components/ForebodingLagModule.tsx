import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart, Bar, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Newspaper, TrendingUp, TrendingDown, AlertTriangle, MessageSquare, FileText, Twitter, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// Sentiment time-series data
const sentimentData = [
  { date: 'Jul 1', sentiment: 72, stock: 218.24, event: '' },
  { date: 'Jul 8', sentiment: 74, stock: 220.15, event: '' },
  { date: 'Jul 15', sentiment: 76, stock: 221.80, event: 'Strong earnings expectations' },
  { date: 'Jul 22', sentiment: 71, stock: 219.50, event: 'China concerns emerge' },
  { date: 'Jul 29', sentiment: 68, stock: 217.30, event: '' },
  { date: 'Aug 5', sentiment: 79, stock: 224.10, event: 'AI features announced' },
  { date: 'Aug 12', sentiment: 81, stock: 226.50, event: '' },
  { date: 'Aug 19', sentiment: 77, stock: 225.20, event: '' },
  { date: 'Aug 26', sentiment: 75, stock: 223.80, event: '' },
  { date: 'Sep 2', sentiment: 82, stock: 228.35, event: 'iPhone 16 pre-orders strong' },
  { date: 'Sep 9', sentiment: 84, stock: 229.70, event: 'iPhone 16 launch event' },
  { date: 'Sep 16', sentiment: 80, stock: 227.45, event: '' },
  { date: 'Sep 23', sentiment: 78, stock: 226.37, event: '' },
  { date: 'Sep 30', sentiment: 76, stock: 225.10, event: '' },
  { date: 'Oct 7', sentiment: 71, stock: 222.80, event: 'Geopolitical tensions rise' },
  { date: 'Oct 14', sentiment: 69, stock: 221.30, event: 'Supply chain warnings' },
  { date: 'Oct 21', sentiment: 73, stock: 224.50, event: 'Better-than-expected sales' },
  { date: 'Oct 28', sentiment: 75, stock: 225.67, event: 'Current period' },
];

// News source sentiment breakdown
const sourceBreakdown = [
  { source: 'Financial Media', positive: 64, neutral: 28, negative: 8, volume: 1847 },
  { source: 'Government Docs', positive: 42, neutral: 51, negative: 7, volume: 234 },
  { source: 'Social Media', positive: 58, neutral: 25, negative: 17, volume: 8923 },
  { source: 'Analyst Reports', positive: 71, neutral: 24, negative: 5, volume: 412 },
  { source: 'Earnings Calls', positive: 68, neutral: 29, negative: 3, volume: 87 },
];

// Topic modeling results
const topicClusters = [
  { topic: 'AI Features & Integration', sentiment: 85, volume: 3421, trend: 'up', impact: 'high' },
  { topic: 'iPhone 16 Sales Performance', sentiment: 78, volume: 2893, trend: 'up', impact: 'high' },
  { topic: 'China Market Dynamics', sentiment: 62, volume: 1956, trend: 'down', impact: 'high' },
  { topic: 'Supply Chain & Manufacturing', sentiment: 71, volume: 1452, trend: 'neutral', impact: 'medium' },
  { topic: 'Services Revenue Growth', sentiment: 82, volume: 1203, trend: 'up', impact: 'medium' },
  { topic: 'Regulatory & Antitrust', sentiment: 54, volume: 987, trend: 'down', impact: 'medium' },
  { topic: 'Vision Pro & Wearables', sentiment: 69, volume: 734, trend: 'neutral', impact: 'low' },
  { topic: 'Competitive Landscape', sentiment: 66, volume: 621, trend: 'neutral', impact: 'low' },
];

// Lag correlation analysis
const lagAnalysis = [
  { lag: '0 days', correlation: 0.42, pValue: 0.08, significant: false },
  { lag: '1 day', correlation: 0.51, pValue: 0.04, significant: true },
  { lag: '2 days', correlation: 0.67, pValue: 0.01, significant: true },
  { lag: '3 days', correlation: 0.73, pValue: 0.003, significant: true },
  { lag: '4 days', correlation: 0.68, pValue: 0.009, significant: true },
  { lag: '5 days', correlation: 0.59, pValue: 0.02, significant: true },
  { lag: '1 week', correlation: 0.48, pValue: 0.05, significant: false },
  { lag: '2 weeks', correlation: 0.31, pValue: 0.16, significant: false },
];

// Recent alerts
const recentAlerts = [
  {
    date: 'Oct 28, 2024',
    type: 'positive',
    title: 'Surge in AI Feature Sentiment',
    description: 'NLP detects 34% increase in positive mentions of Apple Intelligence features across analyst reports and tech media. Historical correlation suggests 2-3 day lag to price impact.',
    confidence: 82,
    projected: '+1.8% to +2.4%'
  },
  {
    date: 'Oct 26, 2024',
    type: 'negative',
    title: 'China Regulatory Concerns Escalating',
    description: 'Government document analysis shows increased frequency of technology restrictions language. Social media sentiment in Chinese markets declining. Monitor for potential headwinds.',
    confidence: 71,
    projected: '-0.9% to -1.6%'
  },
  {
    date: 'Oct 24, 2024',
    type: 'neutral',
    title: 'Mixed Supply Chain Signals',
    description: 'Logistics data shows strong iPhone production volumes, but semiconductor shortage mentions up 18% in industry reports. Net neutral impact expected.',
    confidence: 65,
    projected: '-0.3% to +0.5%'
  },
];

export default function ForebodingLagModule() {
  const [selectedTab, setSelectedTab] = useState('sentiment');

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 75) return 'text-green-400';
    if (sentiment >= 60) return 'text-cyan-400';
    if (sentiment >= 45) return 'text-amber-400';
    return 'text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Current Sentiment</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">75/100</div>
          <div className="text-cyan-400 text-sm mt-1">Moderately Positive</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Peak Lag Window</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">2-4 Days</div>
          <div className="text-muted-foreground text-sm mt-1">Optimal correlation</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Documents Analyzed</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">12,384</div>
          <div className="text-muted-foreground text-sm mt-1">Last 30 days</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Active Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-foreground text-2xl">3</div>
          <div className="text-muted-foreground text-sm mt-1">Requires monitoring</div>
        </Card>
      </div>

      {/* Main Sentiment Time Series */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-1">Sentiment Index vs. Stock Performance</h2>
        <p className="text-muted-foreground text-sm mb-6">
          NLP-derived sentiment score (0-100) from multi-source analysis correlated with AAPL price movements
        </p>

        <div className="h-96 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                domain={[50, 90]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                label={{ value: 'Stock Price ($)', angle: 90, position: 'insideRight', fill: '#9ca3af' }}
                domain={[215, 232]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)'
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#1a1f36] border border-[#374151] rounded-lg p-3">
                        <p className="text-foreground text-sm mb-2">{payload[0].payload.date}</p>
                        <p className="text-cyan-400 text-sm">Sentiment: {payload[0].value}</p>
                        <p className="text-green-400 text-sm">Price: ${payload[1].value}</p>
                        {payload[0].payload.event && (
                          <p className="text-muted-foreground text-xs mt-2 border-t border-border pt-2">
                            {payload[0].payload.event}
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="sentiment"
                fill="#00b4d840"
                stroke="#00b4d8"
                strokeWidth={2}
                name="Sentiment Score"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="stock"
                stroke="#48cae4"
                strokeWidth={2.5}
                dot={{ fill: '#48cae4', r: 3 }}
                name="Stock Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Sentiment generally leads stock price movements by 2-4 days. Notable spike in early September correlating with iPhone 16 launch 
            positive sentiment. Recent dip in mid-October aligns with geopolitical concerns but showing recovery.
          </p>
        </div>
      </Card>

      {/* Tabs for detailed analysis */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="sentiment">Source Breakdown</TabsTrigger>
          <TabsTrigger value="topics">Topic Clusters</TabsTrigger>
          <TabsTrigger value="lag">Lag Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="sentiment" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-4">Sentiment by Source Type</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Distribution of positive, neutral, and negative sentiment across different information sources
            </p>

            <div className="space-y-4">
              {sourceBreakdown.map((source, idx) => (
                <div key={idx} className="bg-secondary/20 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-foreground">{source.source}</h3>
                      <p className="text-muted-foreground text-sm">{source.volume.toLocaleString()} documents analyzed</p>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      {source.positive}% positive
                    </Badge>
                  </div>
                  <div className="relative w-full h-6 bg-secondary rounded-full overflow-hidden flex">
                    <div 
                      className="bg-green-500/70 flex items-center justify-center text-xs text-white"
                      style={{ width: `${source.positive}%` }}
                    >
                      {source.positive > 15 && `${source.positive}%`}
                    </div>
                    <div 
                      className="bg-gray-500/50 flex items-center justify-center text-xs text-white"
                      style={{ width: `${source.neutral}%` }}
                    >
                      {source.neutral > 15 && `${source.neutral}%`}
                    </div>
                    <div 
                      className="bg-red-500/70 flex items-center justify-center text-xs text-white"
                      style={{ width: `${source.negative}%` }}
                    >
                      {source.negative > 10 && `${source.negative}%`}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500/70 rounded"></div>
                      <span>Positive: {source.positive}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-500/50 rounded"></div>
                      <span>Neutral: {source.neutral}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-500/70 rounded"></div>
                      <span>Negative: {source.negative}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-4">Topic Modeling & Sentiment Clusters</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Emerging themes identified through NLP topic modeling with sentiment scores and trend directions
            </p>

            <div className="space-y-3">
              {topicClusters.map((topic, idx) => (
                <div key={idx} className="bg-secondary/20 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-foreground">{topic.topic}</h3>
                        {getTrendIcon(topic.trend)}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {topic.volume.toLocaleString()} mentions • 
                        <span className={`ml-2 ${getSentimentColor(topic.sentiment)}`}>
                          Sentiment: {topic.sentiment}/100
                        </span>
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        topic.impact === 'high' ? 'border-red-500 text-red-400' :
                        topic.impact === 'medium' ? 'border-amber-500 text-amber-400' :
                        'border-border text-muted-foreground'
                      }
                    >
                      {topic.impact.toUpperCase()} impact
                    </Badge>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        topic.sentiment >= 75 ? 'bg-green-500' :
                        topic.sentiment >= 60 ? 'bg-cyan-400' :
                        topic.sentiment >= 45 ? 'bg-amber-400' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${topic.sentiment}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="lag" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-4">Sentiment-to-Price Lag Correlation Analysis</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Statistical analysis of time lag between sentiment shifts and observable stock price movements
            </p>

            <div className="h-80 bg-secondary/30 rounded-lg p-4 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={lagAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="lag" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    label={{ value: 'Correlation Coefficient', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    domain={[0, 1]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="correlation" 
                    fill="#00b4d8"
                    radius={[8, 8, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground text-sm">Lag Period</th>
                    <th className="text-right py-3 px-4 text-muted-foreground text-sm">Correlation</th>
                    <th className="text-right py-3 px-4 text-muted-foreground text-sm">P-Value</th>
                    <th className="text-center py-3 px-4 text-muted-foreground text-sm">Significance</th>
                  </tr>
                </thead>
                <tbody>
                  {lagAnalysis.map((lag, idx) => (
                    <tr key={idx} className="border-b border-border/50">
                      <td className="py-3 px-4 text-foreground">{lag.lag}</td>
                      <td className={`py-3 px-4 text-right ${lag.correlation > 0.65 ? 'text-green-400' : lag.correlation > 0.5 ? 'text-cyan-400' : 'text-muted-foreground'}`}>
                        {lag.correlation.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right text-foreground">{lag.pValue.toFixed(3)}</td>
                      <td className="py-3 px-4 text-center">
                        {lag.significant ? (
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            YES
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-border text-muted-foreground">
                            NO
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-secondary/20 border border-border rounded-lg">
              <h3 className="text-foreground mb-2 text-sm">Key Finding</h3>
              <p className="text-muted-foreground text-sm">
                Peak correlation occurs at 3-day lag (r=0.73, p&lt;0.01), indicating sentiment shifts typically manifest in stock prices 
                within 2-4 trading days. This provides actionable lead time for position adjustments. Correlations beyond 1 week become 
                statistically insignificant, suggesting market efficiency at longer time horizons.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Early Warning Alerts */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-4">Early Warning Alerts</h2>
        <p className="text-muted-foreground text-sm mb-6">
          AI-detected sentiment anomalies with projected stock impact based on historical lag patterns
        </p>

        <div className="space-y-4">
          {recentAlerts.map((alert, idx) => (
            <div 
              key={idx} 
              className={`bg-secondary/20 border-l-4 rounded-lg p-5 ${
                alert.type === 'positive' ? 'border-l-green-500' :
                alert.type === 'negative' ? 'border-l-red-500' :
                'border-l-amber-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {alert.type === 'positive' ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : alert.type === 'negative' ? (
                      <TrendingDown className="w-5 h-5 text-red-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    )}
                    <h3 className="text-foreground">{alert.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{alert.date}</p>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {alert.confidence}% confidence
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                {alert.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">Projected 3-day impact:</span>
                <span className={
                  alert.type === 'positive' ? 'text-green-400' :
                  alert.type === 'negative' ? 'text-red-400' :
                  'text-amber-400'
                }>
                  {alert.projected}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Methodology */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
        <h2 className="text-primary mb-4">Methodology & Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="text-foreground mb-2">NLP Techniques</h3>
            <ul className="space-y-1">
              <li>• Transformer-based sentiment analysis (FinBERT)</li>
              <li>• Topic modeling (LDA, BERTopic)</li>
              <li>• Named entity recognition (companies, people, countries)</li>
              <li>• Temporal dependency modeling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-2">Primary Data Sources</h3>
            <ul className="space-y-1">
              <li>• Bloomberg, Reuters, WSJ, Financial Times</li>
              <li>• SEC filings, earnings transcripts</li>
              <li>• Government policy documents (US, China, EU)</li>
              <li>• Social media (Twitter, Reddit WallStreetBets)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}