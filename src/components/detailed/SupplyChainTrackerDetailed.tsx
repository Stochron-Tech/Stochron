import { useState } from "react";
import {
  Truck,
  Download,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  // LineChart,
  // Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { ScenarioImpact } from "../../utils/scenario";

interface SupplyChainTrackerDetailedProps {
  stock: string;
  scenario: ScenarioType;
  customShock: Record<string, number>;
  impact: ScenarioImpact;
}

export function SupplyChainTrackerDetailed({
  stock,
  scenario,
  customShock,
  impact,
}: SupplyChainTrackerDetailedProps) {
  const [selectedCountry, setSelectedCountry] = useState<
    string | null
  >(null);
  const [timeRange, setTimeRange] = useState("3Y");

  // Calculate comprehensive SCVI
  const calculateDetailedSCVI = () => {

    let hhi = 25 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.3);
    let freight = 15 + (customShock.freight ?? 0) * 0.4;
    let energy = 20 + (customShock.sentiment ?? 0) * 0.05;
    let trade = 15 + (scenario === "baseline" ? 0 : impact.supply_chain * 0.25);
    let political = 10 + (customShock.sanctions ?? 0) * 0.2;

    const total =
      hhi * 0.25 +
      freight * 0.15 +
      energy * 0.2 +
      trade * 0.25 +
      political * 0.15;

    return {
      total: Math.round(total),
      components: {
        hhi: Math.round(hhi),
        freight: Math.round(freight),
        energy: Math.round(energy),
        trade: Math.round(trade),
        political: Math.round(political),
      },
    };
  };

  const scvi = calculateDetailedSCVI();

  // Supplier countries with detailed data
  const supplierCountries = [
    {
      name: "United States",
      share: 35,
      risk: scenario === "baseline" ? 15 : 22,
      suppliers: 245,
      keyMaterials: ["Aluminum", "Composites", "Electronics"],
      lastDisruption: null,
      lat: 37.0902,
      lng: -95.7129,
    },
    {
      name: "China",
      share: 18,
      risk:
        scenario === "us-china"
          ? 75
          : scenario === "baseline"
            ? 28
            : 42,
      suppliers: 156,
      keyMaterials: ["Rare Earths", "Electronics", "Fasteners"],
      lastDisruption:
        scenario === "us-china" ? "2024-10-15" : null,
      lat: 35.8617,
      lng: 104.1954,
    },
    {
      name: "Russia",
      share: 8,
      risk:
        scenario === "russia-ukraine"
          ? 92
          : scenario === "baseline"
            ? 35
            : 58,
      suppliers: 32,
      keyMaterials: ["Titanium", "Nickel"],
      lastDisruption:
        scenario === "russia-ukraine" ? "2024-02-24" : null,
      lat: 61.524,
      lng: 105.3188,
    },
    {
      name: "Japan",
      share: 12,
      risk: scenario === "baseline" ? 18 : 25,
      suppliers: 89,
      keyMaterials: ["Electronics", "Precision Parts"],
      lastDisruption: null,
      lat: 36.2048,
      lng: 138.2529,
    },
    {
      name: "Germany",
      share: 9,
      risk:
        scenario === "russia-ukraine"
          ? 42
          : scenario === "baseline"
            ? 20
            : 28,
      suppliers: 67,
      keyMaterials: ["Engines", "Avionics"],
      lastDisruption: null,
      lat: 51.1657,
      lng: 10.4515,
    },
    {
      name: "France",
      share: 7,
      risk: scenario === "baseline" ? 16 : 24,
      suppliers: 52,
      keyMaterials: ["Engines", "Carbon Fiber"],
      lastDisruption: null,
      lat: 46.2276,
      lng: 2.2137,
    },
    {
      name: "United Kingdom",
      share: 6,
      risk: scenario === "baseline" ? 19 : 26,
      suppliers: 45,
      keyMaterials: ["Engines", "Avionics"],
      lastDisruption: null,
      lat: 55.3781,
      lng: -3.436,
    },
    {
      name: "South Korea",
      share: 5,
      risk:
        scenario === "us-china"
          ? 52
          : scenario === "baseline"
            ? 22
            : 32,
      suppliers: 38,
      keyMaterials: ["Electronics", "Displays"],
      lastDisruption: null,
      lat: 35.9078,
      lng: 127.7669,
    },
  ];

  // Commodity dependency
  const commodityData = [
    {
      material: "Titanium",
      dependency: 32,
      primarySource: "Russia (68%)",
      risk: scenario === "russia-ukraine" ? 95 : 45,
      alternatives: "Limited",
    },
    {
      material: "Aluminum",
      dependency: 28,
      primarySource: "US/Canada (52%)",
      risk: scenario === "baseline" ? 25 : 35,
      alternatives: "Good",
    },
    {
      material: "Rare Earths",
      dependency: 24,
      primarySource: "China (85%)",
      risk: scenario === "us-china" ? 88 : 55,
      alternatives: "Poor",
    },
    {
      material: "Carbon Fiber",
      dependency: 22,
      primarySource: "Japan/France (65%)",
      risk: scenario === "baseline" ? 20 : 30,
      alternatives: "Moderate",
    },
    {
      material: "Nickel",
      dependency: 18,
      primarySource: "Russia (42%)",
      risk: scenario === "russia-ukraine" ? 78 : 38,
      alternatives: "Moderate",
    },
    {
      material: "Electronics/Chips",
      dependency: 45,
      primarySource: "Taiwan/China (72%)",
      risk: scenario === "us-china" ? 82 : 48,
      alternatives: "Improving",
    },
  ];

  // SCVI time evolution
  const scviEvolution = [];
  const startDate = new Date("2018-01-01");
  for (let i = 0; i < 96; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    let value = 42 + Math.sin(i / 12) * 8;

    // COVID spike
    if (i >= 26 && i <= 32) value += 25;

    // Ukraine war
    if (i >= 50 && i <= 70) value += 18;

    // Recent scenario
    if (i >= 84) {
      if (scenario === "russia-ukraine") value += 28;
      else if (scenario === "us-china") value += 20;
      else if (scenario === "red-sea") value += 24;
    }

    scviEvolution.push({
      month: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      }),
      scvi: Math.round(Math.min(100, value)),
    });
  }

  // Vulnerability breakdown
  const vulnerabilityBreakdown = [
    {
      component: "Supplier Concentration (HHI)",
      value: scvi.components.hhi,
      baseline: 25,
    },
    {
      component: "Freight Cost Volatility",
      value: scvi.components.freight,
      baseline: 15,
    },
    {
      component: "Energy Price Volatility",
      value: scvi.components.energy,
      baseline: 20,
    },
    {
      component: "Trade Barrier Index",
      value: scvi.components.trade,
      baseline: 15,
    },
    {
      component: "Political Risk Score",
      value: scvi.components.political,
      baseline: 10,
    },
  ];

  const getRiskColor = (risk: number) => {
    if (risk > 70) return "text-red-400";
    if (risk > 50) return "text-amber-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="border-b border-gray-700 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl text-cyan-400">
                Supply Chain Vulnerability Tracker
              </h2>
            </div>
            <p className="mt-2 text-gray-400">
              Quantify exposure across suppliers, logistics, and
              commodities for {stock}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-gray-600 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Supply Chain Report
          </Button>
        </div>

        {/* Time Range Selector */}
        <div className="mt-4 flex gap-2">
          <span className="text-sm text-gray-400">
            Historical View:
          </span>
          {["1Y", "3Y", "5Y", "All"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded px-3 py-1 text-sm ${
                timeRange === range
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* SCVI Overview */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2 rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="text-sm text-gray-400">
            Supply Chain Vulnerability Index
          </div>
          <div
            className={`mt-2 text-5xl ${scvi.total > 70 ? "text-red-400" : scvi.total > 50 ? "text-amber-400" : "text-green-400"}`}
          >
            {scvi.total}
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-700">
            <div
              className={`h-full transition-all duration-500 ${scvi.total > 70 ? "bg-red-500" : scvi.total > 50 ? "bg-amber-500" : "bg-green-500"}`}
              style={{ width: `${scvi.total}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {scvi.total > 70
              ? "High Vulnerability"
              : scvi.total > 50
                ? "Elevated Risk"
                : "Resilient"}
          </div>
        </div>

        {Object.entries(scvi.components).map(([key, value]) => (
          <div
            key={key}
            className="rounded-lg border border-gray-700 bg-[#161b22] p-4"
          >
            <div className="text-xs text-gray-400">
              {key === "hhi" && "Concentration"}
              {key === "freight" && "Freight"}
              {key === "energy" && "Energy"}
              {key === "trade" && "Trade Barriers"}
              {key === "political" && "Political Risk"}
            </div>
            <div
              className={`mt-1 text-2xl ${value > 70 ? "text-red-400" : value > 40 ? "text-amber-400" : "text-green-400"}`}
            >
              {value}
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-700">
              <div
                className={`h-full ${value > 70 ? "bg-red-500" : value > 40 ? "bg-amber-500" : "bg-green-500"}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="map">
            World Supply Map
          </TabsTrigger>
          <TabsTrigger value="breakdown">
            Vulnerability Breakdown
          </TabsTrigger>
          <TabsTrigger value="commodities">
            Commodity Dependency
          </TabsTrigger>
          <TabsTrigger value="evolution">
            SCVI Evolution
          </TabsTrigger>
        </TabsList>

        {/* World Supply Map */}
        <TabsContent value="map" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg text-gray-200">
                Global Supplier Network
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Click country for details</span>
              </div>
            </div>

            {/* Simplified world map visualization */}
            <div className="relative mb-6 h-[500px] rounded border border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 p-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  viewBox="0 0 1000 500"
                  className="h-full w-full"
                >
                  {/* Simplified continent outlines */}
                  <path
                    d="M 100 200 L 200 180 L 250 220 L 280 200 L 300 240 L 250 280 L 180 260 L 120 240 Z"
                    fill="#1f2937"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  {/* Country markers */}
                  {supplierCountries.map((country, i) => {
                    const x = 150 + i * 120;
                    const y = 200 + Math.sin(i) * 80;
                    const size = (country.share / 35) * 40 + 20;
                    return (
                      <g
                        key={i}
                        onClick={() =>
                          setSelectedCountry(country.name)
                        }
                        className="cursor-pointer transition-transform hover:scale-110"
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={size}
                          fill={
                            country.risk > 70
                              ? "#ef4444"
                              : country.risk > 50
                                ? "#f59e0b"
                                : country.risk > 30
                                  ? "#22d3ee"
                                  : "#10b981"
                          }
                          opacity="0.6"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r={size}
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <text
                          x={x}
                          y={y + size + 15}
                          textAnchor="middle"
                          className="fill-gray-300 text-xs"
                        >
                          {country.name}
                        </text>
                        <text
                          x={x}
                          y={y + size + 28}
                          textAnchor="middle"
                          className="fill-gray-500 text-xs"
                        >
                          {country.share}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Country Cards */}
            <div className="grid grid-cols-4 gap-4">
              {supplierCountries.map((country, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setSelectedCountry(country.name)
                  }
                  className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-cyan-400 ${
                    country.risk > 70
                      ? "border-red-500/50 bg-red-500/5"
                      : country.risk > 50
                        ? "border-amber-500/50 bg-amber-500/5"
                        : "border-gray-700 bg-[#161b22]"
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="text-sm text-gray-200">
                      {country.name}
                    </div>
                    {country.lastDisruption && (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-xl text-cyan-400">
                      {country.share}%
                    </span>
                    <span className="text-xs text-gray-500">
                      supply share
                    </span>
                  </div>
                  <div className="mb-2">
                    <div className="text-xs text-gray-400">
                      Risk Level
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                          <div
                            className={`h-full ${
                              country.risk > 70
                                ? "bg-red-500"
                                : country.risk > 50
                                  ? "bg-amber-500"
                                  : country.risk > 30
                                    ? "bg-cyan-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                              width: `${country.risk}%`,
                            }}
                          />
                        </div>
                      </div>
                      <span
                        className={`text-xs ${getRiskColor(country.risk)}`}
                      >
                        {country.risk}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {country.suppliers} suppliers
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Vulnerability Breakdown */}
        <TabsContent value="breakdown" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              SCVI Component Analysis: Baseline vs Current
              Scenario
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              SCVI = 0.25×HHI + 0.15×Freight + 0.20×Energy +
              0.25×TradeBarrier + 0.15×PoliticalRisk
            </p>

            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vulnerabilityBreakdown}
                  layout="vertical"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    domain={[0, 100]}
                  />
                  <YAxis
                    type="category"
                    dataKey="component"
                    stroke="#9ca3af"
                    width={200}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="baseline"
                    fill="#6b7280"
                    name="Baseline"
                  />
                  <Bar dataKey="value" name="Current Scenario">
                    {vulnerabilityBreakdown.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.value > 70
                              ? "#ef4444"
                              : entry.value > 40
                                ? "#f59e0b"
                                : "#22d3ee"
                          }
                        />
                      ),
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Component Details */}
            <div className="mt-6 space-y-3">
              {vulnerabilityBreakdown.map((comp, i) => (
                <div
                  key={i}
                  className="rounded border border-gray-700 bg-[#161b22] p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-200">
                      {comp.component}
                    </span>
                    <span
                      className={`text-lg ${comp.value > 70 ? "text-red-400" : comp.value > 40 ? "text-amber-400" : "text-green-400"}`}
                    >
                      {comp.value}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {comp.component.includes("Concentration") &&
                      "Herfindahl-Hirschman Index measures supplier market concentration"}
                    {comp.component.includes("Freight") &&
                      "Baltic Dry Index & air freight cost volatility"}
                    {comp.component.includes("Energy") &&
                      "Brent crude & jet fuel price variance"}
                    {comp.component.includes("Trade") &&
                      "Tariff counts, sanctions, export controls"}
                    {comp.component.includes("Political") &&
                      "EIU/World Bank political stability indices"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Commodity Dependency */}
        <TabsContent value="commodities" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Critical Material Dependencies
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Key raw material exposure and supply chain risk
              assessment
            </p>

            <div className="mb-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={commodityData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                  />
                  <XAxis dataKey="material" stroke="#9ca3af" />
                  <YAxis
                    stroke="#9ca3af"
                    label={{
                      value: "Dependency %",
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
                  />
                  <Bar dataKey="dependency" name="Dependency %">
                    {commodityData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.risk > 70
                            ? "#ef4444"
                            : entry.risk > 50
                              ? "#f59e0b"
                              : "#22d3ee"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Commodity Detail Cards */}
            <div className="grid grid-cols-2 gap-4">
              {commodityData.map((commodity, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 ${
                    commodity.risk > 70
                      ? "border-red-500/50 bg-red-500/5"
                      : commodity.risk > 50
                        ? "border-amber-500/50 bg-amber-500/5"
                        : "border-gray-700 bg-[#161b22]"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="text-sm text-gray-200">
                        {commodity.material}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {commodity.dependency}% of BOM by value
                      </div>
                    </div>
                    <div
                      className={`text-xl ${getRiskColor(commodity.risk)}`}
                    >
                      {commodity.risk}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-400">
                        Primary Source:
                      </span>{" "}
                      <span className="text-gray-300">
                        {commodity.primarySource}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">
                        Alternatives:
                      </span>{" "}
                      <span
                        className={`${
                          commodity.alternatives === "Poor"
                            ? "text-red-400"
                            : commodity.alternatives ===
                                "Limited"
                              ? "text-amber-400"
                              : "text-green-400"
                        }`}
                      >
                        {commodity.alternatives}
                      </span>
                    </div>
                    {commodity.risk > 70 && (
                      <div className="mt-2 flex items-center gap-1 rounded bg-red-500/10 p-2 text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>
                          High risk - consider diversification
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* SCVI Evolution */}
        <TabsContent value="evolution" className="space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-6">
            <h3 className="mb-4 text-lg text-gray-200">
              Supply Chain Vulnerability Index — Historical
              Trend
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              SCVI evolution from 2018-present with major
              disruption events highlighted
            </p>

            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scviEvolution}>
                  <defs>
                    <linearGradient
                      id="scviGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#f59e0b"
                        stopOpacity={0.5}
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
                    dataKey="month"
                    stroke="#9ca3af"
                    interval={11}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    domain={[0, 100]}
                    label={{
                      value: "SCVI",
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
                  />

                  {/* Threshold lines */}
                  <ReferenceLine
                    y={70}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label="High Vulnerability"
                  />
                  <ReferenceLine
                    y={50}
                    stroke="#f59e0b"
                    strokeDasharray="3 3"
                    label="Elevated Risk"
                  />

                  <Area
                    type="monotone"
                    dataKey="scvi"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fill="url(#scviGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Event Timeline */}
            <div className="mt-6 space-y-2">
              <div className="text-sm text-gray-400">
                Major Disruption Events:
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="rounded border border-red-500/50 bg-red-500/10 px-3 py-1 text-xs text-red-400">
                  Mar 2020: COVID-19 Pandemic → SCVI peak at 67
                </div>
                <div className="rounded border border-red-500/50 bg-red-500/10 px-3 py-1 text-xs text-red-400">
                  Feb 2022: Ukraine War → SCVI spike to 60
                </div>
                <div className="rounded border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                  Nov 2023: Red Sea Attacks → Freight surge
                </div>
                {scenario !== "baseline" && (
                  <div className="rounded border border-red-500/50 bg-red-500/10 px-3 py-1 text-xs text-red-400">
                    Current:{" "}
                    {scenario.replace("-", " ").toUpperCase()} →
                    SCVI at {scvi.total}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights Panel */}
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <span className="text-sm text-red-400">
            Supply Chain Risk Assessment
          </span>
        </div>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-red-400">
              Current SCVI:
            </strong>{" "}
            Boeing's supply chain vulnerability index
            {scenario === "baseline"
              ? " is at baseline levels (42)"
              : ` has risen from 43 → ${scvi.total} following ${scenario.replace("-", " ")} disruptions`}
            .{" "}
            {scvi.total > 70 &&
              "This represents a high-risk regime requiring immediate mitigation."}
          </p>
          <p>
            <strong className="text-red-400">
              Concentration Risk:
            </strong>{" "}
            Highest exposure remains in titanium (32%
            dependency, 68% from Russia) and rare earth elements
            (24% dependency, 85% from China).{" "}
            {(scenario === "russia-ukraine" ||
              scenario === "us-china") &&
              "Current geopolitical tensions amplify these vulnerabilities significantly."}
          </p>
          <p>
            <strong className="text-red-400">
              Logistics Stress:
            </strong>{" "}
            {scvi.components.freight > 50
              ? `Freight cost volatility at ${scvi.components.freight} indicates severe shipping disruptions. `
              : "Freight costs remain manageable. "}
            {scvi.components.energy > 40 &&
              `Energy price volatility (${scvi.components.energy}) adds additional cost pressure to supply chain operations.`}
          </p>
        </div>
      </div>

      {/* Country Detail Dialog */}
      <Dialog
        open={selectedCountry !== null}
        onOpenChange={() => setSelectedCountry(null)}
      >
        <DialogContent className="max-w-2xl bg-[#0d1117] border-gray-700 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-cyan-400">
              {selectedCountry} — Supplier Detail
            </DialogTitle>
          </DialogHeader>
          {selectedCountry &&
            (() => {
              const country = supplierCountries.find(
                (c) => c.name === selectedCountry,
              );
              if (!country) return null;
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded border border-gray-700 bg-[#161b22] p-3">
                      <div className="text-xs text-gray-400">
                        Supply Share
                      </div>
                      <div className="text-2xl text-cyan-400">
                        {country.share}%
                      </div>
                    </div>
                    <div className="rounded border border-gray-700 bg-[#161b22] p-3">
                      <div className="text-xs text-gray-400">
                        Risk Level
                      </div>
                      <div
                        className={`text-2xl ${getRiskColor(country.risk)}`}
                      >
                        {country.risk}
                      </div>
                    </div>
                    <div className="rounded border border-gray-700 bg-[#161b22] p-3">
                      <div className="text-xs text-gray-400">
                        Suppliers
                      </div>
                      <div className="text-2xl text-gray-300">
                        {country.suppliers}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm text-gray-400">
                      Key Materials Sourced
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {country.keyMaterials.map(
                        (material, i) => (
                          <span
                            key={i}
                            className="rounded bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400"
                          >
                            {material}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {country.lastDisruption && (
                    <div className="rounded border border-red-500/50 bg-red-500/10 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm text-red-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Recent Disruption Detected</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        Last disruption:{" "}
                        {new Date(
                          country.lastDisruption,
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-gray-400">
                    <strong className="text-gray-300">
                      Mitigation Recommendations:
                    </strong>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>
                        Diversify supplier base to reduce
                        concentration risk
                      </li>
                      <li>
                        Establish strategic material stockpiles
                        for critical components
                      </li>
                      <li>
                        Monitor geopolitical developments in
                        region for early warning
                      </li>
                      {country.risk > 70 && (
                        <li className="text-red-400">
                          URGENT: Develop contingency sourcing
                          plan due to high risk level
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}