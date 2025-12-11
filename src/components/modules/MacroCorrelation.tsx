import { TrendingUp, Info } from "lucide-react";

interface MacroCorrelationProps {
  stock: string;
}

export function MacroCorrelation({
  stock,
}: MacroCorrelationProps) {
  // Correlation matrix data with regression coefficients
  stock;
  
  const correlations = [
    {
      variable: "GDP Growth",
      correlation: 0.72,
      beta: 0.85,
      pValue: 0.001,
    },
    {
      variable: "CPI Inflation",
      correlation: -0.45,
      beta: -0.42,
      pValue: 0.012,
    },
    {
      variable: "10Y Treasury",
      correlation: -0.58,
      beta: -0.48,
      pValue: 0.005,
    },
    {
      variable: "USD Index",
      correlation: -0.51,
      beta: -0.35,
      pValue: 0.018,
    },
    {
      variable: "Oil Price (WTI)",
      correlation: -0.62,
      beta: -0.62,
      pValue: 0.003,
    },
    {
      variable: "Manufacturing PMI",
      correlation: 0.65,
      beta: 0.68,
      pValue: 0.002,
    },
  ];

  // Factor loadings
  const factorLoadings = [
    { factor: "Economic Growth", weight: 42, color: "#10b981" },
    { factor: "Interest Rates", weight: 28, color: "#f59e0b" },
    { factor: "Currency", weight: 18, color: "#22d3ee" },
    { factor: "Commodities", weight: 12, color: "#ef4444" },
  ];

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-5 transition-all hover:border-gray-600">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module G: Macro Correlation Engine
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Info className="h-3 w-3" />
          <span>Click to expand</span>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">Model R²</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl text-green-400">0.72</span>
            <span className="text-xs text-gray-500">
              variance explained
            </span>
          </div>
        </div>
        <div className="rounded border border-gray-700 bg-[#161b22] p-3">
          <div className="text-xs text-gray-400">
            GDP Elasticity
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl text-cyan-400">+0.85</span>
            <span className="text-xs text-gray-500">
              β coefficient
            </span>
          </div>
        </div>
      </div>

      {/* Regression Coefficients */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Regression Coefficients (β)
          </span>
          <span className="text-xs text-gray-500">
            Stock return sensitivity
          </span>
        </div>
        <div className="space-y-2">
          {correlations.slice(0, 5).map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="flex items-center gap-2">
                <span className="w-28 text-xs text-gray-300">
                  {item.variable}
                </span>
                <div className="flex flex-1 items-center">
                  <div className="relative h-6 w-full rounded border border-gray-700 bg-gray-800">
                    {/* Zero line */}
                    <div className="absolute left-1/2 top-0 h-full w-px bg-gray-600" />

                    {/* Beta bar */}
                    <div
                      className={`absolute top-0 h-full transition-all ${
                        item.beta >= 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.abs(item.beta) * 50}%`,
                        left:
                          item.beta >= 0
                            ? "50%"
                            : `${50 - Math.abs(item.beta) * 50}%`,
                      }}
                    />

                    {/* Value label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-white font-mono">
                        {item.beta >= 0 ? "+" : ""}
                        {item.beta.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="w-12 text-xs text-gray-500 text-right">
                  p={item.pValue.toFixed(3)}
                </span>
              </div>
              {/* Tooltip */}
              <div className="absolute left-0 top-full z-10 mt-1 hidden w-64 rounded border border-gray-600 bg-gray-900 p-2 text-xs text-gray-300 group-hover:block">
                +1% change in {item.variable} →{" "}
                {item.beta >= 0 ? "+" : ""}
                {(item.beta * 1).toFixed(2)}% expected stock
                return
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>-1.0</span>
          <span>0</span>
          <span>+1.0</span>
        </div>
      </div>

      {/* Factor Loading Chart */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Macro Factor Decomposition
          </span>
          <span className="text-xs text-gray-500">
            Explanatory power
          </span>
        </div>
        <div className="space-y-2">
          {factorLoadings.map((factor, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="flex w-28 items-center gap-1.5">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: factor.color }}
                ></div>
                <span className="text-xs text-gray-300">
                  {factor.factor}
                </span>
              </div>
              <div className="flex-1">
                <div className="h-5 overflow-hidden rounded border border-gray-700 bg-gray-800">
                  <div
                    className="flex h-full items-center justify-end pr-2 transition-all"
                    style={{
                      width: `${factor.weight}%`,
                      backgroundColor: factor.color,
                    }}
                  >
                    <span className="text-xs text-white">
                      {factor.weight}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}