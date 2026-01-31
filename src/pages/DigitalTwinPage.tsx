import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Edit2, BarChart3 } from 'lucide-react';
import { DigitalTwinContent } from '../components/DigitalTwin/DigitalTwinContent';
import { LayerDetailPanel } from '../components/DigitalTwin/LayerDetailPanel';

export type LayerType = 'layer1' | 'layer2' | 'layer3' | 'layer4' | null;

export default function DigitalTwinPage() {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState<LayerType>(null);

  const layerColors = {
    layer1: { gradient: 'from-blue-100 to-cyan-100', border: 'border-blue-300', accent: 'bg-gradient-to-br from-blue-500 to-cyan-500', text: 'text-blue-700', label: 'Layer 1: Foundation', icon: '🏗️' },
    layer2: { gradient: 'from-purple-100 to-pink-100', border: 'border-purple-300', accent: 'bg-gradient-to-br from-purple-500 to-pink-500', text: 'text-purple-700', label: 'Layer 2: Behavioral', icon: '⚙️' },
    layer3: { gradient: 'from-emerald-100 to-teal-100', border: 'border-emerald-300', accent: 'bg-gradient-to-br from-emerald-500 to-teal-500', text: 'text-emerald-700', label: 'Layer 3: Simulation', icon: '🎯' },
    layer4: { gradient: 'from-amber-100 to-orange-100', border: 'border-amber-300', accent: 'bg-gradient-to-br from-amber-500 to-orange-500', text: 'text-amber-700', label: 'Layer 4: Visualization', icon: '📊' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/60 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">AMD Digital Twin</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full border border-blue-300 mb-4">
            <span className="text-sm font-semibold text-blue-700">4-Layer Digital Twin</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900">AMD's Business Model</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            An integrated framework combining financials, operations, demand dynamics, and real-time pricing scenarios
          </p>
        </div>

        {/* Main Grid - 4 Layers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {['layer1', 'layer2', 'layer3', 'layer4'].map((layer) => {
            const colors = layerColors[layer as keyof typeof layerColors];
            return (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer as LayerType)}
                className={`group relative bg-white rounded-2xl border-2 ${colors.border} p-8 text-left hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon and Label */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${colors.accent} rounded-xl p-3 text-2xl shadow-lg`}>
                      {colors.icon}
                    </div>
                    <span className={`font-bold ${colors.text} text-sm`}>{colors.label}</span>
                  </div>

                  {/* Title based on layer */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {layer === 'layer1' && 'Business Foundation'}
                    {layer === 'layer2' && 'Behavioral Models'}
                    {layer === 'layer3' && 'Simulation Engine'}
                    {layer === 'layer4' && 'Output & Dashboards'}
                  </h3>

                  {/* Subtitle */}
                  <p className={`${colors.text} font-semibold mb-3`}>
                    {layer === 'layer1' && 'Revenue • Operations • Pricing • Channels'}
                    {layer === 'layer2' && 'Price Elasticity • Capacity Constraints'}
                    {layer === 'layer3' && 'Scenario Testing • Financial Impact'}
                    {layer === 'layer4' && 'Dashboards • Reports • Metrics'}
                  </p>

                  {/* Description */}
                  <p className="text-slate-600 mb-4">
                    {layer === 'layer1' && 'View core AMD business data including revenue by segment, operations, pricing strategies, and distribution channels'}
                    {layer === 'layer2' && 'Adjust price elasticity and capacity constraints to model how your business responds to changes'}
                    {layer === 'layer3' && 'Test pricing scenarios in real-time and see financial impacts on revenue, margins, and profitability'}
                    {layer === 'layer4' && 'Comprehensive dashboards showing revenue impact, margin sensitivity, and detailed scenario analysis'}
                  </p>

                  {/* CTA */}
                  <div className={`text-sm font-semibold ${colors.text} group-hover:translate-x-2 transition-transform`}>
                    Explore Layer →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Insight Section */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border-2 border-blue-200 p-8 shadow-md mb-8">
          <div className="flex gap-2 items-start mb-4">
            <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <h3 className="text-2xl font-bold text-slate-900">How to Use the Digital Twin</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-700">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-blue-700 font-bold mb-2">🏗️ Layer 1 - Data Integration</p>
              <p className="text-sm">View all core business data including revenue, costs, operations, and market information for AMD</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-purple-700 font-bold mb-2">⚙️ Layer 2 - Behavioral Models</p>
              <p className="text-sm">Understand how your business responds to price changes, demand fluctuations, and cost variations</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200">
              <p className="text-emerald-700 font-bold mb-2">🎯 Layer 3 - Simulation Engine</p>
              <p className="text-sm">Test pricing scenarios and see the financial impact on revenue, margins, and cash flow</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <p className="text-amber-700 font-bold mb-2">📊 Layer 4 - Visualization</p>
              <p className="text-sm">View comprehensive dashboards showing revenue impact, margin sensitivity, and scenario comparisons</p>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Panel Modal */}
      {selectedLayer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-h-[90vh] overflow-y-auto w-full max-w-3xl relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedLayer(null)}
              className="sticky top-4 right-4 float-right p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>

            <div className="p-8">
              <LayerDetailPanel layerType={selectedLayer} onClose={() => setSelectedLayer(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
