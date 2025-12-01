import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, AlertTriangle, TrendingUp, TrendingDown, Info, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface Event {
  id: string;
  date: string;
  title: string;
  category: 'geopolitical' | 'regulatory' | 'supply_chain' | 'corporate' | 'macro';
  severity: number; // 1-10
  impact1d: number;
  impact5d: number;
  impact30d: number;
  affectedModules: string[];
  status: 'ongoing' | 'resolved' | 'escalating';
  description: string;
}

const events: Event[] = [
  {
    id: '1',
    date: '2024-03-21',
    title: 'DOJ Antitrust Lawsuit Filed',
    category: 'regulatory',
    severity: 8,
    impact1d: -2.3,
    impact5d: -4.7,
    impact30d: -3.2,
    affectedModules: ['Forecasting Engine', 'Risk Exposure Map'],
    status: 'ongoing',
    description: 'US Department of Justice filed major antitrust lawsuit targeting App Store business model and ecosystem lock-in practices. Seeks structural remedies potentially forcing App Store revenue model changes.'
  },
  {
    id: '2',
    date: '2024-06-10',
    title: 'WWDC AI Features Announcement',
    category: 'corporate',
    severity: 9,
    impact1d: +3.8,
    impact5d: +6.2,
    impact30d: +8.1,
    affectedModules: ['Forecasting Engine', 'Foreboding-Lag Module'],
    status: 'ongoing',
    description: 'Apple Intelligence announced with on-device AI processing, ChatGPT integration, and developer APIs. Significant positive sentiment shift; AI feature parity with competitors achieved.'
  },
  {
    id: '3',
    date: '2024-09-09',
    title: 'iPhone 16 Launch Event',
    category: 'corporate',
    severity: 8,
    impact1d: +2.1,
    impact5d: +3.4,
    impact30d: +1.2,
    affectedModules: ['Forecasting Engine', 'Foreboding-Lag Module'],
    status: 'resolved',
    description: 'iPhone 16 series unveiled with A18 chip, improved cameras, and AI features. Pre-order demand strong in US/Europe but softer China response. Pricing maintained; no major surprises.'
  },
  {
    id: '4',
    date: '2023-08-09',
    title: 'China Government iPhone Ban Expansion',
    category: 'geopolitical',
    severity: 9,
    impact1d: -3.6,
    impact5d: -6.8,
    impact30d: -4.3,
    affectedModules: ['Risk Exposure Map', 'Supply Chain Vulnerability'],
    status: 'escalating',
    description: 'Chinese government expands iPhone usage restrictions to state-owned enterprises and government-affiliated institutions. Estimated impact on ~5-8% of China market demand.'
  },
  {
    id: '5',
    date: '2024-08-01',
    title: 'CHIPS Act Funding Award (Intel/Samsung)',
    category: 'supply_chain',
    severity: 6,
    impact1d: +0.8,
    impact5d: +1.2,
    impact30d: +2.1,
    affectedModules: ['Supply Chain Vulnerability', 'Risk Exposure Map'],
    status: 'ongoing',
    description: 'US government awards CHIPS Act funding to Intel and Samsung for domestic semiconductor manufacturing. Long-term positive for reducing TSMC dependency, though 2027+ timeline.'
  },
  {
    id: '6',
    date: '2024-04-03',
    title: 'Taiwan Earthquake (7.4 Magnitude)',
    category: 'supply_chain',
    severity: 7,
    impact1d: -1.9,
    impact5d: -2.4,
    impact30d: +0.3,
    affectedModules: ['Supply Chain Vulnerability', 'Forecasting Engine'],
    status: 'resolved',
    description: 'Major earthquake strikes Taiwan; TSMC fabs temporarily evacuated. Production resumed within 48 hours with minimal damage. Market overreaction corrected quickly; highlighted Taiwan risk.'
  },
  {
    id: '7',
    date: '2024-07-25',
    title: 'Fed Rate Hold + Dovish Pivot Signal',
    category: 'macro',
    severity: 7,
    impact1d: +2.8,
    impact5d: +4.6,
    impact30d: +3.9,
    affectedModules: ['Forecasting Engine', 'Macro-Correlation Engine'],
    status: 'ongoing',
    description: 'Federal Reserve holds rates at 5.25-5.50% and signals potential September rate cut. Powell acknowledges inflation progress. Tech stocks rally on lower discount rate expectations.'
  },
  {
    id: '8',
    date: '2024-02-28',
    title: 'EU Digital Markets Act Compliance Deadline',
    category: 'regulatory',
    severity: 6,
    impact1d: -1.2,
    impact5d: -1.8,
    impact30d: -0.6,
    affectedModules: ['Risk Exposure Map', 'Forecasting Engine'],
    status: 'ongoing',
    description: 'Apple forced to allow alternative app stores and payment systems in EU. Revenue impact estimated at €500M-1B annually. Compliance model sets precedent for other jurisdictions.'
  },
  {
    id: '9',
    date: '2023-11-15',
    title: 'US-China Summit (Biden-Xi Meeting)',
    category: 'geopolitical',
    severity: 8,
    impact1d: +2.3,
    impact5d: +3.1,
    impact30d: +1.4,
    affectedModules: ['Risk Exposure Map', 'Foreboding-Lag Module'],
    status: 'resolved',
    description: 'Biden-Xi summit in San Francisco produces agreement to resume military communications and modest de-escalation. Tech sector benefits from reduced decoupling rhetoric.'
  },
  {
    id: '10',
    date: '2024-05-20',
    title: 'India Manufacturing Milestone (5% iPhone Production)',
    category: 'supply_chain',
    severity: 5,
    impact1d: +0.4,
    impact5d: +0.9,
    impact30d: +1.6,
    affectedModules: ['Supply Chain Vulnerability', 'Risk Exposure Map'],
    status: 'ongoing',
    description: 'Apple achieves 5% of global iPhone production in India (up from 1% in 2022). Foxconn and Tata partnerships ramping. Target 25% by 2026 as China diversification accelerates.'
  },
];

