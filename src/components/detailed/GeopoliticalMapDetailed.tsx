import { useState } from "react";
import {
  Globe,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Shield,
  DollarSign,
  Factory,
  Users,
  Plane,
  ChevronRight,
  MapPin,
  Target,
  Activity,
  Award,
} from "lucide-react";
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import type { ScenarioType } from "../../App";

interface GeopoliticalMapDetailedProps {
  stock: string;
  scenario: ScenarioType;
}

export function GeopoliticalMapDetailed({
  stock,
  scenario,
}: GeopoliticalMapDetailedProps) {
  const [selectedRegion, setSelectedRegion] =
    useState<string>("all");
  const [selectedDimension, setSelectedDimension] = useState<
    "revenue" | "supply" | "operations" | "customers"
  >("revenue");

  // Regional exposure data - changes based on scenario
  const getRegionalData = () => {
    const baseData = [
      {
        region: "North America",
        code: "NAM",
        revenue: 45,
        suppliers: 38,
        facilities: 62,
        customers: 42,
        riskScore:
          scenario === "baseline"
            ? 15
            : scenario === "us-china"
              ? 35
              : 18,
        color: "#22c55e",
        countries: ["USA", "Canada", "Mexico"],
        keyRisks: [
          "Regulatory changes",
          "Labor disputes",
          "Supply chain concentration",
        ],
        opportunities: [
          "Stable legal framework",
          "Advanced R&D",
          "Strong defense demand",
        ],
      },
      {
        region: "Europe",
        code: "EUR",
        revenue: 28,
        suppliers: 32,
        facilities: 18,
        customers: 31,
        riskScore:
          scenario === "russia-ukraine"
            ? 72
            : scenario === "baseline"
              ? 22
              : 35,
        color:
          scenario === "russia-ukraine" ? "#ef4444" : "#f59e0b",
        countries: [
          "UK",
          "Germany",
          "France",
          "Spain",
          "Poland",
        ],
        keyRisks:
          scenario === "russia-ukraine"
            ? [
                "Energy crisis",
                "Sanctions spillover",
                "Titanium supply disruption",
              ]
            : [
                "Brexit uncertainty",
                "GDPR compliance",
                "Energy costs",
              ],
        opportunities: [
          "Strong airline market",
          "NATO partnerships",
          "ESG leadership",
        ],
      },
      {
        region: "Asia-Pacific",
        code: "APAC",
        revenue: 18,
        suppliers: 25,
        facilities: 12,
        customers: 19,
        riskScore:
          scenario === "us-china"
            ? 78
            : scenario === "red-sea"
              ? 55
              : 35,
        color: scenario === "us-china" ? "#ef4444" : "#f59e0b",
        countries: [
          "China",
          "Japan",
          "South Korea",
          "Singapore",
          "Australia",
        ],
        keyRisks:
          scenario === "us-china"
            ? [
                "Tech export controls",
                "Joint venture restrictions",
                "IP theft concerns",
              ]
            : [
                "Geopolitical tensions",
                "Supply chain complexity",
              ],
        opportunities: [
          "Growing aviation market",
          "Manufacturing efficiency",
          "Rare earth materials",
        ],
      },
      {
        region: "Middle East",
        code: "MEA",
        revenue: 6,
        suppliers: 3,
        facilities: 5,
        customers: 5,
        riskScore:
          scenario === "red-sea"
            ? 68
            : scenario === "russia-ukraine"
              ? 45
              : 38,
        color: scenario === "red-sea" ? "#ef4444" : "#f59e0b",
        countries: ["UAE", "Saudi Arabia", "Qatar", "Israel"],
        keyRisks:
          scenario === "red-sea"
            ? [
                "Shipping route disruption",
                "Regional conflict escalation",
                "Insurance costs",
              ]
            : ["Political instability", "Sanctions risk"],
        opportunities: [
          "Large defense orders",
          "Aviation growth",
          "Strategic location",
        ],
      },
      {
        region: "Latin America",
        code: "LATAM",
        revenue: 3,
        suppliers: 2,
        facilities: 3,
        customers: 3,
        riskScore: scenario === "baseline" ? 28 : 35,
        color: "#22c55e",
        countries: ["Brazil", "Mexico", "Chile"],
        keyRisks: [
          "Currency volatility",
          "Political instability",
          "Infrastructure gaps",
        ],
        opportunities: [
          "Emerging markets",
          "Mineral resources",
          "Nearshoring potential",
        ],
      },
    ];
    return baseData;
  };

  const regionalData = getRegionalData();

  // Country-level risk assessment
  const countryRiskData = [
    {
      country: "China",
      exposure: 15,
      risk: scenario === "us-china" ? 85 : 45,
      trend: "increasing",
      criticalDependencies: [
        "787 tail fin production",
        "Rare earth magnets",
        "Avionics components",
      ],
      sanctions:
        scenario === "us-china"
          ? "Export controls on advanced semiconductors & AI chips"
          : "None",
      mitigationPriority: "Critical",
    },
    {
      country: "Russia",
      exposure: 8,
      risk: scenario === "russia-ukraine" ? 95 : 65,
      trend: "decreasing",
      criticalDependencies: [
        "Titanium (35% of global supply)",
        "Palladium",
        "Engineering talent",
      ],
      sanctions:
        "Comprehensive - blocked transactions, asset freezes",
      mitigationPriority: "Urgent",
    },
    {
      country: "UK",
      exposure: 12,
      risk: 18,
      trend: "stable",
      criticalDependencies: [
        "Wings production (all models)",
        "Landing gear",
        "Fuel systems",
      ],
      sanctions: "None",
      mitigationPriority: "Monitor",
    },
    {
      country: "Japan",
      exposure: 10,
      risk: 28,
      trend: "stable",
      criticalDependencies: [
        "Carbon fiber composites",
        "787 wing components",
        "Fasteners",
      ],
      sanctions: "None",
      mitigationPriority: "Low",
    },
    {
      country: "Germany",
      exposure: 7,
      risk: scenario === "russia-ukraine" ? 52 : 22,
      trend:
        scenario === "russia-ukraine" ? "increasing" : "stable",
      criticalDependencies: [
        "Precision manufacturing",
        "Cabin interiors",
        "Quality systems",
      ],
      sanctions: "Russia-related restrictions",
      mitigationPriority:
        scenario === "russia-ukraine" ? "Medium" : "Low",
    },
    {
      country: "South Korea",
      exposure: 5,
      risk: 32,
      trend: "stable",
      criticalDependencies: [
        "Electronic systems",
        "Displays",
        "Semiconductor components",
      ],
      sanctions: "None",
      mitigationPriority: "Low",
    },
  ];

  // Geopolitical event timeline
  const geopoliticalEvents = [
    {
      date: "2025-10-15",
      region: "Asia-Pacific",
      event:
        "US export controls expanded to advanced aerospace components",
      impact: scenario === "us-china" ? "Critical" : "High",
      affectedOperations: ["787 production", "China sales"],
      businessAction:
        "Diversify component sourcing to non-restricted markets",
    },
    {
      date: "2025-09-28",
      region: "Middle East",
      event: "Red Sea shipping insurance premiums +400%",
      impact: scenario === "red-sea" ? "Critical" : "Medium",
      affectedOperations: [
        "Parts delivery",
        "Customer deliveries to Asia",
      ],
      businessAction:
        "Reroute via Cape of Good Hope, increase inventory buffers",
    },
    {
      date: "2025-08-12",
      region: "Europe",
      event:
        "EU extends Russia sanctions to aerospace materials",
      impact:
        scenario === "russia-ukraine" ? "Critical" : "High",
      affectedOperations: [
        "Titanium procurement",
        "Material costs",
      ],
      businessAction:
        "Accelerate qualification of US/Japanese titanium suppliers",
    },
    {
      date: "2025-07-05",
      region: "North America",
      event:
        "FAA announces stricter certification for foreign components",
      impact: "Medium",
      affectedOperations: [
        "Supply chain compliance",
        "Certification timelines",
      ],
      businessAction:
        "Audit supplier certifications, engage with FAA early",
    },
    {
      date: "2025-06-20",
      region: "Asia-Pacific",
      event:
        "China announces new civil aviation self-sufficiency targets",
      impact: scenario === "us-china" ? "Critical" : "High",
      affectedOperations: [
        "China market access",
        "Joint venture restrictions",
      ],
      businessAction:
        "Strengthen local partnerships, lobby for fair market access",
    },
  ];

  // Risk mitigation recommendations - actionable business intelligence
  const getMitigationRecommendations = () => {
    const recommendations = [];

    if (
      scenario === "russia-ukraine" ||
      scenario === "baseline"
    ) {
      recommendations.push({
        priority: "Critical",
        category: "Supply Chain",
        issue:
          "Titanium supply concentration (35% from Russia)",
        actions: [
          "Accelerate qualification of alternative suppliers (Timet USA, Osaka Titanium)",
          "Build 6-month strategic stockpile (estimated cost: $45M)",
          "Negotiate long-term contracts with Kazakhstan suppliers",
          "Invest in titanium recycling capabilities",
        ],
        timeline: "0-6 months",
        costImpact: "$45-80M capex, +8% material costs",
        riskReduction: "High",
      });
    }

    if (scenario === "us-china" || scenario === "baseline") {
      recommendations.push({
        priority: "Critical",
        category: "Market Access",
        issue:
          "US-China tech restrictions threaten $2.8B annual revenue",
        actions: [
          "Establish 'China-compliant' product variants without restricted tech",
          "Increase production in non-US facilities for Chinese customers",
          "Diversify Asia growth to India, Vietnam, Indonesia markets",
          "Strengthen Boeing China relationships through local partnerships",
        ],
        timeline: "6-18 months",
        costImpact:
          "$120M investment, potential -15% China revenue",
        riskReduction: "Medium",
      });
    }

    if (scenario === "red-sea" || scenario === "baseline") {
      recommendations.push({
        priority: "High",
        category: "Logistics",
        issue:
          "Shipping route disruptions add 15-20 days transit time",
        actions: [
          "Increase inventory buffers at key assembly plants (+$90M working capital)",
          "Negotiate air freight contracts for critical components",
          "Establish regional distribution hubs (Singapore, Dubai)",
          "Implement real-time supply chain visibility platform",
        ],
        timeline: "3-9 months",
        costImpact: "$90M working capital, +5% logistics costs",
        riskReduction: "Medium",
      });
    }

    recommendations.push({
      priority: "High",
      category: "Operations",
      issue:
        "Geographic concentration in geopolitically volatile regions",
      actions: [
        "Dual-source critical components across different geopolitical blocs",
        "Develop 'resilience score' for all suppliers (political risk weighted)",
        "Create rapid reallocation playbooks for each major disruption scenario",
        "Establish European titanium processing capability",
      ],
      timeline: "12-24 months",
      costImpact: "$200M+ capex for supplier diversification",
      riskReduction: "High",
    });

    recommendations.push({
      priority: "Medium",
      category: "Regulatory",
      issue: "Compliance complexity across 85+ jurisdictions",
      actions: [
        "Implement automated sanctions screening system",
        "Establish regional compliance centers (US, EU, APAC)",
        "Create 'early warning system' for regulatory changes",
        "Train 500+ employees on export control compliance",
      ],
      timeline: "6-12 months",
      costImpact: "$15M implementation, $8M annual operating",
      riskReduction: "Medium",
    });

    return recommendations;
  };

  const recommendations = getMitigationRecommendations();

  // Exposure metrics by dimension
  const exposureByDimension = {
    revenue: [
      {
        name: "Direct Sales",
        value: 42,
        risk: scenario === "us-china" ? 65 : 25,
      },
      { name: "Service & Parts", value: 28, risk: 20 },
      { name: "Defense Contracts", value: 18, risk: 15 },
      {
        name: "Licensing & IP",
        value: 12,
        risk: scenario === "us-china" ? 75 : 30,
      },
    ],
    supply: [
      {
        name: "Raw Materials",
        value: 35,
        risk: scenario === "russia-ukraine" ? 85 : 35,
      },
      {
        name: "Components",
        value: 40,
        risk: scenario === "us-china" ? 68 : 28,
      },
      { name: "Sub-assemblies", value: 15, risk: 25 },
      { name: "Tooling & Equipment", value: 10, risk: 20 },
    ],
    operations: [
      { name: "Manufacturing", value: 55, risk: 18 },
      {
        name: "R&D Centers",
        value: 25,
        risk: scenario === "us-china" ? 55 : 22,
      },
      { name: "Service Centers", value: 12, risk: 28 },
      { name: "Training Facilities", value: 8, risk: 15 },
    ],
    customers: [
      {
        name: "Commercial Airlines",
        value: 58,
        risk: scenario === "red-sea" ? 52 : 22,
      },
      { name: "Govt/Defense", value: 25, risk: 12 },
      { name: "Leasing Companies", value: 12, risk: 18 },
      {
        name: "Cargo Operators",
        value: 5,
        risk: scenario === "red-sea" ? 48 : 20,
      },
    ],
  };

  // Sanctions exposure analysis
  const sanctionsExposure = [
    {
      jurisdiction: "US (OFAC)",
      entities: 15,
      type: "Blocked persons, SDN list",
      exposure: "Medium",
      compliance: "Automated screening in place",
    },
    {
      jurisdiction: "EU",
      entities: 23,
      type: "Russia/Belarus sanctions",
      exposure:
        scenario === "russia-ukraine" ? "High" : "Medium",
      compliance: "Manual review + automated",
    },
    {
      jurisdiction: "UK (OFSI)",
      entities: 18,
      type: "Financial & trade restrictions",
      exposure: "Low",
      compliance: "Quarterly audit",
    },
    {
      jurisdiction: "UN",
      entities: 8,
      type: "Arms embargo, travel bans",
      exposure: "Low",
      compliance: "Annual certification",
    },
  ];

  // Political stability index over time
  const stabilityTrend = [
    { month: "Apr", china: 72, russia: 35, eu: 78, me: 52 },
    { month: "May", china: 70, russia: 32, eu: 76, me: 48 },
    {
      month: "Jun",
      china: scenario === "us-china" ? 55 : 68,
      russia: 30,
      eu: 75,
      me: 45,
    },
    {
      month: "Jul",
      china: scenario === "us-china" ? 52 : 67,
      russia: scenario === "russia-ukraine" ? 22 : 28,
      eu: scenario === "russia-ukraine" ? 68 : 74,
      me: 42,
    },
    {
      month: "Aug",
      china: scenario === "us-china" ? 48 : 66,
      russia: scenario === "russia-ukraine" ? 18 : 27,
      eu: scenario === "russia-ukraine" ? 65 : 73,
      me: scenario === "red-sea" ? 35 : 40,
    },
    {
      month: "Sep",
      china: scenario === "us-china" ? 45 : 65,
      russia: scenario === "russia-ukraine" ? 15 : 26,
      eu: scenario === "russia-ukraine" ? 62 : 72,
      me: scenario === "red-sea" ? 32 : 38,
    },
    {
      month: "Oct",
      china: scenario === "us-china" ? 42 : 64,
      russia: scenario === "russia-ukraine" ? 12 : 25,
      eu: scenario === "russia-ukraine" ? 60 : 71,
      me: scenario === "red-sea" ? 28 : 36,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="border-b border-gray-700 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl text-cyan-400 mb-2">
              Module C: Geopolitical Exposure Analysis
            </h2>
            <p className="text-sm text-gray-400">
              Comprehensive assessment of {stock} geopolitical
              risk across operations, supply chain, and markets
            </p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-[#161b22] px-4 py-2">
            <div className="text-xs text-gray-400">
              Overall Risk Level
            </div>
            <div
              className={`mt-0.5 text-xl ${
                scenario === "russia-ukraine" ||
                scenario === "us-china"
                  ? "text-red-400"
                  : scenario === "red-sea"
                    ? "text-amber-400"
                    : "text-green-400"
              }`}
            >
              {scenario === "russia-ukraine"
                ? "CRITICAL"
                : scenario === "us-china"
                  ? "CRITICAL"
                  : scenario === "red-sea"
                    ? "HIGH"
                    : "MODERATE"}
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-5 w-5 text-cyan-400" />
            <span className="text-xs text-gray-400">
              Active Regions
            </span>
          </div>
          <div className="text-2xl text-gray-100">85+</div>
          <div className="text-xs text-gray-500 mt-1">
            countries with operations
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span className="text-xs text-gray-400">
              High Risk
            </span>
          </div>
          <div className="text-2xl text-amber-400">
            {countryRiskData.filter((c) => c.risk > 60).length}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            countries require mitigation
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-5 w-5 text-red-400" />
            <span className="text-xs text-gray-400">
              Sanctions
            </span>
          </div>
          <div className="text-2xl text-red-400">64</div>
          <div className="text-xs text-gray-500 mt-1">
            entities under monitoring
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-5 w-5 text-green-400" />
            <span className="text-xs text-gray-400">
              At-Risk Revenue
            </span>
          </div>
          <div className="text-2xl text-gray-100">
            $
            {scenario === "us-china"
              ? "2.8"
              : scenario === "russia-ukraine"
                ? "1.2"
                : "0.8"}
            B
          </div>
          <div className="text-xs text-gray-500 mt-1">
            annual exposure
          </div>
        </div>
      </div>

      {/* Regional Risk Map & Breakdown */}
      <div className="grid grid-cols-3 gap-6">
        {/* Regional Overview */}
        <div className="col-span-2 rounded-lg border border-gray-700 bg-[#161b22] p-6">
          <h3 className="text-sm text-cyan-400 mb-4">
            Regional Exposure & Risk Matrix
          </h3>

          {/* Dimension Selector */}
          <div className="flex gap-2 mb-6">
            {[
              {
                key: "revenue",
                label: "Revenue",
                icon: DollarSign,
              },
              {
                key: "supply",
                label: "Supply Chain",
                icon: Factory,
              },
              {
                key: "operations",
                label: "Operations",
                icon: Activity,
              },
              {
                key: "customers",
                label: "Customers",
                icon: Users,
              },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedDimension(key as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-xs transition-colors ${
                  selectedDimension === key
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                    : "bg-[#0d1117] text-gray-400 border border-gray-700 hover:border-gray-600"
                }`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>

          {/* Regional bars */}
          <div className="space-y-4">
            {regionalData.map((region: Record<string, any>) => {
              const exposureValue = region[selectedDimension];
              const riskLevel = region.riskScore;

              return (
                <div key={region.code} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full`}
                        style={{
                          backgroundColor: region.color,
                        }}
                      />
                      <span className="text-sm text-gray-300">
                        {region.region}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({region.code})
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-400">
                        Exposure:{" "}
                        <span className="text-cyan-400">
                          {exposureValue}%
                        </span>
                      </span>
                      <span className="text-xs text-gray-400">
                        Risk:{" "}
                        <span
                          className={
                            riskLevel > 60
                              ? "text-red-400"
                              : riskLevel > 30
                                ? "text-amber-400"
                                : "text-green-400"
                          }
                        >
                          {riskLevel}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Dual progress bars */}
                  <div className="flex gap-2">
                    {/* Exposure bar */}
                    <div className="flex-1 h-6 bg-[#0d1117] rounded overflow-hidden border border-gray-700">
                      <div
                        className="h-full bg-cyan-500/40 border-r-2 border-cyan-400 flex items-center justify-end pr-2"
                        style={{ width: `${exposureValue}%` }}
                      >
                        {exposureValue > 15 && (
                          <span className="text-xs text-cyan-300">
                            {exposureValue}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Risk bar */}
                    <div className="flex-1 h-6 bg-[#0d1117] rounded overflow-hidden border border-gray-700">
                      <div
                        className={`h-full ${
                          riskLevel > 60
                            ? "bg-red-500/40 border-r-2 border-red-400"
                            : riskLevel > 30
                              ? "bg-amber-500/40 border-r-2 border-amber-400"
                              : "bg-green-500/40 border-r-2 border-green-400"
                        } flex items-center justify-end pr-2`}
                        style={{ width: `${riskLevel}%` }}
                      >
                        <span
                          className={`text-xs ${
                            riskLevel > 60
                              ? "text-red-300"
                              : riskLevel > 30
                                ? "text-amber-300"
                                : "text-green-300"
                          }`}
                        >
                          {riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-xs text-gray-500">
            <span>← Lower exposure/risk</span>
            <span>Higher exposure/risk →</span>
          </div>
        </div>

        {/* Exposure Breakdown Radar */}
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
          <h3 className="text-sm text-cyan-400 mb-4">
            Exposure Radar:{" "}
            {selectedDimension.charAt(0).toUpperCase() +
              selectedDimension.slice(1)}
          </h3>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={exposureByDimension[selectedDimension]}
              >
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <Radar
                  name="Exposure"
                  dataKey="value"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Risk"
                  dataKey="risk"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {exposureByDimension[selectedDimension].map(
              (item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-gray-400">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">
                      {item.value}%
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        item.risk > 60
                          ? "bg-red-500/20 text-red-400"
                          : item.risk > 30
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      Risk: {item.risk}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Country-Level Risk Assessment */}
      <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm text-cyan-400">
            Country-Level Risk Assessment
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Low</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {countryRiskData.map((country, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-700 bg-[#0d1117] p-4 hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`h-4 w-4 ${
                      country.risk > 60
                        ? "text-red-400"
                        : country.risk > 30
                          ? "text-amber-400"
                          : "text-green-400"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-100">
                        {country.country}
                      </span>
                      {country.trend === "increasing" && (
                        <TrendingUp className="h-3 w-3 text-red-400" />
                      )}
                      {country.trend === "decreasing" && (
                        <TrendingDown className="h-3 w-3 text-green-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {country.exposure}% of total exposure
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      Risk Score
                    </div>
                    <div
                      className={`text-lg ${
                        country.risk > 60
                          ? "text-red-400"
                          : country.risk > 30
                            ? "text-amber-400"
                            : "text-green-400"
                      }`}
                    >
                      {country.risk}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded text-xs ${
                      country.mitigationPriority ===
                        "Critical" ||
                      country.mitigationPriority === "Urgent"
                        ? "bg-red-500/20 text-red-400 border border-red-500/50"
                        : country.mitigationPriority ===
                            "Medium"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                          : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {country.mitigationPriority}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-gray-400 mb-1">
                    Critical Dependencies
                  </div>
                  <ul className="space-y-0.5">
                    {country.criticalDependencies
                      .slice(0, 2)
                      .map((dep, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-1"
                        >
                          <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                          <span>{dep}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="col-span-2">
                  <div className="text-gray-400 mb-1">
                    Sanctions Status
                  </div>
                  <div
                    className={`text-gray-300 ${country.sanctions !== "None" ? "text-amber-400" : ""}`}
                  >
                    {country.sanctions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Political Stability Trends */}
      <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
        <h3 className="text-sm text-cyan-400 mb-4">
          Political Stability Index Trends (6M)
        </h3>

        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stabilityTrend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="china"
                stroke="#06b6d4"
                strokeWidth={2}
                name="China"
                dot={{ fill: "#06b6d4", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="russia"
                stroke="#ef4444"
                strokeWidth={2}
                name="Russia"
                dot={{ fill: "#ef4444", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="eu"
                stroke="#22c55e"
                strokeWidth={2}
                name="EU"
                dot={{ fill: "#22c55e", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="me"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Middle East"
                dot={{ fill: "#f59e0b", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-cyan-400" />
            <span className="text-gray-400">China</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-400" />
            <span className="text-gray-400">Russia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-400" />
            <span className="text-gray-400">EU</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-amber-400" />
            <span className="text-gray-400">Middle East</span>
          </div>
        </div>
      </div>

      {/* Geopolitical Events Timeline */}
      <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
        <h3 className="text-sm text-cyan-400 mb-6">
          Recent Geopolitical Events & Business Impact
        </h3>

        <div className="space-y-4">
          {geopoliticalEvents.map((event, idx) => (
            <div
              key={idx}
              className="flex gap-4 pb-4 border-b border-gray-700 last:border-0"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    event.impact === "Critical"
                      ? "bg-red-500/20 border-2 border-red-500"
                      : event.impact === "High"
                        ? "bg-amber-500/20 border-2 border-amber-500"
                        : "bg-gray-700 border-2 border-gray-600"
                  }`}
                >
                  <Activity
                    className={`h-4 w-4 ${
                      event.impact === "Critical"
                        ? "text-red-400"
                        : event.impact === "High"
                          ? "text-amber-400"
                          : "text-gray-400"
                    }`}
                  />
                </div>
                {idx < geopoliticalEvents.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-700 mt-2" />
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      {event.date}
                    </div>
                    <div className="text-sm text-gray-100">
                      {event.event}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      {event.region}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        event.impact === "Critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/50"
                          : event.impact === "High"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                            : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {event.impact}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      Affected Operations
                    </div>
                    <div className="text-xs text-gray-300">
                      {event.affectedOperations.join(", ")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Recommended Action
                    </div>
                    <div className="text-xs text-cyan-400">
                      {event.businessAction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sanctions Exposure Analysis */}
      <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
        <h3 className="text-sm text-cyan-400 mb-6">
          Sanctions Exposure & Compliance Status
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {sanctionsExposure.map((sanction, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-700 bg-[#0d1117] p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-100 mb-1">
                    {sanction.jurisdiction}
                  </div>
                  <div className="text-xs text-gray-500">
                    {sanction.type}
                  </div>
                </div>
                <Shield
                  className={`h-5 w-5 ${
                    sanction.exposure === "High"
                      ? "text-red-400"
                      : sanction.exposure === "Medium"
                        ? "text-amber-400"
                        : "text-green-400"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Monitored Entities
                  </span>
                  <span className="text-gray-100">
                    {sanction.entities}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    Exposure Level
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      sanction.exposure === "High"
                        ? "bg-red-500/20 text-red-400"
                        : sanction.exposure === "Medium"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {sanction.exposure}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">
                    Compliance Status
                  </div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {sanction.compliance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation Recommendations - Actionable Intelligence */}
      <div className="rounded-lg border border-cyan-500/30 bg-[#161b22] p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="h-5 w-5 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Actionable Risk Mitigation Recommendations
          </h3>
        </div>

        <div className="space-y-6">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`rounded-lg border p-5 ${
                rec.priority === "Critical"
                  ? "border-red-500/50 bg-red-500/5"
                  : rec.priority === "High"
                    ? "border-amber-500/50 bg-amber-500/5"
                    : "border-gray-700 bg-[#0d1117]"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 px-3 py-1 rounded text-xs font-medium ${
                      rec.priority === "Critical"
                        ? "bg-red-500 text-white"
                        : rec.priority === "High"
                          ? "bg-amber-500 text-white"
                          : "bg-gray-600 text-white"
                    }`}
                  >
                    {rec.priority}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      {rec.category}
                    </div>
                    <div className="text-sm text-gray-100 mb-2">
                      {rec.issue}
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-gray-400">Timeline</div>
                  <div className="text-cyan-400 mt-0.5">
                    {rec.timeline}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-400 mb-2">
                  Recommended Actions:
                </div>
                {rec.actions.map((action, actionIdx) => (
                  <div
                    key={actionIdx}
                    className="flex items-start gap-2 text-xs text-gray-300"
                  >
                    <ChevronRight className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    Cost Impact
                  </div>
                  <div className="text-xs text-gray-100">
                    {rec.costImpact}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">
                    Risk Reduction
                  </div>
                  <div
                    className={`text-xs ${
                      rec.riskReduction === "High"
                        ? "text-green-400"
                        : rec.riskReduction === "Medium"
                          ? "text-amber-400"
                          : "text-gray-400"
                    }`}
                  >
                    {rec.riskReduction}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary & Next Steps */}
      <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
        <h3 className="text-sm text-cyan-400 mb-4">
          Executive Summary & Strategic Implications
        </h3>

        <div className="space-y-4 text-sm text-gray-300">
          <p>
            <span className="text-cyan-400 font-medium">
              Current State:
            </span>{" "}
            {stock} operates in 85+ countries with significant
            exposure to geopolitical volatility.
            {scenario === "us-china" &&
              " US-China tech restrictions pose critical threat to $2.8B annual revenue and 15% of supply chain."}
            {scenario === "russia-ukraine" &&
              " Russia sanctions have eliminated 35% of titanium supply, creating critical material shortage risk."}
            {scenario === "red-sea" &&
              " Shipping disruptions add 15-20 days to critical supply routes, threatening production schedules."}
          </p>

          <p>
            <span className="text-amber-400 font-medium">
              Key Vulnerabilities:
            </span>{" "}
            Geographic concentration in volatile regions (China:
            15% exposure at 85 risk score; Russia: 8% exposure
            at 95 risk score), critical single-source
            dependencies (titanium, rare earth materials), and
            complex multi-jurisdictional compliance requirements
            across 64 sanctioned entities.
          </p>

          <p>
            <span className="text-green-400 font-medium">
              Strategic Priorities:
            </span>{" "}
            Immediate action required on titanium supply
            diversification ($45-80M investment), China market
            access strategy ($120M to develop compliant product
            variants), and supply chain resilience ($200M+ for
            geographic diversification). Expected 12-24 month
            timeline to achieve meaningful risk reduction.
          </p>

          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 mb-2">
              Recommended Board-Level Actions:
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <Plane className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span>
                  Establish C-suite led Geopolitical Risk
                  Committee with quarterly reporting to Board
                </span>
              </li>
              <li className="flex items-start gap-2">
                <DollarSign className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span>
                  Allocate $300-400M capex for supply chain
                  diversification over 24 months
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span>
                  Implement real-time geopolitical monitoring
                  system integrated with ERP
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="h-3 w-3 mt-0.5 text-cyan-400 flex-shrink-0" />
                <span>
                  Hire Chief Geopolitical Risk Officer reporting
                  directly to CEO
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}