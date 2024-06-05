import Header from "@/components/Header";
import NavbarBottom from "@/components/NavbarBottom";
import AccountResume from "@/components/account/AccountResume";
import ChartTransaction from "@/components/transactions/ChartTransaction";
import RecentTransactions from "@/components/transactions/RecentTransactions";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-2">
        <AccountResume />
        <RecentTransactions />
        {/* <ChartTransaction /> */}
      </main>
      <NavbarBottom />
    </>
  );
}
