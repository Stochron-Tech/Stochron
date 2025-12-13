import { useEffect, useMemo, useState } from "react";
import { TopBar } from "./components/TopBar";
import { ScenarioPanel } from "./components/ScenarioPanel";
import { ForecastingEngine } from "./components/modules/ForecastingEngine";
import { SentimentEngine } from "./components/modules/SentimentEngine";
import { GeopoliticalMap } from "./components/modules/GeopoliticalMap";
import { SupplyChainTracker } from "./components/modules/SupplyChainTracker";
import { PolicyTracker } from "./components/modules/PolicyTracker";
import { VolatilityMonitor } from "./components/modules/VolatilityMonitor";
import { MacroCorrelation } from "./components/modules/MacroCorrelation";
import { ScenarioSimulator } from "./components/modules/ScenarioSimulator";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import { ForecastingEngineDetailed } from "./components/detailed/ForecastingEngineDetailed";
import { SentimentEngineDetailed } from "./components/detailed/SentimentEngineDetailed";
import { PolicyTrackerDetailed } from "./components/detailed/PolicyTrackerDetailed";
import { ShockSimulatorDetailed } from "./components/detailed/ShockSimulatorDetailed";
import { MacroCorrelationDetailed } from "./components/detailed/MacroCorrelationDetailed";
import { VolatilityMonitorDetailed } from "./components/detailed/VolatilityMonitorDetailed";
import { SupplyChainTrackerDetailed } from "./components/detailed/SupplyChainTrackerDetailed";
import { GeopoliticalMapDetailed } from "./components/detailed/GeopoliticalMapDetailed";

import api, { API_BASE } from "./api";
import Login from "./components/Login";
import { useConfig } from "./hooks/useConfig";
import { defaultsFromCustomShocks, deriveCustomShockFromSelection, deriveImpact, isBaseline } from "./utils/scenario";
import type { ConfigResponse, ScenarioSelections } from "./types";

export type ScenarioType = "baseline" | "custom";
export type ExpandedModule =
  | "forecasting"
  | "sentiment"
  | "geopolitical"
  | "supplychain"
  | "policy"
  | "volatility"
  | "macro"
  | "simulator"
  | null;


