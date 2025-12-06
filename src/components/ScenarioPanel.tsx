import { AlertTriangle, Radio, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import type { ScenarioType } from "../App";

interface ScenarioPanelProps {
  activeScenario: ScenarioType;
  setActiveScenario: (scenario: ScenarioType) => void;
  customShock: {
    freight: number;
    sentiment: number;
    sanctions: number;
  };
  setCustomShock: (shock: {
    freight: number;
    sentiment: number;
    sanctions: number;
  }) => void;
}

export function ScenarioPanel({
  activeScenario,
  setActiveScenario,
  customShock,
  setCustomShock,
}: ScenarioPanelProps) {
  const scenarios = [
    {
      id: "baseline" as const,
      name: "Baseline",
      description: "Normal market conditions",
      impact: "neutral",
    },
    {
      id: "russia-ukraine" as const,
      name: "Russia-Ukraine War",
      description: "Titanium shortage + fuel spike",
      impact: "severe",
    },
    {
      id: "us-china" as const,
      name: "US-China Tensions",
      description: "Export controls + lost orders",
      impact: "high",
    },
    {
      id: "red-sea" as const,
      name: "Red Sea Crisis",
      description: "Freight surge + delays",
      impact: "moderate",
    },
  ];

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto bg-[#0d1117] p-6">
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          <h2 className="text-amber-400">
            Shock Scenario Panel
          </h2>
        </div>
        <p className="text-xs text-gray-400">
          Select a geopolitical shock to analyze impact across
          all modules
        </p>
      </div>

      {/* Predefined Scenarios */}
      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveScenario(scenario.id)}
            className={`w-full rounded-lg border p-4 text-left transition-all ${
              activeScenario === scenario.id
                ? "border-amber-500 bg-amber-500/10"
                : "border-gray-700 bg-[#161b22] hover:border-gray-600"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-100">
                {scenario.name}
              </span>
              {activeScenario === scenario.id && (
                <Radio className="h-4 w-4 text-amber-400" />
              )}
            </div>
            <p className="mb-2 text-xs text-gray-400">
              {scenario.description}
            </p>
            <Badge
              variant={
                scenario.impact === "severe"
                  ? "destructive"
                  : "secondary"
              }
              className={
                scenario.impact === "severe"
                  ? "bg-red-500/20 text-red-400"
                  : scenario.impact === "high"
                    ? "bg-orange-500/20 text-orange-400"
                    : scenario.impact === "moderate"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-gray-500/20 text-gray-400"
              }
            >
              {scenario.impact}
            </Badge>
          </button>
        ))}
      </div>

      {/* Custom Shock Builder */}
      <div className="mt-6 rounded-lg border border-gray-700 bg-[#161b22] p-4">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Custom Shock Builder
          </h3>
        </div>

        <div className="space-y-4">
          {/* Freight Cost Impact */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-xs text-gray-400">
                Freight Cost Change
              </label>
              <span className="text-xs text-cyan-400">
                {customShock.freight > 0 ? "+" : ""}
                {customShock.freight}%
              </span>
            </div>
            <Slider
              value={[customShock.freight]}
              onValueChange={([value]) =>
                setCustomShock({
                  ...customShock,
                  freight: value,
                })
              }
              min={-50}
              max={100}
              step={5}
              className="[&_[role=slider]]:bg-cyan-500"
            />
          </div>

          {/* Sentiment Impact */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-xs text-gray-400">
                Sentiment Shift
              </label>
              <span className="text-xs text-cyan-400">
                {customShock.sentiment > 0 ? "+" : ""}
                {customShock.sentiment}%
              </span>
            </div>
            <Slider
              value={[customShock.sentiment]}
              onValueChange={([value]) =>
                setCustomShock({
                  ...customShock,
                  sentiment: value,
                })
              }
              min={-100}
              max={100}
              step={10}
              className="[&_[role=slider]]:bg-cyan-500"
            />
          </div>

          {/* Sanctions Impact */}
          <div>
            <div className="mb-2 flex justify-between">
              <label className="text-xs text-gray-400">
                Sanctions Severity
              </label>
              <span className="text-xs text-cyan-400">
                {customShock.sanctions}%
              </span>
            </div>
            <Slider
              value={[customShock.sanctions]}
              onValueChange={([value]) =>
                setCustomShock({
                  ...customShock,
                  sanctions: value,
                })
              }
              min={0}
              max={100}
              step={10}
              className="[&_[role=slider]]:bg-cyan-500"
            />
          </div>
        </div>

        <Button
          onClick={() => setActiveScenario("custom")}
          className="mt-4 w-full bg-cyan-500 text-gray-900 hover:bg-cyan-400"
        >
          Apply Custom Shock
        </Button>
      </div>

      {/* Active Scenario Summary */}
      {activeScenario !== "baseline" && (
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs text-amber-400">
            Active Scenario:{" "}
            <span className="font-medium">
              {activeScenario === "custom"
                ? "Custom Shock"
                : scenarios.find((s) => s.id === activeScenario)
                    ?.name}
            </span>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            All modules are now reflecting this shock scenario
          </p>
        </div>
      )}
    </div>
  );
}