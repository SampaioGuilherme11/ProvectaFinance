import { TransactionType } from "@prisma/client";

export type TransactionsPercentagePerType = {
  [key in TransactionType]: number;
};
