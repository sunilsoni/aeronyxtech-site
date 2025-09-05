import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutBasic({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="main-with-nav flex-1">
        <div className="container-app">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
