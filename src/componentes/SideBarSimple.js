import React, { useState } from "react";
import Usuarios from "../vistas/UsuariosPage";
import Inventario from "../vistas/InventarioPage";
import Ventas from "../vistas/VentasPage";
import Bienvenida from "../vistas/BienvenidaPage";
//import Boton2 from "./Boton2";
//import Boton3 from "./Boton3";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

function SideBarSimple() {
    // const navigate = useNavigate();
    // const [selected, setSelected] = useState("");
    // const [content, setContent] = useState(<Bienvenida />);

    // const handleButtonClick = (buttonId) => {
    //     setSelected(buttonId);
    //     if (buttonId === "btnUsuarios") {
    //         setContent(<Usuarios />);
    //     } else if (buttonId === "btnVentas") {
    //         setContent(<Ventas/>)
    //         //setContent(<Boton2 />);
    //     } else if (buttonId === "btnInventario") {
    //         setContent(<Inventario />);
    //     } else if (buttonId === "btnReportes") {
    //         //setContent(<Boton3 />);
    //     } else if (buttonId === "btnSalir") {
    //         navigate("/login", { replace: true });
    //     }
    // };

    return (
        <div className="cuerpo">
            <div className="sidebar">

            </div>
            {/* <div className="content">{content}</div> */}
        </div>
    );
}

export default SideBarSimple;
