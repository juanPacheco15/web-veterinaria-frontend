import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./AgregarSolicitudProducto.css";
import TextFieldEditor from "./TextFieldEditor";
import Swal from "sweetalert2";
import { API_URL } from "../otros/ConexionAPI";
Modal.setAppElement("#root");

function AgregarSolicitudProducto({
  isOpen,
  onClose,
  onGuardar,
  idProductosolicitadoEditar,
}) {
  const datosIniciales = {
    nombreProducto: "",
    cantidad: "",
    precioCompra: "",
    subTotal: "",
    id: null,
  };
  const [listPedidos, setListPedidos] = useState([]);
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);
  const [opciones, setOpciones] = useState([]);
  const [text, setText] = useState("");
  const [datos, setDatos] = useState([]);
  const [totalInventario, setTotalInventario] = useState(0);

  const datosParaEnviar = {
    datos: datos,
    total: total,
  };

  //Manejadores de Datos
  const idProductoSolicitado = idProductosolicitadoEditar;
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState(0);
  const [precioUnitario, setprecioUnitario] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const valorDefecto = true;
  const [errorNombreProducto, setErrorNombreProducto] = useState(valorDefecto);
  const [errorCantidadProducto, setErrorCantidadProducto] =
    useState(valorDefecto);
  const [errorprecioUnitario, setErrorprecioUnitario] = useState(valorDefecto);
  const [errorSubTotal, setErrorSubTotal] = useState(valorDefecto);

  useEffect(() => {
    if (idProductoSolicitado) {
      fetch(`${API_URL}/getproductoSolicitado/${idProductoSolicitado}`)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((producto) => {
            actualizarNombreProducto(producto.nombreProducto);
            actualizarCantidadProducto(producto.cantidadProducto);
            actualizarprecioUnitario(producto.precioUnitario);
            actualizarSubTotal(producto.subTotal);
            actualizarErrorCantidadProducto(false);
            actualizarErrorprecioUnitario(false);
            actualizarErrorSubTotal(false);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idProductoSolicitado]);

  const handleClose = () => {
    limpiarCampos();
    onClose();
  };

  const actualizarNombreProducto = (newNombreProducto) => {
    setNombreProducto(newNombreProducto);
  };
  const actualizarCantidadProducto = (event) => {
    const newCantidadProducto = event.target.value;
    setCantidadProducto(newCantidadProducto);
    if (isNaN(productoSeleccionado.cantidad)) {
      setTotalInventario(0);
    } else {
      setTotalInventario(
        parseFloat(productoSeleccionado.cantidad) +
          parseFloat(newCantidadProducto)
      );
    }
    const newSubTotal = newCantidadProducto * parseFloat(datos.precioUnitario);

    if (isNaN(newSubTotal)) {
      setSubTotal(0);
    } else {
      setSubTotal(newSubTotal);
    }
  };

  const actualizarprecioUnitario = (event) => {
    const newValor = parseFloat(event.target.value);
    setprecioUnitario(newValor);
    const newSubTotal = cantidadProducto * newValor; // Calcular el nuevo subtotal
    if (isNaN(newSubTotal)) {
      setSubTotal(0);
    } else {
      setSubTotal(newSubTotal);
    }

    datos.precioUnitario = newValor;
  };

  const actualizarSubTotal = (newValor) => {
    setSubTotal(newValor);
  };

  const actualizarErrorCantidadProducto = (newValor) => {
    setErrorCantidadProducto(newValor);
  };
  const actualizarErrorprecioUnitario = (newValor) => {
    setErrorprecioUnitario(newValor);
  };
  const actualizarErrorSubTotal = (newValor) => {
    setErrorSubTotal(newValor);
  };

  const limpiarCampos = () => {
    document.getElementById("nombreProductoBusca").value = "";
    document.getElementById("cantidadProducto").value = "";
    document.getElementById("precioUnitario").value = "";
    document.getElementById("subTotal").value = "";
    setCantidadProducto("0");
    setSubTotal(0);
    setTotalInventario(0);
    setProductoSeleccionado([]);
    setprecioUnitario(0);
    setDatos([]);
    const inputNombreProductoBusca = document.getElementById(
      "nombreProductoBusca"
    );
    inputNombreProductoBusca.readOnly = false;
  };

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.log(error));
  }, []);

  let resultadoproductos = [];
  if (productos.length <= 0) {
    resultadoproductos = resultadoproductos;
  } else {
    if (productos.length >= 1) {
      resultadoproductos = productos;
    }
  }

  const buscarProducto = (text) => {
    //console.log(form.nombreProducto);
    let matches = [];
    if (text.length > 0) {
      matches = resultadoproductos.filter((produc) => {
        const regex = new RegExp(`${text}`, "gi");
        return produc.nombre.toString().match(regex);
      });
    }
    //console.log(matches);
    setOpciones(matches);
    setText(text);
    datos.nombreProducto = text;
  };

  const opcionElegida = (opc) => {
    setText(opc.nombre);
    datos.nombreProducto = opc.nombre;
    var precioCompraString = opc.precio.toString();
    datos.precioUnitario = precioCompraString;
    setCantidadProducto(1);
    setTotalInventario(parseFloat(opc.cantidad) + 1);
    setProductoSeleccionado(opc);
    setSubTotal(parseFloat(datos.precioUnitario) * 1);
    setOpciones([]);
    const inputNombreProductoBusca = document.getElementById(
      "nombreProductoBusca"
    );
    inputNombreProductoBusca.readOnly = true;
  };

  const añadeTabla = () => {
    let idProducto = productoSeleccionado.idProducto;
    const nombreProducto = datos.nombreProducto;
    const cantidadPedido = document.getElementById("cantidadProducto").value;
    const precioUnitario = document.getElementById("precioUnitario").value;
    const subTotal = document.getElementById("subTotal").value;
    if (typeof idProducto === "undefined") {
      idProducto = 0;
    }
    // Comprobar campos vacíos
    if (
      nombreProducto === "" ||
      cantidadPedido === "" ||
      precioUnitario === "" ||
      subTotal === ""
    ) {
      alert("Por favor, complete todos los campos.");
      return; // Detener la ejecución de la función si hay campos vacíos
    }
    if (cantidadPedido === "0" || precioUnitario === "0") {
      alert("La cantidad y el precio unitario deben ser mayores que cero.");
      return; // Detener la ejecución de la función si la cantidad o el precio son cero
    }
    // Comprobar datos duplicados
    const existeDuplicado = datos.some((dato) => {
      return (
        dato.nombreProducto === nombreProducto &&
        dato.precioUnitario === precioUnitario &&
        dato.subTotal === subTotal
      );
    });

    const indiceExistente = datos.findIndex((dato) => {
      return (
        dato.nombreProducto === nombreProducto &&
        dato.precioUnitario === precioUnitario &&
        dato.subTotal === subTotal
      );
    });

    if (indiceExistente !== -1) {
      // Si el producto ya existe, aumentar la cantidad
      const productoExistente = datos[indiceExistente];
      productoExistente.cantidadPedido =
        parseFloat(productoExistente.cantidadPedido) +
        parseFloat(cantidadPedido);
      productoExistente.subTotal =
        parseFloat(productoExistente.subTotal) + parseFloat(subTotal);
      setDatos([...datos]);
    } else {
      // Si el producto no existe, agregarlo como un nuevo dato
      setTotal(parseFloat(total) + parseFloat(subTotal));

      const nuevoDato = {
        idProducto: idProducto,
        nombreProducto: nombreProducto,
        cantidadPedido: cantidadPedido,
        precioUnitario: precioUnitario,
        subTotal: subTotal,
      };
      setDatos([...datos, nuevoDato]);
    }

    document.getElementById("nombreProductoBusca").value = "";
    document.getElementById("cantidadProducto").value = "";
    document.getElementById("precioUnitario").value = "";
    document.getElementById("subTotal").value = "";
    setCantidadProducto("0");
    setSubTotal(0);
    setTotalInventario(0);
    setProductoSeleccionado([]);
    setprecioUnitario(0);
    const inputNombreProductoBusca = document.getElementById(
      "nombreProductoBusca"
    );
    inputNombreProductoBusca.readOnly = false;
  };

  const eliminarDato = (index, subtotal) => {
    const nuevosDatos = datos.filter((dato, i) => i !== index);
    setDatos(nuevosDatos);

    const nuevoTotal = parseFloat(total) - parseFloat(subtotal);
    setTotal(nuevoTotal);
  };

  const pedido = (e) => {
    e.preventDefault();
    // setErrors(validateForm(form));

    if (Object.keys().length === 0) {
      datos.id = listPedidos.length + 1;
      setListPedidos([...listPedidos, datos]);
    } else {
      return;
    }
    setDatos(datos);
    datos.nombreProducto = "";
    datos.precioUnitario = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosParaEnviar);
    fetch(`${API_URL}/addSurtir`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosParaEnviar),
    })
      .then((response) => response.json())
      .then((error) => console.log(error));
      limpiarCampos();
      onClose();
    // closeModalAgregarPedidos();
  };

  return (
    <Modal
      className="myEstilo"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Usuario"
      shouldCloseOnOverlayClick={false}>
      <h2 className="modal-header">Solicitar Producto</h2>
      <div className="modal-content">
        <form className="modal-form" onSubmit={pedido}>
          <div className="input-box-agregar-pedido">
            <div className="form-column">
              <label className="detalle-pedido-text">
                Nombre Del Producto A Buscar
              </label>
              <div className="input-container">
                <input
                  id="nombreProductoBusca"
                  className="input-agregar"
                  type="text"
                  name="nombreProducto"
                  onChange={(e) => buscarProducto(e.target.value)}
                  value={datos.nombreProducto}
                  autoComplete="off"
                  required
                />
                <br />
                <button type="button" onClick={limpiarCampos}>
                  Limpiar
                </button>
              </div>

              <div className="contenedor-opciones">
                {opciones &&
                  opciones.map((opc, index) => (
                    <div
                      key={index}
                      className={`opcion ${
                        opc.cantidad === "0" ? "opcion-rojo" : "opcion-verde"
                      }`}
                      onClick={() => opcionElegida(opc)}>
                      <div className="opcion-nombre">{opc.nombre}</div>
                      <div className="opcion-precio">${opc.precio}</div>
                      <div className="opcion-cantidad">
                        Cantidad: {opc.cantidad}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="form-column">
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "10px",
                  }}>
                  <div style={{ border: "1px solid green", padding: "10px" }}>
                    <div>
                      {" "}
                      <label>Cantidad producto</label>
                      <br />
                      <input
                        id="cantidadProducto"
                        type="number"
                        min={1}
                        max={9999}
                        value={cantidadProducto}
                        onChange={actualizarCantidadProducto}
                      />
                    </div>
                  </div>
                  <div style={{ border: "1px solid green", padding: "10px" }}>
                    <label>Inventario: </label>
                    <span>{productoSeleccionado.cantidad}</span>
                    <br />
                    <label>Total en el inventario: </label>
                    <span>{totalInventario}</span>

                    <br />
                    <label>Proveedor: </label>
                    <span>{productoSeleccionado.proveedor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-column">
              <label>Precio Unitario</label>
              <br />
              <input
                id="precioUnitario"
                type="number"
                name="precioUnitario"
                min={1}
                max={9999}
                value={
                  datos.precioUnitario ? datos.precioUnitario : precioUnitario
                }
                minLength={1}
                maxLength={4}
                pattern="^\d+(\.\d+)?$"
                title="Solo número con punto"
                onChange={actualizarprecioUnitario}
                onBlur={actualizarErrorprecioUnitario}
              />
            </div>

            <div className="form-column">
              <label>SubTotal</label>
              <br />
              <input id="subTotal" type="text" value={subTotal} readOnly />
            </div>
          </div>
        </form>

        <div className="centrado">
          <button type="button" className="modal-button" onClick={añadeTabla}>
            Añadir a la Lista
          </button>
        </div>
        <p> Total= ${total}</p>
        <table className="tabla" id="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Producto</th>
              <th>Cantidad Producto</th>
              <th>Precio Unitario De compra</th>
              <th>SubTotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato, index) => (
              <tr key={dato.index}>
                <td>{index + 1}</td>
                <td>{dato.nombreProducto}</td>
                <td>{dato.cantidadPedido}</td>
                <td>{dato.precioUnitario}</td>
                <td>{dato.subTotal}</td>
                <td>
                  <button onClick={() => eliminarDato(index, dato.subTotal)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <button className="modal-button" onClick={handleSubmit}>
              Realizar Pedido
            </button>
            <button
              type="button"
              className="modal-button"
              onClick={handleClose}>
              Cancelar
            </button>
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default AgregarSolicitudProducto;
