import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { LayerPopup } from '../components/DigitalTwin/LayerPopup';

export default function DigitalTwinPage() {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [variables, setVariables] = useState({
    dcRevenue: 10000,
    dcGrossMargin: 55,
    cgRevenue: 5000,
    cgGrossMargin: 42,
    embeddedRevenue: 3000,
    embeddedGrossMargin: 38,
    priceElasticity: -1.2,
    capacityConstraint: 85,
    priceAdjustment: 0,
    demandShift: 0,
  });

  const metrics = useMemo(() => {
    const dcProfit = (variables.dcRevenue * variables.dcGrossMargin) / 100;
    const cgProfit = (variables.cgRevenue * variables.cgGrossMargin) / 100;
    const embeddedProfit = (variables.embeddedRevenue * variables.embeddedGrossMargin) / 100;

    const totalRevenue = variables.dcRevenue + variables.cgRevenue + variables.embeddedRevenue;
    const totalProfit = dcProfit + cgProfit + embeddedProfit;
    const grossMargin = (totalProfit / totalRevenue) * 100;

    // Adjust for scenario
    const adjustedRevenue = totalRevenue * (1 + variables.priceAdjustment / 100) * (1 + variables.demandShift / 100);
    const adjustedProfit = adjustedRevenue * (grossMargin / 100);

    return {
      totalRevenue: adjustedRevenue,
      totalGrossProfit: adjustedProfit,
      grossMargin: (adjustedProfit / adjustedRevenue) * 100,
      segmentData: [
        { name: 'Data Center', revenue: variables.dcRevenue, profit: dcProfit, margin: variables.dcGrossMargin },
        { name: 'Client & Gaming', revenue: variables.cgRevenue, profit: cgProfit, margin: variables.cgGrossMargin },
        { name: 'Embedded', revenue: variables.embeddedRevenue, profit: embeddedProfit, margin: variables.embeddedGrossMargin },
      ]
    };
  }, [variables]);

  const updateVariable = (key: string, value: number) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  const quadrants = [
    {
      layer: 1,
      title: 'Layer 1: Data Integration',
      subtitle: 'Business Foundation',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300',
      icon: '🏗️',
      preview: `Revenue: $${(metrics.segmentData.reduce((sum, s) => sum + s.revenue, 0) / 1000).toFixed(1)}B`,
    },
    {
      layer: 2,
      title: 'Layer 2: Behavioral Models',
      subtitle: 'Market Response',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-300',
      icon: '⚙️',
      preview: `Elasticity: ${variables.priceElasticity.toFixed(1)}`,
    },
    {
      layer: 3,
      title: 'Layer 3: Simulation Engine',
      subtitle: 'What-If Analysis',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      icon: '🎯',
      preview: `Price Adj: ${variables.priceAdjustment.toFixed(0)}%`,
    },
    {
      layer: 4,
      title: 'Layer 4: Output & Visualization',
      subtitle: 'Decision Dashboards',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-300',
      icon: '📊',
      preview: `Revenue: $${(metrics.totalRevenue / 1000).toFixed(1)}B`,
    },
  ];

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
            Back to Agentic Manager
          </button>
          <h1 className="text-lg font-bold text-slate-900">Digital Twin Framework</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-2">AMD's 4-Layer Digital Twin</h2>
          <p className="text-lg text-slate-600">Click any layer to adjust variables and see real-time impact on revenue</p>
        </div>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {quadrants.map((quad) => (
            <button
              key={quad.layer}
              onClick={() => setSelectedLayer(quad.layer)}
              className={`${quad.bgColor} rounded-2xl border-2 ${quad.borderColor} p-8 text-left hover:shadow-lg hover:scale-105 transition-all duration-300 group`}
            >
              {/* Header with icon and title */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-4xl mb-3">{quad.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900">{quad.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{quad.subtitle}</p>
                </div>
              </div>

              {/* Preview data */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600 font-medium">Current State</p>
                <p className="text-lg font-bold text-slate-900 mt-1">{quad.preview}</p>
              </div>

              {/* Click indicator */}
              <div className="mt-4 text-sm font-semibold text-slate-700 group-hover:translate-x-1 transition-transform">
                Click to explore →
              </div>
            </button>
          ))}
        </div>

        {/* Layer Popup */}
        <LayerPopup
          layer={selectedLayer || 1}
          isOpen={selectedLayer !== null}
          onClose={() => setSelectedLayer(null)}
          variables={variables}
          updateVariable={updateVariable}
          metrics={metrics}
        />
      </main>
    </div>
  );
}
