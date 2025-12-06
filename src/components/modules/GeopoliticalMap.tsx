import { Globe } from "lucide-react";
import type { ScenarioType } from "../../App";
import { Progress } from "../ui/progress";

interface GeopoliticalMapProps {
  stock: string;
  scenario: ScenarioType;
}

export function GeopoliticalMap({
  stock,
  scenario,
}: GeopoliticalMapProps) {
  // Regional exposure data
  const regions = [
    {
      name: "North America",
      revenue: 45,
      suppliers: 35,
      politicalRisk:
        scenario === "baseline"
          ? 25
          : scenario === "us-china"
            ? 55
            : 30,
      regulatoryRisk: scenario === "baseline" ? 40 : 65,
      color: "#06b6d4",
    },
    {
      name: "Europe",
      revenue: 25,
      suppliers: 30,
      politicalRisk:
        scenario === "baseline"
          ? 35
          : scenario === "russia-ukraine"
            ? 75
            : 45,
      regulatoryRisk:
        scenario === "baseline"
          ? 45
          : scenario === "russia-ukraine"
            ? 70
            : 50,
      color: "#8b5cf6",
    },
    {
      name: "Asia Pacific",
      revenue: 22,
      suppliers: 28,
      politicalRisk:
        scenario === "baseline"
          ? 40
          : scenario === "us-china"
            ? 80
            : 50,
      regulatoryRisk:
        scenario === "baseline"
          ? 35
          : scenario === "us-china"
            ? 65
            : 40,
      color: "#f59e0b",
    },
    {
      name: "Middle East",
      revenue: 5,
      suppliers: 5,
      politicalRisk:
        scenario === "baseline"
          ? 60
          : scenario === "red-sea"
            ? 85
            : 70,
      regulatoryRisk:
        scenario === "baseline"
          ? 50
          : scenario === "red-sea"
            ? 75
            : 55,
      color: "#ef4444",
    },
    {
      name: "Latin America",
      revenue: 3,
      suppliers: 2,
      politicalRisk: scenario === "baseline" ? 45 : 55,
      regulatoryRisk: scenario === "baseline" ? 40 : 50,
      color: "#10b981",
    },
  ];

  const calculateWeightedRisk = () => {
    const totalWeight = regions.reduce(
      (sum, r) => sum + r.revenue,
      0,
    );
    const weightedRisk = regions.reduce((sum, r) => {
      const avgRisk = (r.politicalRisk + r.regulatoryRisk) / 2;
      return sum + (avgRisk * r.revenue) / totalWeight;
    }, 0);
    return Math.round(weightedRisk);
  };

  const geopoliticalRiskIndex = calculateWeightedRisk();

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module C: Geopolitical Exposure Map
          </h3>
        </div>
      </div>

      {/* Geopolitical Risk Index */}
      <div className="mb-4 rounded border border-gray-700 bg-[#161b22] p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Weighted Geopolitical Risk Index
          </span>
          <span
            className={`text-xl ${geopoliticalRiskIndex > 60 ? "text-red-400" : geopoliticalRiskIndex > 40 ? "text-amber-400" : "text-green-400"}`}
          >
            {geopoliticalRiskIndex}
          </span>
        </div>
        <Progress
          value={geopoliticalRiskIndex}
          className="h-2 bg-gray-700"
        />
        <div className="mt-1 text-xs text-gray-500">
          0 = Low Risk · 100 = Severe Risk
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="space-y-3">
        {regions.map((region, idx) => (
          <div
            key={idx}
            className="rounded border border-gray-700 bg-[#161b22] p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: region.color }}
                />
                <span className="text-xs text-gray-100">
                  {region.name}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                Rev: {region.revenue}% · Sup: {region.suppliers}
                %
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-400">
                    Political Risk
                  </span>
                  <span
                    className={
                      region.politicalRisk > 60
                        ? "text-red-400"
                        : "text-amber-400"
                    }
                  >
                    {region.politicalRisk}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className={`h-full ${region.politicalRisk > 60 ? "bg-red-500" : "bg-amber-500"}`}
                    style={{
                      width: `${region.politicalRisk}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-gray-400">
                    Regulatory Risk
                  </span>
                  <span
                    className={
                      region.regulatoryRisk > 60
                        ? "text-red-400"
                        : "text-amber-400"
                    }
                  >
                    {region.regulatoryRisk}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className={`h-full ${region.regulatoryRisk > 60 ? "bg-red-500" : "bg-amber-500"}`}
                    style={{
                      width: `${region.regulatoryRisk}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}