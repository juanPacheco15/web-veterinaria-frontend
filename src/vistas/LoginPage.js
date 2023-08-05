import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { API_URL } from '../otros/ConexionAPI';
import Swal from 'sweetalert2';
import { dataEncrypt } from '../utils/dataEncrypt';
import { dataDecrypts } from '../utils/dataDecrypts';
import { Helmet } from 'react-helmet';
import favicon from '../img/logotipo.ico';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const tituloPestana = 'Veterinaria el potrillo';
    const handleLogin = (e) => {
        e.preventDefault();
        iniciarSesion();
    };

    const iniciarSesion = () => {
        fetch(`${API_URL}/iniciarsesion?user=${email}&password=${password}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 201) {
                    switch (data.puesto) {
                        case "Administrador":
                            console.log("Admin");
                            localStorage.setItem('userRole', 'admin');
                            localStorage.setItem('user', email);
                            localStorage.setItem('password', password);
                            localStorage.setItem("auth",dataEncrypt('"Logeado"'));
                            navigate("/home");
                            break;
                        case "Médico Veterinario":
                            console.log("Veterinario");
                            localStorage.setItem('userRole', 'veterinario');
                            localStorage.setItem('user', email);
                            localStorage.setItem('password', password);
                            localStorage.setItem("auth",dataEncrypt('"Logeado"'));
                            navigate("/home2");
                            break;
                        default:
                            break;
                    }
                } else if (data.status === 200) {
                    console.log(data.puesto);
                    Swal.fire(
                        'Datos incorrectos',
                        'No se ha podido iniciar sesión',
                        'error'
                    )
                }
            })
            .catch((error) => { console.log(error); });
    };

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' || userRole === 'veterinario') {
            navigate(userRole === 'admin' ? '/home'  : '/home2');
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <Helmet>
        <title>{tituloPestana}</title>
      </Helmet>
            <div className="header">
                <img src={process.env.PUBLIC_URL + '/imagenes/logotipo.jpg'} alt="Logo" />
            </div>
            <div className="form-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        Usuario:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            maxLength={16}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={16}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Acceder</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
