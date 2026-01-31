import { BarChart3 } from 'lucide-react';

interface Layer1DataProps {
  variables: Record<string, number>;
  updateVariable: (key: string, value: number) => void;
  metrics: any;
}

export function Layer1Data({ variables, updateVariable, metrics }: Layer1DataProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          Layer 1: Data Integration
        </h2>
        <p className="text-slate-600">Core business data across all segments</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200 shadow-md">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Financial Data by Segment</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Center */}
          <div className="bg-white rounded-xl p-5 border-2 border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-blue-700 font-bold mb-4">🏗️ Data Center</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.dcRevenue}
                  onChange={(e) => updateVariable('dcRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-blue-600 mt-1 font-medium">Current: ${variables.dcRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.dcGrossMargin}
                  onChange={(e) => updateVariable('dcGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-blue-600 mt-1 font-medium">{variables.dcGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>

          {/* Client & Gaming */}
          <div className="bg-white rounded-xl p-5 border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-purple-700 font-bold mb-4">💻 Client & Gaming</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.cgRevenue}
                  onChange={(e) => updateVariable('cgRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-purple-50 border-2 border-purple-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-purple-600 mt-1 font-medium">Current: ${variables.cgRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.cgGrossMargin}
                  onChange={(e) => updateVariable('cgGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-purple-50 border-2 border-purple-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-purple-600 mt-1 font-medium">{variables.cgGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>

          {/* Embedded */}
          <div className="bg-white rounded-xl p-5 border-2 border-amber-200 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="text-amber-700 font-bold mb-4">🛰️ Embedded</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.embeddedRevenue}
                  onChange={(e) => updateVariable('embeddedRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-amber-600 mt-1 font-medium">Current: ${variables.embeddedRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.embeddedGrossMargin}
                  onChange={(e) => updateVariable('embeddedGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-300 rounded-lg text-slate-900 text-sm font-medium"
                />
                <p className="text-xs text-amber-600 mt-1 font-medium">{variables.embeddedGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-6 border-2 border-blue-300 shadow-md">
        <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Total Business Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <p className="text-sm text-slate-600 font-medium">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-600">${metrics.totalRevenue.toFixed(0)}M</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-emerald-200">
            <p className="text-sm text-slate-600 font-medium">Gross Profit</p>
            <p className="text-2xl font-bold text-emerald-600">${metrics.totalGrossProfit.toFixed(0)}M</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-teal-200">
            <p className="text-sm text-slate-600 font-medium">Gross Margin</p>
            <p className="text-2xl font-bold text-teal-600">{metrics.grossMargin.toFixed(1)}%</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="text-sm text-slate-600 font-medium">Baseline: 49%</p>
            <p className={`text-lg font-bold ${metrics.grossMargin >= 49 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {(metrics.grossMargin - 49).toFixed(1)}% diff
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 italic font-medium">
        📝 Note: This data represents 2024 baseline financials for AMD. All figures in millions USD.
      </p>
    </div>
  );
}
