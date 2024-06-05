import Header from "@/components/Header";
import NavbarBottom from "@/components/NavbarBottom";
import AccountResume from "@/components/account/AccountResume";
import RecentTransactions from "@/components/transactions/RecentTransactions";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-2">
        <AccountResume />
        <RecentTransactions />
      </main>
      <NavbarBottom />
    </>
  );
}