export default function App() {
  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === "true";
  const { config, loading: configLoading, error: configError } = useConfig();
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(bypassAuth);

  // Bootstrap CSRF cookie
  useEffect(() => {
    fetch(`${API_BASE}/api/csrf/`, {
      method: "GET",
      credentials: "include",
    }).catch(console.error);
    if (!bypassAuth) {
      api
        .get("/api/me/")
        .then((resp) => {
          setIsLoggedIn(true);
          setUserId(resp.data.id);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }
  }, [bypassAuth]);

  const [selectedStockId, setSelectedStockId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2025-10-26",
  });
  const [selection, setSelection] = useState<ScenarioSelections>({
    geopolitical: [],
    custom: {},
    dateRange: { start: "2024-01-01", end: "2025-10-26" },
  });
  const [activeScenario, setActiveScenario] = useState<ScenarioType>("baseline");
  const [expandedModule, setExpandedModule] =
    useState<ExpandedModule>(null);

  // Initialize defaults when config arrives
  useEffect(() => {
    if (!config) return;
    if (config.stocks.length && selectedStockId === null) {
      setSelectedStockId(config.stocks[0].id);
    }
    const defaults = defaultsFromCustomShocks(config.custom_shocks);
    setSelection((prev) => ({
      ...prev,
      custom: { ...defaults, ...prev.custom },
    }));
  }, [config, selectedStockId]);

  // Derive custom shocks from geopolitical selections automatically
  useEffect(() => {
    if (!config) return;
    const derived = deriveCustomShockFromSelection(
      selection,
      config.geopolitical_shocks,
      config.custom_shocks,
    );
    setSelection((prev) => ({ ...prev, custom: derived }));
    setActiveScenario(isBaseline({ ...selection, custom: derived }, config) ? "baseline" : "custom");
  }, [selection.geopolitical, config]);

  const activeLabel = useMemo(() => {
    if (!config) return "Baseline";
    if (selection.geopolitical.length === 0) return "Baseline";
    const names = selection.geopolitical
      .map((id) => config.geopolitical_shocks.find((s) => s.id === id)?.name)
      .filter(Boolean);
    return names.join(", ");
  }, [selection.geopolitical, config]);

  const impact = useMemo(() => {
    if (!config) {
      return { forecast: 0, sentiment: 0, geopolitical: 25, supply_chain: 40, volatility: 15 };
    }
    return deriveImpact(selection, config.geopolitical_shocks, config.custom_shocks);
  }, [selection, config]);

  if (!isLoggedIn) {
    return <Login onLoggedIn={() => setIsLoggedIn(true)} />;
  }

  if (configLoading) {
    return <div className="p-8 text-gray-200">Loading configuration…</div>;
  }

  if (configError || !config) {
    return <div className="p-8 text-red-400">Failed to load configuration: {configError}</div>;
  }

  const selectedStock = config.stocks.find((s) => s.id === selectedStockId);
  const stockTicker = selectedStock?.ticker || "";

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-100">
      <TopBar
        stocks={config.stocks}
        selectedStockId={selectedStockId}
        setSelectedStockId={(id) => setSelectedStockId(id)}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="flex">
        {/* Left Sidebar - Scenario Panel */}
        <div className="w-80 border-r border-gray-800">
          <ScenarioPanel
            selection={{ ...selection, dateRange }}
            setSelection={(sel) => setSelection({ ...sel, dateRange })}
            geopoliticalShocks={config.geopolitical_shocks}
            customShockDefinitions={config.custom_shocks}
            activeLabel={activeLabel || "Baseline"}
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="flex-1 p-8 pr-8">
          {/* Report Header */}
          <div className="mb-6 border-b border-gray-700 pb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl text-gray-100">
                  AI-Driven Geopolitical & Macroeconomic Risk
                  Analysis
                </h1>
                <p className="mt-1 text-sm text-gray-400">
                  Real-time assessment of global events impact
                  on {stockTicker || "N/A"} | Generated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="rounded-lg border border-gray-700 bg-[#161b22] px-4 py-2">
                <div className="text-xs text-gray-400">
                  Active Scenario
                </div>
                <div className="mt-0.5 text-sm text-cyan-400">
                      {activeLabel || "Baseline"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Section 1: Forecasting & Sentiment Analysis */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                <h2 className="text-xs text-cyan-400/70 uppercase tracking-wider">
                  Section I: Predictive Analytics
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-cyan-500/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div
                  onClick={() =>
                    setExpandedModule("forecasting")
                  }
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <ForecastingEngine
                    stock={stockTicker}
                    scenario={activeScenario}
                    customShock={selection.custom}
                    impact={impact}
                  />
                </div>
                <div
                  onClick={() => setExpandedModule("sentiment")}
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <SentimentEngine
                    stock={stockTicker}
                    scenario={activeScenario}
                    impact={impact}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Geopolitical & Supply Chain Risk */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                <h2 className="text-xs text-amber-400/70 uppercase tracking-wider">
                  Section II: Geopolitical & Operational Risk
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-amber-500/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div
                  onClick={() =>
                    setExpandedModule("geopolitical")
                  }
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <GeopoliticalMap
                    stock={stockTicker}
                    scenario={activeScenario}
                    impact={impact}
                  />
                </div>
                <div
                  onClick={() =>
                    setExpandedModule("supplychain")
                  }
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <SupplyChainTracker
                    stock={stockTicker}
                    scenario={activeScenario}
                    customShock={selection.custom}
                    impact={impact}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Policy & Market Dynamics */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent"></div>
                <h2 className="text-xs text-green-400/70 uppercase tracking-wider">
                  Section III: Policy & Market Structure
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-green-500/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div
                  onClick={() => setExpandedModule("policy")}
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <PolicyTracker />
                </div>
                <div
                  onClick={() =>
                    setExpandedModule("volatility")
                  }
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <VolatilityMonitor
                    stock={stockTicker}
                    scenario={activeScenario}
                    impact={impact}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Macro Factors & Scenario Analysis */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                <h2 className="text-xs text-purple-400/70 uppercase tracking-wider">
                  Section IV: Macroeconomic Analysis &
                  Simulation
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div
                  onClick={() => setExpandedModule("macro")}
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <MacroCorrelation stock={stockTicker} />
                </div>
                <div
                  onClick={() => setExpandedModule("simulator")}
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <ScenarioSimulator
                    stock={stockTicker}
                    activeScenario={activeScenario}
                    customShock={selection.custom}
                    impact={impact}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Module Dialogs */}
      <Dialog
        open={expandedModule !== null}
        onOpenChange={() => setExpandedModule(null)}
      >
        <DialogContent className="w-screen max-w-screen h-screen max-h-screen overflow-y-auto bg-[#0d1117] border-0 text-gray-100 p-0 rounded-none">
          <DialogTitle className="sr-only">
            {expandedModule === "forecasting"
              ? "Forecasting Engine Detailed View"
              : expandedModule === "sentiment"
                ? "Sentiment Analysis Detailed View"
                : expandedModule === "policy"
                  ? "Policy Tracker Detailed View"
                  : expandedModule === "simulator"
                    ? "Scenario Simulator Detailed View"
                    : expandedModule === "macro"
                      ? "Macro Correlation Detailed View"
                      : expandedModule === "volatility"
                        ? "Volatility Monitor Detailed View"
                        : expandedModule === "supplychain"
                          ? "Supply Chain Tracker Detailed View"
                          : expandedModule === "geopolitical"
                            ? "Geopolitical Map Detailed View"
                            : "Module Detailed View"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {expandedModule === "forecasting"
              ? "Detailed time-series forecasting analysis using multiple methodologies from 2000-2026"
              : expandedModule === "sentiment"
                ? "Detailed sentiment analysis processing 2,847 trade documents from 2000-2023"
                : expandedModule === "policy"
                  ? "Detailed analysis of major upcoming policy events that could reshape geopolitical variables"
                  : expandedModule === "simulator"
                    ? "Interactive scenario simulation for analyzing geopolitical shock impacts"
                    : expandedModule === "macro"
                      ? "Detailed macroeconomic correlation analysis and indicators"
                      : expandedModule === "volatility"
                        ? "Detailed volatility monitoring and risk analysis"
                        : expandedModule === "supplychain"
                          ? "Detailed supply chain vulnerability tracking and analysis"
                          : expandedModule === "geopolitical"
                            ? "Comprehensive geopolitical exposure analysis across multiple dimensions"
                            : "Detailed analysis and interactive visualization for the selected module"}
          </DialogDescription>
          {expandedModule === "forecasting" && (
            <ForecastingEngineDetailed
              stock={stockTicker}
              scenario={activeScenario}
              customShock={selection.custom}
              impact={impact}
            />
          )}
          {expandedModule === "sentiment" && (
            <SentimentEngineDetailed
              stock={stockTicker}
              scenario={activeScenario}
              impact={impact}
            />
          )}
          {expandedModule === "policy" && (
            <PolicyTrackerDetailed />
          )}
          {expandedModule === "simulator" && (
            <ShockSimulatorDetailed
              stock={stockTicker}
              activeScenario={activeScenario}
              customShock={selection.custom}
              setCustomShock={(shock) => setSelection((prev) => ({ ...prev, custom: shock }))}
              impact={impact}
            />
          )}
          {expandedModule === "macro" && (
            <MacroCorrelationDetailed stock={stockTicker} />
          )}
          {expandedModule === "volatility" && (
            <VolatilityMonitorDetailed
              stock={stockTicker}
              scenario={activeScenario}
              impact={impact}
            />
          )}
          {expandedModule === "supplychain" && (
            <SupplyChainTrackerDetailed
              stock={stockTicker}
              scenario={activeScenario}
              customShock={selection.custom}
              impact={impact}
            />
          )}
          {expandedModule === "geopolitical" && (
            <GeopoliticalMapDetailed
              stock={stockTicker}
              scenario={activeScenario}
              impact={impact}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}