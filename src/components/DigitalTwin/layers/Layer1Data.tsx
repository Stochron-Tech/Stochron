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
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          Layer 1: Data Integration
        </h2>
        <p className="text-slate-400">Core business data across all segments</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-6">Financial Data by Segment</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Center */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/20">
            <h4 className="text-blue-300 font-semibold mb-4">Data Center</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.dcRevenue}
                  onChange={(e) => updateVariable('dcRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Current: ${variables.dcRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.dcGrossMargin}
                  onChange={(e) => updateVariable('dcGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">{variables.dcGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>

          {/* Client & Gaming */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-teal-500/20">
            <h4 className="text-teal-300 font-semibold mb-4">Client & Gaming</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.cgRevenue}
                  onChange={(e) => updateVariable('cgRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Current: ${variables.cgRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.cgGrossMargin}
                  onChange={(e) => updateVariable('cgGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">{variables.cgGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>

          {/* Embedded */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-amber-500/20">
            <h4 className="text-amber-300 font-semibold mb-4">Embedded</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Revenue (Millions USD)
                </label>
                <input
                  type="number"
                  value={variables.embeddedRevenue}
                  onChange={(e) => updateVariable('embeddedRevenue', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">Current: ${variables.embeddedRevenue}M</p>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Gross Margin (%)</label>
                <input
                  type="number"
                  value={variables.embeddedGrossMargin}
                  onChange={(e) => updateVariable('embeddedGrossMargin', parseFloat(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm"
                />
                <p className="text-xs text-slate-500 mt-1">{variables.embeddedGrossMargin}% of revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Total Business Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-400">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-400">${metrics.totalRevenue.toFixed(0)}M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Gross Profit</p>
            <p className="text-2xl font-bold text-green-400">${metrics.totalGrossProfit.toFixed(0)}M</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Gross Margin</p>
            <p className="text-2xl font-bold text-teal-400">{metrics.grossMargin.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Baseline: 49%</p>
            <p className={`text-lg font-bold ${metrics.grossMargin >= 49 ? 'text-green-400' : 'text-red-400'}`}>
              {(metrics.grossMargin - 49).toFixed(1)}% diff
            </p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic">
        Note: This data represents 2024 baseline financials for AMD. All figures in millions USD.
      </p>
    </div>
  );
}
