import Navbar from "@/components/nav";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar></Navbar> */}
        {children}</body>
    </html>
  );
}