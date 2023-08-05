import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./DetallePedido.css";
import { API_URL } from "../otros/ConexionAPI";
import { Link } from 'react-router-dom';
import HomeReciclado from "./HomeReciclado";
import VerDetalleModal from "../componentes/VerDetalleModal";

function DetallePedido() {
  const navigate = useNavigate();

  const [detalle, setDetalle] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [isDetalle, setisDetalle] = useState("");
  const abrirModal = (id) => {
    setisDetalle(id);
    setModalAbierto(true);

  };

  const cerrarModal = () => {
    setModalAbierto(false);

  };

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin' || userRole === 'veterinario') {
      if (userRole === 'veterinario') {
        navigate('/home');
      }
    } else {
      navigate('/login');
    }
    actualizarTabla();//
  }, [navigate]);

  /*
  useEffect(() => {
    actualizarTabla();
  }, [detalle]);
  */

  const actualizarTabla = () => {
    fetch(`${API_URL}/getDetalles`)
      .then((response) => response.json())
      .then((data) => {
        setDetalle(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (localStorage.getItem("auth")!==null) {
  return (
    <div className="contenedorPage">
      <HomeReciclado></HomeReciclado>
      <div className="contenedorBotones">
        <Link to={"/home"}><button className="boton" >Inicio</button></Link>
      </div>

      <div className="contenedorTabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((elemento) => (
              <tr key={elemento.idPedidos}>
                <td>{elemento.idPedidos}</td>
                <td>{elemento.fecha}</td>
                <td>{elemento.montoTotal}</td>

                <td>
                  <button
                    className="botonMini btnEliminar" onClick={() => abrirModal(elemento.idPedidos)}>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <VerDetalleModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        // onGuardar={(nuevoUsuario) => registrarDato(nuevoUsuario)}
        // onClick={() => editar(elemento.idPedidos)}
        idDetalleEditar={isDetalle}
      />
    
    </div>
  );
} else {
  window.location='/login';
}
}

export default DetallePedido;
