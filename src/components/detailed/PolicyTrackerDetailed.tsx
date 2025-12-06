import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

interface PolicyEvent {
  id: string;
  date: string;
  title: string;
  type: string;
  location: string;
  participants: string[];
  impact: number;
  trend: "up" | "down" | "neutral";
  description: string;
  keyTopics: string[];
  historicalContext: string;
  potentialOutcomes: {
    optimistic: string;
    baseline: string;
    pessimistic: string;
  };
  watchPoints: string[];
  relatedVariables: string[];
}

export function PolicyTrackerDetailed() {
  const [selectedEvent, setSelectedEvent] =
    useState<PolicyEvent | null>(null);

  const policyEvents: PolicyEvent[] = [
    {
      id: "fed-nov-2025",
      date: "November 7, 2025",
      title: "Federal Reserve Interest Rate Decision",
      type: "Central Bank Policy",
      location: "Washington D.C., USA",
      participants: [
        "Federal Reserve Board",
        "FOMC Members",
        "Chair Jerome Powell",
      ],
      impact: 85,
      trend: "down",
      description:
        "The Federal Open Market Committee will announce its decision on the federal funds rate. Market consensus expects a potential 25 basis point cut, but hawkish rhetoric around persistent inflation could surprise markets.",
      keyTopics: [
        "Terminal rate guidance for 2025-2026",
        "Inflation outlook and PCE trajectory",
        "Labor market assessment",
        "Quantitative tightening (QT) continuation or pause",
        "Global economic spillover effects",
      ],
      historicalContext:
        "Since March 2022, the Fed has raised rates from near-zero to 5.25-5.50%, the fastest hiking cycle since the 1980s. This has significantly impacted borrowing costs for airlines (Boeing's customers) and general economic growth.",
      potentialOutcomes: {
        optimistic:
          "Fed signals rate cuts in Q1 2026, citing cooling inflation. Airlines benefit from lower financing costs, increasing aircraft orders. Boeing stock rallies 8-12%.",
        baseline:
          "Fed holds rates steady, maintains 'higher for longer' stance. Neutral impact on Boeing as market expectations already priced in. Stock moves ±3%.",
        pessimistic:
          "Fed hints at further hikes due to stubborn inflation. Credit costs for airlines increase, delaying orders. Boeing stock drops 6-10%.",
      },
      watchPoints: [
        "Dot plot projections for 2026 rate expectations",
        "Powell's press conference tone on inflation persistence",
        "Any mention of financial stability concerns",
        "Reaction of 10-year Treasury yields (affects airline financing)",
      ],
      relatedVariables: [
        "10-Year Treasury Yield",
        "USD Index (DXY)",
        "Airline Credit Spreads",
        "Commercial Aircraft Order Deferrals",
      ],
    },
    {
      id: "g20-nov-2025",
      date: "November 15, 2025",
      title: "G20 Summit - Trade Policy & Global Supply Chains",
      type: "Multilateral Trade Summit",
      location: "Rio de Janeiro, Brazil",
      participants: [
        "G20 Leaders",
        "U.S. President",
        "Chinese President",
        "EU Commission President",
      ],
      impact: 72,
      trend: "neutral",
      description:
        "The 2025 G20 Summit focuses on reforming global supply chains post-COVID and addressing trade fragmentation. Bilateral meetings between U.S. and Chinese leaders could signal shifts in export control policies affecting aerospace.",
      keyTopics: [
        "Supply chain resilience and diversification",
        "Digital trade and data localization rules",
        "Climate-related trade measures (carbon border adjustments)",
        "WTO reform and dispute settlement",
        "Semiconductor and critical technology export controls",
      ],
      historicalContext:
        "Previous G20 summits (2018, 2019) saw temporary trade war 'truces' between the U.S. and China, leading to short-term stock rallies. However, structural issues remain unresolved, and summit outcomes often lack enforcement mechanisms.",
      potentialOutcomes: {
        optimistic:
          "U.S.-China announce working group on technology export controls, signaling potential easing of restrictions on civilian aerospace. Boeing gains clarity on China market access. Stock up 5-8%.",
        baseline:
          "Summit produces generic communiqué on supply chain cooperation without concrete actions. No major policy shifts. Boeing stock moves ±2%.",
        pessimistic:
          "Summit highlights deepening U.S.-China divide. New export control frameworks discussed that could further restrict dual-use technology. Boeing faces more uncertainty. Stock down 4-7%.",
      },
      watchPoints: [
        "U.S.-China bilateral meeting outcomes (if scheduled)",
        "Joint statement language on technology trade",
        "EU positioning between U.S. and China (balancing act)",
        "Any specific mentions of aviation or aerospace sector",
      ],
      relatedVariables: [
        "Export Control Stringency Index",
        "China Aircraft Order Backlog",
        "EU-U.S. Trade Alignment Score",
        "Global Supply Chain Pressure Index",
      ],
    },
    {
      id: "eu-sanctions-nov-2025",
      date: "November 22, 2025",
      title: "EU Russia Sanctions Review - 6-Month Renewal",
      type: "Sanctions Policy",
      location: "Brussels, Belgium",
      participants: [
        "EU Council",
        "European Commission",
        "27 EU Member States",
      ],
      impact: 68,
      trend: "down",
      description:
        "The European Union conducts its semi-annual review of Russia sanctions, including restrictions on titanium exports—a critical material for Boeing's aircraft production. Potential expansion or easing of sanctions could significantly impact supply chains.",
      keyTopics: [
        "Titanium export restrictions (critical for aerospace)",
        "Dual-use technology ban enforcement",
        "Energy sector sanctions continuation",
        "Aviation sector restrictions (Russian airspace closure)",
        "Coordination with U.S. sanctions policy",
      ],
      historicalContext:
        "Since February 2022, EU sanctions on Russia have disrupted Boeing's titanium supply chain, as Russia supplies ~35% of global aerospace-grade titanium. Boeing has diversified to Japan and Kazakhstan, but at higher costs.",
      potentialOutcomes: {
        optimistic:
          "EU maintains current sanctions without expansion. Boeing's alternative titanium supply chains stabilize. Stock neutral to slightly positive (+2-3%).",
        baseline:
          "EU renews sanctions with minor technical adjustments. No material change to titanium supply. Boeing stock ±1%.",
        pessimistic:
          "EU expands sanctions to include secondary titanium processors or tightens dual-use enforcement. Boeing faces new supply disruptions and cost increases. Stock down 5-8%.",
      },
      watchPoints: [
        "Specific language on critical minerals and titanium",
        "Hungary or other member states' objections (requires unanimity)",
        "U.S. Treasury coordination on secondary sanctions",
        "Russian titanium stockpile levels and alternative sourcing",
      ],
      relatedVariables: [
        "Titanium Price Index",
        "Russian Titanium Export Volume",
        "Boeing Material Cost Inflation",
        "Production Delay Risk Score",
      ],
    },
    {
      id: "china-pmi-dec-2025",
      date: "December 1, 2025",
      title: "China Manufacturing PMI & Economic Data Release",
      type: "Economic Indicators",
      location: "Beijing, China",
      participants: [
        "National Bureau of Statistics",
        "Caixin/Markit",
      ],
      impact: 55,
      trend: "up",
      description:
        "Monthly release of China's Purchasing Managers' Index (PMI) and industrial production data. Critical for assessing demand outlook for commercial aircraft in China, Boeing's largest potential market.",
      keyTopics: [
        "Manufacturing PMI (expansion above 50 vs. contraction)",
        "Aviation sector sub-indices",
        "Domestic vs. export order balance",
        "Employment trends in manufacturing",
        "Government stimulus effectiveness",
      ],
      historicalContext:
        "China's PMI has been hovering around the 50 threshold (expansion/contraction line) since 2023, reflecting economic slowdown. Strong PMI correlates with airline profitability and aircraft order activity within 6-12 months.",
      potentialOutcomes: {
        optimistic:
          "PMI exceeds 52, signaling robust manufacturing recovery. Airlines anticipate capacity needs, accelerating Boeing order discussions. Stock up 3-5%.",
        baseline:
          "PMI at 50-51, indicating marginal growth. Steady state for Boeing's China outlook. Stock ±2%.",
        pessimistic:
          "PMI below 49, confirming economic contraction. Airlines delay fleet expansion plans. Boeing China orders at risk. Stock down 3-6%.",
      },
      watchPoints: [
        "Aviation-specific PMI components (if disclosed)",
        "Concurrent GDP growth rate revisions",
        "Government stimulus announcements following weak data",
        "Air passenger traffic growth trends in China",
      ],
      relatedVariables: [
        "China GDP Growth Rate",
        "Domestic Air Travel Demand (RPK)",
        "Yuan/USD Exchange Rate",
        "Chinese Airline Profitability Index",
      ],
    },
    {
      id: "faa-review-dec-2025",
      date: "December 18, 2025",
      title: "FAA Safety Review - 737 MAX Quality Control",
      type: "Regulatory Review",
      location: "Washington D.C., USA",
      participants: [
        "FAA Administrator",
        "Boeing Leadership",
        "NTSB Representatives",
      ],
      impact: 78,
      trend: "neutral",
      description:
        "The Federal Aviation Administration concludes its comprehensive safety review of Boeing's 737 MAX production quality control processes following door plug incident in January 2024. Outcome could lead to production restrictions or clearances.",
      keyTopics: [
        "Production quality audit findings",
        "Spirit AeroSystems supplier oversight",
        "Employee safety culture assessment",
        "Corrective action plan approval/rejection",
        "Potential production rate caps or increases",
      ],
      historicalContext:
        "Following the Alaska Airlines door plug incident (Jan 2024), the FAA capped 737 MAX production at 38/month and initiated intensive audits. Boeing is seeking approval to increase to 47/month by 2026 to clear backlog and improve cash flow.",
      potentialOutcomes: {
        optimistic:
          "FAA approves corrective actions and greenlights production increase to 47/month by Q2 2026. Positive for Boeing cash flow and delivery targets. Stock up 8-12%.",
        baseline:
          "FAA accepts some improvements but maintains 38/month cap for additional 6-12 months pending further monitoring. Stock moves ±3%.",
        pessimistic:
          "FAA identifies new quality issues, potentially reducing cap to 30/month or implementing enhanced oversight. Delivery delays cascade. Stock down 10-15%.",
      },
      watchPoints: [
        "Specific production rate guidance in FAA statement",
        "Any mention of additional aircraft types under review (787)",
        "Timeline for next review milestone",
        "Congressional reaction and potential for hearings",
      ],
      relatedVariables: [
        "737 MAX Production Rate",
        "Boeing Free Cash Flow",
        "Delivery Backlog (units)",
        "Quality Incident Frequency Index",
      ],
    },
    {
      id: "ecb-policy-dec-2025",
      date: "December 12, 2025",
      title: "European Central Bank Monetary Policy Meeting",
      type: "Central Bank Policy",
      location: "Frankfurt, Germany",
      participants: [
        "ECB Governing Council",
        "President Christine Lagarde",
      ],
      impact: 61,
      trend: "down",
      description:
        "ECB's final policy meeting of 2025. European airlines are major Boeing customers (25% of revenue), and ECB policy affects their financing conditions and capacity expansion decisions.",
      keyTopics: [
        "Deposit facility rate decision",
        "Inflation outlook for Eurozone",
        "APP/PEPP bond portfolio management",
        "Economic growth revisions",
        "Financial stability assessment",
      ],
      historicalContext:
        "ECB has been more dovish than the Fed, cutting rates in 2024-2025 to support weak Eurozone growth. Lower rates benefit European carriers like Lufthansa and Air France-KLM, who are significant Boeing customers.",
      potentialOutcomes: {
        optimistic:
          "ECB cuts rates by 25bp and signals more cuts in 2026. European airline financing costs drop, boosting aircraft orders. Boeing European order book strengthens. Stock up 4-6%.",
        baseline:
          "ECB holds rates steady, balanced outlook. Neutral for Boeing. Stock ±2%.",
        pessimistic:
          "ECB pauses cutting cycle due to inflation concerns or signals tightening. European airlines face higher costs, deferring orders. Boeing stock down 3-5%.",
      },
      watchPoints: [
        "Rate decision vs. market expectations",
        "Lagarde's forward guidance on 2026 rate path",
        "Staff economic projections update",
        "Any mentions of fragmentation risks (sovereign debt spreads)",
      ],
      relatedVariables: [
        "EUR/USD Exchange Rate",
        "European Airline Order Activity",
        "Eurozone GDP Growth",
        "European Aviation Credit Spreads",
      ],
    },
    {
      id: "us-china-trade-jan-2026",
      date: "January 8, 2026",
      title:
        "U.S.-China Trade Negotiations - Semiconductor & Aviation Sector",
      type: "Bilateral Trade Talks",
      location: "Geneva, Switzerland",
      participants: [
        "U.S. Trade Representative",
        "China Ministry of Commerce",
        "WTO Facilitators",
      ],
      impact: 82,
      trend: "up",
      description:
        "High-level trade negotiations focusing on technology export controls and market access for U.S. companies, including aerospace. Potential breakthrough or breakdown could reshape Boeing's China strategy.",
      keyTopics: [
        "Semiconductor export control framework",
        "Civilian vs. military-use technology distinctions",
        "Boeing 737 MAX certification in China (pending since 2019)",
        "Market access for U.S. aerospace firms",
        "Reciprocal tariff reductions",
      ],
      historicalContext:
        "Boeing has over 100 737 MAX aircraft awaiting delivery to Chinese customers, valued at $12B+. China has delayed MAX re-certification as leverage in broader trade disputes. Resolution would be major catalyst.",
      potentialOutcomes: {
        optimistic:
          "Breakthrough: China agrees to MAX certification timeline, U.S. eases some export controls on civilian aviation technology. Boeing gains clarity on $12B+ deliveries. Stock up 10-15%.",
        baseline:
          "Talks produce working groups and future meeting schedules but no immediate policy changes. Continued uncertainty. Stock ±3%.",
        pessimistic:
          "Talks collapse, leading to new tariffs or export restrictions. China signals preference for domestic COMAC aircraft. Boeing China market access deteriorates. Stock down 8-12%.",
      },
      watchPoints: [
        "Joint statement language on aviation sector",
        "Specific mention of 737 MAX or commercial aircraft",
        "Timeline commitments for follow-up meetings",
        "U.S. semiconductor industry reaction (CHIPS Act implications)",
      ],
      relatedVariables: [
        "China 737 MAX Delivery Backlog",
        "U.S.-China Trade Tension Index",
        "COMAC Competitive Threat Score",
        "Boeing China Revenue Projection",
      ],
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-6">
        <Calendar className="h-6 w-6 text-cyan-400" />
        <div>
          <h2 className="text-2xl text-cyan-400">
            Policy Events Timeline - Detailed Analysis
          </h2>
          <p className="text-sm text-gray-400">
            Major upcoming events that could reshape
            geopolitical variables
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-5 w-5 text-amber-400" />
          <h3 className="text-sm text-amber-400">
            Why Policy Events Matter
          </h3>
        </div>
        <p className="text-sm text-gray-300">
          Geopolitics evolves through discrete events. In 1970,
          no one imagined U.S.-China trade—until Kissinger's
          visit changed everything. Each event below represents
          a potential inflection point that could reshape the
          variables underlying our risk models. After major
          events, models must be recalibrated to reflect the new
          reality.
        </p>
      </div>

      {selectedEvent ? (
        // Detailed Event View
        <div className="space-y-6">
          <button
            onClick={() => setSelectedEvent(null)}
            className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
          >
            ← Back to Timeline
          </button>

          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl text-gray-100 mb-2">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {selectedEvent.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {selectedEvent.location}
                    </span>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-400">
                    {selectedEvent.type}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">
                  Impact Score
                </div>
                <div
                  className={`text-3xl ${
                    selectedEvent.impact > 75
                      ? "text-red-400"
                      : selectedEvent.impact > 60
                        ? "text-amber-400"
                        : "text-cyan-400"
                  }`}
                >
                  {selectedEvent.impact}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-6">
              {selectedEvent.description}
            </p>

            {/* Participants */}
            <div className="mb-6 rounded border border-gray-700 bg-[#0d1117] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-cyan-400" />
                <h4 className="text-sm text-cyan-400">
                  Key Participants
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.participants.map(
                  (participant, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-700 text-gray-300"
                    >
                      {participant}
                    </Badge>
                  ),
                )}
              </div>
            </div>

            {/* Key Topics */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-3">
                Key Topics for Discussion
              </h4>
              <ul className="space-y-2">
                {selectedEvent.keyTopics.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-sm text-gray-300"
                  >
                    <span className="text-cyan-400">•</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical Context */}
            <div className="mb-6 rounded-lg border border-gray-700 bg-[#0d1117] p-4">
              <h4 className="text-sm text-gray-400 mb-2">
                Historical Context
              </h4>
              <p className="text-sm text-gray-300">
                {selectedEvent.historicalContext}
              </p>
            </div>

            {/* Potential Outcomes */}
            <div className="mb-6">
              <h4 className="text-sm text-gray-400 mb-3">
                Scenario Analysis: Potential Outcomes
              </h4>
              <div className="grid gap-4">
                <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <h5 className="text-sm text-green-400">
                      Optimistic Scenario
                    </h5>
                  </div>
                  <p className="text-sm text-gray-300">
                    {selectedEvent.potentialOutcomes.optimistic}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-600/30 bg-gray-600/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">━</span>
                    <h5 className="text-sm text-gray-400">
                      Baseline Scenario
                    </h5>
                  </div>
                  <p className="text-sm text-gray-300">
                    {selectedEvent.potentialOutcomes.baseline}
                  </p>
                </div>

                <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <h5 className="text-sm text-red-400">
                      Pessimistic Scenario
                    </h5>
                  </div>
                  <p className="text-sm text-gray-300">
                    {
                      selectedEvent.potentialOutcomes
                        .pessimistic
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Watch Points */}
            <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h4 className="text-sm text-amber-400">
                  Critical Watch Points
                </h4>
              </div>
              <ul className="space-y-2">
                {selectedEvent.watchPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-sm text-gray-300"
                  >
                    <span className="text-amber-400">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Variables */}
            <div className="rounded border border-cyan-500/30 bg-cyan-500/5 p-4">
              <h4 className="text-sm text-cyan-400 mb-3">
                Related Model Variables to Update Post-Event
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.relatedVariables.map(
                  (variable, idx) => (
                    <Badge
                      key={idx}
                      className="bg-cyan-500/20 text-cyan-300"
                    >
                      {variable}
                    </Badge>
                  ),
                )}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                After this event, these variables should be
                reassessed and potentially recalibrated in your
                risk models.
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Timeline View
        <div className="space-y-4">
          {policyEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="w-full rounded-lg border border-gray-700 bg-[#161b22] p-4 text-left transition-all hover:border-cyan-500 hover:bg-[#1a1f2e]"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-100">
                      {event.title}
                    </span>
                    {event.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    )}
                    {event.trend === "down" && (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{event.date}</span>
                    <span>·</span>
                    <span>{event.location}</span>
                    <Badge
                      variant="secondary"
                      className="bg-gray-700 text-gray-400"
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-gray-500 mb-1">
                    Impact
                  </div>
                  <div
                    className={`text-xl ${
                      event.impact > 75
                        ? "text-red-400"
                        : event.impact > 60
                          ? "text-amber-400"
                          : "text-cyan-400"
                    }`}
                  >
                    {event.impact}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-3">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {event.keyTopics
                    .slice(0, 3)
                    .map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-500"
                      >
                        {topic}
                      </span>
                    ))}
                  {event.keyTopics.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{event.keyTopics.length - 3} more
                    </span>
                  )}
                </div>
                <span className="text-xs text-cyan-400">
                  Click for details →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}