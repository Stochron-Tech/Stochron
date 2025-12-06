import { Calendar } from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function PolicyTracker() {
  // Historical policy impact data
  const historicalImpacts = [
    {
      date: "Oct 2025",
      event: "FAA Review Announcement",
      impact: -5.2,
      category: "Regulatory",
    },
    {
      date: "Sep 2025",
      event: "Fed Rate Hold",
      impact: 2.1,
      category: "Monetary",
    },
    {
      date: "Aug 2025",
      event: "China Tariff Reduction",
      impact: 4.8,
      category: "Trade",
    },
    {
      date: "Jul 2025",
      event: "EU Defense Contract",
      impact: 3.5,
      category: "Trade",
    },
    {
      date: "Jun 2025",
      event: "Supply Chain Act",
      impact: -2.3,
      category: "Regulatory",
    },
  ];

  // Policy category distribution
  const categoryData = [
    { name: "Monetary Policy", value: 30, color: "#06b6d4" },
    { name: "Trade Policy", value: 35, color: "#8b5cf6" },
    { name: "Regulatory", value: 25, color: "#f59e0b" },
    { name: "Geopolitical", value: 10, color: "#ef4444" },
  ];

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module E: Policy Impact Tracker
          </h3>
        </div>
      </div>

      {/* Policy Category Distribution */}
      <div className="mb-4 flex items-center gap-4">
        <div className="h-32 w-32">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={25}
                outerRadius={45}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-1">
          {categoryData.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-xs text-gray-400">
                {cat.name}
              </span>
              <span className="text-xs text-gray-500">
                {cat.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Policy-Event Impact */}
      <div>
        <div className="mb-2 text-xs text-gray-400">
          Recent Policy Impact on Returns
        </div>
        <div className="space-y-2">
          {historicalImpacts.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded border border-gray-700 bg-[#161b22] p-2"
            >
              <div className="flex-1">
                <div className="text-xs text-gray-300">
                  {item.event}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {item.date}
                  </span>
                  <span className="rounded bg-gray-700 px-1.5 py-0.5 text-xs text-gray-400">
                    {item.category}
                  </span>
                </div>
              </div>
              <div
                className={`text-sm ${item.impact >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {item.impact >= 0 ? "+" : ""}
                {item.impact}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Summary */}
      <div className="mt-4 rounded border border-gray-700 bg-[#161b22] p-3">
        <div className="text-xs text-gray-400">
          Policy-Return Correlation (R²)
        </div>
        <div className="mt-1 text-xl text-cyan-400">0.68</div>
        <div className="mt-1 text-xs text-gray-500">
          Strong correlation between policy events and stock
          returns
        </div>
      </div>
    </div>
  );
}