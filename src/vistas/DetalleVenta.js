import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./DetalleVenta.css";
import { API_URL } from "../otros/ConexionAPI";
import { Link } from 'react-router-dom';
import HomeReciclado from "./HomeReciclado";
import VerDetalleVentaModal from "../componentes/VerDetalleVentaModal";

function DetalleVenta() {
  const navigate = useNavigate();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [isDetalleVenta, setisDetalleVenta] = useState("");
  const abrirModal = (id) => {
    setisDetalleVenta(id);
    setModalAbierto(true);
  };
  const [datos, setDatos] = useState([]);

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  useEffect(() => {//
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin' || userRole === 'veterinario') {
      if (userRole === 'veterinario') {
        navigate('/home');
      }
    } else {
      navigate('/login');
    }
    //
    const fetchData = () => {
      fetch(`${API_URL}/getVentas`)
        .then((res) => res.json())
        .then((data) => setDatos(data))
        .catch((error) => console.log(error));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Realizar la solicitud cada 5 segundos (ajusta el valor según tus necesidades)
    return () => clearInterval(interval);
    //
  }, [navigate]);

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
            {datos.map((dato, index) => (
              <tr key={dato.index}>
                <td>{dato.idVentas}</td>
                <td>{dato.fecha}</td>
                <td>{dato.montoTotal}</td>
                <td>
                  <button onClick={() => abrirModal(dato.idVentas)}>
                    Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <VerDetalleVentaModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        idDetalleEditar={isDetalleVenta}
      />
    </div>
  );
} else {
  window.location='/login';
}
}

export default DetalleVenta;
