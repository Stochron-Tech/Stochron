import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Map, AlertTriangle, TrendingDown, Shield, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';

// Geographic revenue breakdown
const revenueByRegion = [
  { region: 'Americas', revenue: 169.7, percent: 44.2, risk: 28, riskLevel: 'Low', revenueAtRisk: 47.5 },
  { region: 'Europe', revenue: 95.1, percent: 24.8, risk: 34, riskLevel: 'Low-Medium', revenueAtRisk: 32.3 },
  { region: 'Greater China', revenue: 72.6, percent: 18.9, risk: 71, riskLevel: 'High', revenueAtRisk: 51.5 },
  { region: 'Japan', revenue: 24.3, percent: 6.3, risk: 22, riskLevel: 'Low', revenueAtRisk: 5.3 },
  { region: 'Rest of Asia Pacific', revenue: 22.2, percent: 5.8, risk: 46, riskLevel: 'Medium', revenueAtRisk: 10.2 },
];

const COLORS = {
  low: '#48cae4',
  lowMedium: '#90e0ef',
  medium: '#f7b801',
  mediumHigh: '#f77f00',
  high: '#d62828'
};

// Product category exposure
const productExposure = [
  { product: 'iPhone', revenue: 200.6, chinaExposure: 19.2, supplyRisk: 78, regulatoryRisk: 65 },
  { product: 'Mac', revenue: 29.4, chinaExposure: 15.3, supplyRisk: 72, regulatoryRisk: 42 },
  { product: 'iPad', revenue: 26.7, chinaExposure: 17.8, supplyRisk: 75, regulatoryRisk: 38 },
  { product: 'Wearables', revenue: 37.0, chinaExposure: 22.4, supplyRisk: 81, regulatoryRisk: 28 },
  { product: 'Services', revenue: 90.2, chinaExposure: 11.2, supplyRisk: 24, regulatoryRisk: 73 },
];

// Country risk index components
const countryRiskData = [
  { 
    country: 'China', 
    x: 68, // Revenue Dependency
    y: 82, // Geopolitical Risk
    z: 72.6, // Revenue in billions (bubble size)
    riskScore: 71,
    details: {
      political: 78,
      regulatory: 84,
      economic: 62,
      geopolitical: 89,
      operational: 68
    }
  },
  { 
    country: 'Taiwan', 
    x: 87, 
    y: 91, 
    z: 8.2,
    riskScore: 89,
    details: {
      political: 82,
      regulatory: 45,
      economic: 38,
      geopolitical: 95,
      operational: 92
    }
  },
  { 
    country: 'USA', 
    x: 44, 
    y: 32, 
    z: 169.7,
    riskScore: 28,
    details: {
      political: 35,
      regulatory: 54,
      economic: 22,
      geopolitical: 18,
      operational: 12
    }
  },
  { 
    country: 'Vietnam', 
    x: 62, 
    y: 58, 
    z: 12.3,
    riskScore: 55,
    details: {
      political: 64,
      regulatory: 52,
      economic: 48,
      geopolitical: 45,
      operational: 68
    }
  },
  { 
    country: 'India', 
    x: 48, 
    y: 52, 
    z: 18.9,
    riskScore: 48,
    details: {
      political: 58,
      regulatory: 72,
      economic: 44,
      geopolitical: 28,
      operational: 56
    }
  },
  { 
    country: 'Germany', 
    x: 31, 
    y: 28, 
    z: 28.4,
    riskScore: 26,
    details: {
      political: 22,
      regulatory: 48,
      economic: 24,
      geopolitical: 18,
      operational: 14
    }
  },
  { 
    country: 'UK', 
    x: 28, 
    y: 34, 
    z: 24.1,
    riskScore: 30,
    details: {
      political: 38,
      regulatory: 42,
      economic: 32,
      geopolitical: 22,
      operational: 16
    }
  },
  { 
    country: 'Japan', 
    x: 24, 
    y: 26, 
    z: 24.3,
    riskScore: 22,
    details: {
      political: 18,
      regulatory: 32,
      economic: 28,
      geopolitical: 24,
      operational: 12
    }
  },
];

