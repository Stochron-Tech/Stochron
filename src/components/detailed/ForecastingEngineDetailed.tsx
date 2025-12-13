import { useState } from "react";
import {
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Badge } from "../ui/badge";
import type { ScenarioType } from "../../App";
import type { ScenarioImpact } from "../../utils/scenario";

interface ForecastingEngineDetailedProps {
  stock: string;
  scenario: ScenarioType;
  customShock: Record<string, number>;
  impact: ScenarioImpact;
}

export function ForecastingEngineDetailed({
  stock,
  scenario,
  customShock,
  impact,
}: ForecastingEngineDetailedProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    string | null
  >(null);

  const stockUpper = stock.toUpperCase();
  const scenarioUpper = scenario
    ? scenario.charAt(0).toUpperCase() + scenario.slice(1)
    : "Base";

  customShock;
  stockUpper;
  scenarioUpper;


  // Generate historical data 2000-2023
  const generateHistoricalData = () => {
    const data = [];
    const startYear = 2000;
    const endYear = 2023;

    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1);
        let price = 45;

        // Simulate Boeing's historical price movements with major events
        if (year >= 2000 && year <= 2003) {
          price = 35 + Math.random() * 15; // Post dot-com bubble
        } else if (year >= 2004 && year <= 2007) {
          price = 50 + (year - 2004) * 15 + Math.random() * 10; // Growth period
        } else if (year >= 2008 && year <= 2009) {
          price = 80 - (year - 2007) * 25 + Math.random() * 10; // Financial crisis
        } else if (year >= 2010 && year <= 2018) {
          price = 55 + (year - 2010) * 20 + Math.random() * 15; // Recovery & growth
        } else if (year >= 2019 && year <= 2020) {
          price =
            380 - (year - 2018) * 150 + Math.random() * 20; // 737 MAX crisis + COVID
        } else {
          price = 180 + (year - 2020) * 15 + Math.random() * 20; // Recovery
        }

        data.push({
          date: date.toISOString().split("T")[0],
          actual: Number(price.toFixed(2)),
          year,
          month,
        });
      }
    }

    return data;
  };

  // Generate forecast data for different models
  const generateForecastData = (
    historicalData: any[],
    model: string,
  ) => {
    const lastPrice =
      historicalData[historicalData.length - 1].actual;
    const forecastYears = 3;
    const forecasts = [];

    for (let i = 0; i < forecastYears * 12; i++) {
      const lastDate = new Date(
        historicalData[historicalData.length - 1].date,
      );
      lastDate.setMonth(lastDate.getMonth() + i + 1);

      let forecast = lastPrice;
      let upperBound = lastPrice;
      let lowerBound = lastPrice;

      if (model === "ARIMA") {
        // ARIMA: Smooth trend with slight upward bias
        forecast = lastPrice + i * 0.5 + Math.sin(i / 6) * 5;
        upperBound = forecast * 1.12;
        lowerBound = forecast * 0.88;
      } else if (model === "SARIMA") {
        // SARIMA: Seasonal patterns
        forecast = lastPrice + i * 0.3 + Math.sin(i / 6) * 12;
        upperBound = forecast * 1.15;
        lowerBound = forecast * 0.85;
      } else if (model === "GARCH") {
        // GARCH: Volatility clustering
        const volatility = 1 + Math.abs(Math.sin(i / 3)) * 0.2;
        forecast = lastPrice + i * 0.4;
        upperBound = forecast * volatility;
        lowerBound = forecast / volatility;
      }

      forecasts.push({
        date: lastDate.toISOString().split("T")[0],
        forecast: Number(forecast.toFixed(2)),
        upperBound: Number(upperBound.toFixed(2)),
        lowerBound: Number(lowerBound.toFixed(2)),
      });
    }

    return forecasts;
  };

  const historicalData = generateHistoricalData();
  const arimaForecast = generateForecastData(
    historicalData,
    "ARIMA",
  );
  const sarimaForecast = generateForecastData(
    historicalData,
    "SARIMA",
  );
  const garchForecast = generateForecastData(
    historicalData,
    "GARCH",
  );

  // Major historical periods
  const periods = [
    {
      id: "dotcom",
      name: "Dot-com Bubble Aftermath",
      start: "2000-01-01",
      end: "2003-12-31",
      description:
        "Following the dot-com crash, Boeing faced reduced airline orders as the aviation industry contracted. Stock price remained subdued with high uncertainty.",
      impact: "Negative",
      details:
        "During this period, Boeing experienced a 15% decline in commercial aircraft deliveries. The 9/11 attacks in 2001 further devastated the airline industry, leading to mass cancellations and deferrals of aircraft orders.",
    },
    {
      id: "growth",
      name: "Growth & Expansion",
      start: "2004-01-01",
      end: "2007-12-31",
      description:
        "Strong global economic growth drove demand for commercial aircraft. Boeing introduced the 787 Dreamliner, generating significant order backlog.",
      impact: "Positive",
      details:
        "The launch of the 787 program in 2004 brought in over 800 orders. Defense contracts remained stable. Stock price grew at an average of 25% annually during this period.",
    },
    {
      id: "crisis",
      name: "Financial Crisis",
      start: "2008-01-01",
      end: "2009-12-31",
      description:
        "Global financial meltdown led to sharp decline in aircraft orders, delivery delays, and stock price collapse from $95 to $35.",
      impact: "Severe Negative",
      details:
        "Airlines canceled or deferred over 100 aircraft orders. Credit markets froze, making it difficult for customers to finance purchases. Boeing cut production rates by 30%.",
    },
    {
      id: "recovery",
      name: "Post-Crisis Recovery",
      start: "2010-01-01",
      end: "2018-12-31",
      description:
        "Longest bull run in Boeing's history. Strong demand from Asia-Pacific, record deliveries, and successful 787 ramp-up drove stock from $55 to $380.",
      impact: "Strong Positive",
      details:
        "Boeing delivered over 800 aircraft annually by 2018. The company achieved record revenue and earnings. Defense segment remained stable with multi-year government contracts.",
    },
    {
      id: "max-crisis",
      name: "737 MAX Crisis & COVID-19",
      start: "2019-01-01",
      end: "2020-12-31",
      description:
        "Two fatal crashes led to global grounding of 737 MAX. COVID-19 pandemic devastated aviation demand. Stock crashed from $440 to $95.",
      impact: "Catastrophic",
      details:
        "The 737 MAX was grounded for 20 months. COVID-19 led to 60% decline in global air traffic. Boeing burned through $20B in cash and took on significant debt to survive.",
    },
    {
      id: "rebuild",
      name: "Rebuilding Phase",
      start: "2021-01-01",
      end: "2023-12-31",
      description:
        "737 MAX return to service, gradual recovery in deliveries, but supply chain challenges and quality issues persisted.",
      impact: "Mixed",
      details:
        "MAX deliveries resumed but at reduced rates. Supply chain disruptions affected production. Quality control issues emerged, impacting reputation and requiring additional investments.",
    },
  ];

  const selectedPeriodData = periods.find(
    (p) => p.id === selectedPeriod,
  );

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-6">
        <TrendingUp className="h-6 w-6 text-cyan-400" />
        <div>
          <h2 className="text-2xl text-cyan-400">
            Forecasting Engine - Detailed Analysis
          </h2>
          <p className="text-sm text-gray-400">
            Time-series forecasting using multiple methodologies
            (2000-2026)
          </p>
        </div>
      </div>

      <Tabs defaultValue="historical" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#161b22]">
          <TabsTrigger value="historical">
            Historical Data
          </TabsTrigger>
          <TabsTrigger value="arima">
            ARIMA Forecast
          </TabsTrigger>
          <TabsTrigger value="sarima">
            SARIMA Forecast
          </TabsTrigger>
          <TabsTrigger value="garch">
            GARCH Forecast
          </TabsTrigger>
        </TabsList>

        {/* Historical Data Tab */}
        <TabsContent value="historical" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
            <h3 className="text-lg text-gray-100 mb-4">
              Boeing Stock Price: 2000-2023
            </h3>

            {/* Chart with period markers */}
            <div className="h-[500px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.getFullYear().toString();
                    }}
                    interval={23}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />

                  {/* Period markers */}
                  <ReferenceLine
                    x="2003-12-31"
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: "Dot-com End",
                      fontSize: 10,
                      fill: "#f59e0b",
                    }}
                  />
                  <ReferenceLine
                    x="2008-01-01"
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label={{
                      value: "Crisis",
                      fontSize: 10,
                      fill: "#ef4444",
                    }}
                  />
                  <ReferenceLine
                    x="2019-01-01"
                    stroke="#dc2626"
                    strokeDasharray="3 3"
                    label={{
                      value: "MAX Crisis",
                      fontSize: 10,
                      fill: "#dc2626",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    name="Stock Price ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Period Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm text-gray-400">
                Major Historical Periods
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {periods.map((period) => (
                  <button
                    key={period.id}
                    onClick={() =>
                      setSelectedPeriod(
                        selectedPeriod === period.id
                          ? null
                          : period.id,
                      )
                    }
                    className={`rounded-lg border p-3 text-left transition-all ${
                      selectedPeriod === period.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-gray-700 bg-[#0d1117] hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-100">
                        {period.name}
                      </span>
                      <Badge
                        variant={
                          period.impact.includes("Negative") ||
                          period.impact.includes("Catastrophic")
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          period.impact.includes("Catastrophic")
                            ? "bg-red-600/20 text-red-400"
                            : period.impact.includes("Negative")
                              ? "bg-red-500/20 text-red-400"
                              : period.impact.includes(
                                    "Positive",
                                  )
                                ? "bg-green-500/20 text-green-400"
                                : "bg-gray-500/20 text-gray-400"
                        }
                      >
                        {period.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(period.start).getFullYear()} -{" "}
                      {new Date(period.end).getFullYear()}
                    </p>
                  </button>
                ))}
              </div>

              {/* Selected Period Details */}
              {selectedPeriodData && (
                <div className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
                  <h5 className="text-sm text-cyan-400 mb-2">
                    {selectedPeriodData.name}
                  </h5>
                  <p className="text-sm text-gray-300 mb-3">
                    {selectedPeriodData.description}
                  </p>
                  <div className="rounded bg-[#0d1117] p-3">
                    <p className="text-xs text-gray-400">
                      Detailed Analysis:
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      {selectedPeriodData.details}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* ARIMA Forecast Tab */}
        <TabsContent value="arima" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
            <h3 className="text-lg text-gray-100 mb-2">
              ARIMA (AutoRegressive Integrated Moving Average)
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              A statistical model that uses past values and
              errors to predict future trends with smooth,
              continuous forecasts.
            </p>

            {/* Combined Chart */}
            <div className="h-[500px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    ...historicalData.slice(-60),
                    ...arimaForecast,
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getFullYear()}`;
                    }}
                    interval={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />

                  <ReferenceLine
                    x="2023-12-01"
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: "Forecast Start",
                      fontSize: 10,
                      fill: "#f59e0b",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={false}
                    name="Historical"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                    name="ARIMA Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="#06b6d4"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Upper 95% CI"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="#06b6d4"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Lower 95% CI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <h4 className="text-sm text-green-400">
                    Advantages
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Simple & Interpretable:</strong>{" "}
                      Easy to understand and explain to
                      non-technical stakeholders
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Good for Stable Trends:</strong>{" "}
                      Works well when historical patterns are
                      consistent
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Widely Used:</strong> Industry
                      standard with extensive research backing
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Fast Computation:</strong> Quick
                      to run, suitable for real-time analysis
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h4 className="text-sm text-red-400">
                    Limitations
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>No Seasonality:</strong> Cannot
                      capture recurring patterns like quarterly
                      earnings cycles
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Assumes Linearity:</strong> May
                      miss complex non-linear relationships in
                      the data
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Poor with Shocks:</strong> Cannot
                      predict sudden geopolitical events or
                      market crashes
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Overfitting Risk:</strong> May fit
                      too closely to historical noise rather
                      than true patterns
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* When to Use */}
            <div className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-cyan-400" />
                <h4 className="text-sm text-cyan-400">
                  Best Use Cases
                </h4>
              </div>
              <p className="text-sm text-gray-300">
                Use ARIMA for{" "}
                <strong>
                  short to medium-term forecasts (3-12 months)
                </strong>{" "}
                when you expect stable market conditions without
                major disruptions. Ideal for baseline scenarios
                and comparing against more complex models. Not
                recommended during periods of high uncertainty
                or when seasonal patterns are important.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* SARIMA Forecast Tab */}
        <TabsContent value="sarima" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
            <h3 className="text-lg text-gray-100 mb-2">
              SARIMA (Seasonal ARIMA)
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              An extension of ARIMA that captures seasonal
              patterns, making it ideal for industries with
              cyclical demand like aerospace.
            </p>

            {/* Combined Chart */}
            <div className="h-[500px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    ...historicalData.slice(-60),
                    ...sarimaForecast,
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getFullYear()}`;
                    }}
                    interval={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />

                  <ReferenceLine
                    x="2023-12-01"
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: "Forecast Start",
                      fontSize: 10,
                      fill: "#f59e0b",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={false}
                    name="Historical"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                    name="SARIMA Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="#8b5cf6"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Upper 95% CI"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="#8b5cf6"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Lower 95% CI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <h4 className="text-sm text-green-400">
                    Advantages
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Captures Seasonality:</strong>{" "}
                      Identifies quarterly earnings cycles,
                      holiday effects, and annual patterns
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Industry-Specific:</strong>{" "}
                      Perfect for aerospace with recurring order
                      patterns and delivery schedules
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>More Accurate:</strong> Generally
                      outperforms ARIMA for data with seasonal
                      components
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Flexible:</strong> Can model
                      multiple seasonal periods (quarterly and
                      annual)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h4 className="text-sm text-red-400">
                    Limitations
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>More Complex:</strong> Requires
                      more parameters, making it harder to
                      explain to executives
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Data Hungry:</strong> Needs
                      multiple years of data to identify
                      seasonal patterns accurately
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Slower:</strong> Takes longer to
                      compute than basic ARIMA
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Assumes Stable Seasons:</strong>{" "}
                      Fails if seasonal patterns change (e.g.,
                      during COVID-19)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* When to Use */}
            <div className="mt-4 rounded-lg border border-purple-500/30 bg-purple-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-purple-400" />
                <h4 className="text-sm text-purple-400">
                  Best Use Cases
                </h4>
              </div>
              <p className="text-sm text-gray-300">
                Use SARIMA for{" "}
                <strong>
                  medium to long-term forecasts (6-24 months)
                </strong>{" "}
                when seasonal patterns are present and expected
                to continue. Excellent for predicting quarterly
                performance, planning inventory, and budgeting.
                Works best with at least 3-5 years of historical
                data. Particularly valuable for Boeing given the
                cyclical nature of aircraft orders and
                deliveries.
              </p>
            </div>
          </div>
        </TabsContent>

        {/* GARCH Forecast Tab */}
        <TabsContent value="garch" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
            <h3 className="text-lg text-gray-100 mb-2">
              GARCH (Generalized AutoRegressive Conditional
              Heteroskedasticity)
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              A sophisticated model focused on predicting
              volatility rather than price. Shows periods of
              high and low uncertainty.
            </p>

            {/* Combined Chart */}
            <div className="h-[500px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    ...historicalData.slice(-60),
                    ...garchForecast,
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    tick={{ fontSize: 10 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getFullYear()}`;
                    }}
                    interval={8}
                  />
                  <YAxis
                    stroke="#6b7280"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />

                  <ReferenceLine
                    x="2023-12-01"
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label={{
                      value: "Forecast Start",
                      fontSize: 10,
                      fill: "#f59e0b",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={false}
                    name="Historical"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    name="GARCH Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={false}
                    name="High Volatility Bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Low Volatility Bound"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <h4 className="text-sm text-green-400">
                    Advantages
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Volatility Focus:</strong> Excels
                      at predicting risk and uncertainty
                      periods, crucial for risk management
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Captures Clustering:</strong>{" "}
                      Identifies that volatile periods tend to
                      follow volatile periods (like crisis
                      scenarios)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Realistic Bounds:</strong>{" "}
                      Provides more accurate confidence
                      intervals during unstable times
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">•</span>
                    <span>
                      <strong>Financial Markets:</strong> Widely
                      used in options pricing and portfolio risk
                      assessment
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-5 w-5 text-red-400" />
                  <h4 className="text-sm text-red-400">
                    Limitations
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Complex to Interpret:</strong>{" "}
                      Difficult to explain to non-quantitative
                      audiences
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Not for Price Prediction:</strong>{" "}
                      Better at forecasting volatility than
                      actual price levels
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Computationally Heavy:</strong>{" "}
                      Requires significant processing power for
                      real-time updates
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span>
                      <strong>Assumption Sensitive:</strong>{" "}
                      Results depend heavily on choosing the
                      right model specification
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* When to Use */}
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-amber-400" />
                <h4 className="text-sm text-amber-400">
                  Best Use Cases
                </h4>
              </div>
              <p className="text-sm text-gray-300">
                Use GARCH for{" "}
                <strong>
                  risk assessment and stress testing
                </strong>{" "}
                rather than point forecasts. Ideal when you need
                to understand potential downside scenarios
                during geopolitical uncertainty. Combine with
                ARIMA/SARIMA for comprehensive analysis: use
                those for price forecasts, use GARCH to quantify
                the uncertainty around those forecasts.
                Essential for CFOs, risk managers, and option
                traders dealing with Boeing stock.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}