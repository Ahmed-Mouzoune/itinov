export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-screen h-screen max-w-sm items-center mx-auto pt-40">
      {children}
    </main>
  );
}
