import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./MenuDesplegable.css";
import { Link } from "react-router-dom";
import { API_URL } from "../otros/ConexionAPI";
import { useNavigate } from "react-router-dom";
import AgregarProductoModal from "./AgregarProductoModal";
import AgregarUsuarioModal from "./AgregarUsuarioModal";
import AgregarSolicitudProducto from "./AgregarSolicitudProducto";
import RealizarVentaModal from "./RelizarVentaModal";
const MenuDesplegable = () => {
  const [idProductoEditar, setIdProductoEditar] = useState(null);
  const [idProductoSolicitadoEditar, setIdProductoSolicitadoEditar] = useState(null);
  const [idVentaEditar, setIdVentaEditar] = useState(null);

  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbiertoProducto, setModalAbiertoProducto] = useState(false);
  const [modalAbiertoVenta, setModalAbiertoVenta] = useState(false);
  const [modalAbiertoProductoSolicitado, setModalAbiertoProductoSolicitado] = useState(false);
  //modal usuarios
  const abrirModal = () => {
    setModalAbierto(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
  };
  //modal inventario
  const abriModalRegistraProducto = () => {
    setModalAbiertoProducto(true);
  };
  const cerrarModalProducto = () => {
    setModalAbiertoProducto(false);
  };
  //Solicitar producto al proveedor
  const abrirModalProductoSolicitado = () => {
    setModalAbiertoProductoSolicitado(true);
  }
  const cerrarModalProductoSolicitado = () => {
    setModalAbiertoProductoSolicitado(false);
  }
  //modal ventas
  const abriModalVenta = () => {
    setModalAbiertoVenta(true);
  };
  const cerrarModalVenta = () => {
    setModalAbiertoVenta(false);
  };

  const [usuarios, setUsuarios] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInventario, setIsOpenInventario] = useState(false);
  const [isOpenVentas, setIsOpenVentas] = useState(false);

  const toggleVentas = () => {
    setIsOpenVentas(!isOpenVentas);
  };

  const toggleInvenerio = () => {
    setIsOpenInventario(!isOpenInventario);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  //usuarios
  const registrarUsuario = (usuario) => {
    fetch(`${API_URL}/addusuario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        actualizarTabla();
      })
      .catch((error) => console.error(error));
  };

  const actualizarTabla = () => {
    fetch(`${API_URL}/usuarios`)
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //inventario
  const registrarDato = (producto) => {
    // window.location.reload();
    fetch(`${API_URL}/addproducto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        actualizarTabla();
        // actualizarTabla();
      })
      .catch((error) => console.error(error));
  };
  //solictar productos al proveedor
  const registrarProductoSolicitado = () => {

  }
  //venta
  const resgistraVenta = () => { }
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
            <DropdownToggle caret>Usuarios</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <button className="btn btn-primary" onClick={abrirModal}>
                  Agregar Usuarios
                </button>
              </DropdownItem>
              <DropdownItem>
                <Link to={"/usuarios"}>
                  <button className="btn btn-primary">Consulta usuarios</button>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        {/* Inventario */}
        <div className="col ">
          <Dropdown isOpen={isOpenInventario} toggle={toggleInvenerio}>
            <DropdownToggle caret>Inventario</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <button
                  className="btn btn-primary"
                  onClick={abrirModalProductoSolicitado}
                >
                  Pedido al proveedor
                </button>
              </DropdownItem>
              <DropdownItem>
                <button className="btn btn-primary" onClick={abriModalRegistraProducto}>
                  Agregar Inventario
                </button>
              </DropdownItem>

              <DropdownItem>
                <Link to={"/inventario"}>
                  <button className="btn btn-primary">
                    Consulta Inventario
                  </button>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={"/detallePedido"}>
                  <button className="btn btn-primary">
                    Consultar Detalles De Productos Solicitados
                  </button>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Ventas */}
        <div className="col">
          <Dropdown isOpen={isOpenVentas} toggle={toggleVentas}>
            <DropdownToggle caret>Ventas</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <button
                  className="btn btn-primary"
                  onClick={abriModalVenta}>
                  Realizar Venta
                </button>

              </DropdownItem>
              <DropdownItem>
                <Link to={"/detalleVenta"}>
                  <button className="btn btn-primary">
                    Ver Detalles Ventas
                  </button>
                </Link>
              </DropdownItem>

              <DropdownItem>
                <Link to={"/detalleGanancia"}>
                  <button className="btn btn-primary">
                    Ver Ganancias
                  </button>
                </Link>
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </div>

        {/* boton salir */}
        <div className="col">
          <button
            className="botonImagen"
            onClick={() => handleButtonClick("btnSalir")}
            id="btnSalir"
          >
            <img className="imagen"
              src={process.env.PUBLIC_URL + "/imagenes/salir.png"}
              alt="Salir"
            />
          </button>
        </div>
      </div>

      <AgregarUsuarioModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onGuardar={(nuevoUsuario) => registrarUsuario(nuevoUsuario)}
      />
      <AgregarProductoModal
        isOpen={modalAbiertoProducto}
        onClose={cerrarModalProducto}
        onGuardar={(nuevoInventario) => registrarDato(nuevoInventario)}
        idProductoEditar={idProductoEditar}
      />
      <AgregarSolicitudProducto
        isOpen={modalAbiertoProductoSolicitado}
        onClose={cerrarModalProductoSolicitado}
        onGuardar={(nuevoProductoSolicitado) => registrarProductoSolicitado(nuevoProductoSolicitado)}
        idProductoSolicitadoEditar={idProductoSolicitadoEditar}
      />
      <RealizarVentaModal
        isOpen={modalAbiertoVenta}
        onClose={cerrarModalVenta}
        onGuardar={(nuevaVenta) => resgistraVenta(nuevaVenta)}
        idProductoVentaEditar={idVentaEditar}
      />



    </div>
  );
};

export default MenuDesplegable;
