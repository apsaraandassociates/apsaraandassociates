import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminClientDocuments } from "./pages/AdminClientDocuments";
import { AdminSiteSettings } from "./pages/AdminSiteSettings";
import { ClientDashboard } from "./pages/ClientDashboard";
import { ClientRegister } from "./pages/ClientRegister";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "register", element: <ClientRegister /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/client/:clientId", element: <AdminClientDocuments /> },
      { path: "admin/settings", element: <AdminSiteSettings /> },
      { path: "client", element: <ClientDashboard /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);