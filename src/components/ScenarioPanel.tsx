import { AlertTriangle, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import type {
  CustomShockDefinition,
  GeopoliticalShock,
  ScenarioSelections,
} from "../types";

interface ScenarioPanelProps {
  selection: ScenarioSelections;
  setSelection: (sel: ScenarioSelections) => void;
  geopoliticalShocks: GeopoliticalShock[];
  customShockDefinitions: CustomShockDefinition[];
  maxSelections?: number;
  activeLabel: string;
}

export function ScenarioPanel({
  selection,
  setSelection,
  geopoliticalShocks,
  customShockDefinitions,
  maxSelections = 10,
  activeLabel,
}: ScenarioPanelProps) {
  const [limitWarning, setLimitWarning] = useState<string | null>(null);

  const selectedSet = useMemo(
    () => new Set(selection.geopolitical),
    [selection.geopolitical],
  );

  const toggleShock = (id: number) => {
    const next = new Set(selectedSet);
    if (selectedSet.has(id)) {
      next.delete(id);
    } else {
      if (selectedSet.size >= maxSelections) {
        setLimitWarning(`Only ${maxSelections} shocks can be active at once.`);
        return;
      }
      next.add(id);
    }
    setLimitWarning(null);
    setSelection({ ...selection, geopolitical: Array.from(next) });
  };

  const updateCustom = (code: string, value: number) => {
    setSelection({
      ...selection,
      custom: { ...selection.custom, [code]: value },
    });
  };

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-auto bg-[#0d1117] p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-400" />
          <h2 className="text-amber-400">Shock Scenario Panel</h2>
        </div>
        <p className="text-xs text-gray-400">
          Select one or more geopolitical shocks and tune custom sliders.
        </p>
      </div>

      <div className="space-y-3">
        {geopoliticalShocks.map((shock) => {
          const isSelected = selectedSet.has(shock.id);
          return (
            <div
              key={shock.id}
              className={`flex items-start gap-3 rounded-lg border p-3 transition-all ${
                isSelected
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-gray-700 bg-[#161b22] hover:border-gray-600"
              }`}
            >
              <Checkbox
                id={`shock-${shock.id}`}
                checked={isSelected}
                onCheckedChange={() => toggleShock(shock.id)}
              />
              <label
                htmlFor={`shock-${shock.id}`}
                className="flex-1 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-100">{shock.name}</span>
                  <Badge variant="secondary" className="bg-amber-500/15 text-amber-400">
                    {shock.code}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {shock.description || "No description provided"}
                </p>
              </label>
            </div>
          );
        })}
      </div>
      {limitWarning && (
        <p className="mt-2 text-xs text-red-400" aria-live="polite">
          {limitWarning}
        </p>
      )}

      {/* Custom Shock Builder */}
      <div className="mt-6 rounded-lg border border-gray-700 bg-[#161b22] p-4">
        <div className="mb-4 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">Custom Shock Builder</h3>
        </div>

        <div className="space-y-4">
          {customShockDefinitions.map((shock) => {
            const current = selection.custom[shock.code] ?? shock.default_intensity;
            return (
              <div key={shock.code}>
                <div className="mb-2 flex justify-between">
                  <label className="text-xs text-gray-400">
                    {shock.label}
                  </label>
                  <span className="text-xs text-cyan-400">
                    {current >= 0 ? "+" : ""}
                    {current}%
                  </span>
                </div>
                <Slider
                  value={[current]}
                  onValueChange={([value]) => updateCustom(shock.code, value)}
                  min={shock.min_value}
                  max={shock.max_value}
                  step={shock.step}
                  className="[&_[role=slider]]:bg-cyan-500"
                />
                {shock.description && (
                  <p className="mt-1 text-[11px] text-gray-500">
                    {shock.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Button className="mt-4 w-full bg-cyan-500 text-gray-900 hover:bg-cyan-400">
          Custom shocks auto-apply across modules
        </Button>
      </div>

      {/* Active Scenario Summary */}
      <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <p className="text-xs text-amber-400">Active scenario</p>
        <p className="text-sm text-gray-100">{activeLabel}</p>
        <p className="mt-1 text-[11px] text-gray-500">
          Up to {maxSelections} geopolitical shocks can be combined. Values update instantly.
        </p>
      </div>
    </div>
  );
}