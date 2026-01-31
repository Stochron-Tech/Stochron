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
    <div className="h-[calc(100vh-73px)] overflow-y-auto bg-gradient-to-b from-slate-50 to-blue-50 p-6 border-r border-slate-200">
      <div className="mb-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100">
            <Zap className="h-5 w-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Shock Scenario Panel
          </h2>
        </div>
        <p className="text-sm text-slate-600">
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
            className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 transform hover:scale-105 ${
              activeScenario === scenario.id
                ? "border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 shadow-md"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
            }`}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-900">
                {scenario.name}
              </span>
              {activeScenario === scenario.id && (
                <Radio className="h-5 w-5 text-amber-500" />
              )}
            </div>
            <p className="mb-3 text-sm text-slate-600">
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
                  ? "bg-red-100 text-red-700 font-semibold"
                  : scenario.impact === "high"
                    ? "bg-orange-100 text-orange-700 font-semibold"
                    : scenario.impact === "moderate"
                      ? "bg-amber-100 text-amber-700 font-semibold"
                      : "bg-slate-100 text-slate-700 font-semibold"
              }
            >
              {scenario.impact}
            </Badge>
          </button>
        ))}
      </div>

      {/* Custom Shock Builder */}
      <div className="mt-6 rounded-xl border-2 border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-500" />
          <h3 className="font-semibold text-slate-900">
            Custom Shock Builder
          </h3>
        </div>

        <div className="space-y-4">
          {/* Freight Cost Impact */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 p-3">
            <div className="mb-3 flex justify-between">
              <label className="font-medium text-slate-700">
                Freight Cost Change
              </label>
              <span className="font-bold text-sky-600">
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
              className="[&_[role=slider]]:bg-sky-500"
            />
          </div>

          {/* Sentiment Impact */}
          <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-3">
            <div className="mb-3 flex justify-between">
              <label className="font-medium text-slate-700">
                Sentiment Shift
              </label>
              <span className="font-bold text-purple-600">
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
              className="[&_[role=slider]]:bg-purple-500"
            />
          </div>

          {/* Sanctions Impact */}
          <div className="rounded-lg bg-gradient-to-r from-rose-50 to-orange-50 p-3">
            <div className="mb-3 flex justify-between">
              <label className="font-medium text-slate-700">
                Sanctions Severity
              </label>
              <span className="font-bold text-rose-600">
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
              className="[&_[role=slider]]:bg-rose-500"
            />
          </div>
        </div>

        <Button
          onClick={() => setActiveScenario("custom")}
          className="mt-5 w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:scale-105 transform transition-all"
        >
          Apply Custom Shock
        </Button>
      </div>

      {/* Active Scenario Summary */}
      {activeScenario !== "baseline" && (
        <div className="mt-6 rounded-xl border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm">
          <p className="text-sm text-amber-900">
            <span className="font-bold">Active Scenario: </span>
            {activeScenario === "custom"
              ? "Custom Shock"
              : scenarios.find((s) => s.id === activeScenario)
                  ?.name}
          </p>
          <p className="mt-1 text-sm text-amber-700">
            All modules are now reflecting this shock scenario
          </p>
        </div>
      )}
    </div>
  );
}
