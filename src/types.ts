export type ModuleCode =
  | "forecasting"
  | "sentiment"
  | "geopolitical"
  | "supplychain"
  | "policy"
  | "volatility"
  | "macro"
  | "simulator";

export interface Stock {
  id: number;
  ticker: string;
  name: string;
  sector?: string;
  region?: string;
}

export interface GeopoliticalShock {
  id: number;
  code: string;
  name: string;
  description: string;
  default_intensity: number;
  impact_profile: Record<string, number>;
  is_active: boolean;
}

export interface CustomShockDefinition {
  id: number;
  code: string;
  label: string;
  description: string;
  default_intensity: number;
  min_value: number;
  max_value: number;
  step: number;
  is_active: boolean;
}

export interface ModuleDefinition {
  id: number;
  code: ModuleCode;
  name: string;
  description: string;
  endpoint: string;
  is_active: boolean;
}

export interface ScenarioSelections {
  geopolitical: number[];
  custom: Record<string, number>;
  dateRange: { start: string; end: string };
}

export interface ConfigResponse {
  stocks: Stock[];
  modules: ModuleDefinition[];
  geopolitical_shocks: GeopoliticalShock[];
  custom_shocks: CustomShockDefinition[];
}

export interface AnalysisPayload {
  user_id?: number;
  stock_id: number;
  selections: {
    geopolitical: number[];
    custom: Record<string, number>;
    date_range?: { start?: string; end?: string };
  };
}

export interface ModuleData<T = any> {
  loading: boolean;
  data?: T;
  error?: string;
}
