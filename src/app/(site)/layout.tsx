
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/ui/ChatBot";
import "@/app/layout.scss"; // Keeping existing layout styles for the site part

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
      <ChatBot />
    </div>
  );
}
