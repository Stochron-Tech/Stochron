import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Activity, 
  TrendingUp, 
  Shield, 
  Map, 
  Calendar, 
  BarChart, 
  Zap,
  ArrowRight,
  Database,
  BarChart3,
  AlertTriangle,
  Target,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Section {
  title: string;
  content: string;
  expanded?: boolean;
}

export default function ModelIntroduction() {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const sections: Section[] = [
    {
      title: "What Is This Platform?",
      content: "The Financial Markets Intelligence Platform is an advanced geopolitical and macroeconomic risk analysis system designed specifically for Apple Inc. (AAPL) stock performance analysis. This comprehensive analytical framework integrates quantitative forecasting, sentiment analysis from global news sources, supply chain vulnerability mapping, macroeconomic correlation modeling, and AI-powered scenario simulation to deliver actionable investment intelligence. Whether you're a portfolio manager, equity analyst, corporate strategist, or institutional investor, this platform translates complex geopolitical dynamics and market forces into clear risk assessments and forward-looking stock performance insights."
    },
    {
      title: "Why Apple Stock Analysis Matters",
      content: "Apple Inc. represents one of the world's most valuable and geopolitically exposed technology companies, with a market capitalization exceeding $2.5 trillion. The company's global supply chain spans dozens of countries with concentrated dependencies on China for manufacturing (>90% of iPhone production), Taiwan for semiconductors (TSMC), and emerging markets for revenue growth (China represents ~20% of revenue). Apple faces unique exposures to US-China tech tensions, semiconductor supply constraints, rare earth mineral dependencies, regulatory scrutiny across jurisdictions, and consumer sentiment shifts. Stock volatility is driven not just by earnings, but by geopolitical events (trade restrictions, tariffs), supply disruptions (COVID lockdowns, Taiwan risks), and macroeconomic conditions (inflation, interest rates, currency fluctuations). Understanding AAPL requires integrating technology sector dynamics, geopolitical risk, supply chain intelligence, and macro correlation analysis."
    },
    {
      title: "Who Should Use This Platform?",
      content: "This platform serves multiple stakeholder groups: (1) Equity Analysts & Portfolio Managers - requiring real-time risk assessment for position sizing and hedging strategies; (2) Institutional Investors & Hedge Funds - conducting deep-dive due diligence on geopolitical exposure and scenario planning; (3) Corporate Strategy & Investor Relations Teams - monitoring external risk factors affecting stock performance and market perception; (4) Risk Management Officers - quantifying exposure to specific geopolitical, macroeconomic, and supply chain risks; (5) Financial Advisors & Wealth Managers - understanding AAPL's risk profile for client portfolios; (6) Academic & Research Institutions - studying the intersection of geopolitical risk, supply chains, and equity market dynamics."
    },
    {
      title: "How The Platform Works: Data → Analysis → Intelligence",
      content: "The platform operates as an integrated intelligence production system: (1) Data Aggregation - Ingests real-time market data (stock prices, options, volume), news feeds (Reuters, Bloomberg, government announcements), supply chain intelligence (shipping data, component suppliers), macroeconomic indicators (CPI, PMI, oil prices), and geopolitical event databases; (2) Processing & Normalization - Cleans, standardizes, and reconciles data across sources, applying natural language processing to unstructured text; (3) Multi-Module Analysis - Applies 7 specialized analytical modules (detailed below), each addressing a specific risk dimension; (4) Integration & Synthesis - Combines outputs into composite risk scores, correlation matrices, and scenario probabilities; (5) Visualization & Reporting - Presents findings through interactive dashboards with drill-down capabilities and detailed explanations; (6) Decision Support - Enables interactive 'what-if' scenario testing with AI-generated impact briefs for strategic decision-making."
    }
  ];

  const modules = [
    {
      id: 1,
      name: "Forecasting Engine",
      icon: Activity,
      description: "Multi-Model Stock Performance Prediction",
      details: "Employs a sophisticated ensemble of forecasting methodologies: ARIMA (AutoRegressive Integrated Moving Average) for trend and cyclical pattern detection, GARCH (Generalized AutoRegressive Conditional Heteroskedasticity) for volatility modeling and variance forecasting, VAR (Vector AutoRegression) for multi-variate dependencies between AAPL and correlated assets (NASDAQ, USD, semiconductor indices), and Machine Learning models (Random Forest, Gradient Boosting, LSTM neural networks) trained on historical price patterns, volume, and technical indicators. Models can be compared side-by-side with adjustable parameters (lag structure, training windows, feature sets). Outputs include point forecasts, confidence intervals, probability distributions, and model selection criteria (AIC, BIC, RMSE, MAE) for 1-week, 1-month, 3-month, and 12-month horizons.",
      inputs: "Historical AAPL prices, trading volume, technical indicators, market indices",
      outputs: "Price forecasts, volatility estimates, confidence intervals, model comparison metrics"
    },
    {
      id: 2,
      name: "Foreboding-Lag Module",
      icon: TrendingUp,
      description: "NLP-Powered Geopolitical Sentiment Analysis",
      details: "Applies advanced natural language processing and sentiment analysis to detect early warning signals of geopolitical events that may impact Apple stock. Continuously monitors and processes: news articles from major financial media (Bloomberg, Reuters, WSJ, FT), government policy documents and announcements (US, China, EU regulatory bodies), social media feeds (Twitter sentiment from influential accounts, Reddit WallStreetBets), corporate filings and earnings call transcripts, and analyst reports. NLP algorithms extract sentiment scores, topic modeling identifies emerging themes (trade tensions, regulatory scrutiny, supply disruptions), and named entity recognition tracks key actors (governments, competitors, suppliers). Time-series regression models estimate lag structures between sentiment shifts and stock price movements, distinguishing between noise and actionable signals with lead times ranging from 24 hours to 4 weeks.",
      inputs: "News feeds, government documents, social media, earnings transcripts, analyst reports",
      outputs: "Sentiment index time-series, topic clusters, lag coefficients, early warning alerts"
    },
    {
      id: 3,
      name: "Risk Exposure Map",
      icon: Map,
      description: "Geographic Revenue & Operational Risk Mapping",
      details: "Provides comprehensive mapping of Apple's global footprint across sales channels, manufacturing facilities, and supply chain operations. Each country and region is assigned multi-dimensional risk scores derived from a proprietary Country Risk Index incorporating: political stability (regime type, policy volatility, election cycles), regulatory environment (IP protection, data localization, antitrust scrutiny), economic indicators (GDP growth, currency stability, inflation), geopolitical tensions (trade restrictions, sanctions, diplomatic relations), and operational risks (labor unrest, infrastructure quality, natural disaster exposure). Platform calculates Revenue-at-Risk by department (iPhone, Mac, Services, Wearables) and geography (Greater China, Americas, Europe, Japan, Rest of Asia Pacific). Interactive heat maps visualize exposure concentration, dependency matrices show critical single-points-of-failure, and drill-down capabilities reveal micro-level supplier relationships and facility locations.",
      inputs: "Apple's geographic revenue breakdown, supplier locations, country risk indices",
      outputs: "Revenue-at-risk by region/product, risk heat maps, dependency concentration scores"
    },
    {
      id: 4,
      name: "Supply Chain Vulnerability Tracker",
      icon: Shield,
      description: "Four-Dimensional Supply Chain Analysis",
      details: "Comprehensive supply chain risk assessment with four specialized sub-modules: (a) World Supply Map - Interactive bubble chart visualizing Apple's global supplier network across 40+ countries. Each node represents manufacturing hubs (Shenzhen, Zhengzhou, Bangalore, Vietnam), component suppliers (TSMC, Foxconn, Samsung), and critical material sources. Bubble size indicates production volume, color indicates risk level (composite score), with real-time updates reflecting geopolitical events or disruptions. (b) Vulnerability Breakdown - Bar chart comparing 13 vulnerability indices: Geographic Concentration, Supplier Network Complexity, Component Substitutability, Supply Chain Transparency, Logistics Infrastructure, Regulatory/Tariff Risk, Economic Exposure, Environmental/Climate Risk, Governance Standards, Security/Political Risk, Operational Continuity, Technology Dependency, and Resilience Capacity. Each index scored 0-100. (c) Critical Material Dependence - Bar chart showing dependency percentages for key materials: rare earth elements (China 80%), cobalt (Congo 60%), lithium (Australia/Chile 70%), semiconductors (Taiwan 65%), and other strategic inputs. (d) Vulnerability Trend - Time-series visualization tracking evolution of the 13 indices and an aggregate Supply Chain Vulnerability Index over rolling 36-month periods, highlighting inflection points.",
      inputs: "Supplier database, component sourcing, material dependencies, logistics data",
      outputs: "Supply map visualization, 13 vulnerability indices, material dependency metrics, trend analysis"
    },
    {
      id: 5,
      name: "Macro-Correlation Engine",
      icon: BarChart,
      description: "Stock-Macro Variable Correlation Analysis",
      details: "Advanced econometric analysis of how Apple stock volatility and returns correlate with macroeconomic variables. Analyzes relationships with: Oil Prices (WTI, Brent - impact on consumer spending and input costs), Interest Rates (Fed Funds, 10Y Treasury - affecting discount rates and tech valuations), Inflation Indicators (CPI, Core PCE - purchasing power and margin impacts), Currency Exchange Rates (USD/CNY, USD/EUR - affecting international revenue), Consumer Confidence Indices, Purchasing Managers' Indices (PMI - manufacturing activity indicators), Semiconductor Pricing Indices, and VIX (market volatility). Includes: static correlation heat maps (Pearson, Spearman), dynamic rolling 36-month correlation windows detecting regime changes, elasticity mapping (% change in AAPL for 1% change in macro variable), Granger causality tests (do macro variables predict AAPL movements?), and multivariate regression models with interaction effects. Identifies which macro factors are most predictive of AAPL performance and when relationships break down.",
      inputs: "AAPL returns, oil prices, interest rates, CPI, PMI, exchange rates, VIX",
      outputs: "Correlation matrices, rolling correlation trends, elasticity coefficients, predictive models"
    },
    {
      id: 6,
      name: "Event Timeline Tracker",
      icon: Calendar,
      description: "Geopolitical & Market Event Chronicle",
      details: "Maintains dynamic, continuously updated database of events affecting Apple and the broader technology sector. Events categorized into: Geopolitical (US-China trade tensions, Huawei sanctions, CHIPS Act, export controls on semiconductors), Regulatory (EU Digital Markets Act, App Store antitrust cases, data privacy regulations), Supply Chain (COVID lockdowns in China, Taiwan earthquake risks, chip shortages), Corporate (product launches, earnings surprises, executive changes, M&A activity), and Macroeconomic (Fed rate decisions, inflation shocks, currency crises). Each event tagged with: date, type, severity rating (1-10), quantitative stock impact (% price change in 1-day, 5-day, 30-day windows), affected modules (which model assumptions need revision), and current status (ongoing, resolved, escalating). Enables pattern recognition such as seasonal cycles, announcement-response lags, and multi-event compounding effects. Users can add custom events to keep the model dynamic and adaptable.",
      inputs: "Event databases, news feeds, regulatory announcements, company filings",
      outputs: "Interactive timeline, event impact quantification, pattern analysis, model update triggers"
    },
    {
      id: 7,
      name: "Shock Simulator",
      icon: Zap,
      description: "Interactive Market Scenario Testing",
      details: "Sophisticated sandbox environment for simulating complex market shock scenarios affecting Apple stock. Users can construct multi-layered shocks through an intuitive drag-and-drop interface: Geopolitical shocks (US-China tech decoupling, Taiwan invasion scenarios, semiconductor export bans), Supply chain disruptions (closure of Foxconn facilities, TSMC production halts, rare earth material shortages), Macroeconomic shocks (Fed rate hikes, recession scenarios, currency devaluations, oil price spikes), Regulatory events (antitrust breakup scenarios, App Store revenue model changes, data localization requirements), and Competitive dynamics (new iPhone sales misses, market share losses, innovation failures). Each shock propagates through all platform modules using calibrated elasticities, cross-correlations, and transmission mechanisms. Users can connect analytical building blocks (regression tools, scenario matrices, Monte Carlo simulators) and customize parameters (shock magnitude, duration, interaction effects). Integrated ChatGPT support generates detailed scenario briefs including: narrative description, quantitative impact forecast (price targets, volatility estimates), affected stakeholders, timeline, mitigation strategies, and hedging recommendations. Enables stress testing of portfolio positions and development of contingency plans.",
      inputs: "User-defined shock scenarios (geopolitical, supply chain, macro, regulatory, competitive)",
      outputs: "Integrated multi-module impact assessment, AI-generated scenario reports, stress test results"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Introduction */}
      <Card className="p-8 bg-gradient-to-br from-card via-card to-secondary/20 border-border shadow-xl">
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Platform Overview
          </Badge>
          <h1 className="text-primary mb-4">
            Financial Markets Intelligence Platform
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            An advanced geopolitical and macroeconomic risk analysis system for Apple Inc. (AAPL), integrating multi-model forecasting, 
            NLP-powered sentiment analysis, supply chain intelligence, macro correlation modeling, and AI-driven scenario simulation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">7</div>
              <div className="text-muted-foreground text-sm">Analysis Modules</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">13</div>
              <div className="text-muted-foreground text-sm">Vulnerability Indices</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">40+</div>
              <div className="text-muted-foreground text-sm">Data Sources</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-primary text-3xl mb-1">∞</div>
              <div className="text-muted-foreground text-sm">Test Scenarios</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Understanding The Platform */}
      <Card className="p-8 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-6">Understanding the Platform</h2>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden bg-secondary/20">
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
              >
                <h3 className="text-foreground">{section.title}</h3>
                {expandedSections[index] ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedSections[index] && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Dynamic Pipeline Visualization */}
      <Card className="p-8 bg-card border-border shadow-lg">
        <div className="mb-6">
          <h2 className="text-primary mb-2">Intelligence Production Pipeline</h2>
          <p className="text-muted-foreground">
            Visual representation of how data flows through the 7 analytical modules to generate investment intelligence
          </p>
        </div>

        {/* Pipeline Flow */}
        <div className="space-y-6">
          {/* Data Input Stage */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-primary/10 border-2 border-primary/30 rounded-lg flex items-center justify-center">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Data Aggregation Layer</h3>
                <Badge variant="outline" className="border-primary text-primary text-xs">
                  Input
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Market Data • News Feeds • Government Announcements • Supply Chain Intel • Macro Indicators • Social Media Sentiment
              </p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Processing Modules */}
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((module, idx) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.id}
                  className="group relative bg-secondary/30 border border-border hover:border-primary transition-all rounded-lg p-5 hover:shadow-md"
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                          Module {module.id}
                        </Badge>
                      </div>
                      <h4 className="text-foreground mb-1">{module.name}</h4>
                      <p className="text-muted-foreground text-sm mb-3">{module.description}</p>
                      
                      {/* Expandable Details */}
                      <details className="group/details">
                        <summary className="cursor-pointer text-primary text-sm hover:underline list-none flex items-center gap-1">
                          <span>View Details</span>
                          <ChevronDown className="w-4 h-4 group-open/details:rotate-180 transition-transform" />
                        </summary>
                        <div className="mt-3 pt-3 border-t border-border space-y-2">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {module.details}
                          </p>
                          <div className="grid grid-cols-1 gap-2 mt-3">
                            <div className="flex gap-2 text-xs">
                              <Eye className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              <div>
                                <span className="text-emerald-400">Inputs:</span>
                                <span className="text-muted-foreground ml-2">{module.inputs}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 text-xs">
                              <Target className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                              <div>
                                <span className="text-cyan-400">Outputs:</span>
                                <span className="text-muted-foreground ml-2">{module.outputs}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Integration Layer */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-500/10 border-2 border-amber-500/30 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Integration & Synthesis Layer</h3>
                <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                  Processing
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Cross-module correlation • Composite risk scoring • Multi-variate regression • Anomaly detection • Scenario weighting
              </p>
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          {/* Output Stage */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 border-2 border-cyan-500/30 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-foreground">Investment Intelligence Output</h3>
                <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
                  Actionable
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                Stock forecasts • Risk exposure metrics • Scenario impact briefs • Investment recommendations • Real-time alerts
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Getting Started */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-border shadow-lg">
        <h2 className="text-primary mb-4">Getting Started</h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="leading-relaxed">
            <span className="text-primary">For First-Time Users:</span> Begin with the <span className="text-foreground">Forecasting Engine</span> to understand baseline stock projections across multiple models, 
            then explore the <span className="text-foreground">Risk Exposure Map</span> to visualize Apple's geographic vulnerabilities. The <span className="text-foreground">Event Timeline Tracker</span> provides 
            historical context for current market dynamics.
          </p>
          <p className="leading-relaxed">
            <span className="text-primary">For Portfolio Managers:</span> Focus on the <span className="text-foreground">Macro-Correlation Engine</span> to understand how interest rates, inflation, and other macro factors 
            drive AAPL performance. Use <span className="text-foreground">Supply Chain Vulnerability</span> metrics to assess operational risks and their potential stock impact.
          </p>
          <p className="leading-relaxed">
            <span className="text-primary">For Scenario Planning:</span> Leverage the <span className="text-foreground">Shock Simulator</span> to test custom scenarios such as Taiwan supply disruptions, 
            US-China tech decoupling, or regulatory interventions. AI-generated briefs provide detailed impact assessments and hedging strategies.
          </p>
          <p className="leading-relaxed">
            <span className="text-primary">Navigation:</span> Use the sidebar menu to navigate between modules. Each module offers drill-down capabilities—click on charts, 
            heat maps, and data points to access granular details. Modules integrate seamlessly for comprehensive cross-cutting analysis.
          </p>
        </div>
      </Card>
    </div>
  );
}
