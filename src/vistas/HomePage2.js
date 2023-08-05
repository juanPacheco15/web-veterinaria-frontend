import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar1 from "../componentes/SideBar1";
import "./HomePage2.css";
import MenuMedicoDesplegable from "../componentes/MenuMedicoDesplegable";

function HomePage2() {
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' || userRole === 'veterinario') {
            navigate(userRole === 'admin' ? '/home' : '/home2');
        }
    }, [navigate]);
    if (localStorage.getItem("auth")!==null) {
    return (
        <div className="">
            <div className="header">
                <img src={process.env.PUBLIC_URL + '/imagenes/logotipo.jpg'} alt="Logo" />
                <div>
                    <MenuMedicoDesplegable></MenuMedicoDesplegable>
                </div>
                <div className="userview">
                    <img src={process.env.PUBLIC_URL + '/imagenes/administrador.png'} alt="Admin" />
                    <div className="nameUser">Medico Veterinario</div>
                </div>
            </div>
            <div>
                <SideBar1></SideBar1>
            </div>
        </div>
    );
} else {
    window.location='/login';
}
}

export default HomePage2;
