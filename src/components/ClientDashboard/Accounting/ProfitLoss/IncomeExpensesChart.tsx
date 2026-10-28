import { MonthlyData } from "@/redux/features/accounting/accounting.type";
import incomicon from "@/assets/icons/income1.svg";
import expressicon from "@/assets/icons/express1.svg";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

interface IncomeExpensesChartProps {
  data: MonthlyData[];
}

const IncomeExpensesChart = ({ data }: IncomeExpensesChartProps) => {
  const formatTooltip = (value: number, name: string) => {
    return [
      `$${value.toLocaleString()}`,
      name.charAt(0).toUpperCase() + name.slice(1),
    ];
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "short" });
  };

  return (
    <div className="bg-[#0E2323] rounded-xl shadow-md p-8">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-medium text-white">Income vs Expenses</h1>

        <div className="flex gap-6 text-white text-base">
          <div className="flex items-center gap-4">
            <img src={incomicon} className="w-6 h-6" alt="Income" />
            <p className="text-[#01D449] font-medium">Income</p>
          </div>
          <div className="flex items-center gap-4">
            <img src={expressicon} className="w-6 h-6" alt="Expenses" />
            <p className="text-[#D31301] font-medium">Expenses</p>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#01D449" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#01D449" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D31301" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D31301" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#2C3A3A"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#969696" }}
              tickFormatter={formatDate}
              padding={{ left: 20 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#969696" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#17171A",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "1px solid #2C3A3A",
              }}
              itemStyle={{ color: "#fff" }}
              formatter={formatTooltip}
              labelFormatter={(label) => `Date: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#D31301"
              fill="url(#colorExpenses)"
              strokeWidth={2}
              name="Expenses"
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#01D449"
              fill="url(#colorIncome)"
              strokeWidth={2}
              name="Income"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpensesChart;
