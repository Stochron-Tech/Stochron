import { Zap } from 'lucide-react';

interface Layer3DataProps {
  variables: Record<string, number>;
  updateVariable: (key: string, value: number) => void;
  metrics: any;
}

export function Layer3Data({ variables, updateVariable, metrics }: Layer3DataProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <Zap className="w-8 h-8 text-amber-400" />
          Layer 3: Simulation Engine
        </h2>
        <p className="text-slate-400">Test pricing scenarios and analyze financial impact</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-6">Pricing Scenarios</h3>
        <p className="text-sm text-slate-400 mb-6">
          Adjust price multipliers for each segment and see real-time impact on revenue and margins
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Data Center Pricing */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/20">
            <h4 className="text-blue-300 font-semibold mb-4">Data Center Pricing</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Price Multiplier: {variables.dcPriceMultiplier.toFixed(2)}x
                </label>
                <input
                  type="range"
                  value={variables.dcPriceMultiplier}
                  onChange={(e) => updateVariable('dcPriceMultiplier', parseFloat(e.target.value))}
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>-20%</span>
                  <span>Baseline</span>
                  <span>+30%</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded p-3 mt-3">
                <p className="text-xs text-slate-500">Adjusted Revenue</p>
                <p className="text-xl font-bold text-blue-400">
                  ${metrics.dcAdjustedRevenue.toFixed(0)}M
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {variables.dcPriceMultiplier > 1 ? '+' : ''}{((variables.dcPriceMultiplier - 1) * 100).toFixed(0)}% vs baseline
                </p>
              </div>
            </div>
          </div>

          {/* Client & Gaming Pricing */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-teal-500/20">
            <h4 className="text-teal-300 font-semibold mb-4">Client & Gaming Pricing</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Price Multiplier: {variables.cgPriceMultiplier.toFixed(2)}x
                </label>
                <input
                  type="range"
                  value={variables.cgPriceMultiplier}
                  onChange={(e) => updateVariable('cgPriceMultiplier', parseFloat(e.target.value))}
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>-20%</span>
                  <span>Baseline</span>
                  <span>+30%</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded p-3 mt-3">
                <p className="text-xs text-slate-500">Adjusted Revenue</p>
                <p className="text-xl font-bold text-teal-400">
                  ${metrics.cgAdjustedRevenue.toFixed(0)}M
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {variables.cgPriceMultiplier > 1 ? '+' : ''}{((variables.cgPriceMultiplier - 1) * 100).toFixed(0)}% vs baseline
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Pricing */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-amber-500/20">
            <h4 className="text-amber-300 font-semibold mb-4">Embedded Pricing</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Price Multiplier: {variables.embeddedPriceMultiplier.toFixed(2)}x
                </label>
                <input
                  type="range"
                  value={variables.embeddedPriceMultiplier}
                  onChange={(e) => updateVariable('embeddedPriceMultiplier', parseFloat(e.target.value))}
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>-20%</span>
                  <span>Baseline</span>
                  <span>+30%</span>
                </div>
              </div>
              <div className="bg-slate-800 rounded p-3 mt-3">
                <p className="text-xs text-slate-500">Adjusted Revenue</p>
                <p className="text-xl font-bold text-amber-400">
                  ${metrics.embeddedAdjustedRevenue.toFixed(0)}M
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {variables.embeddedPriceMultiplier > 1 ? '+' : ''}{((variables.embeddedPriceMultiplier - 1) * 100).toFixed(0)}% vs baseline
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Scenario Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-blue-400">${metrics.totalRevenue.toFixed(0)}M</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Gross Profit</p>
            <p className="text-2xl font-bold text-green-400">${metrics.totalGrossProfit.toFixed(0)}M</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Gross Margin</p>
            <p className="text-2xl font-bold text-teal-400">{metrics.grossMargin.toFixed(1)}%</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Margin vs Target</p>
            <p className={`text-2xl font-bold ${metrics.grossMargin >= 49 ? 'text-green-400' : 'text-red-400'}`}>
              {(metrics.grossMargin - 49).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-amber-300">Scenario Insight:</span> Dragging the price multipliers up increases short-term revenue but may reduce volumes due to elasticity. The optimal pricing balances margin expansion with market share maintenance.
        </p>
      </div>
    </div>
  );
}
