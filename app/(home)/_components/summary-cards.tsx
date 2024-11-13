import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month?: string;
}

const SummaryCards = async ({ month }: SummaryCards) => {
  const validMonth = month ?? new Date().toISOString().slice(5, 7);

  const formattedMonth = validMonth.padStart(2, "0");

  const startDate = new Date(`2024-${formattedMonth}-01`);

  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  endDate.setDate(0);

  const where = {
    date: {
      gte: startDate,
      lt: endDate,
    },
  };

  const despositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const investimentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTIMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const balance = despositsTotal - investimentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentsTotal}
          size={"small"}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={despositsTotal}
          size={"small"}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
          size={"small"}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
