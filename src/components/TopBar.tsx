import { Calendar, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Stock } from "../types";

interface TopBarProps {
  stocks: Stock[];
  selectedStockId: number | null;
  setSelectedStockId: (stockId: number) => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
}

export function TopBar({
  stocks,
  selectedStockId,
  setSelectedStockId,
  dateRange,
  setDateRange,
}: TopBarProps) {
  setDateRange;
  const selectedStock = stocks.find((s) => s.id === selectedStockId);
  return (
    <div className="border-b border-gray-800 bg-[#0d1117] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-cyan-400">
                Global Market Risk Analysis
              </h1>
              <p className="text-xs text-gray-500">
                Geopolitical & Macroeconomic Intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stock Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">
              Stock:
            </label>
            <Select
              value={selectedStockId?.toString() || ""}
              onValueChange={(value) => setSelectedStockId(Number(value))}
            >
              <SelectTrigger className="w-32 border-gray-700 bg-[#161b22] text-gray-100">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-[#161b22]">
                {stocks.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name} ({s.ticker})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-[#161b22] px-3 py-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-300">
              {new Date(dateRange.start).toLocaleDateString()} -{" "}
              {new Date(dateRange.end).toLocaleDateString()}
            </span>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
            <span className="text-xs text-gray-400">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}