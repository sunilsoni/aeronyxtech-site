import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="main-with-nav flex-1">
                <div className="container-app grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-6">
                    <Sidebar />
                    <main>{children}</main>
                </div>
            </div>
            <Footer />
        </div>
    );
}