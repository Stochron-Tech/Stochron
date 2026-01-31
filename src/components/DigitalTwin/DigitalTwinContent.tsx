import { BarChart3, TrendingUp, Zap, LineChart } from 'lucide-react';

interface DigitalTwinContentProps {
  layerType: 'layer1' | 'layer2' | 'layer3' | 'layer4';
  onSelect: () => void;
}

export function DigitalTwinContent({ layerType, onSelect }: DigitalTwinContentProps) {
  const layerConfig = {
    layer1: {
      title: 'Layer 1: Data Integration',
      subtitle: 'Business Foundation',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500/30 hover:border-blue-500/60',
      preview: 'Revenue • Operations • Pricing • Channels',
      description: 'Core business data across all segments'
    },
    layer2: {
      title: 'Layer 2: Behavioral Models',
      subtitle: 'Market Response',
      icon: TrendingUp,
      color: 'from-teal-500 to-teal-600',
      borderColor: 'border-teal-500/30 hover:border-teal-500/60',
      preview: 'Elasticity • Demand • Costs • Capacity',
      description: 'How your business responds to changes'
    },
    layer3: {
      title: 'Layer 3: Simulation Engine',
      subtitle: 'What-If Analysis',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/30 hover:border-amber-500/60',
      preview: 'Pricing Scenarios • Constraints • Outcomes',
      description: 'Test scenarios and predict results'
    },
    layer4: {
      title: 'Layer 4: Output & Visualization',
      subtitle: 'Decision Dashboards',
      icon: LineChart,
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/30 hover:border-green-500/60',
      preview: 'Dashboards • Revenue Impact • Sensitivity',
      description: 'Executive decision-making insights'
    }
  };

  const config = layerConfig[layerType];
  const Icon = config.icon;

  return (
    <button
      onClick={onSelect}
      className={`bg-gradient-to-br ${config.color} bg-opacity-5 border-2 ${config.borderColor} rounded-2xl p-8 text-left transition-all hover:shadow-xl hover:bg-opacity-10 group`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="px-3 py-1 bg-slate-700/50 rounded-full">
          <span className="text-xs font-semibold text-slate-300">{layerType.toUpperCase()}</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">
        {config.title}
      </h3>
      <p className="text-sm text-slate-400 mb-4">{config.subtitle}</p>

      <p className="text-sm text-slate-300 mb-6 line-clamp-2">
        {config.preview}
      </p>

      <p className="text-xs text-slate-400 mb-4">
        {config.description}
      </p>

      <div className="text-sm text-slate-300 font-medium group-hover:translate-x-1 transition-transform">
        Click to explore →
      </div>
    </button>
  );
}
