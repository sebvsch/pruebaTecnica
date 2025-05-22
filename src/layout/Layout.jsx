import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Layout = () => {
    return (
        <>
            <div className="">
                <div className="mr-2">
                    <Navbar />
                </div >
                <div className="mt-2">
                    <Outlet />

                </div>
            </div >
        </>
    );
}

export { Layout };