// Department-level risk breakdown
const departmentRisk = [
  { department: 'Manufacturing & Operations', exposure: 89, riskScore: 78, impact: 'Critical' },
  { department: 'Sales & Distribution', exposure: 72, riskScore: 61, impact: 'High' },
  { department: 'R&D & Engineering', exposure: 45, riskScore: 42, impact: 'Medium' },
  { department: 'Supply Chain & Logistics', exposure: 93, riskScore: 84, impact: 'Critical' },
  { department: 'Services & Software', exposure: 34, riskScore: 52, impact: 'Medium' },
  { department: 'Marketing & Retail', exposure: 58, riskScore: 48, impact: 'Medium-High' },
];

export default function RiskExposureMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getCountryData = (country: string) => {
    return countryRiskData.find(c => c.country === country);
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return COLORS.high;
    if (risk >= 60) return COLORS.mediumHigh;
    if (risk >= 45) return COLORS.medium;
    if (risk >= 30) return COLORS.lowMedium;
    return COLORS.low;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Total Revenue at Risk</span>
            <DollarSign className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-foreground text-2xl">$146.8B</div>
          <div className="text-muted-foreground text-sm mt-1">38.2% of total revenue</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Highest Risk Region</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-foreground text-2xl">Greater China</div>
          <div className="text-red-400 text-sm mt-1">Risk Score: 71/100</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Manufacturing Exposure</span>
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-foreground text-2xl">89%</div>
          <div className="text-muted-foreground text-sm mt-1">Concentrated in Asia</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Countries Monitored</span>
            <Map className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">47</div>
          <div className="text-muted-foreground text-sm mt-1">Across 6 continents</div>
        </Card>
      </div>

      {/* Geographic Revenue & Risk Map */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-1">Geographic Revenue Distribution & Risk Exposure</h2>
        <p className="text-muted-foreground text-sm mb-6">
          FY2024 revenue by region with composite country risk scores and revenue-at-risk calculations
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Breakdown */}
          <div>
            <h3 className="text-foreground mb-4">Revenue by Region (FY2024)</h3>
            <div className="space-y-3">
              {revenueByRegion.map((region, idx) => (
                <div key={idx} className="bg-secondary/20 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground">{region.region}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            region.riskLevel === 'High' ? 'border-red-500 text-red-400' :
                            region.riskLevel.includes('Medium') ? 'border-amber-500 text-amber-400' :
                            'border-cyan-500 text-cyan-400'
                          }`}
                        >
                          {region.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        ${region.revenue}B ({region.percent}% of total)
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground">Risk: {region.risk}/100</div>
                      <div className="text-red-400 text-sm">${region.revenueAtRisk}B at risk</div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${region.risk}%`,
                        backgroundColor: getRiskColor(region.risk)
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution Chart */}
          <div>
            <h3 className="text-foreground mb-4">Revenue vs. Risk Score</h3>
            <div className="h-80 bg-secondary/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueByRegion} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    type="number"
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="region"
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1f36', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    fill="#48cae4" 
                    name="Revenue ($B)"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar 
                    dataKey="risk" 
                    fill="#f77f00" 
                    name="Risk Score"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Card>

      {/* Country Risk Scatter Plot */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-1">Country-Level Risk vs. Dependency Matrix</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Bubble chart: X-axis = Revenue Dependency, Y-axis = Geopolitical Risk, Bubble Size = Revenue Volume
        </p>

        <div className="h-96 bg-secondary/30 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Dependency"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                label={{ value: 'Revenue Dependency Score', position: 'insideBottom', offset: -10, fill: '#9ca3af' }}
                domain={[0, 100]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Risk"
                stroke="#9ca3af"
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                label={{ value: 'Geopolitical Risk Score', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                domain={[0, 100]}
              />
              <ZAxis type="number" dataKey="z" range={[100, 3000]} name="Revenue" />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#1a1f36', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#1a1f36] border border-[#374151] rounded-lg p-3">
                        <p className="text-foreground mb-2">{data.country}</p>
                        <p className="text-cyan-400 text-sm">Revenue: ${data.z}B</p>
                        <p className="text-amber-400 text-sm">Dependency: {data.x}/100</p>
                        <p className="text-red-400 text-sm">Geopolitical Risk: {data.y}/100</p>
                        <p className="text-muted-foreground text-sm mt-2 border-t border-border pt-2">
                          Overall Risk Score: {data.riskScore}/100
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {countryRiskData.map((entry, index) => (
                <Scatter 
                  key={entry.country}
                  name={entry.country} 
                  data={[entry]} 
                  fill={getRiskColor(entry.riskScore)}
                  onClick={() => setSelectedCountry(entry.country)}
                  cursor="pointer"
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.low }}></div>
            <span>Low Risk (0-30)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.medium }}></div>
            <span>Medium Risk (45-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS.high }}></div>
            <span>High Risk (70+)</span>
          </div>
        </div>

        {selectedCountry && (
          <div className="mt-6 p-5 bg-secondary/20 border border-primary/50 rounded-lg">
            <h3 className="text-foreground mb-3 flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              {selectedCountry} - Detailed Risk Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(getCountryData(selectedCountry)?.details || {}).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-muted-foreground text-xs mb-1 capitalize">{key}</div>
                  <div className={`text-lg ${getSentimentColor(100 - (value as number))}`}>
                    {value}/100
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Product Category Exposure */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-4">Product Category Risk Exposure</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Revenue and risk analysis by product line with China exposure and supply/regulatory risk scores
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground text-sm">Product Category</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">FY2024 Revenue</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">China Exposure</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">Supply Risk</th>
                <th className="text-right py-3 px-4 text-muted-foreground text-sm">Regulatory Risk</th>
              </tr>
            </thead>
            <tbody>
              {productExposure.map((product, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                  <td className="py-4 px-4 text-foreground">{product.product}</td>
                  <td className="py-4 px-4 text-right text-foreground">${product.revenue}B</td>
                  <td className="py-4 px-4 text-right">
                    <span className={product.chinaExposure > 18 ? 'text-red-400' : product.chinaExposure > 15 ? 'text-amber-400' : 'text-cyan-400'}>
                      {product.chinaExposure}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${product.supplyRisk}%`,
                            backgroundColor: getRiskColor(product.supplyRisk)
                          }}
                        ></div>
                      </div>
                      <span className={`${getRiskColor(product.supplyRisk)}`}>{product.supplyRisk}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${product.regulatoryRisk}%`,
                            backgroundColor: getRiskColor(product.regulatoryRisk)
                          }}
                        ></div>
                      </div>
                      <span style={{ color: getRiskColor(product.regulatoryRisk) }}>{product.regulatoryRisk}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Department Risk Analysis */}
      <Card className="p-6 bg-card border-border shadow-lg">
        <h2 className="text-primary mb-4">Department-Level Risk Assessment</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Organizational exposure to geopolitical and supply chain risks by functional area
        </p>

        <div className="space-y-3">
          {departmentRisk.map((dept, idx) => (
            <div key={idx} className="bg-secondary/20 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-foreground mb-1">{dept.department}</h3>
                  <p className="text-muted-foreground text-sm">
                    Exposure: {dept.exposure}% • Risk Score: {dept.riskScore}/100
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    dept.impact === 'Critical' ? 'border-red-500 text-red-400' :
                    dept.impact === 'High' ? 'border-amber-500 text-amber-400' :
                    'border-cyan-500 text-cyan-400'
                  }
                >
                  {dept.impact}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Geographic Exposure</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-cyan-400"
                      style={{ width: `${dept.exposure}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs mb-1">Composite Risk Score</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${dept.riskScore}%`,
                        backgroundColor: getRiskColor(dept.riskScore)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
        <h2 className="text-primary mb-4">Risk Mitigation Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="text-foreground mb-3">Geographic Diversification</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span>Accelerate manufacturing shift to India and Vietnam to reduce China dependency</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span>Expand revenue streams in Americas and Europe to offset China market risks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span>Develop alternative semiconductor sourcing beyond Taiwan (Samsung, Intel foundries)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-3">Operational Resilience</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Build strategic inventory buffers for critical components (6-9 month supply)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Strengthen Services revenue (higher margins, lower geopolitical exposure)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span>Proactive regulatory engagement in EU and China to manage compliance risks</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function getSentimentColor(sentiment: number) {
  if (sentiment >= 75) return 'text-green-400';
  if (sentiment >= 60) return 'text-cyan-400';
  if (sentiment >= 45) return 'text-amber-400';
  return 'text-red-400';
}
