import { Calendar, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TopBarProps {
  selectedStock: string;
  setSelectedStock: (stock: string) => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
}

export function TopBar({
  selectedStock,
  setSelectedStock,
  dateRange,
  setDateRange,
}: TopBarProps) {
  setDateRange;
  return (
    <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 shadow-md">
              <TrendingUp className="h-6 w-6 text-sky-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Global Market Risk Analysis
              </h1>
              <p className="text-sm text-slate-500">
                Geopolitical & Macroeconomic Intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stock Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">
              Stock:
            </label>
            <Select
              value={selectedStock}
              onValueChange={setSelectedStock}
            >
              <SelectTrigger className="w-36 border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-slate-200 bg-white">
                <SelectItem value="BA">Boeing (BA)</SelectItem>
                <SelectItem value="AAPL">
                  Apple (AAPL)
                </SelectItem>
                <SelectItem value="TSLA">
                  Tesla (TSLA)
                </SelectItem>
                <SelectItem value="XOM">Exxon (XOM)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Calendar className="h-4 w-4 text-sky-500" />
            <span className="text-sm font-medium text-slate-700">
              {new Date(dateRange.start).toLocaleDateString()} -{" "}
              {new Date(dateRange.end).toLocaleDateString()}
            </span>
          </div>

          {/* Live Indicator */}
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-50 to-blue-50 px-3 py-1 border border-sky-200">
            <div className="h-2 w-2 animate-pulse rounded-full bg-sky-500 shadow-lg"></div>
            <span className="text-sm font-medium text-sky-700">
              Live Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
