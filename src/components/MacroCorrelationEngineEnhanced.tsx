import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, DollarSign, Zap, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

// Extended correlation matrix with detailed information
const correlationMatrix = [
  { 
    variable: 'Oil Prices (WTI)', 
    correlation: -0.42, 
    significance: 'High', 
    elasticity: -0.38,
    details: {
      mechanism: 'Higher oil prices increase production costs for electronics manufacturing and logistics, while also reducing consumer spending power.',
      historicalRange: '(-0.35 to -0.51)',
      keyEvents: 'Strongest correlation during 2022 energy crisis',
      tradingImplication: 'Watch WTI futures as leading indicator for AAPL cost structure'
    }
  },
  { 
    variable: 'Interest Rates (Fed Funds)', 
    correlation: -0.67, 
    significance: 'Very High', 
    elasticity: -1.24,
    details: {
      mechanism: 'Higher rates increase discount rates for future cash flows (Apple trades at 28x P/E), reduce consumer credit for big purchases, strengthen dollar (FX headwind).',
      historicalRange: '(-0.54 to -0.78)',
      keyEvents: '2022-2023 rate hike cycle saw AAPL decline 27% peak-to-trough',
      tradingImplication: 'Most critical variable - Fed pivot would be highly bullish catalyst'
    }
  },
  { 
    variable: '10Y Treasury Yield', 
    correlation: -0.58, 
    significance: 'High', 
    elasticity: -0.92,
    details: {
      mechanism: 'Acts as risk-free rate in CAPM model, affecting equity risk premium. Higher yields make bonds more attractive vs. stocks.',
      historicalRange: '(-0.48 to -0.67)',
      keyEvents: 'Yield spike above 5% in Oct 2023 triggered 10% AAPL correction',
      tradingImplication: 'Watch 4.5% level as key technical threshold'
    }
  },
  { 
    variable: 'CPI (Inflation)', 
    correlation: -0.51, 
    significance: 'High', 
    elasticity: -0.76,
    details: {
      mechanism: 'Inflation erodes real returns and typically prompts Fed tightening. Also increases input costs and reduces real consumer income.',
      historicalRange: '(-0.42 to -0.64)',
      keyEvents: 'CPI peaked at 9.1% in June 2022, AAPL down 23% that month',
      tradingImplication: 'Core CPI more important than headline - watch Services inflation'
    }
  },
  { 
    variable: 'USD Index', 
    correlation: 0.34, 
    significance: 'Moderate', 
    elasticity: 0.48,
    details: {
      mechanism: 'Strong dollar benefits US consumers (lower import prices) but creates FX translation headwind for international revenue (60% of sales).',
      historicalRange: '(0.21 to 0.48)',
      keyEvents: 'USD surge in 2022 cost Apple $8B in revenue (FX headwind)',
      tradingImplication: 'Correlation is counterintuitive - reflects safe-haven flows in risk-off periods'
    }
  },
  { 
    variable: 'USD/CNY Exchange Rate', 
    correlation: -0.48, 
    significance: 'High', 
    elasticity: -0.63,
    details: {
      mechanism: 'Stronger yuan makes Chinese manufacturing cheaper and boosts purchasing power in Greater China market (18-20% of revenue).',
      historicalRange: '(-0.38 to -0.61)',
      keyEvents: 'Yuan depreciation in H2 2022 pressured AAPL margins and China sales',
      tradingImplication: 'Monitor PBOC policy - currency manipulation risk'
    }
  },
  { 
    variable: 'Consumer Confidence', 
    correlation: 0.56, 
    significance: 'High', 
    elasticity: 0.71,
    details: {
      mechanism: 'Apple products are discretionary big-ticket items. High confidence drives upgrade cycles and premium device purchases.',
      historicalRange: '(0.44 to 0.68)',
      keyEvents: 'Confidence surge in late 2023 coincided with AAPL +48% rally',
      tradingImplication: 'Watch University of Michigan sentiment - leads iPhone sales by 1-2 months'
    }
  },
  { 
    variable: 'PMI Manufacturing', 
    correlation: 0.61, 
    significance: 'High', 
    elasticity: 0.84,
    details: {
      mechanism: 'PMI reflects supply chain health and business capital expenditure. Tech capex drives Mac and iPad enterprise sales.',
      historicalRange: '(0.51 to 0.73)',
      keyEvents: 'PMI expansion in 2023 supported AAPL Services and enterprise growth',
      tradingImplication: 'PMI below 50 (contraction) typically bearish for AAPL'
    }
  },
  { 
    variable: 'VIX (Market Volatility)', 
    correlation: -0.74, 
    significance: 'Very High', 
    elasticity: -1.18,
    details: {
      mechanism: 'AAPL has high institutional ownership (62%) - forced deleveraging during vol spikes causes mechanical selling.',
      historicalRange: '(-0.68 to -0.83)',
      keyEvents: 'VIX spike to 65 in March 2020 saw AAPL down 32%',
      tradingImplication: 'VIX &gt;30 = avoid; VIX &lt;15 = bullish environment for AAPL'
    }
  },
  { 
    variable: 'NASDAQ Index', 
    correlation: 0.89, 
    significance: 'Very High', 
    elasticity: 0.94,
    details: {
      mechanism: 'AAPL comprises 8.5% of NASDAQ weight. Moves with tech sector due to shared drivers: rates, growth expectations, AI themes.',
      historicalRange: '(0.82 to 0.94)',
      keyEvents: 'Correlation above 0.85 consistently since 2020',
      tradingImplication: 'Beta near 1.0 - AAPL amplifies NASDAQ moves slightly'
    }
  },
  { 
    variable: 'Semiconductor Index (SOX)', 
    correlation: 0.76, 
    significance: 'Very High', 
    elasticity: 0.88,
    details: {
      mechanism: 'Apple depends on TSMC, Qualcomm, Broadcom chips. SOX reflects semiconductor supply/demand and tech capex cycle.',
      historicalRange: '(0.68 to 0.84)',
      keyEvents: '2023 AI chip boom lifted both SOX and AAPL together',
      tradingImplication: 'Monitor TSMC earnings - leading indicator for Apple supply chain health'
    }
  },
];

