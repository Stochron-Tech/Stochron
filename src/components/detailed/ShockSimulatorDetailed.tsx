import { useState } from "react";
import {
  Zap,
  Plus,
  X,
  Settings,
  FileText,
  Sparkles,
} from "lucide-react";
import type { ScenarioType } from "../../App";
import type { ScenarioImpact } from "../../utils/scenario";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

interface ShockSimulatorDetailedProps {
  stock: string;
  activeScenario: ScenarioType;
  customShock: Record<string, number>;
  setCustomShock: (shock: Record<string, number>) => void;
  impact: ScenarioImpact;
}

interface Variable {
  id: string;
  name: string;
  category: string;
  currentValue: number;
  unit: string;
  subVariables?: Variable[];
}

interface WorkspaceBlock {
  id: string;
  variable: Variable;
  adjustedValue: number;
  x: number;
  y: number;
}

export function ShockSimulatorDetailed({
  stock,
  activeScenario,
  customShock,
  setCustomShock,
}: ShockSimulatorDetailedProps) {
  const [workspaceBlocks, setWorkspaceBlocks] = useState<
    WorkspaceBlock[]
  >([]);
  const [selectedBlock, setSelectedBlock] = useState<
    string | null
  >(null);
  const [scenarioName, setScenarioName] = useState(
    "Custom Scenario 1",
  );
  const [scenarioDescription, setScenarioDescription] =
    useState("");
  const [generatedReport, setGeneratedReport] = useState("");

  activeScenario;
  customShock;
  setCustomShock;

  // Comprehensive variable library
  const variableLibrary: Variable[] = [
    {
      id: "forecasting",
      name: "Forecasting Engine",
      category: "Predictive Analytics",
      currentValue: 175,
      unit: "$",
      subVariables: [
        {
          id: "arima-params",
          name: "ARIMA Parameters",
          category: "Model Config",
          currentValue: 0,
          unit: "config",
          subVariables: [
            {
              id: "arima-p",
              name: "AR Order (p)",
              category: "Parameter",
              currentValue: 2,
              unit: "order",
            },
            {
              id: "arima-d",
              name: "Differencing (d)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "arima-q",
              name: "MA Order (q)",
              category: "Parameter",
              currentValue: 2,
              unit: "order",
            },
          ],
        },
        {
          id: "sarima-params",
          name: "SARIMA Parameters",
          category: "Model Config",
          currentValue: 0,
          unit: "config",
          subVariables: [
            {
              id: "sarima-p",
              name: "AR Order (P)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "sarima-d",
              name: "Differencing (D)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "sarima-q",
              name: "MA Order (Q)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "sarima-s",
              name: "Seasonal Period (s)",
              category: "Parameter",
              currentValue: 12,
              unit: "months",
            },
          ],
        },
        {
          id: "garch-params",
          name: "GARCH Parameters",
          category: "Model Config",
          currentValue: 0,
          unit: "config",
          subVariables: [
            {
              id: "garch-p",
              name: "ARCH Order (p)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "garch-q",
              name: "GARCH Order (q)",
              category: "Parameter",
              currentValue: 1,
              unit: "order",
            },
            {
              id: "garch-dist",
              name: "Distribution",
              category: "Parameter",
              currentValue: 0,
              unit: "type",
            },
          ],
        },
      ],
    },
    {
      id: "sentiment",
      name: "Sentiment Index",
      category: "Market Psychology",
      currentValue: 16,
      unit: "index (1-30)",
      subVariables: [
        {
          id: "news-sentiment",
          name: "News Sentiment",
          category: "Component",
          currentValue: 0.45,
          unit: "score",
        },
        {
          id: "social-sentiment",
          name: "Social Media Sentiment",
          category: "Component",
          currentValue: 0.32,
          unit: "score",
        },
        {
          id: "policy-sentiment",
          name: "Policy Document Sentiment",
          category: "Component",
          currentValue: 0.55,
          unit: "score",
        },
        {
          id: "analyst-sentiment",
          name: "Analyst Ratings",
          category: "Component",
          currentValue: 2.8,
          unit: "avg rating",
        },
      ],
    },
    {
      id: "supply-chain",
      name: "Supply Chain Vulnerability Index",
      category: "Operations",
      currentValue: 42,
      unit: "index (0-100)",
      subVariables: [
        {
          id: "supplier-concentration",
          name: "Supplier Concentration",
          category: "Sub-Index",
          currentValue: 45,
          unit: "HHI",
          subVariables: [
            {
              id: "titanium-suppliers",
              name: "Titanium Supplier Count",
              category: "Metric",
              currentValue: 8,
              unit: "suppliers",
            },
            {
              id: "top3-share",
              name: "Top 3 Supplier Share",
              category: "Metric",
              currentValue: 68,
              unit: "%",
            },
            {
              id: "geographic-diversity",
              name: "Geographic Diversity",
              category: "Metric",
              currentValue: 5,
              unit: "countries",
            },
          ],
        },
        {
          id: "freight-costs",
          name: "Freight Costs",
          category: "Sub-Index",
          currentValue: 35,
          unit: "index",
          subVariables: [
            {
              id: "baltic-dry",
              name: "Baltic Dry Index",
              category: "Metric",
              currentValue: 1450,
              unit: "points",
            },
            {
              id: "container-rates",
              name: "Container Shipping Rate",
              category: "Metric",
              currentValue: 3200,
              unit: "$/TEU",
            },
            {
              id: "air-freight",
              name: "Air Freight Rate",
              category: "Metric",
              currentValue: 4.8,
              unit: "$/kg",
            },
          ],
        },
        {
          id: "energy-volatility",
          name: "Energy Price Volatility",
          category: "Sub-Index",
          currentValue: 40,
          unit: "index",
          subVariables: [
            {
              id: "brent-crude",
              name: "Brent Crude Price",
              category: "Metric",
              currentValue: 85,
              unit: "$/barrel",
            },
            {
              id: "nat-gas",
              name: "Natural Gas Price",
              category: "Metric",
              currentValue: 3.2,
              unit: "$/MMBtu",
            },
            {
              id: "electricity",
              name: "Industrial Electricity",
              category: "Metric",
              currentValue: 0.12,
              unit: "$/kWh",
            },
          ],
        },
        {
          id: "commodity-access",
          name: "Critical Commodity Access",
          category: "Sub-Index",
          currentValue: 38,
          unit: "index",
          subVariables: [
            {
              id: "titanium-price",
              name: "Titanium Price",
              category: "Metric",
              currentValue: 12.5,
              unit: "$/kg",
            },
            {
              id: "aluminum-price",
              name: "Aluminum Price",
              category: "Metric",
              currentValue: 2.3,
              unit: "$/kg",
            },
            {
              id: "rare-earth",
              name: "Rare Earth Availability",
              category: "Metric",
              currentValue: 72,
              unit: "index",
            },
          ],
        },
        {
          id: "port-efficiency",
          name: "Port & Logistics Efficiency",
          category: "Sub-Index",
          currentValue: 28,
          unit: "index",
          subVariables: [
            {
              id: "port-congestion",
              name: "Port Congestion Index",
              category: "Metric",
              currentValue: 32,
              unit: "index",
            },
            {
              id: "dwell-time",
              name: "Average Dwell Time",
              category: "Metric",
              currentValue: 4.2,
              unit: "days",
            },
            {
              id: "customs-delay",
              name: "Customs Processing Delay",
              category: "Metric",
              currentValue: 1.8,
              unit: "days",
            },
          ],
        },
      ],
    },
    {
      id: "geopolitical-risk",
      name: "Geopolitical Risk Index",
      category: "Political",
      currentValue: 45,
      unit: "index (0-100)",
      subVariables: [
        {
          id: "us-china-tension",
          name: "U.S.-China Tension Index",
          category: "Component",
          currentValue: 72,
          unit: "index",
        },
        {
          id: "russia-sanctions",
          name: "Russia Sanctions Severity",
          category: "Component",
          currentValue: 85,
          unit: "index",
        },
        {
          id: "middle-east-risk",
          name: "Middle East Stability",
          category: "Component",
          currentValue: 58,
          unit: "index",
        },
        {
          id: "eu-regulatory",
          name: "EU Regulatory Stringency",
          category: "Component",
          currentValue: 45,
          unit: "index",
        },
      ],
    },
    {
      id: "macro-factors",
      name: "Macroeconomic Factors",
      category: "Economics",
      currentValue: 0,
      unit: "composite",
      subVariables: [
        {
          id: "gdp-growth",
          name: "Global GDP Growth",
          category: "Indicator",
          currentValue: 2.8,
          unit: "%",
        },
        {
          id: "inflation",
          name: "CPI Inflation (U.S.)",
          category: "Indicator",
          currentValue: 3.2,
          unit: "%",
        },
        {
          id: "interest-rate",
          name: "Fed Funds Rate",
          category: "Indicator",
          currentValue: 5.25,
          unit: "%",
        },
        {
          id: "usd-index",
          name: "USD Index (DXY)",
          category: "Indicator",
          currentValue: 103.5,
          unit: "index",
        },
        {
          id: "oil-price",
          name: "WTI Crude Oil",
          category: "Indicator",
          currentValue: 78,
          unit: "$/barrel",
        },
      ],
    },
    {
      id: "market-volatility",
      name: "Market Volatility Metrics",
      category: "Market Risk",
      currentValue: 18,
      unit: "VIX",
      subVariables: [
        {
          id: "vix",
          name: "VIX Index",
          category: "Metric",
          currentValue: 18,
          unit: "index",
        },
        {
          id: "move-index",
          name: "MOVE Index (Bond Vol)",
          category: "Metric",
          currentValue: 95,
          unit: "index",
        },
        {
          id: "credit-spreads",
          name: "Corporate Credit Spreads",
          category: "Metric",
          currentValue: 125,
          unit: "bps",
        },
        {
          id: "liquidity-stress",
          name: "Liquidity Stress Indicator",
          category: "Metric",
          currentValue: 28,
          unit: "index",
        },
      ],
    },
  ];

  const addBlockToWorkspace = (variable: Variable) => {
    const newBlock: WorkspaceBlock = {
      id: `block-${Date.now()}-${Math.random()}`,
      variable,
      adjustedValue: variable.currentValue,
      x: Math.random() * 200,
      y: Math.random() * 200,
    };
    setWorkspaceBlocks([...workspaceBlocks, newBlock]);
  };

  const removeBlock = (blockId: string) => {
    setWorkspaceBlocks(
      workspaceBlocks.filter((b) => b.id !== blockId),
    );
    if (selectedBlock === blockId) setSelectedBlock(null);
  };

  const updateBlockValue = (
    blockId: string,
    newValue: number,
  ) => {
    setWorkspaceBlocks(
      workspaceBlocks.map((b) =>
        b.id === blockId
          ? { ...b, adjustedValue: newValue }
          : b,
      ),
    );
  };

  const generateAIReport = () => {
    const blocks = workspaceBlocks
      .map(
        (b) =>
          `${b.variable.name}: ${b.adjustedValue} ${b.variable.unit} (baseline: ${b.variable.currentValue})`,
      )
      .join(", ");

    const report = `# Geopolitical Risk Analysis Report: ${scenarioName}

## Executive Summary
${scenarioDescription || "Custom shock scenario analysis for " + stock}

## Scenario Configuration
Active Variables: ${workspaceBlocks.length}
${blocks}

## Impact Analysis

### Price Forecast Impact
Based on the adjusted variables, the forecasted stock price for ${stock} shows:
- 3-Month Outlook: Approximately ${workspaceBlocks.length > 0 ? (175 - workspaceBlocks.reduce((sum, b) => sum + (b.variable.id === "supply-chain" ? (b.adjustedValue - b.variable.currentValue) * 0.5 : 0), 0)).toFixed(2) : 175} USD
- 12-Month Outlook: Range of ${(165 - workspaceBlocks.length * 3).toFixed(2)} - ${(195 - workspaceBlocks.length * 2).toFixed(2)} USD
- Confidence Interval: ±${(12 + workspaceBlocks.length * 2).toFixed(1)}%

### Supply Chain Vulnerability
${
  workspaceBlocks.some((b) => b.variable.id === "supply-chain")
    ? `Supply chain vulnerability has been adjusted to ${workspaceBlocks.find((b) => b.variable.id === "supply-chain")?.adjustedValue}. This represents ${workspaceBlocks.find((b) => b.variable.id === "supply-chain")!.adjustedValue > 50 ? "elevated" : "moderate"} risk levels across:
- Supplier concentration dependencies
- Freight cost pressures  
- Energy market volatility
- Critical material access constraints

Recommended Actions:
- Diversify supplier base for critical components
- Hedge against freight rate volatility
- Secure long-term titanium supply contracts`
    : "Supply chain metrics remain at baseline levels."
}

### Geopolitical Risk Assessment
${
  workspaceBlocks.some(
    (b) => b.variable.id === "geopolitical-risk",
  )
    ? `Geopolitical risk index adjusted to ${workspaceBlocks.find((b) => b.variable.id === "geopolitical-risk")?.adjustedValue}. Key considerations:
- U.S.-China trade relations trajectory
- Russia sanctions impact on titanium supply
- Middle East shipping route stability
- European regulatory environment

The elevated risk profile suggests monitoring policy developments closely and maintaining flexibility in production planning.`
    : "Geopolitical conditions remain within historical norms."
}

### Market Sentiment Impact
${
  workspaceBlocks.some((b) => b.variable.id === "sentiment")
    ? `Sentiment index has shifted to ${workspaceBlocks.find((b) => b.variable.id === "sentiment")?.adjustedValue}/30. This ${workspaceBlocks.find((b) => b.variable.id === "sentiment")!.adjustedValue > 20 ? "positive" : workspaceBlocks.find((b) => b.variable.id === "sentiment")!.adjustedValue > 10 ? "neutral" : "negative"} sentiment environment influences:
- Investor confidence and stock valuation
- Customer willingness to place new orders
- Media coverage tone and public perception

Historical correlation analysis shows that sentiment shifts of this magnitude typically affect stock prices with a 6-month lag.`
    : "Market sentiment remains stable."
}

## Risk Mitigation Strategies

1. **Operational Flexibility**: Maintain ability to adjust production rates in response to demand shifts
2. **Financial Hedging**: Consider options strategies to protect against downside scenarios
3. **Stakeholder Communication**: Proactive engagement with investors on risk management approach
4. **Supply Chain Resilience**: Continue diversification efforts and strategic stockpiling of critical materials

## Monitoring Plan

Key indicators to track:
- Weekly: Freight rate indices, commodity prices, news sentiment
- Monthly: Policy event outcomes, production metrics, order book changes
- Quarterly: Macroeconomic indicators, regulatory developments, financial results

## Conclusion

This scenario analysis provides a data-driven framework for understanding potential impacts on ${stock}. The adjustments made to ${workspaceBlocks.length} variables suggest ${workspaceBlocks.length > 3 ? "significant" : workspaceBlocks.length > 1 ? "moderate" : "limited"} deviation from baseline expectations. 

Recommended next steps:
1. Review assumptions with subject matter experts
2. Conduct sensitivity analysis on key variables
3. Develop contingency plans for pessimistic scenarios
4. Update regularly as new data becomes available

---
*Generated by AI-Powered Geopolitical Risk Analysis Platform*
*Report Date: ${new Date().toLocaleDateString()}*
*Scenario: ${scenarioName}*
`;

    setGeneratedReport(report);
  };

  return (
    <div className="space-y-8 p-8 min-h-screen">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-6">
        <Zap className="h-6 w-6 text-cyan-400" />
        <div className="flex-1">
          <h2 className="text-2xl text-cyan-400">
            Shock Simulation Engine
          </h2>
          <p className="text-sm text-gray-400">
            Block-based variable manipulation and scenario
            analysis
          </p>
        </div>
        <Button
          onClick={generateAIReport}
          className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
          disabled={workspaceBlocks.length === 0}
        >
          <Sparkles className="h-4 w-4" />
          Generate AI Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Left Panel - Variable Toolbox */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
            <h3 className="text-sm text-cyan-400 mb-3">
              Variable Toolbox
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Drag variables into the workspace to build your
              custom shock scenario
            </p>

            <Accordion type="multiple" className="space-y-2">
              {variableLibrary.map((variable, idx) => (
                <AccordionItem
                  key={idx}
                  value={`var-${idx}`}
                  className="border border-gray-700 rounded bg-[#0d1117] px-2"
                >
                  <AccordionTrigger className="text-xs text-gray-200 hover:text-cyan-400 py-2">
                    {variable.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-2">
                      <Button
                        onClick={() =>
                          addBlockToWorkspace(variable)
                        }
                        size="sm"
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-xs h-7"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Workspace
                      </Button>

                      {variable.subVariables &&
                        variable.subVariables.length > 0 && (
                          <Accordion
                            type="multiple"
                            className="space-y-1"
                          >
                            {variable.subVariables.map(
                              (subVar, subIdx) => (
                                <AccordionItem
                                  key={subIdx}
                                  value={`subvar-${idx}-${subIdx}`}
                                  className="border border-gray-700/50 rounded bg-[#161b22] px-2"
                                >
                                  <AccordionTrigger className="text-xs text-gray-300 py-1.5">
                                    {subVar.name}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <Button
                                      onClick={() =>
                                        addBlockToWorkspace(
                                          subVar,
                                        )
                                      }
                                      size="sm"
                                      className="w-full bg-cyan-700 hover:bg-cyan-800 text-xs h-6"
                                    >
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add
                                    </Button>

                                    {subVar.subVariables &&
                                      subVar.subVariables
                                        .length > 0 && (
                                        <div className="mt-1 space-y-1 pl-2">
                                          {subVar.subVariables.map(
                                            (
                                              microVar,
                                              microIdx,
                                            ) => (
                                              <div
                                                key={microIdx}
                                                className="flex items-center justify-between rounded bg-[#0d1117] p-1.5"
                                              >
                                                <span className="text-xs text-gray-400">
                                                  {
                                                    microVar.name
                                                  }
                                                </span>
                                                <Button
                                                  onClick={() =>
                                                    addBlockToWorkspace(
                                                      microVar,
                                                    )
                                                  }
                                                  size="sm"
                                                  className="bg-cyan-800 hover:bg-cyan-900 text-xs h-5 px-2"
                                                >
                                                  +
                                                </Button>
                                              </div>
                                            ),
                                          )}
                                        </div>
                                      )}
                                  </AccordionContent>
                                </AccordionItem>
                              ),
                            )}
                          </Accordion>
                        )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Center - Workspace */}
        <div className="col-span-2 space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-cyan-400">
                Simulation Workspace
              </h3>
              <div className="text-xs text-gray-400">
                {workspaceBlocks.length} variable
                {workspaceBlocks.length !== 1 ? "s" : ""} active
              </div>
            </div>

            {workspaceBlocks.length === 0 ? (
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
                <Zap className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">
                  Workspace is empty
                </p>
                <p className="text-xs text-gray-500">
                  Add variables from the toolbox to start
                  building your scenario
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {workspaceBlocks.map((block) => (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlock(block.id)}
                    className={`rounded-lg border p-4 cursor-pointer transition-all ${
                      selectedBlock === block.id
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-gray-700 bg-[#0d1117] hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-sm text-gray-100 mb-1">
                          {block.variable.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {block.variable.category}
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBlock(block.id);
                        }}
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                          Current Value:
                        </span>
                        <span className="text-gray-300">
                          {block.variable.currentValue}{" "}
                          {block.variable.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                          Adjusted Value:
                        </span>
                        <span className="text-cyan-400">
                          {block.adjustedValue}{" "}
                          {block.variable.unit}
                        </span>
                      </div>

                      {selectedBlock === block.id && (
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <Slider
                            value={[block.adjustedValue]}
                            onValueChange={([value]) =>
                              updateBlockValue(block.id, value)
                            }
                            min={
                              block.variable.currentValue * 0.5
                            }
                            max={
                              block.variable.currentValue * 1.5
                            }
                            step={
                              block.variable.currentValue * 0.01
                            }
                            className="[&_[role=slider]]:bg-cyan-500"
                          />
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>
                              {(
                                block.variable.currentValue *
                                0.5
                              ).toFixed(1)}
                            </span>
                            <span>
                              {(
                                block.variable.currentValue *
                                1.5
                              ).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Scenario Configuration */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border border-gray-700 bg-[#161b22] p-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-4 w-4 text-cyan-400" />
              <h3 className="text-sm text-cyan-400">
                Scenario Settings
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Scenario Name
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) =>
                    setScenarioName(e.target.value)
                  }
                  className="w-full rounded bg-[#0d1117] border border-gray-700 px-3 py-2 text-sm text-gray-100"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Description
                </label>
                <Textarea
                  value={scenarioDescription}
                  onChange={(e) =>
                    setScenarioDescription(e.target.value)
                  }
                  className="w-full rounded bg-[#0d1117] border border-gray-700 text-sm text-gray-100 min-h-[100px]"
                  placeholder="Describe your shock scenario..."
                />
              </div>

              <div className="rounded border border-gray-700 bg-[#0d1117] p-3">
                <div className="text-xs text-gray-400 mb-2">
                  Impact Summary
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Variables Modified:
                    </span>
                    <span className="text-cyan-400">
                      {workspaceBlocks.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Avg. Deviation:
                    </span>
                    <span className="text-amber-400">
                      {workspaceBlocks.length > 0
                        ? (
                            workspaceBlocks.reduce(
                              (sum, b) =>
                                sum +
                                Math.abs(
                                  ((b.adjustedValue -
                                    b.variable.currentValue) /
                                    b.variable.currentValue) *
                                    100,
                                ),
                              0,
                            ) / workspaceBlocks.length
                          ).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedBlock && (
            <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">
              <h4 className="text-xs text-cyan-400 mb-2">
                Selected Variable
              </h4>
              <p className="text-xs text-gray-300">
                {
                  workspaceBlocks.find(
                    (b) => b.id === selectedBlock,
                  )?.variable.name
                }
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Adjust using the slider to simulate shock
                impacts
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Generated Report Section */}
      {generatedReport && (
        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg text-purple-400">
                AI-Generated Analysis Report
              </h3>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedReport);
              }}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Copy Report
            </Button>
          </div>

          <div className="rounded bg-[#0d1117] border border-gray-700 p-4 max-h-[600px] overflow-y-auto">
            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
              {generatedReport}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}