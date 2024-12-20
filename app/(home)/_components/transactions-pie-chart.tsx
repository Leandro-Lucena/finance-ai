"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardTitle } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentPerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receitas",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typesPercentage: TransactionPercentPerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];
  return (
    <ScrollArea className="rounded-md border">
      <Card className="flex flex-col border-none p-4">
        <CardTitle className="m-2 mb-0 font-bold">
          Composição financeira
        </CardTitle>
        <CardContent className="flex-1 p-0">
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
                dataKey="amount"
                nameKey="type"
                innerRadius={50}
              />
            </PieChart>
          </ChartContainer>
          <div className="space-y-3">
            <PercentageItem
              icon={<TrendingUpIcon size={20} className="text-green-500" />}
              title="Receitas"
              value={typesPercentage[TransactionType.DEPOSIT]}
            />
            <PercentageItem
              icon={<TrendingDownIcon size={20} className="text-red-500" />}
              title="Despesas"
              value={typesPercentage[TransactionType.EXPENSE]}
            />
            <PercentageItem
              icon={<PiggyBankIcon size={20} />}
              title="Investimentos"
              value={typesPercentage[TransactionType.INVESTMENT]}
            />
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default TransactionPieChart;
