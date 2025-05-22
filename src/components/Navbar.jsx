import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <header className="bg-danger w-100 py-3">
                <nav className="container d-flex justify-content-center gap-5">
                    <div className="text-center fs-5">
                        <Link to="login" className="text-white text-decoration-none fw-medium" onClick={() => { localStorage.clear(); }}><i class="bi bi-door-open-fill"></i>Cerrar sesion</Link>
                    </div>
                </nav>
            </header>

        </>
    )
}

export { Navbar }