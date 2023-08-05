import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from "../componentes/SideBar";
import "./HomePage.css";
import MenuDesplegable from "../componentes/MenuDesplegable";

function HomePage() {
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
        <img
          src={process.env.PUBLIC_URL + "/imagenes/logotipo.jpg"}
          alt="Logo"
        />
        <div>
          <MenuDesplegable></MenuDesplegable>
        </div>

        <div className="userview">
          <img
            src={process.env.PUBLIC_URL + "/imagenes/administrador.png"}
            alt="Admin"
          />
          <div className="nameUser">Administrador</div>
        </div>
      </div>
      <div>
        <SideBar></SideBar>
      </div>
    </div>
  );
} else {
    window.location='/login';
}
}

export default HomePage;