const categoryColors = {
  geopolitical: 'border-red-500 text-red-400',
  regulatory: 'border-amber-500 text-amber-400',
  supply_chain: 'border-purple-500 text-purple-400',
  corporate: 'border-cyan-500 text-cyan-400',
  macro: 'border-green-500 text-green-400',
};

const statusColors = {
  ongoing: 'border-cyan-500 text-cyan-400',
  resolved: 'border-green-500 text-green-400',
  escalating: 'border-red-500 text-red-400',
};

export default function EventTimelineTracker() {
  const [filter, setFilter] = useState<string>('all');
  const [addEventOpen, setAddEventOpen] = useState(false);

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.category === filter);

  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Total Events Tracked</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">{events.length}</div>
          <div className="text-muted-foreground text-sm mt-1">Last 18 months</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Ongoing Events</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-foreground text-2xl">
            {events.filter(e => e.status === 'ongoing').length}
          </div>
          <div className="text-muted-foreground text-sm mt-1">Active monitoring</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Escalating Risks</span>
            <TrendingUp className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-foreground text-2xl">
            {events.filter(e => e.status === 'escalating').length}
          </div>
          <div className="text-red-400 text-sm mt-1">Requires action</div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm">Avg Severity</span>
            <Info className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-foreground text-2xl">
            {(events.reduce((sum, e) => sum + e.severity, 0) / events.length).toFixed(1)}/10
          </div>
          <div className="text-muted-foreground text-sm mt-1">High impact</div>
        </Card>
      </div>

      {/* Filter and Add */}
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'geopolitical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('geopolitical')}
            >
              Geopolitical
            </Button>
            <Button
              variant={filter === 'regulatory' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('regulatory')}
            >
              Regulatory
            </Button>
            <Button
              variant={filter === 'supply_chain' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('supply_chain')}
            >
              Supply Chain
            </Button>
            <Button
              variant={filter === 'corporate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('corporate')}
            >
              Corporate
            </Button>
            <Button
              variant={filter === 'macro' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('macro')}
            >
              Macroeconomic
            </Button>
          </div>
          
          <Dialog open={addEventOpen} onOpenChange={setAddEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Event Title</label>
                  <Input placeholder="e.g., New Trade Policy Announcement" className="bg-secondary border-border" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Description</label>
                  <Textarea placeholder="Event details and impact..." className="bg-secondary border-border" rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Date</label>
                    <Input type="date" className="bg-secondary border-border" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Severity (1-10)</label>
                    <Input type="number" min="1" max="10" placeholder="8" className="bg-secondary border-border" />
                  </div>
                </div>
                <Button className="w-full">Add Event to Timeline</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {sortedEvents.map((event, idx) => (
            <div 
              key={event.id} 
              className="relative bg-secondary/20 border border-border rounded-lg p-5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className={categoryColors[event.category]}>
                      {event.category.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={statusColors[event.status]}>
                      {event.status.toUpperCase()}
                    </Badge>
                    <span className="text-muted-foreground text-sm">{event.date}</span>
                  </div>
                  <h3 className="text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {event.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="mb-2">
                    <span className="text-muted-foreground text-xs">Severity</span>
                    <div className="text-foreground text-xl">{event.severity}/10</div>
                  </div>
                  <div className="w-16 bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${event.severity * 10}%`,
                        backgroundColor: event.severity >= 8 ? '#d62828' : event.severity >= 6 ? '#f77f00' : '#48cae4'
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="text-muted-foreground text-xs mb-1">1-Day Impact</div>
                  <div className={`${event.impact1d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {event.impact1d > 0 ? '+' : ''}{event.impact1d}%
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="text-muted-foreground text-xs mb-1">5-Day Impact</div>
                  <div className={`${event.impact5d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {event.impact5d > 0 ? '+' : ''}{event.impact5d}%
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="text-muted-foreground text-xs mb-1">30-Day Impact</div>
                  <div className={`${event.impact30d > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {event.impact30d > 0 ? '+' : ''}{event.impact30d}%
                  </div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-xs">Affected Modules: </span>
                <span className="text-cyan-400 text-xs">{event.affectedModules.join(' • ')}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pattern Analysis */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-border">
        <h2 className="text-primary mb-4">Event Pattern Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="text-foreground mb-3">Seasonal Patterns</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">Q2:</span> WWDC developer conference (June) typically generates positive sentiment; product roadmap clarity</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">Q3:</span> iPhone launch events (September) high-volatility period; pre-order/sales data critical</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">•</span>
                <span><span className="text-foreground">Q4:</span> Holiday sales season; regulatory year-end deadline activity (EU, China)</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-foreground mb-3">Event Response Times</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span><span className="text-foreground">Geopolitical events:</span> Average 5-day recovery period; market overreacts then corrects</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span><span className="text-foreground">Regulatory actions:</span> Protracted impact (30+ days); requires fundamental model revision</span>
              </li>
              <li className="flex gap-2">
                <span className="text-amber-400">•</span>
                <span><span className="text-foreground">Product launches:</span> Immediate impact (1-3 days); sustained if execution strong</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
