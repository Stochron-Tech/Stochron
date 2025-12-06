import { useState } from "react";
import {
  Activity,
  Download,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Area,
  AreaChart,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Button } from "../ui/button";
import type { ScenarioType } from "../../App";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

interface VolatilityMonitorDetailedProps {
  stock: string;
  scenario: ScenarioType;
}

export function VolatilityMonitorDetailed({
  stock,
  scenario,
}: VolatilityMonitorDetailedProps) {
  const [overlayEvents, setOverlayEvents] = useState(true);
  const [viewMode, setViewMode] = useState<
    "30D" | "90D" | "1Y" | "3Y"
  >("1Y");

  // Generate extended volatility timeline with crisis zones
  const generateVolatilityTimeline = () => {
    const data = [];
    const startDate = new Date("2022-01-01");
    const endDate = new Date("2025-10-26");
    const days = Math.floor(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    for (let i = 0; i <= days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      let realizedVol = 18 + Math.sin(i / 30) * 6;
      let impliedVol = 20 + Math.sin(i / 35) * 7;

      // COVID period
      if (i < 120) {
        realizedVol += 25;
        impliedVol += 30;
      }

      // Ukraine war (Feb 2022)
      if (i > 60 && i < 240) {
        realizedVol += 12;
        impliedVol += 15;
      }

      // Current scenario impact
      if (i > days - 60) {
        if (scenario === "russia-ukraine") {
          realizedVol += 15;
          impliedVol += 18;
        } else if (scenario === "us-china") {
          realizedVol += 10;
          impliedVol += 12;
        } else if (scenario === "red-sea") {
          realizedVol += 8;
          impliedVol += 10;
        }
      }

      data.push({
        date: date.toISOString().split("T")[0],
        realizedVol: Number(realizedVol.toFixed(2)),
        impliedVol: Number(impliedVol.toFixed(2)),
        spread: Number((impliedVol - realizedVol).toFixed(2)),
      });
    }

    return data;
  };

  const volatilityData = generateVolatilityTimeline();
  const currentVol = volatilityData[volatilityData.length - 1];

  // Crisis events overlay
  const crisisEvents = [
    {
      date: "2022-02-24",
      label: "Ukraine Invasion",
      severity: 90,
    },
    {
      date: "2022-09-21",
      label: "Fed Rate Hike",
      severity: 65,
    },
    {
      date: "2023-03-10",
      label: "Banking Crisis",
      severity: 75,
    },
    {
      date: "2023-10-07",
      label: "Middle East Conflict",
      severity: 60,
    },
    {
      date: "2024-11-20",
      label: "Red Sea Attacks",
      severity: 70,
    },
  ];

  // Institutional positioning gauges
  const institutionalFlow =
    scenario === "baseline"
      ? 45
      : scenario === "russia-ukraine"
        ? 25
        : scenario === "us-china"
          ? 35
          : scenario === "red-sea"
            ? 38
            : 40;

  const optionsSkew =
    scenario === "baseline"
      ? -5
      : scenario === "russia-ukraine"
        ? -28
        : scenario === "us-china"
          ? -18
          : scenario === "red-sea"
            ? -22
            : -12;

  // Liquidity stress radar data
  const liquidityStressData = [
    {
      metric: "Spread Width",
      baseline: 20,
      current:
        scenario === "baseline"
          ? 22
          : scenario === "russia-ukraine"
            ? 75
            : scenario === "us-china"
              ? 58
              : scenario === "red-sea"
                ? 62
                : 30,
    },
    {
      metric: "Volume Stability",
      baseline: 15,
      current:
        scenario === "baseline"
          ? 18
          : scenario === "russia-ukraine"
            ? 68
            : scenario === "us-china"
              ? 52
              : scenario === "red-sea"
                ? 58
                : 25,
    },
    {
      metric: "Volatility Spike",
      baseline: 25,
      current:
        scenario === "baseline"
          ? 28
          : scenario === "russia-ukraine"
            ? 85
            : scenario === "us-china"
              ? 65
              : scenario === "red-sea"
                ? 70
                : 35,
    },
    {
      metric: "Short Interest",
      baseline: 30,
      current:
        scenario === "baseline"
          ? 32
          : scenario === "russia-ukraine"
            ? 72
            : scenario === "us-china"
              ? 68
              : scenario === "red-sea"
                ? 58
                : 40,
    },
    {
      metric: "ETF Correlation",
      baseline: 18,
      current:
        scenario === "baseline"
          ? 20
          : scenario === "russia-ukraine"
            ? 55
            : scenario === "us-china"
              ? 48
              : scenario === "red-sea"
                ? 42
                : 28,
    },
  ];

  // Volume and flow data
  const flowData = [];
  for (let i = -30; i <= 0; i++) {
    const date = new Date("2025-10-26");
    date.setDate(date.getDate() + i);
    flowData.push({
      date: date.toISOString().split("T")[0],
      institutional:
        1000000 +
        Math.sin(i / 5) * 300000 +
        (scenario !== "baseline" ? -200000 : 0),
      retail: 500000 + Math.cos(i / 4) * 150000,
      shortInterest:
        15 +
        Math.sin(i / 7) * 3 +
        (scenario !== "baseline" ? 8 : 0),
    });
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="border-b border-gray-700 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl text-cyan-400">
                Market Structure & Volatility Monitor
              </h2>
            </div>
            <p className="mt-2 text-gray-400">
              Identify volatility regimes and investor sentiment
              transitions for {stock}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-600 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Volatility Report
          </Button>
        </div>

        {/* Controls */}
        <div className="mt-4 flex gap-4">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              Time Range:
            </span>
            {["30D", "90D", "1Y", "3Y"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`rounded px-3 py-1 text-sm ${
                  viewMode === mode
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={overlayEvents}
              onChange={(e) =>
                setOverlayEvents(e.target.checked)
              }
              className="rounded border-gray-600"
            />
            <span className="text-sm text-gray-400">
              Show Event Overlays
            </span>
          </label>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-5 gap-4">
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Realized Vol (30D)
          </div>
          <div
            className={`mt-1 text-2xl ${currentVol.realizedVol > 35 ? "text-red-400" : currentVol.realizedVol > 25 ? "text-amber-400" : "text-green-400"}`}
          >
            {currentVol.realizedVol.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {currentVol.realizedVol > 35
              ? "Crisis"
              : currentVol.realizedVol > 25
                ? "Elevated"
                : "Normal"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Implied Vol (VIX)
          </div>
          <div
            className={`mt-1 text-2xl ${currentVol.impliedVol > 40 ? "text-red-400" : currentVol.impliedVol > 30 ? "text-amber-400" : "text-cyan-400"}`}
          >
            {currentVol.impliedVol.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Forward-looking fear gauge
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Vol Spread
          </div>
          <div
            className={`mt-1 text-2xl ${currentVol.spread > 5 ? "text-amber-400" : "text-gray-300"}`}
          >
            +{currentVol.spread.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {currentVol.spread > 5 ? "Fear premium" : "Normal"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Inst. Flow Index
          </div>
          <div
            className={`mt-1 flex items-center gap-1 text-2xl ${institutionalFlow > 50 ? "text-green-400" : institutionalFlow < 35 ? "text-red-400" : "text-amber-400"}`}
          >
            {institutionalFlow > 50 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )}
            {institutionalFlow}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {institutionalFlow > 50
              ? "Accumulation"
              : "Distribution"}
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Options Skew
          </div>
          <div
            className={`mt-1 text-2xl ${optionsSkew < -20 ? "text-red-400" : optionsSkew < -10 ? "text-amber-400" : "text-gray-300"}`}
          >
            {optionsSkew}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {optionsSkew < -20
              ? "Bearish"
              : optionsSkew < -10
                ? "Cautious"
                : "Neutral"}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="timeline">
            Volatility Timeline
          </TabsTrigger>
          <TabsTrigger value="positioning">
            Positioning Dashboard
          </TabsTrigger>
          <TabsTrigger value="liquidity">
            Liquidity Stress
          </TabsTrigger>
          <TabsTrigger value="flows">Market Flows</TabsTrigger>
        </TabsList>

        {/* Volatility Timeline */}
        <TabsContent value="timeline" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Historical Volatility Regimes
            </h3>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volatilityData}>
                  <defs>
                    <linearGradient
                      id="realizedGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#22d3ee"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#22d3ee"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="impliedGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#f59e0b"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#f59e0b"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "short",
                      });
                    }}
                    interval={90}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    label={{
                      value: "Volatility %",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    }}
                  />
                  <Legend />

                  {/* Crisis zone shading */}
                  <ReferenceLine
                    y={30}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label="High Vol Threshold"
                  />
                  <ReferenceLine
                    y={20}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label="Elevated Threshold"
                  />

                  <Area
                    type="monotone"
                    dataKey="realizedVol"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#realizedGradient)"
                    name="Realized Volatility"
                  />
                  <Area
                    type="monotone"
                    dataKey="impliedVol"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="url(#impliedGradient)"
                    name="Implied Volatility"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Event markers */}
            {overlayEvents && (
              <div className="mt-4 space-y-2">
                <div className="text-sm text-gray-400">
                  Major Events:
                </div>
                <div className="flex flex-wrap gap-2">
                  {crisisEvents.map((event, i) => (
                    <div
                      key={i}
                      className={`rounded border px-3 py-1 text-xs ${
                        event.severity > 75
                          ? "border-red-500/50 bg-red-500/10 text-red-400"
                          : event.severity > 60
                            ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                            : "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                      }`}
                    >
                      {event.date}: {event.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Positioning Dashboard */}
        <TabsContent value="positioning" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Institutional Flow Gauge */}
            <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
              <h3 className="mb-4 text-lg text-gray-200">
                Institutional Flow Index
              </h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative h-48 w-48">
                  {/* Gauge visualization */}
                  <svg viewBox="0 0 200 120" className="w-full">
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    {/* Value arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={
                        institutionalFlow > 50
                          ? "#10b981"
                          : institutionalFlow < 35
                            ? "#ef4444"
                            : "#f59e0b"
                      }
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(institutionalFlow / 100) * 251} 251`}
                    />
                    {/* Center text */}
                    <text
                      x="100"
                      y="80"
                      textAnchor="middle"
                      className="fill-gray-100 text-3xl"
                    >
                      {institutionalFlow}
                    </text>
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      className="fill-gray-400 text-xs"
                    >
                      {institutionalFlow > 50
                        ? "Accumulation"
                        : "Distribution"}
                    </text>
                  </svg>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <p>
                  <strong className="text-gray-300">
                    Current Status:
                  </strong>{" "}
                  {institutionalFlow > 50
                    ? "Institutional investors are net buyers"
                    : "Institutional investors are reducing positions"}
                </p>
                <p>
                  <strong className="text-gray-300">
                    Trend:
                  </strong>{" "}
                  {scenario === "baseline"
                    ? "Stable"
                    : "Deteriorating since shock event"}
                </p>
              </div>
            </div>

            {/* Options Skew Gauge */}
            <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
              <h3 className="mb-4 text-lg text-gray-200">
                Options Skew Index
              </h3>
              <div className="flex items-center justify-center py-8">
                <div className="relative h-48 w-48">
                  <svg viewBox="0 0 200 120" className="w-full">
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    {/* Value arc - negative values go right to left */}
                    <path
                      d="M 180 100 A 80 80 0 0 1 20 100"
                      fill="none"
                      stroke={
                        optionsSkew < -20
                          ? "#ef4444"
                          : optionsSkew < -10
                            ? "#f59e0b"
                            : "#6b7280"
                      }
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${(Math.abs(optionsSkew) / 50) * 251} 251`}
                    />
                    {/* Center text */}
                    <text
                      x="100"
                      y="80"
                      textAnchor="middle"
                      className="fill-gray-100 text-3xl"
                    >
                      {optionsSkew}
                    </text>
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      className="fill-gray-400 text-xs"
                    >
                      {optionsSkew < -20
                        ? "Bearish"
                        : optionsSkew < -10
                          ? "Cautious"
                          : "Neutral"}
                    </text>
                  </svg>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <p>
                  <strong className="text-gray-300">
                    Put/Call Ratio:
                  </strong>{" "}
                  {(1 + Math.abs(optionsSkew) / 50).toFixed(2)}
                </p>
                <p>
                  <strong className="text-gray-300">
                    Interpretation:
                  </strong>{" "}
                  {optionsSkew < -20
                    ? "Heavy put buying indicates strong bearish hedging"
                    : "Moderate defensive positioning"}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Liquidity Stress Radar */}
        <TabsContent value="liquidity" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Multi-Dimensional Liquidity Stress Analysis
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Center = Low stress | Outer edge = High stress
              (0-100 scale)
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={liquidityStressData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis
                      dataKey="metric"
                      stroke="#9ca3af"
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      stroke="#6b7280"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "6px",
                      }}
                    />
                    <Radar
                      name="Baseline"
                      dataKey="baseline"
                      stroke="#6b7280"
                      fill="#6b7280"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.5}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm text-gray-300">
                  Dimension Breakdown
                </h4>
                {liquidityStressData.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        {item.metric}
                      </span>
                      <span
                        className={`${item.current > 70 ? "text-red-400" : item.current > 50 ? "text-amber-400" : "text-green-400"}`}
                      >
                        {item.current}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                      <div
                        className={`h-full ${item.current > 70 ? "bg-red-500" : item.current > 50 ? "bg-amber-500" : "bg-green-500"}`}
                        style={{ width: `${item.current}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.metric === "Spread Width" &&
                        "Bid-ask spread widening indicates liquidity drain"}
                      {item.metric === "Volume Stability" &&
                        "Trading volume variance and fragmentation"}
                      {item.metric === "Volatility Spike" &&
                        "Realized volatility acceleration"}
                      {item.metric === "Short Interest" &&
                        "Short position buildup as % of float"}
                      {item.metric === "ETF Correlation" &&
                        "Correlation breakdown with sector ETFs"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Market Flows */}
        <TabsContent value="flows" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Investor Flow Dynamics (30D)
            </h3>

            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={flowData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    interval={5}
                  />
                  <YAxis yAxisId="left" stroke="#9ca3af" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9ca3af"
                    label={{
                      value: "Short %",
                      angle: 90,
                      position: "insideRight",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="institutional"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    name="Institutional Flow"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="retail"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Retail Flow"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="shortInterest"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Short Interest %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights Panel */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
          <span className="text-sm text-amber-400">
            Volatility Analysis Summary
          </span>
        </div>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-amber-400">
              Current Regime:
            </strong>{" "}
            Volatility remains above historical mean (σ ={" "}
            {(currentVol.realizedVol / 18).toFixed(2)}×),
            indicating persistent macro stress. The
            implied-realized spread of +
            {currentVol.spread.toFixed(1)} suggests elevated
            fear premium in options markets.
          </p>
          <p>
            <strong className="text-amber-400">
              Positioning:
            </strong>{" "}
            Institutional flows{" "}
            {institutionalFlow > 50
              ? "are stabilizing with net accumulation"
              : "show distribution pattern"}
            , but options skew ({optionsSkew}) reveals{" "}
            {optionsSkew < -20 ? "aggressive" : "moderate"}{" "}
            bearish hedging activity.
          </p>
          <p>
            <strong className="text-amber-400">
              Liquidity Alert:
            </strong>{" "}
            {liquidityStressData.some((d) => d.current > 70)
              ? "Multiple stress dimensions exceed critical thresholds. Secondary market liquidity remains fragile."
              : "Liquidity conditions show signs of normalization but remain elevated vs baseline."}
          </p>
        </div>
      </div>
    </div>
  );
}