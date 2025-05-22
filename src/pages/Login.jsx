const Login = () => {
    return (
        <>
            <div className="container mt-5 w-25 rounded-4 shadow-lg p-4">
                <div className="text-center">
                    <h1>Iniciar Sesion</h1>
                    <span>Bienvenido al Inicio de sesion</span>
                </div>
                <form>
                    <div className="form-group my-4">
                        <label><span className="text-danger">*</span>Correo Electronico</label>
                        <input className="form-control" type="text" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label><span className="text-danger">*</span>Contreseña</label>
                        <input className="form-control" type="password" placeholder="Password" />
                        <div className="form-text text-end">
                            <a href="#" class="pe-auto text-muted">¿Olvidaste tu Contreseña?</a>
                        </div>
                    </div>
                    <div className="justify-content-center d-flex">
                        <button type="submit" className="btn btn-primary mt-4 w-100 fw-semibold">Ingresar</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export { Login }