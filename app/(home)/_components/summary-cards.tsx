import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  month?: string;
  balance: number;
  investmentsTotal: number;
  despositsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
}

const SummaryCards = async ({
  balance,
  investmentsTotal,
  despositsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}
      <SummaryCard
        icon={
          <div className="rounded-lg bg-[#0F0E11] p-3">
            <WalletIcon size={16} />
          </div>
        }
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={
            <div className="rounded-lg bg-[#29282A] p-3">
              <PiggyBankIcon size={16} />
            </div>
          }
          title="Investido"
          amount={investmentsTotal}
          size={"small"}
        />
        <SummaryCard
          icon={
            <div className="rounded-lg bg-[#151B14] p-3">
              <TrendingUpIcon size={16} className="text-primary" />
            </div>
          }
          title="Receita"
          amount={despositsTotal}
          size={"small"}
        />
        <SummaryCard
          icon={
            <div className="rounded-lg bg-[#221114] p-3">
              <TrendingDownIcon size={16} className="text-red-500" />
            </div>
          }
          title="Despesas"
          amount={expensesTotal}
          size={"small"}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
