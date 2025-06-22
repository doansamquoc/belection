import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ElectionOptionType } from "@/types/ElectionOptionType";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
  "#a4de6c",
];

interface VoteResultPieChartProps {
  options: ElectionOptionType[];
}

const VoteResultPieChart = ({ options }: VoteResultPieChartProps) => {
  const totalVotes = options.reduce((sum, o) => sum + o.voteCount!, 0);

  if (totalVotes === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4 text-center h-96'>
        <div className='w-20 h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
          <svg
            className='w-10 h-10 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
            />
          </svg>
        </div>
        <h3 className='text-xl font-semibold mb-2'>No votes yet</h3>
        <p className='text-muted-foreground max-w-sm leading-relaxed'>
          Vote results will be displayed here once people start voting on this
          election.
        </p>
      </div>
    );
  }

  const data = options.map((opt) => ({
    name: opt.text,
    value: opt.voteCount,
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize={14}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={120}
          fill='#8884d8'
          dataKey='value'
          label={renderCustomizedLabel}
          labelLine={false}
          className='outline-none'
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default VoteResultPieChart;
