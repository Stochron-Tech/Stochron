import { TrendingUp } from 'lucide-react';

interface Layer2DataProps {
  variables: Record<string, number>;
  updateVariable: (key: string, value: number) => void;
}

export function Layer2Data({ variables, updateVariable }: Layer2DataProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-teal-400" />
          Layer 2: Behavioral Models
        </h2>
        <p className="text-slate-400">How your business responds to market changes</p>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-6">Price Elasticity by Segment</h3>
        <p className="text-sm text-slate-400 mb-6">
          Elasticity measures how demand responds to price changes. More negative = more sensitive to price
        </p>

        <div className="space-y-6">
          {/* Data Center */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-blue-300 font-semibold">Data Center</h4>
              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Inelastic</span>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Price Elasticity: {variables.dcElasticity.toFixed(2)}
              </label>
              <input
                type="range"
                value={variables.dcElasticity}
                onChange={(e) => updateVariable('dcElasticity', parseFloat(e.target.value))}
                min="-2"
                max="0"
                step="0.1"
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-2">
                Supply-constrained with high switching costs. A 10% price increase reduces volume by ~{(variables.dcElasticity * 10).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Client & Gaming */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-teal-500/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-teal-300 font-semibold">Client & Gaming</h4>
              <span className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full">Moderate</span>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Price Elasticity: {variables.cgElasticity.toFixed(2)}
              </label>
              <input
                type="range"
                value={variables.cgElasticity}
                onChange={(e) => updateVariable('cgElasticity', parseFloat(e.target.value))}
                min="-2.5"
                max="0"
                step="0.1"
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-2">
                Competitive consumer market. A 10% price increase reduces volume by ~{(variables.cgElasticity * 10).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Embedded */}
          <div className="bg-slate-900/50 rounded-lg p-5 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-amber-300 font-semibold">Embedded</h4>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">Elastic</span>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Price Elasticity: {variables.embeddedElasticity.toFixed(2)}
              </label>
              <input
                type="range"
                value={variables.embeddedElasticity}
                onChange={(e) => updateVariable('embeddedElasticity', parseFloat(e.target.value))}
                min="-2.5"
                max="0"
                step="0.1"
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-2">
                Specialized market with alternatives. A 10% price increase reduces volume by ~{(variables.embeddedElasticity * 10).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-6">Capacity Constraints</h3>

        <div className="bg-slate-900/50 rounded-lg p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-blue-300 font-semibold">Data Center Capacity</h4>
            <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">Production Limit</span>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Max Capacity Utilization: {variables.dcCapacity.toFixed(0)}%
            </label>
            <input
              type="range"
              value={variables.dcCapacity}
              onChange={(e) => updateVariable('dcCapacity', parseFloat(e.target.value))}
              min="0"
              max="120"
              step="5"
              className="w-full"
            />
            <p className="text-xs text-slate-500 mt-2">
              Currently operating at {variables.dcCapacity.toFixed(0)}% capacity. Tight supply limits demand fulfillment, enabling higher margin pricing.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-blue-300">Key Insight:</span> These behavioral models determine how pricing changes propagate through your business. More elastic segments see greater volume loss from price increases, while capacity-constrained segments can support higher margins.
        </p>
      </div>
    </div>
  );
}
