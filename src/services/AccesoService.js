import Swal from 'sweetalert2';

const usuarios = [
    { email: import.meta.env.VITE_USERNAME, password: import.meta.env.VITE_PASSWORD },
];

const generarToken = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
        token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
};


export const login = async (email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = usuarios.find(
                u => u.email === email && u.password === password
            );
            if (user) {
                localStorage.setItem('token', generarToken());
                localStorage.setItem('usuario', JSON.stringify(user));
                resolve(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Autenticación',
                    text: 'Credenciales inválidas'
                });
                resolve(false);
            }
        }, 2000);
    });
};