// Rolling correlation data
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

// Scenario data with detailed breakdown
const scenarioData = [
  { 
    scenario: 'Fed Rate +100bps', 
    aaplImpact: -12.4, 
    probability: 25, 
    timeframe: '12 months',
    details: {
      rationale: 'Sticky inflation forces Fed to resume hiking cycle. Higher discount rates compress valuation multiples.',
      assumptions: 'Fed Funds reaches 6.5%; 10Y yield climbs to 5.5%; no recession',
      precedent: 'Similar to 2022 cycle - AAPL declined 27% during rate hikes',
      hedging: 'Short 10Y Treasury futures or buy AAPL put options (6-month, 10% OTM)'
    }
  },
  { 
    scenario: 'Recession (GDP -2%)', 
    aaplImpact: -18.6, 
    probability: 30, 
    timeframe: '12 months',
    details: {
      rationale: 'Economic contraction reduces consumer spending, delays upgrade cycles, pressures Services revenue growth.',
      assumptions: 'Unemployment rises to 5.5%; consumer confidence drops 20 pts; iPhone sales down 15%',
      precedent: '2008-09 recession saw AAPL down 53% peak-to-trough',
      hedging: 'Reduce position size; pair trade with consumer staples longs'
    }
  },
  { 
    scenario: 'Oil Spike (+50%)', 
    aaplImpact: -5.7, 
    probability: 20, 
    timeframe: '6 months',
    details: {
      rationale: 'Geopolitical shock (e.g., Iran conflict) drives oil to $130/barrel. Increases logistics costs, reduces consumer spending.',
      assumptions: 'WTI reaches $125-135; gas prices hit $5/gallon average; supply chain disruption',
      precedent: '2022 oil spike to $120 correlated with AAPL correction',
      hedging: 'Long oil futures as portfolio diversifier'
    }
  },
  { 
    scenario: 'VIX Spike (>40)', 
    aaplImpact: -22.4, 
    probability: 15, 
    timeframe: '3 months',
    details: {
      rationale: 'Systemic market shock triggers deleveraging, margin calls, algorithmic selling. AAPL hit due to high institutional ownership.',
      assumptions: 'Black swan event (e.g., banking crisis, geopolitical conflict); market-wide selloff',
      precedent: 'COVID crash (March 2020) - VIX hit 82, AAPL down 32%',
      hedging: 'Buy VIX calls or protective puts on AAPL; reduce leverage'
    }
  },
  { 
    scenario: 'Tech Rally (NASDAQ +20%)', 
    aaplImpact: +18.8, 
    probability: 35, 
    timeframe: '12 months',
    details: {
      rationale: 'Fed cuts rates, AI momentum continues, economic soft landing. Tech sector re-rates higher on improved growth outlook.',
      assumptions: 'Fed cuts 75-100bps; inflation falls to 2.5%; AI adoption accelerates',
      precedent: '2023 rally - NASDAQ +43%, AAPL +48% on AI optimism',
      hedging: 'Take profit at key resistance levels; use trailing stops'
    }
  },
  { 
    scenario: 'USD Strengthening (+10%)', 
    aaplImpact: +4.8, 
    probability: 40, 
    timeframe: '12 months',
    details: {
      rationale: 'US economic outperformance drives safe-haven flows. Despite FX headwind, reflects risk-on environment favorable to AAPL.',
      assumptions: 'USD Index rises to 110; reflects growth divergence not crisis',
      precedent: 'Mixed historical precedent - depends on driver (safe-haven vs growth)',
      hedging: 'Correlation is complex - monitor alongside VIX and rates'
    }
  },
];

