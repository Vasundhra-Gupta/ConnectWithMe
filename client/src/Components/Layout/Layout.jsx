import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout() {
    return (
        <div className="h-full w-full overflow-y-scroll">
            <Header />
            <SideBar />
            <div className="min-h-[calc(100%-70px)] w-full  bg-slate-100 mt-[65px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
