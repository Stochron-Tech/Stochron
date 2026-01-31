import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Zap, Globe } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Navigation Bar */}
      <nav className="border-b border-blue-200/40 bg-white/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Stochron
            </span>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-100/60 rounded-full border border-blue-200">
                <span className="text-sm font-medium text-blue-700">AI-Powered Pricing Intelligence</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                Businesses Can't Price Fast Enough for Trade Volatility
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                In today's volatile geopolitical landscape, pricing decisions that worked yesterday won't work tomorrow. Supply chains shift. Tariffs change overnight. Competitors react instantly.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">The Problem</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">•</span>
                  </div>
                  <span className="text-slate-700">
                    <strong>Delayed reactions:</strong> Traditional pricing takes weeks to adjust. By then, market windows close.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">•</span>
                  </div>
                  <span className="text-slate-700">
                    <strong>Incomplete visibility:</strong> Teams lack real-time data on geopolitical impacts across supply chains.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">•</span>
                  </div>
                  <span className="text-slate-700">
                    <strong>Disconnected models:</strong> Pricing, supply chain, and financial impact analysis happen in silos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-600 font-bold text-sm">•</span>
                  </div>
                  <span className="text-slate-700">
                    <strong>Margin erosion:</strong> Slow pricing adaptation means lost revenue and competitive disadvantage.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Our Solution</h2>
              <p className="text-slate-700 leading-relaxed">
                Stochron combines real-time geopolitical intelligence with a digital twin of your business. Get instant pricing recommendations based on what's actually happening in the world—not what happened last month.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/agentic-manager')}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold flex items-center justify-center gap-2"
              >
                See How It Works <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/digital-twin')}
                className="px-8 py-3 bg-white border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                Explore Digital Twin
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-3xl blur-3xl"></div>
              
              {/* Cards visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 w-full">
                  {/* Card 1 - Geopolitical */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 transform hover:translate-y-[-4px] transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-slate-900">Real-time Geopolitical Data</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full"></div>
                  </div>

                  {/* Card 2 - Digital Twin */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-teal-100/50 transform hover:translate-y-[-4px] transition-transform ml-8">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-5 h-5 text-teal-500" />
                      <span className="font-semibold text-slate-900">Digital Twin Analysis</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-teal-300 to-teal-100 rounded-full"></div>
                  </div>

                  {/* Card 3 - Pricing */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100/50 transform hover:translate-y-[-4px] transition-transform">
                    <div className="flex items-center gap-3 mb-3">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <span className="font-semibold text-slate-900">Instant Price Recommendations</span>
                    </div>
                    <div className="h-2 bg-gradient-to-r from-amber-300 to-amber-100 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">How Stochron Works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our integrated platform combines three powerful components to deliver real-time pricing intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Geopolitical Intelligence</h3>
              <p className="text-slate-600">
                Real-time monitoring of global events, sanctions, trade policies, and supply chain disruptions
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-teal-100/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Digital Twin Platform</h3>
              <p className="text-slate-600">
                A four-layer model of your business integrating financials, operations, demand, and pricing dynamics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Agentic Decision Engine</h3>
              <p className="text-slate-600">
                AI agents that synthesize geopolitical data with your digital twin to recommend optimal pricing in real-time
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl p-12 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Ready to Price Faster?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Experience how Stochron helps businesses adapt pricing instantly to geopolitical volatility
          </p>
          <button
            onClick={() => navigate('/agentic-manager')}
            className="px-8 py-3 bg-white text-teal-600 rounded-lg hover:shadow-lg transition-shadow font-semibold inline-flex items-center gap-2"
          >
            Explore Agentic Manager <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-blue-200/40 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-900">Stochron</span>
            </div>
            <p className="text-slate-600 text-sm">
              Geopolitical Intelligence × Digital Twin × Real-time Pricing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
