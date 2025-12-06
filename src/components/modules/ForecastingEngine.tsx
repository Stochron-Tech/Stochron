import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  Legend,
} from "recharts";
import type { ScenarioType } from "../../App";

interface ForecastingEngineProps {
  stock: string;
  scenario: ScenarioType;
  customShock: {
    freight: number;
    sentiment: number;
    sanctions: number;
  };
}

export function ForecastingEngine({
  stock,
  scenario,
  customShock,
}: ForecastingEngineProps) {
  // Generate mock forecast data based on scenario
  const generateForecastData = () => {
    const basePrice = 175;
    const dates = [];
    const today = new Date("2025-10-26");

    for (let i = -90; i <= 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      let baseline =
        basePrice + Math.sin(i / 30) * 15 + (i / 365) * 20;
      let shock = baseline;

      if (i > 0) {
        // Apply scenario impacts
        if (scenario === "russia-ukraine") {
          shock = baseline - 25 - (i / 365) * 10;
        } else if (scenario === "us-china") {
          shock = baseline - 18 - (i / 365) * 8;
        } else if (scenario === "red-sea") {
          shock = baseline - 12 - (i / 365) * 5;
        } else if (scenario === "custom") {
          const impact =
            (customShock.freight * 0.15 +
              customShock.sentiment * 0.2 +
              customShock.sanctions * 0.25) /
            100;
          shock = baseline * (1 - impact);
        }
      }

      const upperBound = (i > 0 ? shock : baseline) * 1.15;
      const lowerBound = (i > 0 ? shock : baseline) * 0.85;

      dates.push({
        date: date.toISOString().split("T")[0],
        baseline: Number(baseline.toFixed(2)),
        shock: i > 0 ? Number(shock.toFixed(2)) : null,
        upperBound:
          i > 0 ? Number(upperBound.toFixed(2)) : null,
        lowerBound:
          i > 0 ? Number(lowerBound.toFixed(2)) : null,
        historical: i <= 0 ? Number(baseline.toFixed(2)) : null,
      });
    }

    return dates;
  };

  const data = generateForecastData();

  const calculate3MonthForecast = () => {
    const current = data.find((d) => d.date === "2025-10-26");
    const future = data.find((d) => d.date === "2026-01-26");
    if (!current || !future) return { value: 0, change: 0 };

    const currentPrice = current.historical || current.baseline;
    const futurePrice =
      scenario === "baseline"
        ? future.baseline
        : future.shock || future.baseline;
    const change =
      ((futurePrice - currentPrice) / currentPrice) * 100;

    return { value: futurePrice, change };
  };

  const calculate12MonthForecast = () => {
    const current = data.find((d) => d.date === "2025-10-26");
    const future = data[data.length - 1];
    if (!current || !future) return { value: 0, change: 0 };

    const currentPrice = current.historical || current.baseline;
    const futurePrice =
      scenario === "baseline"
        ? future.baseline
        : future.shock || future.baseline;
    const change =
      ((futurePrice - currentPrice) / currentPrice) * 100;

    return { value: futurePrice, change };
  };

  const threeMonth = calculate3MonthForecast();
  const twelveMonth = calculate12MonthForecast();

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module A: Forecasting Engine
          </h3>
        </div>
        <div className="text-xs text-gray-400">{stock}</div>
      </div>

      {/* Key Metrics */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            3-Month Forecast
          </div>
          <div className="mt-1 text-xl text-gray-100">
            ${threeMonth.value.toFixed(2)}
          </div>
          <div
            className={`text-xs ${threeMonth.change >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {threeMonth.change >= 0 ? "+" : ""}
            {threeMonth.change.toFixed(2)}%
          </div>
        </div>
        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            12-Month Forecast
          </div>
          <div className="mt-1 text-xl text-gray-100">
            ${twelveMonth.value.toFixed(2)}
          </div>
          <div
            className={`text-xs ${twelveMonth.change >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {twelveMonth.change >= 0 ? "+" : ""}
            {twelveMonth.change.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient
                id="confidenceArea"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="#06b6d4"
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
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
              interval={60}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />

            {/* Confidence Interval */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceArea)"
              name="Upper Bound"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="url(#confidenceArea)"
              name="Lower Bound"
            />

            {/* Historical */}
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#9ca3af"
              strokeWidth={2}
              dot={false}
              name="Historical"
            />

            {/* Baseline Forecast */}
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#06b6d4"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Baseline"
            />

            {/* Shock Forecast */}
            {scenario !== "baseline" && (
              <Line
                type="monotone"
                dataKey="shock"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Shock Scenario"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}