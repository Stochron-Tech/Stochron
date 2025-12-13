import type {
  ConfigResponse,
  CustomShockDefinition,
  GeopoliticalShock,
  ScenarioSelections,
} from "../types";

export type ScenarioImpact = {
  forecast: number;
  sentiment: number;
  geopolitical: number;
  supply_chain: number;
  volatility: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export function defaultsFromCustomShocks(
  customShocks: CustomShockDefinition[],
): Record<string, number> {
  return customShocks.reduce<Record<string, number>>((acc, shock) => {
    acc[shock.code] = shock.default_intensity ?? 0;
    return acc;
  }, {});
}

export function deriveCustomShockFromSelection(
  selection: ScenarioSelections,
  shocks: GeopoliticalShock[],
  customDefs: CustomShockDefinition[],
): Record<string, number> {
  const base = defaultsFromCustomShocks(customDefs);
  const defMap = customDefs.reduce<Record<string, CustomShockDefinition>>(
    (acc, def) => {
      acc[def.code] = def;
      return acc;
    },
    {},
  );

  const shockMap = shocks.reduce<Record<number, GeopoliticalShock>>((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {});

  for (const id of selection.geopolitical) {
    const shock = shockMap[id];
    if (!shock) continue;
    const profile = shock.impact_profile || {};
    if (defMap.freight) {
      base.freight = clamp(
        (base.freight ?? 0) + (profile.supply_chain ?? 0),
        defMap.freight.min_value,
        defMap.freight.max_value,
      );
    }
    if (defMap.sentiment) {
      base.sentiment = clamp(
        (base.sentiment ?? 0) + (profile.sentiment ?? 0) * 100,
        defMap.sentiment.min_value,
        defMap.sentiment.max_value,
      );
    }
    if (defMap.sanctions) {
      base.sanctions = clamp(
        (base.sanctions ?? 0) + (profile.geopolitical ?? 0),
        defMap.sanctions.min_value,
        defMap.sanctions.max_value,
      );
    }
  }

  return base;
}

export function deriveImpact(
  selection: ScenarioSelections,
  shocks: GeopoliticalShock[],
  customDefs: CustomShockDefinition[],
): ScenarioImpact {
  const shockMap = shocks.reduce<Record<number, GeopoliticalShock>>((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {});

  const impact: ScenarioImpact = {
    forecast: 0,
    sentiment: 0,
    geopolitical: 25,
    supply_chain: 40,
    volatility: 15,
  };

  for (const id of selection.geopolitical) {
    const shock = shockMap[id];
    if (!shock) continue;
    const profile = shock.impact_profile || {};
    impact.forecast += profile.forecast ?? 0;
    impact.sentiment += profile.sentiment ?? 0;
    impact.geopolitical += profile.geopolitical ?? 0;
    impact.supply_chain += profile.supply_chain ?? 0;
    impact.volatility += profile.volatility ?? 0;
  }

  const defMap = customDefs.reduce<Record<string, CustomShockDefinition>>(
    (acc, def) => {
      acc[def.code] = def;
      return acc;
    },
    {},
  );
  const c = selection.custom;
  const freight = c.freight ?? 0;
  const sentiment = c.sentiment ?? 0;
  const sanctions = c.sanctions ?? 0;

  impact.forecast -= freight * 0.08 + sanctions * 0.12;
  impact.sentiment += sentiment * 0.01;
  impact.geopolitical += sanctions * 0.4;
  impact.supply_chain += freight * 0.35 + sanctions * 0.25;
  impact.volatility += Math.abs(sentiment) * 0.1;

  // Clamp geopolitics-related impacts so charts remain sane
  const clampIfDef = (code: string, value: number) => {
    const def = defMap[code];
    if (!def) return value;
    return clamp(value, def.min_value, def.max_value);
  };

  impact.supply_chain = clampIfDef("freight", impact.supply_chain);
  impact.sentiment = clampIfDef("sentiment", impact.sentiment);
  impact.geopolitical = clampIfDef("sanctions", impact.geopolitical);

  return impact;
}

export function isBaseline(selection: ScenarioSelections, config: ConfigResponse | null) {
  if (!config) return true;
  const defaults = defaultsFromCustomShocks(config.custom_shocks);
  const hasCustomChange = Object.keys(defaults).some(
    (key) => selection.custom[key] !== defaults[key],
  );
  return selection.geopolitical.length === 0 && !hasCustomChange;
}
