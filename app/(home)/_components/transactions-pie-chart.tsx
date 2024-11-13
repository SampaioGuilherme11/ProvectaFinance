"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionsPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercenageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTIMENT]: {
    label: "Investimento",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Depósito",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionsPercentagePerType;
  despositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  despositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amout: despositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTIMENT,
      amout: investmentsTotal,
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.EXPENSE,
      amout: expensesTotal,
      fill: "#E93030",
    },
  ];
  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amout"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          <PercenageItem
            icon={
              <div className="rounded-lg bg-[#151B14] p-3">
                <TrendingUpIcon size={16} className="text-primary" />
              </div>
            }
            title="Ganhos"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercenageItem
            icon={
              <div className="rounded-lg bg-[#221114] p-3">
                <TrendingDownIcon size={16} className="text-red-500" />
              </div>
            }
            title="Gastos"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercenageItem
            icon={
              <div className="rounded-lg bg-[#29282A] p-3">
                <PiggyBankIcon size={16} />
              </div>
            }
            title="Investimentos"
            value={typesPercentage[TransactionType.INVESTIMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
