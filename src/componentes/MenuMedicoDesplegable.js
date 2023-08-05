import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./MenuMedicoDesplegable.css";
import { Link } from "react-router-dom";
import { API_URL } from "../otros/ConexionAPI";
import { useNavigate } from "react-router-dom";
import AgregarMascotaModal from "./AgregarMascotaModal";

const MenuMedicoDesplegable = () => {
  const [idMascotasEditar, setIdMascotasEditar] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [isOpenCitas, setIsOpenMascotas] = useState(false);

  //modal mascotas
  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };
  //registrar cita
  const registrarUsuario = (cita) => {
    fetch(`${API_URL}/addmascota`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cita)
    }).then(response => response.json())
      .then(data => {
        actualizarTabla();
      })
      .catch(error => console.error(error));
  }
  const actualizarTabla = () => {
    fetch(`${API_URL}/mascotas`)
      .then(response => response.json())
      .then(data => { setMascotas(data); })
      .catch(error => { console.error(error); });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleCitas = () => {
    setIsOpenMascotas(!isOpenCitas);
  };

  //salir
  const handleButtonClick = (buttonId) => {
    setSelected(buttonId);
    if (buttonId === "btnSalir") {
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
      localStorage.removeItem('password');
      localStorage.removeItem("auth");
      navigate("/login", { replace: true });
    }
  };
  return (
    <div>
      <div className="row align-items-end">
        <div className="col ">
          <Dropdown isOpen={isOpen} toggle={toggle}>
            <DropdownToggle caret>Mascotas</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <button className="btn btn-primary" onClick={abrirModal}>
                  Agregar Mascota
                </button>
              </DropdownItem>
              <DropdownItem>
                <Link to={"/consultaMascotas"}>
                  <button className="btn btn-primary">Consulta Mascotas</button>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="col ">
          <Dropdown isOpen={isOpenCitas} toggle={toggleCitas}>
            <DropdownToggle caret>Citas</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to={"/citas"}>
                  <button className="btn btn-primary">Citas</button>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="col">
          <button
            className="botonImagen"
            onClick={() => handleButtonClick("btnSalir")}
            id="btnSalir"
          >
            <img
              className="imagen"
              src={process.env.PUBLIC_URL + "/imagenes/salir.png"}
              alt="Salir"
            />
          </button>
        </div>
      </div>

      <AgregarMascotaModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onGuardar={(nuevoUsuario) => registrarUsuario(nuevoUsuario)}
        idMascotasEditar={idMascotasEditar}
      />
    </div>
  );
};

export default MenuMedicoDesplegable;
