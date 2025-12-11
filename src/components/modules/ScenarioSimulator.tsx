import { Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ScenarioType } from "../../App";

interface ScenarioSimulatorProps {
  stock: string;
  activeScenario: ScenarioType;
  customShock: {
    freight: number;
    sentiment: number;
    sanctions: number;
  };
}

export function ScenarioSimulator({
  stock,
  activeScenario,
  customShock,
}: ScenarioSimulatorProps) {
  // Calculate impact scores for each module based on scenario

  stock;
  
  const calculateModuleImpacts = () => {
    const impacts = {
      baseline: {
        forecast: 0,
        sentiment: 0,
        geopolitical: 25,
        supplyChain: 42,
        volatility: 18,
      },
      "russia-ukraine": {
        forecast: -14.2,
        sentiment: -45,
        geopolitical: 68,
        supplyChain: 78,
        volatility: 33,
      },
      "us-china": {
        forecast: -10.3,
        sentiment: -32,
        geopolitical: 61,
        supplyChain: 65,
        volatility: 28,
      },
      "red-sea": {
        forecast: -6.9,
        sentiment: -22,
        geopolitical: 52,
        supplyChain: 71,
        volatility: 23,
      },
      custom: {
        forecast: -(
          customShock.freight * 0.08 +
          customShock.sentiment * 0.1 +
          customShock.sanctions * 0.12
        ),
        sentiment: customShock.sentiment,
        geopolitical: 25 + customShock.sanctions * 0.4,
        supplyChain:
          42 +
          customShock.freight * 0.35 +
          customShock.sanctions * 0.25,
        volatility: 18 + Math.abs(customShock.sentiment) * 0.15,
      },
    };

    return impacts[activeScenario];
  };

  const impacts = calculateModuleImpacts();

  // Scenario comparison data
  const comparisonData = [
    {
      scenario: "Baseline",
      priceChange: 0,
      volatility: 18,
      riskScore: 30,
    },
    {
      scenario: "Optimistic",
      priceChange: 8.5,
      volatility: 15,
      riskScore: 22,
    },
    {
      scenario:
        activeScenario === "baseline"
          ? "Current"
          : activeScenario === "custom"
            ? "Custom"
            : "Shock",
      priceChange: impacts.forecast,
      volatility: impacts.volatility,
      riskScore: impacts.geopolitical,
    },
  ];

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module H: Scenario Simulator
          </h3>
        </div>
      </div>

      {/* Active Scenario Summary */}
      <div className="mb-4 rounded border border-amber-500/30 bg-amber-500/5 p-3">
        <div className="mb-2 text-xs text-amber-400">
          Active:{" "}
          {activeScenario === "baseline"
            ? "Baseline"
            : activeScenario === "russia-ukraine"
              ? "Russia-Ukraine War"
              : activeScenario === "us-china"
                ? "US-China Tensions"
                : activeScenario === "red-sea"
                  ? "Red Sea Crisis"
                  : "Custom Shock"}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-400">
              Price Impact:{" "}
            </span>
            <span
              className={
                impacts.forecast < 0
                  ? "text-red-400"
                  : "text-green-400"
              }
            >
              {impacts.forecast >= 0 ? "+" : ""}
              {impacts.forecast.toFixed(1)}%
            </span>
          </div>
          <div>
            <span className="text-gray-400">Risk Index: </span>
            <span className="text-amber-400">
              {impacts.geopolitical.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Module Impact Breakdown */}
      <div className="mb-4">
        <div className="mb-2 text-xs text-gray-400">
          Cross-Module Impact Analysis
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border border-gray-700 bg-[#161b22] p-2">
            <span className="text-xs text-gray-300">
              Forecasting
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`h-full ${impacts.forecast < 0 ? "bg-red-500" : "bg-green-500"}`}
                  style={{
                    width: `${Math.min(100, Math.abs(impacts.forecast) * 7)}%`,
                  }}
                />
              </div>
              <span
                className={`w-16 text-right text-xs ${impacts.forecast < 0 ? "text-red-400" : "text-green-400"}`}
              >
                {impacts.forecast >= 0 ? "+" : ""}
                {impacts.forecast.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded border border-gray-700 bg-[#161b22] p-2">
            <span className="text-xs text-gray-300">
              Sentiment
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`h-full ${impacts.sentiment < 0 ? "bg-red-500" : "bg-green-500"}`}
                  style={{
                    width: `${Math.min(100, Math.abs(impacts.sentiment))}%`,
                  }}
                />
              </div>
              <span
                className={`w-16 text-right text-xs ${impacts.sentiment < 0 ? "text-red-400" : "text-green-400"}`}
              >
                {impacts.sentiment >= 0 ? "+" : ""}
                {impacts.sentiment.toFixed(0)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded border border-gray-700 bg-[#161b22] p-2">
            <span className="text-xs text-gray-300">
              Supply Chain
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`h-full ${impacts.supplyChain > 60 ? "bg-red-500" : "bg-amber-500"}`}
                  style={{ width: `${impacts.supplyChain}%` }}
                />
              </div>
              <span
                className={`w-16 text-right text-xs ${impacts.supplyChain > 60 ? "text-red-400" : "text-amber-400"}`}
              >
                {impacts.supplyChain.toFixed(0)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded border border-gray-700 bg-[#161b22] p-2">
            <span className="text-xs text-gray-300">
              Volatility
            </span>
            <div className="flex items-center gap-2">
              <div className="h-1 w-20 overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`h-full ${impacts.volatility > 30 ? "bg-red-500" : "bg-amber-500"}`}
                  style={{
                    width: `${Math.min(100, impacts.volatility * 2.5)}%`,
                  }}
                />
              </div>
              <span
                className={`w-16 text-right text-xs ${impacts.volatility > 30 ? "text-red-400" : "text-amber-400"}`}
              >
                {impacts.volatility.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Comparison Chart */}
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={comparisonData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />
            <XAxis
              dataKey="scenario"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
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
            <Legend wrapperStyle={{ fontSize: "10px" }} />
            <Bar
              dataKey="priceChange"
              fill="#06b6d4"
              name="Price Change %"
            />
            <Bar
              dataKey="riskScore"
              fill="#f59e0b"
              name="Risk Score"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}