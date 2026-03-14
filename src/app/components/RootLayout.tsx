import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";

export function RootLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/admin") || location.pathname.includes("/client");
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <WhatsAppButton />}
    </div>
  );
}