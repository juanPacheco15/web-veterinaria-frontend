import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./VerDetalleVentaModal.css";
import { API_URL } from "../otros/ConexionAPI";
Modal.setAppElement("#root");

function VerDetalleVentaModal({ isOpen, onClose, idDetalleEditar }) {
 
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/getDetalleVentas/${idDetalleEditar}`)
        .then((res) => res.json())
        .then((data) => setDatos(data))
        .catch((error) => console.log(error));
    };
  
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);
  
  

  const handleClose = () => {
    onClose();
  };


  return (
    <Modal
      className="myEstilo"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Usuario"
      shouldCloseOnOverlayClick={false}
    >
      <h2 className="modal-header">Detalle ventas</h2>
      <div className="modal-content">
        <table className="tabla" id="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Producto</th>
              <th>Cantidad Producto</th>
              <th>Precio Unitario De compra</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={dato.index}>
                <td>{dato.idProducto}</td>
                <td>{dato.nombreProducto}</td>
                <td>{dato.cantidadPedido}</td>
                <td>{dato.precioUnitario}</td>
                <td>{dato.subTotal}</td>
              </tr>
            ))}
            <button
              type="button"
              className="modal-button"
              onClick={handleClose}>
              Salir
            </button>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default VerDetalleVentaModal;
