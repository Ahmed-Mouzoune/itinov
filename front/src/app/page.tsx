import Header from "@/components/Header";
import NavbarBottom from "@/components/NavbarBottom";
import AccountResume from "@/components/account/AccountResume";
import ChartTransaction from "@/components/transactions/ChartTransaction";
import RecentTransactions from "@/components/transactions/RecentTransactions";
import { findUserAccountService } from "@/services/AccountService";
import { findTransactionsUserService } from "@/services/TransactionService";
import Providers from "./providers";

export default async function Home() {
  const accounts = await findUserAccountService();
  const transactions = await findTransactionsUserService();

  return (
    <Providers accounts={accounts} transactions={transactions}>
      <Header />
      <main className="flex flex-col gap-2 pb-24">
        <AccountResume />
        <RecentTransactions />
        {/* <RecentTransactions /> */}
        <ChartTransaction />
      </main>
      <NavbarBottom />
    </Providers>
  );
}
