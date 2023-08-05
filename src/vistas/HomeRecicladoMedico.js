import React from "react";

import "./HomeRecicladoMedico.css";

import SideBarSimple from "../componentes/SideBarSimple";

function HomeRecicladoMedico() {
  return (
    <div className="">
      <div className="header">
        <img
          src={process.env.PUBLIC_URL + "/imagenes/logotipo.jpg"}
          alt="Logo"
        />
        

        <div className="userview">
          <img
            src={process.env.PUBLIC_URL + "/imagenes/administrador.png"}
            alt="Admin"
          />
          <div className="nameUser">Medico Veterinario</div>
        </div>
      </div>
      <div>
        <SideBarSimple></SideBarSimple>
      </div>
    </div>
  );
}

export default HomeRecicladoMedico;
