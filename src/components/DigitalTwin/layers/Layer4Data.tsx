import { LineChart } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Layer4DataProps {
  metrics: any;
}

export function Layer4Data({ metrics }: Layer4DataProps) {
  const segmentData = [
    {
      name: 'Data Center',
      value: metrics.dcShare,
      revenue: metrics.dcAdjustedRevenue,
      fill: '#3B82F6'
    },
    {
      name: 'Client & Gaming',
      value: metrics.cgShare,
      revenue: metrics.cgAdjustedRevenue,
      fill: '#14B8A6'
    },
    {
      name: 'Embedded',
      value: metrics.embeddedShare,
      revenue: metrics.embeddedAdjustedRevenue,
      fill: '#F59E0B'
    }
  ];

  const sensitivityData = [
    { margin: 40, revenue: 18000, name: 'Conservative' },
    { margin: 44, revenue: 20000, name: 'Moderate' },
    { margin: 49, revenue: 25800, name: 'Current' },
    { margin: 52, revenue: 28000, name: 'Aggressive' },
    { margin: 55, revenue: 29000, name: 'Maximum' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <LineChart className="w-8 h-8 text-green-400" />
          Layer 4: Output & Visualization
        </h2>
        <p className="text-slate-400">Executive dashboards and decision-making insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
          <p className="text-xs text-slate-500 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-400">${metrics.totalRevenue.toFixed(0)}M</p>
          <p className="text-xs text-slate-600 mt-1">Annual run rate</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
          <p className="text-xs text-slate-500 mb-2">Gross Profit</p>
          <p className="text-2xl font-bold text-green-400">${metrics.totalGrossProfit.toFixed(0)}M</p>
          <p className="text-xs text-slate-600 mt-1">After COGS</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-teal-500/20">
          <p className="text-xs text-slate-500 mb-2">Gross Margin</p>
          <p className="text-2xl font-bold text-teal-400">{metrics.grossMargin.toFixed(1)}%</p>
          <p className={`text-xs mt-1 ${metrics.grossMargin >= 49 ? 'text-green-500' : 'text-red-500'}`}>
            {metrics.grossMargin >= 49 ? '+' : ''}{(metrics.grossMargin - 49).toFixed(1)}% vs target
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/20">
          <p className="text-xs text-slate-500 mb-2">Operating Income</p>
          <p className="text-2xl font-bold text-amber-400">${(metrics.totalGrossProfit * 0.6).toFixed(0)}M</p>
          <p className="text-xs text-slate-600 mt-1">Est. after OpEx</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Segment */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue by Segment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value.toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Segment (Bar) */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Segment Revenue ($M)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }}
                formatter={(value) => `$${value.toFixed(0)}M`}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Margin Sensitivity */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Margin Sensitivity Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsLineChart data={sensitivityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis yAxisId="left" stroke="#94A3B8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94A3B8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px' }}
              formatter={(value) => [value.toFixed(0), '']}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="margin" stroke="#10B981" name="Gross Margin (%)" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#3B82F6" name="Revenue ($M)" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>

      {/* Decision Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">✓ Margin-Optimized Pricing</h4>
          <p className="text-sm text-slate-300">
            In supply-constrained segments (DC), prioritize margin expansion. Inelastic demand allows 10-15% price increases with minimal volume loss.
          </p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">◆ Share-Gain Pricing</h4>
          <p className="text-sm text-slate-300">
            In competitive segments (Client), use targeted discounts to gain market share. Volume gains offset margin compression.
          </p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <h4 className="text-amber-300 font-semibold mb-2">● Bundle Strategy</h4>
          <p className="text-sm text-slate-300">
            Cross-sell high-margin DC products with lower-margin segments to enhance overall portfolio profitability.
          </p>
        </div>
      </div>

      {/* Current Recommendations */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-teal-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">📊 Current Scenario Analysis</h3>
        <div className="space-y-3 text-slate-300">
          <p>
            <span className="font-semibold text-white">Gross Margin:</span> {metrics.grossMargin.toFixed(1)}% 
            {metrics.grossMargin >= 49 ? 
              ' ✓ Above 49% target - strong profitability position' : 
              ' ⚠ Below 49% target - consider margin optimization'}
          </p>
          <p>
            <span className="font-semibold text-white">Data Center Share:</span> {metrics.dcShare.toFixed(0)}% of revenue
            {metrics.dcShare > 55 ? 
              ' ✓ High concentration in high-margin segment' : 
              ' ◆ Opportunity to shift mix toward higher-margin DC products'}
          </p>
          <p>
            <span className="font-semibold text-white">Price Volatility:</span> Current pricing is stable
            {metrics.totalRevenue > 25800 ? 
              ' - Operating above 2024 baseline, pricing premium is justified' : 
              ' - Below baseline, consider value-add initiatives'}
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic">
        Note: This dashboard reflects current scenario settings from Layers 1-3. Adjust variables in other layers to see real-time impact on these visualizations.
      </p>
    </div>
  );
}
