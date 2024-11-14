import { TransactionType } from "@prisma/client";
import {
  TotalExpensePerCategory,
  TransactionsPercentagePerType,
} from "./types";
import { db } from "@/app/_lib/prisma";

export const getDashboard = async (month: string | undefined) => {
  const validMonth = month ?? new Date().toISOString().slice(5, 7); // Se month for undefined, usa o mês atual
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

  // Seu código de agregação continua igual
  const despositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount ?? 0,
  );

  const investmentsTotal = Number(
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

  const balance = despositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum?.amount ?? 0,
  );

  const typesPercentage: TransactionsPercentagePerType = {
    [TransactionType.DEPOSIT]: Math.round(
      (Number(despositsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
    ),
    [TransactionType.INVESTIMENT]: Math.round(
      (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
    ),
  };

  const TotalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const LastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    TotalExpensePerCategory,
    typesPercentage,
    despositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    startDate,
    endDate,
    month: validMonth,
    LastTransactions,
  };
};
