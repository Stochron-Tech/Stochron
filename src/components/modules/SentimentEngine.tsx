import { MessageSquare } from "lucide-react";
import {
  Line,
  // LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ComposedChart,
  // Bar,
} from "recharts";
import type { ScenarioType } from "../../App";

interface SentimentEngineProps {
  stock: string;
  scenario: ScenarioType;
}

export function SentimentEngine({
  stock,
  scenario,
}: SentimentEngineProps) {
  // Generate mock sentiment data
  stock;
  
  const generateSentimentData = () => {
    const data = [];
    const today = new Date("2025-10-26");

    for (let i = -90; i <= 0; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      let sentiment = 0.3 + Math.sin(i / 20) * 0.4;
      let price = 175 + Math.sin(i / 30) * 15;

      // Apply scenario-based sentiment shifts
      if (scenario === "russia-ukraine" && i > -30) {
        sentiment -= 0.5;
      } else if (scenario === "us-china" && i > -30) {
        sentiment -= 0.3;
      } else if (scenario === "red-sea" && i > -30) {
        sentiment -= 0.2;
      }

      data.push({
        date: date.toISOString().split("T")[0],
        sentiment: Number(sentiment.toFixed(3)),
        price: Number(price.toFixed(2)),
        newsVolume: Math.floor(50 + Math.random() * 100),
      });
    }

    return data;
  };

  const data = generateSentimentData();

  // Calculate correlation
  const calculateCorrelation = () => {
    const sentiments = data.map((d) => d.sentiment);
    const prices = data.map((d) => d.price);

    const meanSent =
      sentiments.reduce((a, b) => a + b) / sentiments.length;
    const meanPrice =
      prices.reduce((a, b) => a + b) / prices.length;

    let num = 0,
      denSent = 0,
      denPrice = 0;
    for (let i = 0; i < sentiments.length; i++) {
      num +=
        (sentiments[i] - meanSent) * (prices[i] - meanPrice);
      denSent += Math.pow(sentiments[i] - meanSent, 2);
      denPrice += Math.pow(prices[i] - meanPrice, 2);
    }

    const correlation = num / Math.sqrt(denSent * denPrice);
    return correlation;
  };

  const correlation = calculateCorrelation();
  const rSquared = correlation * correlation;

  const currentSentiment = data[data.length - 1].sentiment;
  const avgSentiment =
    data.reduce((sum, d) => sum + d.sentiment, 0) / data.length;

  return (
    <div className="rounded-lg border border-gray-700 bg-[#0d1117] p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm text-cyan-400">
            Module B: Sentiment & Event Signals
          </h3>
        </div>
      </div>

      {/* Sentiment Metrics */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="rounded border border-gray-700 bg-[#161b22] p-2">
          <div className="text-xs text-gray-400">Current</div>
          <div
            className={`mt-1 ${currentSentiment >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {currentSentiment >= 0 ? "+" : ""}
            {currentSentiment.toFixed(2)}
          </div>
        </div>
        <div className="rounded border border-gray-700 bg-[#161b22] p-2">
          <div className="text-xs text-gray-400">
            90-Day Avg
          </div>
          <div
            className={`mt-1 ${avgSentiment >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {avgSentiment >= 0 ? "+" : ""}
            {avgSentiment.toFixed(2)}
          </div>
        </div>
        <div className="rounded border border-gray-700 bg-[#161b22] p-2">
          <div className="text-xs text-gray-400">
            Correlation R²
          </div>
          <div className="mt-1 text-cyan-400">
            {rSquared.toFixed(3)}
          </div>
        </div>
      </div>

      {/* Sentiment vs Price Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
            />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              interval={20}
            />
            <YAxis
              yAxisId="left"
              stroke="#06b6d4"
              tick={{ fontSize: 10 }}
              domain={[-1, 1]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "10px" }} />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sentiment"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              name="Sentiment Index"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="price"
              stroke="#9ca3af"
              strokeWidth={1}
              dot={false}
              name="Stock Price"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Event Spike Detector */}
      <div className="mt-4 rounded border border-amber-500/30 bg-amber-500/5 p-3">
        <div className="mb-2 text-xs text-amber-400">
          Event Spike Detector
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              Oct 15: FAA Investigation News
            </span>
            <span className="text-red-400">-0.42</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">
              Oct 3: Positive Earnings Preview
            </span>
            <span className="text-green-400">+0.28</span>
          </div>
        </div>
      </div>
    </div>
  );
}