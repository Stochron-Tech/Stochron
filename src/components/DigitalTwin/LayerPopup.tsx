import { X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface LayerPopupProps {
  layer: number;
  isOpen: boolean;
  onClose: () => void;
  variables: Record<string, number>;
  updateVariable: (key: string, value: number) => void;
  metrics: any;
}

const layerConfigs = {
  1: {
    title: 'Layer 1: Data Integration',
    subtitle: 'Business Foundation',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-300',
    sections: [
      {
        title: 'Data Center',
        variables: [
          { key: 'dcRevenue', label: 'Revenue (M$)', min: 5000, max: 15000, step: 100 },
          { key: 'dcGrossMargin', label: 'Gross Margin (%)', min: 40, max: 70, step: 1 },
        ]
      },
      {
        title: 'Client & Gaming',
        variables: [
          { key: 'cgRevenue', label: 'Revenue (M$)', min: 3000, max: 8000, step: 100 },
          { key: 'cgGrossMargin', label: 'Gross Margin (%)', min: 30, max: 60, step: 1 },
        ]
      },
      {
        title: 'Embedded',
        variables: [
          { key: 'embeddedRevenue', label: 'Revenue (M$)', min: 2000, max: 6000, step: 100 },
          { key: 'embeddedGrossMargin', label: 'Gross Margin (%)', min: 35, max: 65, step: 1 },
        ]
      }
    ]
  },
  2: {
    title: 'Layer 2: Behavioral Models',
    subtitle: 'Market Response',
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-300',
    sections: [
      {
        title: 'Price Elasticity',
        variables: [
          { key: 'priceElasticity', label: 'Elasticity Coefficient', min: -2, max: 0, step: 0.1 },
        ]
      },
      {
        title: 'Capacity Constraints',
        variables: [
          { key: 'capacityConstraint', label: 'Capacity Utilization (%)', min: 50, max: 100, step: 5 },
        ]
      }
    ]
  },
  3: {
    title: 'Layer 3: Simulation Engine',
    subtitle: 'What-If Analysis',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-300',
    sections: [
      {
        title: 'Scenario Parameters',
        variables: [
          { key: 'priceAdjustment', label: 'Price Adjustment (%)', min: -30, max: 30, step: 1 },
          { key: 'demandShift', label: 'Demand Shift (%)', min: -30, max: 30, step: 1 },
        ]
      }
    ]
  },
  4: {
    title: 'Layer 4: Output & Visualization',
    subtitle: 'Decision Dashboards',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-300',
    readOnly: true,
  }
};

export function LayerPopup({ layer, isOpen, onClose, variables, updateVariable, metrics }: LayerPopupProps) {
  if (!isOpen) return null;

  const config = layerConfigs[layer as keyof typeof layerConfigs];
  const isReadOnly = layer === 4;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-200">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.color} p-6 flex items-center justify-between sticky top-0 z-10`}>
          <div className="text-white">
            <h2 className="text-2xl font-bold">{config.title}</h2>
            <p className="text-sm opacity-90">{config.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Editable Variables (or read-only for Layer 4) */}
          <div className={`bg-slate-50 rounded-xl p-6 border-2 border-slate-200 ${isReadOnly ? 'lg:col-span-2' : ''}`}>
            <h3 className="text-lg font-bold text-slate-900 mb-6">
              {isReadOnly ? 'Outcomes (Read-Only)' : 'Variables You Can Adjust'}
            </h3>

            {isReadOnly ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 border-2 border-blue-200">
                  <p className="text-sm text-slate-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">${metrics.totalRevenue.toFixed(0)}M</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border-2 border-emerald-200">
                  <p className="text-sm text-slate-600 font-medium">Gross Profit</p>
                  <p className="text-3xl font-bold text-emerald-600">${metrics.totalGrossProfit.toFixed(0)}M</p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200">
                  <p className="text-sm text-slate-600 font-medium">Gross Margin</p>
                  <p className="text-3xl font-bold text-amber-600">{metrics.grossMargin.toFixed(1)}%</p>
                </div>
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border-2 border-rose-200">
                  <p className="text-sm text-slate-600 font-medium">vs Baseline (49%)</p>
                  <p className={`text-3xl font-bold ${metrics.grossMargin >= 49 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {(metrics.grossMargin - 49).toFixed(1)}%
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {config.sections && config.sections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-md font-semibold text-slate-700 mb-3">{section.title}</h4>
                    <div className="space-y-4">
                      {section.variables.map((varDef) => (
                        <div key={varDef.key}>
                          <div className="flex justify-between items-center mb-2 gap-3">
                            <label className="text-sm font-medium text-slate-600 flex-1">{varDef.label}</label>
                            <input
                              type="number"
                              value={variables[varDef.key]}
                              onChange={(e) => updateVariable(varDef.key, Number(e.target.value))}
                              min={varDef.min}
                              max={varDef.max}
                              step={varDef.step}
                              className="w-28 px-2 py-1 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-md"
                            />
                          </div>
                          <Slider
                            value={[variables[varDef.key]]}
                            onValueChange={([value]) => updateVariable(varDef.key, value)}
                            min={varDef.min}
                            max={varDef.max}
                            step={varDef.step}
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Business Model Structure */}
          <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Business Model Structure</h3>
            <div className="space-y-4 text-sm text-slate-600">
              {layer === 1 && (
                <>
                  <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <p className="font-semibold text-slate-700">Data Integration</p>
                    <p className="text-xs mt-1">Baseline financial data for AMD's three business segments with revenue and margin information.</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <p className="font-semibold text-slate-700">Revenue Calculation</p>
                    <p className="text-xs mt-1">Total Revenue = DC Revenue + C&G Revenue + Embedded Revenue</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                    <p className="font-semibold text-slate-700">Margin Calculation</p>
                    <p className="text-xs mt-1">Total Gross Profit = (Revenue × Gross Margin %) for each segment summed together</p>
                  </div>
                </>
              )}
              {layer === 2 && (
                <>
                  <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="font-semibold text-slate-700">Price Elasticity</p>
                    <p className="text-xs mt-1">Coefficient between -2 and 0. More negative = higher sensitivity to price changes.</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="font-semibold text-slate-700">Demand Impact</p>
                    <p className="text-xs mt-1">Price changes affect demand: Demand = Base Demand × (1 + Elasticity × Price Change %)</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                    <p className="font-semibold text-slate-700">Capacity Constraints</p>
                    <p className="text-xs mt-1">Limits revenue potential based on production capacity utilization percentage.</p>
                  </div>
                </>
              )}
              {layer === 3 && (
                <>
                  <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                    <p className="font-semibold text-slate-700">Scenario Simulation</p>
                    <p className="text-xs mt-1">Test pricing and demand scenarios in real-time to see financial impacts.</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                    <p className="font-semibold text-slate-700">Price Adjustment Impact</p>
                    <p className="text-xs mt-1">Revenue adjusts based on price changes and resulting demand shifts from Layer 2 elasticity.</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                    <p className="font-semibold text-slate-700">Financial Recalculation</p>
                    <p className="text-xs mt-1">Updated revenue flows to Layer 4 to show new total revenue, profit, and margins.</p>
                  </div>
                </>
              )}
              {layer === 4 && (
                <>
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                    <p className="font-semibold text-slate-700">Decision Outputs</p>
                    <p className="text-xs mt-1">Layer 4 aggregates outcomes into executive-ready KPIs and revenue impact summaries.</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                    <p className="font-semibold text-slate-700">Digital Twin Feedback</p>
                    <p className="text-xs mt-1">Results reflect changes from Layers 1-3 and update the revenue impact in real time.</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                    <p className="font-semibold text-slate-700">Outcome Integrity</p>
                    <p className="text-xs mt-1">Outcomes are read-only to preserve the business model and prevent manual overrides.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
