import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Edit2, BarChart3 } from 'lucide-react';
import { DigitalTwinContent } from '../components/DigitalTwin/DigitalTwinContent';
import { LayerDetailPanel } from '../components/DigitalTwin/LayerDetailPanel';

export type LayerType = 'layer1' | 'layer2' | 'layer3' | 'layer4' | null;

export default function DigitalTwinPage() {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState<LayerType>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold text-white">AMD Digital Twin</h1>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">Digital Twin Framework</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            AMD's 4-layer business model showing financials, operations, demand dynamics, and real-time pricing scenarios
          </p>
        </div>

        {/* Main Grid - 4 Layers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <DigitalTwinContent
            layerType="layer1"
            onSelect={() => setSelectedLayer('layer1')}
          />
          <DigitalTwinContent
            layerType="layer2"
            onSelect={() => setSelectedLayer('layer2')}
          />
          <DigitalTwinContent
            layerType="layer3"
            onSelect={() => setSelectedLayer('layer3')}
          />
          <DigitalTwinContent
            layerType="layer4"
            onSelect={() => setSelectedLayer('layer4')}
          />
        </div>

        {/* Insight Section */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 p-8">
          <h3 className="text-xl font-bold text-white mb-4">How to Use the Digital Twin</h3>
          <div className="space-y-4 text-slate-300">
            <p>
              <span className="text-blue-400 font-semibold">Layer 1 (Data Integration):</span> View all core business data including revenue, costs, operations, and market information
            </p>
            <p>
              <span className="text-teal-400 font-semibold">Layer 2 (Behavioral Models):</span> Understand how your business responds to price changes, demand fluctuations, and cost variations
            </p>
            <p>
              <span className="text-amber-400 font-semibold">Layer 3 (Simulation Engine):</span> Test pricing scenarios and see the financial impact on revenue, margins, and cash flow
            </p>
            <p>
              <span className="text-green-400 font-semibold">Layer 4 (Output & Visualization):</span> View comprehensive dashboards showing revenue impact, margin sensitivity, and scenario comparisons
            </p>
          </div>
        </div>
      </main>

      {/* Detail Panel Modal */}
      {selectedLayer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-h-[90vh] overflow-y-auto w-full max-w-3xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedLayer(null)}
              className="sticky top-4 right-4 float-right p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
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
