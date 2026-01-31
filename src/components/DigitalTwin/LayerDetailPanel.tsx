import { useState, useMemo } from 'react';
import { Layer1Data } from './layers/Layer1Data';
import { Layer2Data } from './layers/Layer2Data';
import { Layer3Data } from './layers/Layer3Data';
import { Layer4Data } from './layers/Layer4Data';

type LayerType = 'layer1' | 'layer2' | 'layer3' | 'layer4';

interface LayerDetailPanelProps {
  layerType: LayerType;
  onClose: () => void;
}

export function LayerDetailPanel({ layerType, onClose }: LayerDetailPanelProps) {
  const [variables, setVariables] = useState({
    // Layer 1 - Data Integration
    dcRevenue: 15000,
    dcGrossMargin: 60,
    cgRevenue: 8500,
    cgGrossMargin: 45,
    embeddedRevenue: 2300,
    embeddedGrossMargin: 42,
    
    // Layer 2 - Behavioral Models
    dcElasticity: -0.5,
    cgElasticity: -1.2,
    embeddedElasticity: -1.5,
    dcCapacity: 100,
    
    // Layer 3 - Simulation
    dcPriceMultiplier: 1.0,
    cgPriceMultiplier: 1.0,
    embeddedPriceMultiplier: 1.0,
  });

  const updateVariable = (key: string, value: number) => {
    setVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const computedMetrics = useMemo(() => {
    // Calculate total revenue
    const dcAdjustedRevenue = variables.dcRevenue * variables.dcPriceMultiplier;
    const cgAdjustedRevenue = variables.cgRevenue * variables.cgPriceMultiplier;
    const embeddedAdjustedRevenue = variables.embeddedRevenue * variables.embeddedPriceMultiplier;
    
    const totalRevenue = dcAdjustedRevenue + cgAdjustedRevenue + embeddedAdjustedRevenue;

    // Calculate gross profit
    const dcGrossProfit = (dcAdjustedRevenue * variables.dcGrossMargin) / 100;
    const cgGrossProfit = (cgAdjustedRevenue * variables.cgGrossMargin) / 100;
    const embeddedGrossProfit = (embeddedAdjustedRevenue * variables.embeddedGrossMargin) / 100;
    
    const totalGrossProfit = dcGrossProfit + cgGrossProfit + embeddedGrossProfit;
    const grossMargin = (totalGrossProfit / totalRevenue) * 100 || 0;

    // Calculate segment breakdown
    const dcShare = (dcAdjustedRevenue / totalRevenue) * 100 || 0;
    const cgShare = (cgAdjustedRevenue / totalRevenue) * 100 || 0;
    const embeddedShare = (embeddedAdjustedRevenue / totalRevenue) * 100 || 0;

    return {
      totalRevenue,
      totalGrossProfit,
      grossMargin,
      dcAdjustedRevenue,
      cgAdjustedRevenue,
      embeddedAdjustedRevenue,
      dcShare,
      cgShare,
      embeddedShare
    };
  }, [variables]);

  return (
    <div className="space-y-8">
      {layerType === 'layer1' && (
        <Layer1Data variables={variables} updateVariable={updateVariable} metrics={computedMetrics} />
      )}
      {layerType === 'layer2' && (
        <Layer2Data variables={variables} updateVariable={updateVariable} />
      )}
      {layerType === 'layer3' && (
        <Layer3Data variables={variables} updateVariable={updateVariable} metrics={computedMetrics} />
      )}
      {layerType === 'layer4' && (
        <Layer4Data variables={variables} metrics={computedMetrics} />
      )}
    </div>
  );
}
