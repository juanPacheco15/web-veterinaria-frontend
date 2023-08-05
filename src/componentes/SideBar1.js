import React, { useState } from "react";
import Usuarios from "../vistas/UsuariosPage";
import Inventario from "../vistas/InventarioPage";
import Ventas from "../vistas/VentasPage";
import Bienvenida from "../vistas/BienvenidaPage";
import MascotasPages from "../vistas/MascotasPages";
//import Boton2 from "./Boton2";
//import Boton3 from "./Boton3";
import { useNavigate } from "react-router-dom";
import "./SideBar1.css";

function SideBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    const [content, setContent] = useState(<Bienvenida />);

    const handleButtonClick = (buttonId) => {
        setSelected(buttonId);
        if (buttonId === "btnAgendarCita") {
            setContent(<MascotasPages />);
        } else if (buttonId === "btnVerCitas") {
            // setContent(<Ventas/>)
            //setContent(<Boton2 />);
        } else if (buttonId === "btnRecetas") {
            // setContent(<Inventario />);
        } else if (buttonId === "btnReportes") {
            //setContent(<Boton3 />);
        } else if (buttonId === "btnSalir") {
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className="cuerpo">
            <div className="sidebar">
                {/* <div className="botonera">
                    <button className={selected === "btnAgendarCita" ? "selected" : ""}
                        onClick={() => handleButtonClick("btnAgendarCita")}>
                     Citas
                    </button>
                    <button className={selected === "btnVerCitas" ? "selected" : ""}
                        onClick={() => handleButtonClick("btnVerCitas")}>
                        Ver Citas
                    </button>
                    <button className={selected === "btnRecetas" ? "selected" : ""}
                        onClick={() => handleButtonClick("btnRecetas")}>
                        Generar Recetas
                    </button>
                    <button className="imagenButton"
                        onClick={() => handleButtonClick("btnSalir")}
                        id="btnSalir">
                        <img src={process.env.PUBLIC_URL + '/imagenes/salir.png'} alt="Salir" />
                    </button>
                </div> */}
            </div>
            <div className="content">{content}</div>
        </div>
    );
}

export default SideBar;
