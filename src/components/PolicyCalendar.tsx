import { useState } from "react";
import { Calendar, AlertCircle, TrendingDown, TrendingUp, ChevronRight, ExternalLink, FileText, Users, Target, Clock, Building2, Plane } from "lucide-react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface PolicyEvent {
  date: string;
  event: string;
  type: string;
  impact: number;
  trend: string;
  description: string;
  keyStakeholders: string[];
  potentialOutcomes: {
    scenario: string;
    probability: number;
    impact: string;
  }[];
  boeingImplications: string[];
  actionItems: string[];
  relatedPolicies: string[];
  timeline: {
    phase: string;
    date: string;
    description: string;
  }[];
}

export function PolicyCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<PolicyEvent | null>(null);

  const upcomingEvents: PolicyEvent[] = [
    {
      date: "Nov 7, 2025",
      event: "Fed Interest Rate Decision",
      type: "Central Bank",
      impact: 85,
      trend: "down",
      description: "The Federal Reserve's Federal Open Market Committee (FOMC) will announce its decision on the federal funds rate. Current market expectations suggest a potential 25bps cut, though hawkish commentary could pressure aerospace financing costs and delay aircraft purchases.",
      keyStakeholders: ["Federal Reserve", "Treasury Department", "Commercial Banks", "Aircraft Lessors"],
      potentialOutcomes: [
        { scenario: "Rate Cut (25bps)", probability: 45, impact: "Positive - Lower financing costs for airlines" },
        { scenario: "Rate Hold", probability: 40, impact: "Neutral - Maintain current borrowing environment" },
        { scenario: "Rate Hike", probability: 15, impact: "Negative - Increased aircraft financing costs" },
      ],
      boeingImplications: [
        "25bps cut could accelerate $1.8B in deferred aircraft orders",
        "Hawkish hold may delay 15-20 widebody deliveries in Q1 2026",
        "Rate decision affects customer financing availability for 737 MAX orders",
        "Defense contracts less sensitive, but commercial backlog at risk"
      ],
      actionItems: [
        "Monitor FOMC statement for inflation trajectory language",
        "Prepare alternative financing packages for key airline customers",
        "Assess impact on Boeing Capital Corporation lending rates",
        "Review hedging strategy for interest rate exposure ($12B debt)"
      ],
      relatedPolicies: ["Inflation Reduction Act", "Export-Import Bank Reauthorization"],
      timeline: [
        { phase: "Pre-meeting", date: "Nov 1-6", description: "Fed blackout period - no official commentary" },
        { phase: "Decision", date: "Nov 7, 2:00 PM ET", description: "FOMC rate decision announcement" },
        { phase: "Press Conference", date: "Nov 7, 2:30 PM ET", description: "Fed Chair Powell Q&A" },
        { phase: "Market Reaction", date: "Nov 7-8", description: "Equity and credit market repricing" },
      ]
    },
    {
      date: "Nov 15, 2025",
      event: "G20 Summit - Trade Policy",
      type: "Trade Summit",
      impact: 72,
      trend: "neutral",
      description: "G20 leaders convene in Rio de Janeiro to discuss global trade frameworks, with focus on US-China relations, supply chain resilience, and industrial subsidies. Aviation trade disputes and Airbus-Boeing subsidy cases likely on agenda.",
      keyStakeholders: ["G20 Leaders", "WTO", "US Trade Representative", "EU Commission", "China MOFCOM"],
      potentialOutcomes: [
        { scenario: "Trade De-escalation", probability: 30, impact: "Highly Positive - Reduced tariff risk" },
        { scenario: "Status Quo", probability: 50, impact: "Neutral - No major changes" },
        { scenario: "New Restrictions", probability: 20, impact: "Negative - Additional trade barriers" },
      ],
      boeingImplications: [
        "US-EU subsidy dispute resolution could end $11.5B tariff exposure",
        "China market access critical - 20% of commercial backlog at risk",
        "Potential new export restrictions on advanced aerospace tech",
        "Supply chain diversification mandates may increase costs 8-12%"
      ],
      actionItems: [
        "Engage with USTR on Boeing-specific trade concerns",
        "Assess China market scenarios - prepare contingency plans",
        "Monitor subsidy case developments with EU counterparts",
        "Review supplier footprint for trade restriction vulnerability"
      ],
      relatedPolicies: ["WTO Aircraft Subsidies Case", "CHIPS Act", "EU Industrial Strategy"],
      timeline: [
        { phase: "Ministerial Prep", date: "Nov 10-14", description: "Trade ministers negotiate communiqué draft" },
        { phase: "Leaders Summit", date: "Nov 15-16", description: "G20 heads of state meetings" },
        { phase: "Joint Statement", date: "Nov 16", description: "Trade policy commitments announced" },
        { phase: "Implementation", date: "Dec-Feb", description: "Bilateral follow-up negotiations" },
      ]
    },
    {
      date: "Nov 22, 2025",
      event: "EU Sanctions Review",
      type: "Sanctions",
      impact: 68,
      trend: "down",
      description: "European Union conducts semi-annual review of Russia sanctions, including aerospace-specific restrictions on titanium, aluminum, and technology transfers. Potential expansion to include secondary sanctions on non-EU suppliers.",
      keyStakeholders: ["EU Commission", "EU Council", "Member States", "OFAC", "Aerospace Industry Associations"],
      potentialOutcomes: [
        { scenario: "Sanctions Eased", probability: 10, impact: "Positive - Titanium supply restored" },
        { scenario: "Status Quo", probability: 60, impact: "Negative - Continued supply constraints" },
        { scenario: "Sanctions Expanded", probability: 30, impact: "Highly Negative - Additional material restrictions" },
      ],
      boeingImplications: [
        "Russia titanium ban eliminates 35% of global supply source",
        "Current alternatives (US, Japan, Kazakhstan) cost +18% premium",
        "Secondary sanctions risk for Kazakhstan suppliers ($450M annual)",
        "6-month strategic stockpile needed - $45M working capital"
      ],
      actionItems: [
        "Accelerate Timet (US) and Osaka Titanium (Japan) qualification",
        "Build 6-month titanium strategic reserve before Dec 31",
        "Lobby EU for aerospace-specific exemptions via ASD",
        "Assess Kazakhstan supplier secondary sanctions exposure"
      ],
      relatedPolicies: ["Russia Sanctions Regime", "Critical Materials Act", "Defense Production Act"],
      timeline: [
        { phase: "Review Process", date: "Nov 15-22", description: "Member state consultations on sanctions" },
        { phase: "Decision", date: "Nov 22", description: "EU Council formal vote" },
        { phase: "Implementation", date: "Nov 30", description: "Updated sanctions list published" },
        { phase: "Compliance", date: "Dec 15", description: "Industry compliance deadline" },
      ]
    },
    {
      date: "Dec 1, 2025",
      event: "China PMI Release",
      type: "Economic Data",
      impact: 55,
      trend: "up",
      description: "China's National Bureau of Statistics releases November Purchasing Managers' Index (PMI), a key indicator of manufacturing health. Aviation manufacturing component critical for Boeing supply chain and China market demand assessment.",
      keyStakeholders: ["China NBS", "PBOC", "China Aviation Suppliers", "Boeing China"],
      potentialOutcomes: [
        { scenario: "PMI > 52 (Expansion)", probability: 25, impact: "Positive - Strong demand outlook" },
        { scenario: "PMI 50-52 (Moderate)", probability: 50, impact: "Neutral - Stable conditions" },
        { scenario: "PMI < 50 (Contraction)", probability: 25, impact: "Negative - Weakening demand" },
      ],
      boeingImplications: [
        "China represents 18% of Boeing commercial aircraft backlog ($28B)",
        "PMI contraction signals airline delivery deferrals likely",
        "Supply chain disruption if Chinese component suppliers slow",
        "Competitive pressure from COMAC if domestic market prioritized"
      ],
      actionItems: [
        "Review China delivery schedule for Q1-Q2 2026 exposure",
        "Assess Chinese supplier production capacity and inventory",
        "Monitor Air China, China Southern, China Eastern capex signals",
        "Prepare demand scenario analysis for board presentation"
      ],
      relatedPolicies: ["China Civil Aviation Development Plan", "Made in China 2025"],
      timeline: [
        { phase: "Data Collection", date: "Nov 1-30", description: "NBS surveys 3,000+ manufacturers" },
        { phase: "Release", date: "Dec 1, 9:00 AM Beijing", description: "Official PMI announcement" },
        { phase: "Analysis", date: "Dec 1-2", description: "Economist commentary and revisions" },
        { phase: "Market Impact", date: "Dec 1-5", description: "Equity/commodity market reaction" },
      ]
    },
    {
      date: "Dec 12, 2025",
      event: "ECB Policy Meeting",
      type: "Central Bank",
      impact: 61,
      trend: "down",
      description: "European Central Bank announces monetary policy decision amid ongoing economic uncertainty. Rate changes affect European airline profitability and aircraft financing, particularly for Airbus competition and Boeing's European customer base.",
      keyStakeholders: ["ECB Governing Council", "Eurozone Finance Ministers", "European Airlines", "Lessors"],
      potentialOutcomes: [
        { scenario: "Rate Cut (25-50bps)", probability: 55, impact: "Positive - Easier airline financing" },
        { scenario: "Rate Hold", probability: 35, impact: "Neutral - Stable environment" },
        { scenario: "Rate Hike", probability: 10, impact: "Negative - Airline cost pressure" },
      ],
      boeingImplications: [
        "European airlines represent 28% of Boeing backlog ($43B)",
        "Rate cuts improve Lufthansa, IAG, Air France-KLM capex budgets",
        "Competitive dynamic with Airbus if European customers favored",
        "Lessors (GECAS, AerCap) financing costs affect 737 MAX demand"
      ],
      actionItems: [
        "Coordinate with Boeing Europe on customer financing needs",
        "Monitor Lufthansa Group widebody replacement decision (50 aircraft)",
        "Assess leasing company rate sensitivity for MAX orders",
        "Review euro-denominated debt hedging strategy"
      ],
      relatedPolicies: ["EU Banking Union", "Eurozone Fiscal Rules", "Green Aviation Initiative"],
      timeline: [
        { phase: "Pre-meeting", date: "Dec 1-11", description: "ECB staff economic projections" },
        { phase: "Decision", date: "Dec 12, 1:45 PM CET", description: "Policy rate announcement" },
        { phase: "Press Conference", date: "Dec 12, 2:30 PM CET", description: "President Lagarde briefing" },
        { phase: "Implementation", date: "Dec 18", description: "New rates take effect" },
      ]
    },
    {
      date: "Dec 18, 2025",
      event: "FAA Safety Review (Boeing)",
      type: "Regulatory",
      impact: 78,
      trend: "neutral",
      description: "FAA completes comprehensive safety review of Boeing's quality control systems following recent manufacturing issues. Outcome determines production rate increases for 737 MAX and 787, with potential fines or production limits.",
      keyStakeholders: ["FAA", "Boeing Commercial", "NTSB", "Airlines", "Congress"],
      potentialOutcomes: [
        { scenario: "Clean Report", probability: 20, impact: "Highly Positive - Production ramp approved" },
        { scenario: "Conditional Approval", probability: 50, impact: "Neutral - Gradual increase allowed" },
        { scenario: "Restrictions Imposed", probability: 30, impact: "Highly Negative - Production caps extended" },
      ],
      boeingImplications: [
        "MAX production capped at 38/month pending review - target 57/month",
        "Each month of delay costs $180M in lost revenue",
        "Potential fines up to $500M for quality system failures",
        "Stock price sensitive - expect 8-12% move on announcement",
        "Delivery schedule for 400+ aircraft backlog at risk"
      ],
      actionItems: [
        "CRITICAL: Ensure all corrective actions documented for FAA",
        "Prepare investor communications for all three scenarios",
        "Review supply chain capacity to support production ramp",
        "Coordinate with airlines on revised delivery schedules",
        "Engage legal counsel on potential fine mitigation"
      ],
      relatedPolicies: ["Aircraft Certification Reform Act", "FAA Reauthorization"],
      timeline: [
        { phase: "Inspection", date: "Sep-Nov 2025", description: "FAA on-site audits at Boeing facilities" },
        { phase: "Draft Findings", date: "Dec 1-10", description: "FAA compiles review report" },
        { phase: "Boeing Response", date: "Dec 11-17", description: "Boeing submits corrective action plan" },
        { phase: "Final Decision", date: "Dec 18", description: "FAA public announcement" },
        { phase: "Implementation", date: "Jan 2026", description: "New production rates take effect" },
      ]
    },
    {
      date: "Jan 8, 2026",
      event: "US-China Trade Talks",
      type: "Trade Summit",
      impact: 82,
      trend: "up",
      description: "High-level bilateral trade negotiations between US and China focus on technology export controls, tariffs, and market access. Critical for Boeing's China operations, which face increasing restrictions on advanced aerospace technology transfers.",
      keyStakeholders: ["USTR", "China MOFCOM", "Commerce Dept", "Boeing China", "US-China Business Council"],
      potentialOutcomes: [
        { scenario: "Breakthrough Agreement", probability: 15, impact: "Highly Positive - Market access restored" },
        { scenario: "Incremental Progress", probability: 40, impact: "Positive - Some restrictions eased" },
        { scenario: "Talks Stall", probability: 30, impact: "Negative - Status quo continues" },
        { scenario: "Escalation", probability: 15, impact: "Highly Negative - New restrictions" },
      ],
      boeingImplications: [
        "China market: $2.8B annual revenue, 15% of backlog at risk",
        "Export controls threaten 787 sales (advanced composites, avionics)",
        "COMAC competitive threat if Boeing market access restricted",
        "Joint venture (Boeing China) could face ownership restrictions",
        "Rare earth materials for aerospace ($340M annual) at risk"
      ],
      actionItems: [
        "URGENT: Submit Boeing-specific concerns to USTR by Dec 20",
        "Develop 'China-compliant' aircraft variants without restricted tech",
        "Assess India/Southeast Asia as alternative Asia-Pacific growth markets",
        "Review supply chain for China-sourced critical components",
        "Prepare investor disclosure on China revenue concentration risk"
      ],
      relatedPolicies: ["Export Control Reform Act", "CHIPS Act", "Foreign Investment Risk Review"],
      timeline: [
        { phase: "Prep Talks", date: "Dec 15-Jan 5", description: "Working-level negotiations on framework" },
        { phase: "Minister Meeting", date: "Jan 8-9", description: "USTR-MOFCOM high-level dialogue" },
        { phase: "Joint Statement", date: "Jan 9", description: "Outcome announcement (if successful)" },
        { phase: "Implementation", date: "Feb-Apr", description: "Policy changes take effect" },
        { phase: "Review", date: "Jul 2026", description: "6-month progress assessment" },
      ]
    },
  ];

  const top5Risks = [
    "Fed hawkish stance may pressure aerospace sector financing costs ($1.8B orders at risk)",
    "EU sanctions could disrupt titanium supply chain (35% of supply, +18% cost premium)",
    "FAA review outcome critical for Boeing production ramp (38→57/month, $180M/month revenue)",
    "China slowdown affecting commercial aircraft demand (18% of backlog, $28B exposure)",
    "Rising freight costs from Red Sea instability (+400% insurance, 15-20 day delays)",
  ];

  return (
    <>
      <div className="h-[calc(100vh-73px)] overflow-y-auto bg-[#0d1117] p-6">
        {/* Enhanced Header with Description */}
        <div className="mb-6 pb-6 border-b border-gray-700">
          <div className="mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-cyan-400" />
            <h2 className="text-cyan-400">Policy Calendar & Risk Alerts</h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-300">
              Real-time tracking of critical policy decisions, regulatory actions, and macroeconomic events that could materially impact {" "}
              <span className="text-cyan-400">Boeing (BA)</span> operations, supply chain, and market valuation.
            </p>
            <p className="text-xs text-gray-400">
              This module monitors <span className="text-cyan-400">60+ global policy calendars</span> including central banks, trade summits, 
              regulatory agencies, and economic releases. Each event is scored for Boeing-specific impact and includes actionable intelligence 
              for risk mitigation.{" "}
              <span className="text-amber-400">Click any event for detailed analysis.</span>
            </p>
          </div>
        </div>

        {/* 60-Day Risk Window */}
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-xs text-amber-400">Next 60-Day Risk Window</span>
          </div>
          <div className="text-2xl text-amber-400">High</div>
          <p className="mt-1 text-xs text-gray-400">
            7 critical events · Average impact score: 71.6 · <span className="text-amber-400">2 high-priority actions required</span>
          </p>
          <div className="mt-3 pt-3 border-t border-amber-500/20">
            <div className="text-xs text-gray-300">
              <span className="text-amber-400">Priority Events:</span> FAA Safety Review (Dec 18) and US-China Trade Talks (Jan 8) 
              represent combined $3.2B revenue exposure.
            </div>
          </div>
        </div>

        {/* Upcoming Events Timeline */}
        <div className="mb-6">
          <h3 className="mb-3 text-xs text-gray-400">Upcoming Events (Click for Details)</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEvent(event)}
                className="w-full rounded-lg border border-gray-700 bg-[#161b22] p-3 transition-all hover:border-cyan-500/50 hover:bg-[#1c2128] text-left group"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs text-gray-300 group-hover:text-cyan-400 transition-colors">{event.event}</span>
                      {event.trend === "down" && (
                        <TrendingDown className="h-3 w-3 text-red-400" />
                      )}
                      {event.trend === "up" && (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      )}
                      <ChevronRight className="h-3 w-3 text-gray-600 group-hover:text-cyan-400 transition-colors ml-auto" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{event.date}</span>
                      <Badge
                        variant="secondary"
                        className="bg-gray-700/50 text-xs text-gray-400"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-700">
                    <div
                      className={`h-full transition-all ${
                        event.impact > 75
                          ? "bg-red-500"
                          : event.impact > 60
                          ? "bg-amber-500"
                          : "bg-cyan-500"
                      }`}
                      style={{ width: `${event.impact}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">Impact: {event.impact}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Top 5 Policy Risks */}
        <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
          <h3 className="mb-3 text-xs text-gray-400">Top 5 Upcoming Policy Risks</h3>
          <div className="space-y-2">
            {top5Risks.map((risk, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-xs text-cyan-400">{idx + 1}.</span>
                <p className="text-xs text-gray-300">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Event Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0d1117] border-gray-700">
          <DialogTitle className="sr-only">
            {selectedEvent?.event} - Detailed Analysis
          </DialogTitle>
          <DialogDescription className="sr-only">
            Comprehensive analysis of {selectedEvent?.event} including stakeholders, outcomes, Boeing implications, and action items
          </DialogDescription>
          
          {selectedEvent && (
            <div className="space-y-6 p-6">
              {/* Header */}
              <div className="border-b border-gray-700 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl text-cyan-400">{selectedEvent.event}</h2>
                      {selectedEvent.trend === "down" && (
                        <TrendingDown className="h-5 w-5 text-red-400" />
                      )}
                      {selectedEvent.trend === "up" && (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {selectedEvent.type}
                      </Badge>
                      <span className="text-sm text-gray-400">{selectedEvent.date}</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-700 bg-[#161b22] px-4 py-3 text-center">
                    <div className="text-xs text-gray-400">Impact Score</div>
                    <div className={`text-3xl mt-1 ${
                      selectedEvent.impact > 75 ? "text-red-400" :
                      selectedEvent.impact > 60 ? "text-amber-400" :
                      "text-cyan-400"
                    }`}>
                      {selectedEvent.impact}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Key Stakeholders */}
              <div className="rounded-lg border border-gray-700 bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm text-cyan-400">Key Stakeholders</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.keyStakeholders.map((stakeholder, idx) => (
                    <Badge key={idx} variant="outline" className="border-gray-600 text-gray-300">
                      {stakeholder}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Potential Outcomes */}
              <div className="rounded-lg border border-gray-700 bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm text-cyan-400">Potential Outcomes & Probabilities</h3>
                </div>
                <div className="space-y-3">
                  {selectedEvent.potentialOutcomes.map((outcome, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm text-gray-100">{outcome.scenario}</span>
                        <span className="text-sm text-cyan-400">{outcome.probability}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-700 mb-2 overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: `${outcome.probability}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400">{outcome.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boeing-Specific Implications */}
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Plane className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm text-amber-400">Boeing-Specific Implications</h3>
                </div>
                <ul className="space-y-2">
                  {selectedEvent.boeingImplications.map((implication, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <ChevronRight className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{implication}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Action Items */}
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm text-cyan-400">Recommended Action Items</h3>
                </div>
                <ul className="space-y-2">
                  {selectedEvent.actionItems.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <ChevronRight className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="rounded-lg border border-gray-700 bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm text-cyan-400">Event Timeline</h3>
                </div>
                <div className="space-y-4">
                  {selectedEvent.timeline.map((phase, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 border-2 border-cyan-400" />
                        {idx < selectedEvent.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-700 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-100">{phase.phase}</span>
                          <span className="text-xs text-gray-500">{phase.date}</span>
                        </div>
                        <p className="text-xs text-gray-400">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Policies */}
              <div className="rounded-lg border border-gray-700 bg-[#161b22] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm text-cyan-400">Related Policies & Regulations</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.relatedPolicies.map((policy, idx) => (
                    <Badge key={idx} variant="outline" className="border-cyan-500/30 text-cyan-400">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      {policy}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
