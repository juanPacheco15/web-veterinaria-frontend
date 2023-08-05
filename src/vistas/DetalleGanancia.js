import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./DetalleGanancia.css";
import { API_URL } from "../otros/ConexionAPI";
import { Link } from 'react-router-dom';
import HomeReciclado from "./HomeReciclado";

function DetalleGanancia() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [dateSelected, setDateSelected] = useState("DIA");
  const [totalVentas, setTotalVentas] = useState(0);

  const fetchData = (date) => {
    fetch(`${API_URL}/getVentasFrom/${date}`)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data);
        // Calcular el total de las ventas y actualizar el estado
        const total = data.reduce((sum, venta) => sum + parseFloat(venta.montoTotal), 0);
        setTotalVentas(total);
      })
      .catch((error) => console.log(error));
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
    //
    fetchData(dateSelected);
    const interval = setInterval(() => fetchData(dateSelected), 5000);
    return () => clearInterval(interval);
    //
  }, [navigate, dateSelected]);
  if (localStorage.getItem("auth")!==null) {

  return (
    <div className="contenedorPage">
      <HomeReciclado></HomeReciclado>
      <div className="contenedorBotones">
        <Link to={"/home"}><button className="boton" >Inicio</button></Link>
        <button className={`botonDos ${dateSelected === "DIA" ? "selected" : ""}`} onClick={() => setDateSelected("DIA")}>Día</button>
        <button className={`botonDos ${dateSelected === "MES" ? "selected" : ""}`} onClick={() => setDateSelected("MES")}>Mes</button>
        <button className={`botonDos ${dateSelected === "AÑO" ? "selected" : ""}`} onClick={() => setDateSelected("AÑO")}>Año</button>
      </div>

      <div className="contenedorTabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Monto Total</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={dato.index}>
                <td>{dato.idVentas}</td>
                <td>{dato.fecha}</td>
                <td>{dato.montoTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="contenedorTotal">
        Total: ${totalVentas.toFixed(2)}
      </div>

    </div>
  );
} else {
  window.location='/login';
}
}

export default DetalleGanancia;
