import { Truck, Info, AlertTriangle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import type { ScenarioType } from "../../App";
import type { ScenarioImpact } from "../../utils/scenario";

interface SupplyChainTrackerProps {
  stock: string;
  scenario: ScenarioType;
  customShock: Record<string, number>;
  impact: ScenarioImpact;
}

export function SupplyChainTracker({
  stock,
  scenario,
  customShock,
  impact,
}: SupplyChainTrackerProps) {
  // Calculate SCVI based on scenario
  stock;
  
  const calculateSCVI = () => {
    const base = 42 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.7);
    const extra = (customShock.freight ?? 0) * 0.2 + (customShock.sanctions ?? 0) * 0.2;
    return Math.min(100, Math.round(base + extra));
  };

  const scvi = calculateSCVI();

  // Supply chain components
  const components = [
    {
      name: "Supplier Concentration",
      baseline: 45,
      current: 45 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.5),
    },
    {
      name: "Freight Costs",
      baseline: 35,
      current: 35 + (customShock.freight ?? 0) * 0.5 + impact.supply_chain * 0.2,
    },
    {
      name: "Energy Volatility",
      baseline: 40,
      current: 40 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.45),
    },
    {
      name: "Commodity Access",
      baseline: 38,
      current: 38 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.4),
    },
  ];

  // Regional bottlenecks
  const bottlenecks = [
    {
      region: "Eastern Europe",
      severity: scenario === "baseline" ? 25 : Math.min(100, 25 + impact.supply_chain * 0.8),
      issue: "Titanium supply disruption",
    },
    {
      region: "South China Sea",
      severity: scenario === "baseline" ? 30 : Math.min(100, 30 + impact.supply_chain * 0.6),
      issue: "Export control restrictions",
    },
    {
      region: "Red Sea / Suez",
      severity: scenario === "baseline" ? 35 : Math.min(100, 35 + impact.supply_chain * 0.7),
      issue: "Shipping route attacks",
    },
    {
      region: "Pacific Routes",
      severity: 20,
      issue: "Normal operations",
    },
  ];

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-5 transition-all hover:border-gray-600">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module D: Supply Chain Vulnerability
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Info className="h-3 w-3" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* SCVI Score */}
      <div className="mb-4 rounded border border-gray-700 bg-[#161b22] p-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400">
              Supply Chain Vulnerability Index (SCVI)
            </div>
            <div className="mt-0.5 text-xs text-gray-500">
              Weighted composite score (0-100)
            </div>
          </div>
          <div className="text-right">
            <div
              className={`text-3xl ${scvi > 70 ? "text-red-400" : scvi > 50 ? "text-amber-400" : "text-green-400"}`}
            >
              {scvi}
            </div>
            {scvi > 70 && (
              <div className="mt-1 flex items-center gap-1 text-xs text-red-400">
                <AlertTriangle className="h-3 w-3" />
                <span>High Risk</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
          <div
            className={`h-full transition-all duration-500 ${scvi > 70 ? "bg-red-500" : scvi > 50 ? "bg-amber-500" : "bg-green-500"}`}
            style={{ width: `${scvi}%` }}
          />
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            SCVI Component Breakdown
          </span>
          <span className="text-xs text-gray-500">
            Baseline vs Current
          </span>
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={components} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />
              <XAxis
                type="number"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                domain={[0, 100]}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#6b7280"
                tick={{ fontSize: 9 }}
                width={110}
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
              <Bar
                dataKey="baseline"
                fill="#6b7280"
                name="Baseline"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="current"
                fill="#f59e0b"
                name="Current"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Bottlenecks */}
      <div>
        <div className="mb-2 text-xs text-gray-400">
          Regional Bottleneck Heat Map
        </div>
        <div className="space-y-2">
          {bottlenecks.map((bottleneck, idx) => (
            <div
              key={idx}
              className="rounded border border-gray-700 bg-[#161b22] p-2"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-300">
                  {bottleneck.region}
                </span>
                <span
                  className={`text-xs ${bottleneck.severity > 70 ? "text-red-400" : bottleneck.severity > 40 ? "text-amber-400" : "text-green-400"}`}
                >
                  {bottleneck.severity}
                </span>
              </div>
              <div className="mb-1 h-1 overflow-hidden rounded-full bg-gray-700">
                <div
                  className={`h-full ${bottleneck.severity > 70 ? "bg-red-500" : bottleneck.severity > 40 ? "bg-amber-500" : "bg-green-500"}`}
                  style={{ width: `${bottleneck.severity}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                {bottleneck.issue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}