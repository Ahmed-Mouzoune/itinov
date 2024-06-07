"use client";
import { useAccount } from "@/context/AccountContext";
import { useTransaction } from "@/context/TransactionsContext";
import {
  filterTransactionsByAccountId,
  getTransactionDataForCharts,
} from "@/lib/helper";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartTransaction() {
  const { accountSelected } = useAccount();
  const { transactions } = useTransaction();
  const [transactionDataForCharts, setTransactionDataForCharts] = useState<
    ITransactionDataChart[] | undefined
  >(undefined);

  useEffect(() => {
    if (transactions && accountSelected) {
      const dataCharts = getTransactionDataForCharts(
        filterTransactionsByAccountId(transactions, accountSelected.id),
        accountSelected.id
      );
      setTransactionDataForCharts(dataCharts);
    }
    return () => {
      setTransactionDataForCharts(undefined);
    };
  }, [accountSelected]);
  if (!transactionDataForCharts) return;

  return (
    <div className="rounded-xl bg-white h-60 sm:h-72 sm:w-full sm:max-w-screen-md mx-4 sm:mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={transactionDataForCharts}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="days" />
          <Tooltip />
          <Bar
            name={"Fonds reçus"}
            dataKey="account_debt"
            stackId="a"
            fill="#16a34a"
          />
          <Bar
            name={"Dépenses"}
            dataKey="ammount_credit"
            stackId="a"
            fill="#dc2626"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
