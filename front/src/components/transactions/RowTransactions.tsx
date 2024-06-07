import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/helper";

export default function RowTransaction({
  transaction,
  accountselectedId,
}: {
  transaction: ITransaction;
  accountselectedId: number;
}) {
  const transferCreditor =
    transaction?.account_creditor &&
    transaction?.account_creditor?.data?.id === accountselectedId;

  return (
    <div className="w-full p-4 flex">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-4 mr-auto">
        <p className="capitalize">{transaction.type}</p>
        {/* <p>IONOS</p> */}
        <span className="font-light text-xs text-gray-500">
          {formatDate(transaction.createdAt)}
        </span>
        {/* <span className="font-light text-xs text-gray-500"> 16 mai, 14:39</span> */}
      </div>
      <div
        className={cn({
          "text-green-600": transferCreditor,
          "text-red-600": transferCreditor,
        })}
      >
        {transferCreditor ? "+" : "-"}
        {`${transaction.amount}`}€
      </div>
    </div>
  );
}
