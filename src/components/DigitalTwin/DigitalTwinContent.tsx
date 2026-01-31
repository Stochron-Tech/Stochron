import { BarChart3, TrendingUp, Zap, LineChart } from 'lucide-react';

interface DigitalTwinContentProps {
  layerType: 'layer1' | 'layer2' | 'layer3' | 'layer4';
  onSelect: () => void;
}

export function DigitalTwinContent({ layerType, onSelect }: DigitalTwinContentProps) {
  const layerConfig = {
    layer1: {
      title: 'Data Integration',
      subtitle: 'Business Foundation',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300',
      textColor: 'text-blue-700',
      preview: 'Revenue • Operations • Pricing • Channels',
      description: 'Core business data across all segments'
    },
    layer2: {
      title: 'Behavioral Models',
      subtitle: 'Market Response',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-300',
      textColor: 'text-purple-700',
      preview: 'Elasticity • Demand • Costs • Capacity',
      description: 'How your business responds to changes'
    },
    layer3: {
      title: 'Simulation Engine',
      subtitle: 'What-If Analysis',
      icon: Zap,
      color: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
      preview: 'Pricing Scenarios • Constraints • Outcomes',
      description: 'Test scenarios and predict results'
    },
    layer4: {
      title: 'Output & Visualization',
      subtitle: 'Decision Dashboards',
      icon: LineChart,
      color: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-300',
      textColor: 'text-amber-700',
      preview: 'Dashboards • Revenue Impact • Sensitivity',
      description: 'Executive decision-making insights'
    }
  };

  const config = layerConfig[layerType];
  const Icon = config.icon;

  return (
    <button
      onClick={onSelect}
      className={`bg-gradient-to-br ${config.bgGradient} border-2 ${config.borderColor} rounded-2xl p-8 text-left transition-all hover:shadow-xl hover:scale-105 group`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className={`px-3 py-1 bg-gradient-to-r ${config.color} rounded-full shadow-md`}>
          <span className="text-xs font-bold text-white">{layerType.toUpperCase()}</span>
        </div>
      </div>

      <h3 className={`text-2xl font-bold ${config.textColor} mb-1 group-hover:translate-x-1 transition-transform`}>
        {config.title}
      </h3>
      <p className="text-sm text-slate-600 mb-4">{config.subtitle}</p>

      <p className={`text-sm font-medium ${config.textColor} mb-6`}>
        {config.preview}
      </p>

      <p className="text-sm text-slate-600 mb-4">
        {config.description}
      </p>

      <div className={`text-sm font-bold ${config.textColor} group-hover:translate-x-2 transition-transform`}>
        Explore Layer →
      </div>
    </button>
  );
}