// Historical events with detailed analysis
const macroEvents = [
  { 
    date: 'Mar 2022', 
    event: 'Fed Rate Hike Cycle Begins', 
    macro: '+0.25%', 
    aapl: '-3.2%', 
    recovery: '45 days',
    details: {
      context: 'First rate hike since 2018. Markets initially viewed as hawkish pivot after prolonged dovish policy.',
      aaplSpecific: 'AAPL sold off less than NASDAQ due to strong Q1 earnings beat. Services revenue up 17% YoY.',
      lessons: 'First hike is usually not the worst - acceleration of pace matters more.',
      dataPoints: 'VIX rose to 35; 10Y yield jumped to 2.3%; NASDAQ down 9% that month'
    }
  },
  { 
    date: 'Jun 2022', 
    event: 'Inflation Peaks (9.1% CPI)', 
    macro: 'CPI 9.1%', 
    aapl: '-8.4%', 
    recovery: '120 days',
    details: {
      context: 'Highest inflation reading in 40 years. Fed credibility questioned. Forced super-sized 75bps hike.',
      aaplSpecific: 'Concerns over demand destruction and margin pressure. iPhone wait times shortened (demand weakness signal).',
      lessons: 'Peak inflation is paradoxically bearish short-term (forces Fed aggression) before bottoming.',
      dataPoints: '10Y yield peaked at 3.5%; Fed Funds target raised to 1.5-1.75%'
    }
  },
  { 
    date: 'Sep 2022', 
    event: 'Fed Rate +0.75% (Hawkish)', 
    macro: '+0.75%', 
    aapl: '-5.1%', 
    recovery: '60 days',
    details: {
      context: 'Third consecutive 75bps hike. Powell Jackson Hole speech emphasized "higher for longer." Markets repriced terminal rate.',
      aaplSpecific: 'AAPL hit 52-week low of $138. Valuation compressed to 22x P/E (from 30x). Strong balance sheet provided support.',
      lessons: 'Fed communication matters as much as action. "Pain" rhetoric crushed risk assets.',
      dataPoints: 'Fed terminal rate expectations rose to 4.6%; USD index peaked at 114'
    }
  },
  { 
    date: 'Mar 2023', 
    event: 'Silicon Valley Bank Collapse', 
    macro: 'Banking Crisis', 
    aapl: '-2.8%', 
    recovery: '15 days',
    details: {
      context: 'Regional banking crisis sparked by duration risk mismanagement. Fed/Treasury quickly intervened with backstops.',
      aaplSpecific: 'AAPL outperformed significantly - flight to quality trade. Cash hoard ($165B) seen as safety.',
      lessons: 'Quality mega-caps with fortress balance sheets become safe havens during credit events.',
      dataPoints: 'VIX spiked to 28 briefly; 2Y yield dropped 60bps (expectations of Fed pause)'
    }
  },
  { 
    date: 'Jul 2023', 
    event: 'Inflation Moderates (3% CPI)', 
    macro: 'CPI 3.0%', 
    aapl: '+6.2%', 
    recovery: 'N/A',
    details: {
      context: 'Clear disinflationary trend established. Markets began pricing "soft landing" scenario. Fed signaled pause.',
      aaplSpecific: 'Vision Pro unveiled at WWDC (June). AI narrative building (Apple Intelligence later). Services margin expansion story.',
      lessons: 'Disinflationary environment with stable growth is ideal macro for AAPL - valuation multiple expansion.',
      dataPoints: 'AAPL P/E expanded from 24x to 29x over H2 2023; NASDAQ up 26% H2'
    }
  },
  { 
    date: 'Nov 2023', 
    event: 'Fed Signals Rate Pause', 
    macro: 'Pause Signal', 
    aapl: '+7.8%', 
    recovery: 'N/A',
    details: {
      context: 'Powell dovish press conference. Implied rate cuts in 2024. 10Y yield dropped from 5% to 4.2% in weeks.',
      aaplSpecific: 'AAPL broke out to new all-time highs. Institutional flows accelerated. Options market turned bullish.',
      lessons: 'Fed pivot is among the most bullish macro catalysts for growth/tech stocks.',
      dataPoints: 'Call option volume surged 40%; institutional ownership increased to 62%'
    }
  },
  { 
    date: 'Apr 2024', 
    event: 'Sticky Inflation Concerns', 
    macro: 'CPI 3.5%', 
    aapl: '-4.1%', 
    recovery: '30 days',
    details: {
      context: 'Inflation reacceleration (Services inflation sticky). Fed pushed back rate cut timeline. "Higher for longer" 2.0.',
      aaplSpecific: 'DOJ antitrust lawsuit filed (App Store). China iPhone sales weak (-19% YoY). Multiple headwinds converged.',
      lessons: 'Inflation volatility extends uncertainty. Multiple negative catalysts can compound selloffs.',
      dataPoints: '10Y yield rose back to 4.7%; AAPL forward P/E compressed to 26x'
    }
  },
];

