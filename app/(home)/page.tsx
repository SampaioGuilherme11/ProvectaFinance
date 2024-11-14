import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

interface SearchParams {
  month?: string;
}

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const month = searchParams.month;

  // Verifica se o mês é válido ou se está no formato correto 'MM'
  const monthIsInvalid = month && !isMatch(`2024-${month}-01`, "yyyy-MM-dd");

  if (monthIsInvalid) {
    const currentMonth = new Date().toISOString().slice(5, 7);
    redirect(`/?month=${currentMonth}`);
  }
  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards {...dashboard} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.TotalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.LastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
