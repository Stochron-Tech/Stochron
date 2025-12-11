import {
  Activity,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import type { ScenarioType } from "../../App";

interface VolatilityMonitorProps {
  stock: string;
  scenario: ScenarioType;
}

export function VolatilityMonitor({
  stock,
  scenario,
}: VolatilityMonitorProps) {
  // Generate volatility data
  stock;
  
  const generateVolatilityData = () => {
    const data = [];
    const today = new Date("2025-10-26");

    for (let i = -60; i <= 0; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      let vix = 18 + Math.sin(i / 10) * 5;

      if (scenario === "russia-ukraine" && i > -20) {
        vix += 15;
      } else if (scenario === "us-china" && i > -20) {
        vix += 10;
      } else if (scenario === "red-sea" && i > -20) {
        vix += 8;
      }

      data.push({
        date: date.toISOString().split("T")[0],
        vix: Number(vix.toFixed(2)),
        volume: 1000000 + Math.random() * 500000,
      });
    }

    return data;
  };

  const data = generateVolatilityData();
  const currentVIX = data[data.length - 1].vix;

  // Calculate realized volatility (typically lower than implied during stress)
  const realizedVol =
    scenario === "baseline"
      ? currentVIX - 2
      : scenario === "russia-ukraine"
        ? currentVIX - 8
        : scenario === "us-china"
          ? currentVIX - 6
          : scenario === "red-sea"
            ? currentVIX - 5
            : currentVIX - 2;

  // Current volatility metrics
  const currentVol = {
    impliedVol: currentVIX,
    realizedVol: realizedVol,
  };

  // Calculate liquidity stress
  const liquidityStress =
    scenario === "baseline"
      ? 28
      : scenario === "russia-ukraine"
        ? 72
        : scenario === "us-china"
          ? 61
          : scenario === "red-sea"
            ? 55
            : 35;

  // Options data
  const optionsData = [
    { strike: "150", calls: 2500, puts: 1200 },
    { strike: "160", calls: 3800, puts: 1800 },
    { strike: "170", calls: 5200, puts: 2400 },
    { strike: "175", calls: 6800, puts: 6500 },
    { strike: "180", calls: 4200, puts: 8200 },
    { strike: "190", calls: 2100, puts: 5400 },
    { strike: "200", calls: 900, puts: 3200 },
  ];

  const volSpread =
    currentVol.impliedVol - currentVol.realizedVol;

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-5 transition-all hover:border-gray-600">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module F: Volatility Monitor
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Info className="h-3 w-3" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            Implied Vol (VIX)
          </div>
          <div
            className={`mt-1 text-xl ${currentVIX > 30 ? "text-red-400" : currentVIX > 20 ? "text-amber-400" : "text-green-400"}`}
          >
            {currentVIX.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {currentVIX > 30
              ? "Crisis"
              : currentVIX > 20
                ? "Elevated"
                : "Normal"}
          </div>
        </div>

        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            Vol Spread
          </div>
          <div
            className={`mt-1 text-xl ${volSpread > 5 ? "text-amber-400" : "text-gray-300"}`}
          >
            +{volSpread.toFixed(1)}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {volSpread > 5 ? "Fear premium" : "Normal"}
          </div>
        </div>

        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            Liquidity Stress
          </div>
          <div
            className={`mt-1 flex items-center gap-1 text-xl ${liquidityStress > 60 ? "text-red-400" : liquidityStress > 40 ? "text-amber-400" : "text-green-400"}`}
          >
            {liquidityStress > 60 ? (
              <TrendingUp className="h-4 w-4" />
            ) : liquidityStress > 40 ? (
              <Activity className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            {liquidityStress}
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full ${liquidityStress > 60 ? "bg-red-500" : liquidityStress > 40 ? "bg-amber-500" : "bg-green-500"}`}
              style={{ width: `${liquidityStress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Volatility Trend */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Volatility Regime (60D)
          </span>
          <span className="text-xs text-gray-500">
            {scenario !== "baseline" &&
              `Scenario: ${scenario.replace("-", " ").toUpperCase()}`}
          </span>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="vixGradient"
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
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                interval={15}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <ReferenceLine
                y={30}
                stroke="#ef4444"
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
              <ReferenceLine
                y={20}
                stroke="#f59e0b"
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
              <Area
                type="monotone"
                dataKey="vix"
                stroke="#f59e0b"
                strokeWidth={2}
                fill="url(#vixGradient)"
                name="VIX"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Options Open Interest */}
      <div>
        <div className="mb-2 text-xs text-gray-400">
          Options Open Interest Distribution
        </div>
        <div className="space-y-1">
          {optionsData.slice(2, 6).map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-12 text-xs text-gray-500">
                ${opt.strike}
              </span>
              <div className="flex flex-1 gap-1">
                <div className="flex h-5 flex-1 items-center justify-end rounded bg-green-500/20 pr-1">
                  <span className="text-xs text-green-400">
                    {(opt.calls / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="flex h-5 flex-1 items-center justify-start rounded bg-red-500/20 pl-1">
                  <span className="text-xs text-red-400">
                    {(opt.puts / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Calls</span>
          <span>Puts</span>
        </div>
      </div>
    </div>
  );
}