export default function MacroCorrelationEngineEnhanced() {
  const [selectedTab, setSelectedTab] = useState('matrix');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null);

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
      {/* Summary Cards - Now Expandable */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Collapsible open={expandedCard === 'nasdaq'} onOpenChange={() => setExpandedCard(expandedCard === 'nasdaq' ? null : 'nasdaq')}>
          <Card className="p-5 bg-card border-border cursor-pointer hover:bg-secondary/20 transition-colors">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Strongest Correlation</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  {expandedCard === 'nasdaq' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              </div>
              <div className="text-foreground text-base text-left">NASDAQ Index</div>
              <div className="text-cyan-400 text-sm mt-1 text-left">r = 0.89 (Very High)</div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                <p><span className="text-foreground">Beta:</span> 1.05 - AAPL amplifies NASDAQ moves</p>
                <p><span className="text-foreground">Range:</span> 0.82 to 0.94 over 3 years</p>
                <p><span className="text-foreground">Implication:</span> AAPL is pure tech sector play</p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible open={expandedCard === 'vix'} onOpenChange={() => setExpandedCard(expandedCard === 'vix' ? null : 'vix')}>
          <Card className="p-5 bg-card border-border cursor-pointer hover:bg-secondary/20 transition-colors">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Key Risk Factor</span>
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-red-400" />
                  {expandedCard === 'vix' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              </div>
              <div className="text-foreground text-base text-left">Market Volatility</div>
              <div className="text-red-400 text-sm mt-1 text-left">VIX: r = -0.74</div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                <p><span className="text-foreground">Rule:</span> VIX &gt;30 = avoid AAPL</p>
                <p><span className="text-foreground">Optimal:</span> VIX &lt;15 = bullish environment</p>
                <p><span className="text-foreground">Mechanism:</span> Institutional deleveraging drives selloffs</p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible open={expandedCard === 'rates'} onOpenChange={() => setExpandedCard(expandedCard === 'rates' ? null : 'rates')}>
          <Card className="p-5 bg-card border-border cursor-pointer hover:bg-secondary/20 transition-colors">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Rate Sensitivity</span>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  {expandedCard === 'rates' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              </div>
              <div className="text-foreground text-2xl text-left">-1.24</div>
              <div className="text-muted-foreground text-sm mt-1 text-left">Elasticity coefficient</div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                <p><span className="text-foreground">Impact:</span> +100bps = -12.4% AAPL decline</p>
                <p><span className="text-foreground">Duration:</span> Long-duration growth stock</p>
                <p><span className="text-foreground">Trading:</span> Fed pivot = strongest bull catalyst</p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible open={expandedCard === 'macro'} onOpenChange={() => setExpandedCard(expandedCard === 'macro' ? null : 'macro')}>
          <Card className="p-5 bg-card border-border cursor-pointer hover:bg-secondary/20 transition-colors">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground text-sm">Macro Variables</span>
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  {expandedCard === 'macro' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </div>
              </div>
              <div className="text-foreground text-2xl text-left">11</div>
              <div className="text-muted-foreground text-sm mt-1 text-left">Tracked indicators</div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                <p><span className="text-foreground">Top 3:</span> NASDAQ, VIX, Fed Rates</p>
                <p><span className="text-foreground">Update:</span> Daily monitoring via dashboard</p>
                <p><span className="text-foreground">Models:</span> Regression + ML ensemble</p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="matrix">Correlation Matrix</TabsTrigger>
          <TabsTrigger value="rolling">Rolling Correlations</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
        </TabsList>

        {/* Correlation Matrix - Expandable Rows */}
        <TabsContent value="matrix" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-1">AAPL Correlation with Macro Variables</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Click any row for detailed analysis including mechanism, historical range, key events, and trading implications
            </p>

            <div className="space-y-2">
              {correlationMatrix.map((item, idx) => (
                <Collapsible key={idx} open={expandedRow === idx} onOpenChange={() => setExpandedRow(expandedRow === idx ? null : idx)}>
                  <Card className="border-border/50 hover:bg-secondary/20 transition-colors">
                    <CollapsibleTrigger className="w-full">
                      <div className="grid grid-cols-5 gap-4 p-4 items-center cursor-pointer">
                        <div className="text-foreground flex items-center gap-2">
                          {expandedRow === idx ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4" />}
                          {item.variable}
                        </div>
                        <div className={`text-right ${getCorrelationColor(item.correlation)}`}>
                          {item.correlation > 0 ? '+' : ''}{item.correlation.toFixed(2)}
                        </div>
                        <div className="text-center">
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
                        </div>
                        <div className={`text-right ${getCorrelationColor(item.elasticity)}`}>
                          {item.elasticity > 0 ? '+' : ''}{item.elasticity.toFixed(2)}
                        </div>
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
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-2 border-t border-border space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="text-cyan-400 mb-1">Mechanism</h4>
                            <p className="text-muted-foreground">{item.details.mechanism}</p>
                          </div>
                          <div>
                            <h4 className="text-cyan-400 mb-1">Historical Range</h4>
                            <p className="text-muted-foreground">{item.details.historicalRange}</p>
                          </div>
                          <div>
                            <h4 className="text-amber-400 mb-1">Key Events</h4>
                            <p className="text-muted-foreground">{item.details.keyEvents}</p>
                          </div>
                          <div>
                            <h4 className="text-green-400 mb-1">Trading Implication</h4>
                            <p className="text-muted-foreground">{item.details.tradingImplication}</p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary/20 border border-border rounded-lg p-5">
                <h3 className="text-foreground mb-3 flex items-center justify-between">
                  Key Insights
                  <span className="text-xs text-muted-foreground">Click rows above for details</span>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    { text: 'NASDAQ (r=0.89): Strongest positive correlation; AAPL moves with broader tech sector', id: 0 },
                    { text: 'VIX (r=-0.74): Strong negative correlation; stock suffers during volatility spikes', id: 1 },
                    { text: 'Interest Rates (r=-0.67): Highly rate-sensitive; Fed policy is critical driver', id: 2 },
                    { text: 'PMI (r=0.61): Strong correlation with manufacturing activity and economic health', id: 3 }
                  ].map((insight) => (
                    <Collapsible key={insight.id} open={expandedInsight === insight.id} onOpenChange={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}>
                      <li className="cursor-pointer hover:text-foreground transition-colors">
                        <CollapsibleTrigger className="w-full text-left flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">{expandedInsight === insight.id ? '▼' : '•'}</span>
                          <span><span className="text-foreground">{insight.text.split(':')[0]}:</span>{insight.text.split(':').slice(1).join(':')}</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="ml-5 mt-2 p-3 bg-secondary/40 rounded border border-border text-xs">
                            <p className="text-muted-foreground">
                              {insight.id === 0 && 'AAPL comprises 8.5% of NASDAQ. Trade together due to shared macro sensitivities (rates, growth, tech sentiment). Use SPY/QQQ ratio to identify relative strength.'}
                              {insight.id === 1 && 'When VIX spikes above 30, AAPL typically sells off 10-15% due to systematic deleveraging. Options become expensive - consider cash as hedge.'}
                              {insight.id === 2 && 'Fed rate changes impact AAPL through multiple channels: discount rate (valuation), consumer credit (iPhone financing), USD (FX translation). Monitor Fed dot plot quarterly.'}
                              {insight.id === 3 && 'PMI below 50 signals manufacturing contraction. AAPL business sales and supply chain both impaired. Services revenue becomes more important in downturns.'}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </li>
                    </Collapsible>
                  ))}
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

        {/* Scenario Analysis - Expandable Scenarios */}
        <TabsContent value="scenarios" className="space-y-4 mt-4">
          <Card className="p-6 bg-card border-border shadow-lg">
            <h2 className="text-primary mb-1">Macro Scenario Impact Analysis</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Click each scenario for detailed breakdown including rationale, assumptions, historical precedent, and hedging strategies
            </p>

            <div className="space-y-3 mb-6">
              {scenarioData.map((scenario, idx) => (
                <Collapsible key={idx} open={expandedScenario === idx} onOpenChange={() => setExpandedScenario(expandedScenario === idx ? null : idx)}>
                  <Card className="border-border/50">
                    <CollapsibleTrigger className="w-full">
                      <div className="p-4 cursor-pointer hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1 flex items-center gap-2">
                            {expandedScenario === idx ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4" />}
                            <div>
                              <h3 className="text-foreground text-left">{scenario.scenario}</h3>
                              <p className="text-muted-foreground text-sm text-left">Timeframe: {scenario.timeframe} • Probability: {scenario.probability}%</p>
                            </div>
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
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-4 pb-4 border-t border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                          <div>
                            <h4 className="text-cyan-400 mb-2 flex items-center gap-1">
                              <span>📊</span> Rationale
                            </h4>
                            <p className="text-muted-foreground">{scenario.details.rationale}</p>
                          </div>
                          <div>
                            <h4 className="text-amber-400 mb-2 flex items-center gap-1">
                              <span>📋</span> Key Assumptions
                            </h4>
                            <p className="text-muted-foreground">{scenario.details.assumptions}</p>
                          </div>
                          <div>
                            <h4 className="text-purple-400 mb-2 flex items-center gap-1">
                              <span>📚</span> Historical Precedent
                            </h4>
                            <p className="text-muted-foreground">{scenario.details.precedent}</p>
                          </div>
                          <div>
                            <h4 className="text-green-400 mb-2 flex items-center gap-1">
                              <span>🛡️</span> Hedging Strategy
                            </h4>
                            <p className="text-muted-foreground">{scenario.details.hedging}</p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-foreground mb-4">Historical Macro Event Responses (Click for Details)</h3>
              <div className="space-y-2">
                {macroEvents.map((event, idx) => (
                  <Collapsible key={idx} open={expandedEvent === idx} onOpenChange={() => setExpandedEvent(expandedEvent === idx ? null : idx)}>
                    <Card className="border-border/50">
                      <CollapsibleTrigger className="w-full">
                        <div className="grid grid-cols-5 gap-4 p-3 items-center cursor-pointer hover:bg-secondary/20 transition-colors">
                          <div className="text-muted-foreground text-sm flex items-center gap-2">
                            {expandedEvent === idx ? <ChevronUp className="w-3 h-3 text-primary" /> : <ChevronDown className="w-3 h-3" />}
                            {event.date}
                          </div>
                          <div className="text-foreground text-left">{event.event}</div>
                          <div className="text-right text-amber-400">{event.macro}</div>
                          <div className={`text-right ${event.aapl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {event.aapl}
                          </div>
                          <div className="text-right text-muted-foreground">{event.recovery}</div>
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-3 pb-3 border-t border-border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-xs">
                            <div>
                              <h5 className="text-cyan-400 mb-1">Macro Context</h5>
                              <p className="text-muted-foreground">{event.details.context}</p>
                            </div>
                            <div>
                              <h5 className="text-amber-400 mb-1">AAPL-Specific Factors</h5>
                              <p className="text-muted-foreground">{event.details.aaplSpecific}</p>
                            </div>
                            <div>
                              <h5 className="text-green-400 mb-1">Key Lessons</h5>
                              <p className="text-muted-foreground">{event.details.lessons}</p>
                            </div>
                            <div>
                              <h5 className="text-purple-400 mb-1">Key Data Points</h5>
                              <p className="text-muted-foreground">{event.details.dataPoints}</p>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
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