import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AccesoService';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import Fondo from '../../public/pokemonBg.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValue) {
            Swal.fire({
                icon: 'warning',
                title: 'Captcha requerido',
                text: 'Por favor verifica que no eres un robot.',
            });
            return;
        }

        setCargando(true);

        try {
            const success = await login(email, password);
            if (success) {
                navigate('/pokemones');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrecto',
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al intentar iniciar sesión',
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div
            style={{
                position: 'relative',
                height: '100vh',
                backgroundImage: `url(${Fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
            className="d-flex justify-content-center align-items-center"
        >
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.78)',
                    zIndex: 1,
                }}
            ></div>

            <div
                className="rounded-4 shadow-lg p-5"
                style={{
                    width: '500px',
                    backgroundColor: 'rgba(255, 255, 255)',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div className="text-center">
                    <h1>Iniciar Sesión</h1>
                    <span>Bienvenido al inicio de sesión</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group my-4">
                        <label><span className="text-danger">*</span>Correo Electrónico</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={cargando}
                        />
                    </div>
                    <div className="form-group">
                        <label><span className="text-danger">*</span>Contraseña</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={cargando}
                        />
                        <div className="form-text text-end">
                            <a href="#" className="pe-auto text-muted">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <ReCAPTCHA
                            sitekey={siteKey}
                            className="mt-3"
                            onChange={(value) => setCaptchaValue(value)}
                        />
                    </div>
                    <div className="justify-content-center d-flex">
                        <button type="submit" className="btn btn-primary mt-4 w-100 fw-semibold" disabled={cargando}>
                            {cargando ? (
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="spinner-border spinner-border-sm me-2 text-light" role="status" />
                                    Cargando...
                                </div>
                            ) : (
                                'Ingresar'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Login };
