import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Personajes } from "../pages/Personajes";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/personajes" element={<Personajes />} />
            </Routes>
        </>
    );
}

export { AppRoutes }