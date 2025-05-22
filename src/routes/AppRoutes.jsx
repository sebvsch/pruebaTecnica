import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { Pokemones } from "../pages/Pokemones";
import { Layout } from "../layout/Layout";

const AppRoutes = () => {

    const PrivateRoutes = () => {
        const auth = localStorage.getItem("token");
        return auth ? <Outlet /> : <Navigate to="/" />
    }

    const PublicRoutes = () => {
        const auth = localStorage.getItem("token");
        return !auth ? <Outlet /> : <Navigate to="/pokemones" />;
    };

    return (
        <>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route element={<Layout />}>
                        <Route path="/pokemones" element={<Pokemones />} />
                    </Route>
                </Route>

                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route index element={<Navigate to="/login" />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </Route>

            </Routes>
        </>
    );
}

export { AppRoutes }