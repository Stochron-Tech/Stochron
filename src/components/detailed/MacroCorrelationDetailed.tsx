import { useState } from "react";
import { TrendingUp, Download, Info } from "lucide-react";
import {
  BarChart,
  Bar,
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
  Cell,
} from "recharts";
import { Button } from "../ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

interface MacroCorrelationDetailedProps {
  stock: string;
}

export function MacroCorrelationDetailed({
  stock,
}: MacroCorrelationDetailedProps) {
  const [timeWindow, setTimeWindow] = useState("12M");
  const [regime, setRegime] = useState("all");

  // Correlation matrix data (for heatmap)
  const correlationMatrix = [
    {
      variable: "GDP Growth US",
      gdp: 1.0,
      cpi: -0.32,
      yield: -0.41,
      usd: -0.28,
      oil: 0.45,
      pmi: 0.78,
      ips: 0.68,
    },
    {
      variable: "CPI Inflation",
      gdp: -0.32,
      cpi: 1.0,
      yield: 0.65,
      usd: 0.51,
      oil: 0.72,
      pmi: -0.38,
      ips: -0.25,
    },
    {
      variable: "10Y Treasury",
      gdp: -0.41,
      cpi: 0.65,
      yield: 1.0,
      usd: 0.58,
      oil: 0.35,
      pmi: -0.52,
      ips: -0.48,
    },
    {
      variable: "USD Index",
      gdp: -0.28,
      cpi: 0.51,
      yield: 0.58,
      usd: 1.0,
      oil: -0.42,
      pmi: -0.35,
      ips: -0.31,
    },
    {
      variable: "Brent Crude",
      gdp: 0.45,
      cpi: 0.72,
      yield: 0.35,
      usd: -0.42,
      oil: 1.0,
      pmi: 0.48,
      ips: 0.52,
    },
    {
      variable: "Mfg PMI",
      gdp: 0.78,
      cpi: -0.38,
      yield: -0.52,
      usd: -0.35,
      oil: 0.48,
      pmi: 1.0,
      ips: 0.85,
    },
    {
      variable: "Industrial Prod",
      gdp: 0.68,
      cpi: -0.25,
      yield: -0.48,
      usd: -0.31,
      oil: 0.52,
      pmi: 0.85,
      ips: 1.0,
    },
  ];

  // Regression coefficients with confidence intervals
  const regressionData = [
    {
      variable: "GDP Growth",
      beta: 0.85,
      lower: 0.72,
      upper: 0.98,
      pValue: 0.001,
    },
    {
      variable: "Manufacturing PMI",
      beta: 0.68,
      lower: 0.55,
      upper: 0.81,
      pValue: 0.002,
    },
    {
      variable: "Industrial Production",
      beta: 0.52,
      lower: 0.38,
      upper: 0.66,
      pValue: 0.008,
    },
    {
      variable: "Brent Crude Oil",
      beta: -0.62,
      lower: -0.75,
      upper: -0.49,
      pValue: 0.003,
    },
    {
      variable: "10Y Treasury Yield",
      beta: -0.48,
      lower: -0.61,
      upper: -0.35,
      pValue: 0.005,
    },
    {
      variable: "CPI Inflation",
      beta: -0.42,
      lower: -0.58,
      upper: -0.26,
      pValue: 0.012,
    },
    {
      variable: "USD Index (DXY)",
      beta: -0.35,
      lower: -0.48,
      upper: -0.22,
      pValue: 0.018,
    },
  ];

  // Elasticity across regimes
  const elasticityData = [
    {
      variable: "GDP",
      expansion: 0.95,
      stagflation: 0.42,
      recession: 1.15,
    },
    {
      variable: "CPI",
      expansion: -0.28,
      stagflation: -0.68,
      recession: -0.35,
    },
    {
      variable: "Oil",
      expansion: -0.52,
      stagflation: -0.85,
      recession: -0.48,
    },
    {
      variable: "PMI",
      expansion: 0.72,
      stagflation: 0.55,
      recession: 0.88,
    },
    {
      variable: "USD",
      expansion: -0.32,
      stagflation: -0.45,
      recession: -0.28,
    },
  ];

  // Time series correlation evolution
  const correlationEvolution = [];
  const startDate = new Date("2022-01-01");
  for (let i = 0; i < 36; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    correlationEvolution.push({
      month: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      gdp: 0.65 + Math.sin(i / 3) * 0.2,
      oil: -0.55 + Math.cos(i / 4) * 0.15,
      cpi: -0.38 + Math.sin(i / 5) * 0.18,
      pmi: 0.58 + Math.cos(i / 3.5) * 0.22,
    });
  }

  // Get color for correlation value
  const getCorrelationColor = (value: number) => {
    if (value > 0.7) return "#10b981"; // Strong positive - green
    if (value > 0.3) return "#22d3ee"; // Moderate positive - cyan
    if (value > -0.3) return "#6b7280"; // Weak - gray
    if (value > -0.7) return "#f59e0b"; // Moderate negative - amber
    return "#ef4444"; // Strong negative - red
  };

  const getCorrelationIntensity = (value: number) => {
    const absValue = Math.abs(value);
    return absValue;
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="border-b border-gray-700 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl text-cyan-400">
                Macro-Trade Correlation Engine
              </h2>
            </div>
            <p className="mt-2 text-gray-400">
              Linking Global Variables to Stock Returns —
              Discover which macro forces drive {stock}{" "}
              performance
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-600 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Controls */}
        <div className="mt-4 flex gap-4">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              Time Window:
            </span>
            {["6M", "12M", "3Y", "5Y"].map((window) => (
              <button
                key={window}
                onClick={() => setTimeWindow(window)}
                className={`rounded px-3 py-1 text-sm ${
                  timeWindow === window
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {window}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              Regime:
            </span>
            {[
              { value: "all", label: "All" },
              { value: "expansion", label: "Expansion" },
              { value: "stagflation", label: "Stagflation" },
              { value: "recession", label: "Recession" },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setRegime(r.value)}
                className={`rounded px-3 py-1 text-sm ${
                  regime === r.value
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">Model R²</div>
          <div className="mt-1 text-3xl text-cyan-400">
            0.72
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Variance explained
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            GDP Elasticity
          </div>
          <div className="mt-1 text-3xl text-green-400">
            +0.85
          </div>
          <div className="mt-1 text-xs text-gray-500">
            % change per 1pp GDP
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Oil Sensitivity
          </div>
          <div className="mt-1 text-3xl text-red-400">
            -0.62
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Inverse correlation
          </div>
        </div>
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Dominant Factor
          </div>
          <div className="mt-1 text-xl text-amber-400">
            Economic Growth
          </div>
          <div className="mt-1 text-xs text-gray-500">
            42% weight
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="correlation" className="w-full">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="correlation">
            Correlation Matrix
          </TabsTrigger>
          <TabsTrigger value="regression">
            Regression Analysis
          </TabsTrigger>
          <TabsTrigger value="elasticity">
            Elasticity Mapping
          </TabsTrigger>
          <TabsTrigger value="evolution">
            Time Evolution
          </TabsTrigger>
        </TabsList>

        {/* Correlation Matrix Heatmap */}
        <TabsContent value="correlation" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg text-gray-200">
                Pearson Correlation Matrix
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Info className="h-4 w-4" />
                <span>Hover for numerical values</span>
              </div>
            </div>

            {/* Heatmap */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-700 bg-gray-800 p-2 text-xs text-gray-400"></th>
                    {[
                      "GDP",
                      "CPI",
                      "Yield",
                      "USD",
                      "Oil",
                      "PMI",
                      "IP",
                    ].map((header) => (
                      <th
                        key={header}
                        className="border border-gray-700 bg-gray-800 p-2 text-xs text-gray-400"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {correlationMatrix.map((row, i) => (
                    <tr key={i}>
                      <td className="border border-gray-700 bg-gray-800 p-2 text-xs text-gray-400">
                        {row.variable}
                      </td>
                      {[
                        "gdp",
                        "cpi",
                        "yield",
                        "usd",
                        "oil",
                        "pmi",
                        "ips",
                      ].map((key, j) => {
                        const value = row[
                          key as keyof typeof row
                        ] as number;
                        const intensity =
                          getCorrelationIntensity(value);
                        return (
                          <td
                            key={j}
                            className="group relative border border-gray-700 p-2 text-center text-xs transition-all hover:ring-2 hover:ring-cyan-400"
                            style={{
                              backgroundColor:
                                getCorrelationColor(value),
                              opacity: 0.3 + intensity * 0.7,
                            }}
                          >
                            <span className="font-mono text-white">
                              {value >= 0 ? "+" : ""}
                              {value.toFixed(2)}
                            </span>
                            {/* Tooltip */}
                            <div className="absolute left-1/2 top-full z-10 mt-2 hidden w-48 -translate-x-1/2 rounded border border-gray-600 bg-gray-900 p-2 text-left group-hover:block">
                              <div className="text-xs text-gray-300">
                                {value > 0
                                  ? "Positive"
                                  : "Negative"}{" "}
                                correlation
                              </div>
                              <div className="text-xs text-gray-500">
                                {Math.abs(value) > 0.7
                                  ? "Strong relationship"
                                  : Math.abs(value) > 0.3
                                    ? "Moderate relationship"
                                    : "Weak relationship"}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-500"></div>
                <span className="text-xs text-gray-400">
                  Strong Negative (-0.7 to -1.0)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-amber-500"></div>
                <span className="text-xs text-gray-400">
                  Moderate Negative (-0.3 to -0.7)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-500"></div>
                <span className="text-xs text-gray-400">
                  Weak (-0.3 to +0.3)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-cyan-500"></div>
                <span className="text-xs text-gray-400">
                  Moderate Positive (+0.3 to +0.7)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-500"></div>
                <span className="text-xs text-gray-400">
                  Strong Positive (+0.7 to +1.0)
                </span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Regression Impact Analysis */}
        <TabsContent value="regression" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Multi-Factor Regression Coefficients (β)
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Estimated sensitivity from: R<sub>t</sub> = α + β
              <sub>1</sub>ΔGDP + β<sub>2</sub>ΔCPI + β
              <sub>3</sub>ΔUSD + β<sub>4</sub>ΔOil + ε
              <sub>t</sub>
            </p>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regressionData}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    domain={[-1, 1]}
                  />
                  <YAxis
                    type="category"
                    dataKey="variable"
                    stroke="#9ca3af"
                    width={150}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                    formatter={(
                      value: number,
                      name: string,
                    ) => {
                      if (name === "beta")
                        return [
                          value.toFixed(3),
                          "Coefficient",
                        ];
                      if (name === "lower")
                        return [
                          value.toFixed(3),
                          "95% CI Lower",
                        ];
                      if (name === "upper")
                        return [
                          value.toFixed(3),
                          "95% CI Upper",
                        ];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="beta" name="Beta Coefficient">
                    {regressionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.beta >= 0
                            ? "#22d3ee"
                            : "#f59e0b"
                        }
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="lower"
                    fill="#6b7280"
                    name="Lower CI"
                    opacity={0.5}
                  />
                  <Bar
                    dataKey="upper"
                    fill="#6b7280"
                    name="Upper CI"
                    opacity={0.5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Coefficient Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-2 text-left text-gray-400">
                      Variable
                    </th>
                    <th className="p-2 text-right text-gray-400">
                      Coefficient (β)
                    </th>
                    <th className="p-2 text-right text-gray-400">
                      95% CI
                    </th>
                    <th className="p-2 text-right text-gray-400">
                      p-value
                    </th>
                    <th className="p-2 text-left text-gray-400">
                      Interpretation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {regressionData.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-800"
                    >
                      <td className="p-2 text-gray-300">
                        {row.variable}
                      </td>
                      <td
                        className={`p-2 text-right ${row.beta >= 0 ? "text-cyan-400" : "text-amber-400"}`}
                      >
                        {row.beta >= 0 ? "+" : ""}
                        {row.beta.toFixed(3)}
                      </td>
                      <td className="p-2 text-right text-gray-400">
                        [{row.lower.toFixed(3)},{" "}
                        {row.upper.toFixed(3)}]
                      </td>
                      <td
                        className={`p-2 text-right ${row.pValue < 0.01 ? "text-green-400" : "text-gray-400"}`}
                      >
                        {row.pValue.toFixed(3)}
                      </td>
                      <td className="p-2 text-xs text-gray-500">
                        +1% in {row.variable} →{" "}
                        {row.beta >= 0 ? "+" : ""}
                        {(row.beta * 1).toFixed(2)}% stock
                        return
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Elasticity Mapping */}
        <TabsContent value="elasticity" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Macro Elasticity Across Economic Regimes
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              How sensitivities vary under different
              macroeconomic conditions
            </p>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={elasticityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis dataKey="variable" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="expansion"
                    fill="#10b981"
                    name="Expansion"
                  />
                  <Bar
                    dataKey="stagflation"
                    fill="#f59e0b"
                    name="Stagflation"
                  />
                  <Bar
                    dataKey="recession"
                    fill="#ef4444"
                    name="Recession"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Regime Analysis */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded border border-green-500/30 bg-green-500/10 p-4">
                <div className="text-sm text-green-400">
                  Expansion Regime
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  GDP elasticity peaks at +0.95. Stock highly
                  sensitive to economic growth signals. Oil
                  sensitivity moderates.
                </div>
              </div>
              <div className="rounded border border-amber-500/30 bg-amber-500/10 p-4">
                <div className="text-sm text-amber-400">
                  Stagflation Regime
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Oil sensitivity amplifies to -0.85. CPI
                  becomes strong headwind. Growth factors
                  weaken.
                </div>
              </div>
              <div className="rounded border border-red-500/30 bg-red-500/10 p-4">
                <div className="text-sm text-red-400">
                  Recession Regime
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  GDP elasticity highest at +1.15. Flight to
                  quality behavior. Manufacturing PMI most
                  predictive.
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Time Evolution */}
        <TabsContent value="evolution" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Rolling Correlation Evolution (36M Window)
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              How correlations between {stock} and macro
              variables have evolved over time
            </p>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationEvolution}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    interval={5}
                  />
                  <YAxis stroke="#9ca3af" domain={[-1, 1]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gdp"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="GDP Growth"
                  />
                  <Line
                    type="monotone"
                    dataKey="oil"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Oil Price"
                  />
                  <Line
                    type="monotone"
                    dataKey="cpi"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="CPI"
                  />
                  <Line
                    type="monotone"
                    dataKey="pmi"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    name="PMI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI-Generated Insights Panel */}
      <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
          <span className="text-sm text-cyan-400">
            AI-Generated Insights
          </span>
        </div>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-cyan-400">
              Key Finding:
            </strong>{" "}
            Boeing's returns show strong positive sensitivity to
            GDP growth (+0.85) and negative sensitivity to oil
            prices (-0.62). The regression model explains 72% of
            return variance over the last 12 months, indicating
            macro factors are dominant drivers.
          </p>
          <p>
            <strong className="text-cyan-400">
              Regime Dependency:
            </strong>{" "}
            Elasticity to economic growth peaks during
            recessions (+1.15) as the market prices in recovery
            expectations. During stagflation, oil price
            sensitivity amplifies significantly (-0.85), making
            energy costs a critical risk factor.
          </p>
          <p>
            <strong className="text-cyan-400">
              Actionable Insight:
            </strong>{" "}
            Current correlation matrix suggests GDP and
            Manufacturing PMI are the highest-impact leading
            indicators. Monitor ISM Manufacturing and GDP
            nowcasts for early signals of return direction.
          </p>
        </div>
      </div>
    </div>
  );
}