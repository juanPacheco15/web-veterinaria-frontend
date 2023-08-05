import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./RealizarVentaModal.css";
import TextFieldEditor from "./TextFieldEditor";
import Swal from "sweetalert2";
import { API_URL } from "../otros/ConexionAPI";
Modal.setAppElement("#root");

function RealizarVentaModal({
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

  const datosParaEnviar = {
    datos: datos.map((dato) => ({
      idProducto: dato.idProducto,
      nombreProducto: dato.nombreProducto,
      cantidadPedido: dato.cantidadPedido,
      precioUnitario: dato.precioUnitario,
      subTotal: dato.subTotal,
    })),
    total: total,
  };

  //Manejadores de Datos
  const idProductoSolicitado = idProductosolicitadoEditar;
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidadProducto, setCantidadProducto] = useState("");
  const [cantidadMax, setCantidadMax] = useState(0);
  const [precioUnitario, setprecioUnitario] = useState("");
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

            actualizarErrorNombreProducto(false);
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
  const handleChangeCantidad = (event) => {
    const cantidad = parseInt(event.target.value);
    setCantidadProducto(cantidad >= 1 ? cantidad : 1);
  };

  const actualizarNombreProducto = (newNombreProducto) => {
    setNombreProducto(newNombreProducto);
  };
  const actualizarCantidadProducto = (newCantidadProducto) => {
    setCantidadProducto(newCantidadProducto);
    const newSubTotal = newCantidadProducto * datos.precioUnitario;
    setSubTotal(newSubTotal);
  };
  const actualizarprecioUnitario = (newValor) => {
    setprecioUnitario(newValor);
  };
  const actualizarSubTotal = (newValor) => {
    setSubTotal(newValor);
  };

  const actualizarErrorNombreProducto = (newValor) => {
    setErrorNombreProducto(newValor);
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
    setNombreProducto("");
    setCantidadProducto("");
    setprecioUnitario("");
    setSubTotal("");
    setErrorNombreProducto(valorDefecto);
    setErrorCantidadProducto(valorDefecto);
    setErrorprecioUnitario(valorDefecto);
    setErrorSubTotal(valorDefecto);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/productos`)
        .then((res) => res.json())
        .then((data) => setProductos(data))
        .catch((error) => console.log(error));
    };

    // Llamar a fetchData inmediatamente
    fetchData();

    // Establecer el intervalo para realizar la solicitud cada X segundos
    const interval = setInterval(fetchData, 5000); // Realizar la solicitud cada 5 segundos (ajusta el valor según tus necesidades)

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
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
    let matches = [];
    if (text.length > 0) {
      matches = resultadoproductos.filter((produc) => {
        const regex = new RegExp(`${text}`, "gi");
        return produc.nombre.toString().match(regex);
      });
    }
    setOpciones(matches);
    setText(text);
    datos.nombreProducto = text;
  };

  const opcionElegida = (opc) => {
    if (opc.cantidad > 0) {
      setText(opc.nombre);

      datos.nombreProducto = opc.nombre;
      var precioCompraString = opc.precio.toString();
      datos.precioUnitario = precioCompraString;
      setCantidadProducto(1);
      setCantidadMax(opc.cantidad);
      setProductoSeleccionado(opc);
      setSubTotal(parseFloat(datos.precioUnitario) * 1);
      setOpciones([]);
    } else {
      alert("Ya no hay en el inventario");
    }
  };

  const eliminaTabla = () => {};
  const añadeTabla = (e) => {
    e.preventDefault();
    if (!productoSeleccionado || cantidadProducto === "") {
      // Validación de campos vacíos
      alert("Por favor, selecciona un producto y especifica la cantidad.");
      return;
    }

    const indiceExistente = datos.findIndex((dato) => {
      return dato.nombreProducto === productoSeleccionado.nombre;
    });

    if (indiceExistente !== -1) {
      // Si el producto ya existe, aumentar la cantidad
      const productoExistente = datos[indiceExistente];
      productoExistente.cantidadPedido =
        parseFloat(productoExistente.cantidadPedido) +
        parseFloat(cantidadProducto);
      productoExistente.subTotal =
        parseFloat(productoExistente.cantidadPedido) *
        parseFloat(productoExistente.precioUnitario);
      setDatos([...datos]);
      const sumaTotal =
        parseFloat(total) + parseFloat(productoExistente.subTotal);
      setTotal(sumaTotal);
    } else {
      // Si el producto no existe, agregarlo como un nuevo dato
      const nuevoDato = {
        idProducto: productoSeleccionado.idProducto,
        nombreProducto: productoSeleccionado.nombre,
        cantidadPedido: cantidadProducto,
        precioUnitario: productoSeleccionado.precio,
        subTotal:
          parseFloat(productoSeleccionado.precio) *
          parseFloat(cantidadProducto),
        cantidadMax: cantidadMax,
      };
      setDatos([...datos, nuevoDato]);
      const sumaTotal = parseFloat(total) + parseFloat(nuevoDato.subTotal);
      setTotal(sumaTotal);
    }

    document.getElementById("nombreProductoBusca").value = "";
    setCantidadProducto("");
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
    //setErrors(validateForm(form));

    fetch(`${API_URL}/addVenta`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosParaEnviar),
    })
      .then((Response) => Response.json())
      .then((error) => console.log(error));
    onClose();
    setDatos([]);
    setTotal(0);
  };

  const handleCantidadChange = (e, index) => {
    const newCantidad = parseFloat(e.target.value);
    const clampedCantidad = !isNaN(newCantidad)
      ? Math.min(newCantidad, datos[index].cantidadMax)
      : datos[index].cantidadPedido;
    const newSubTotal = !isNaN(clampedCantidad)
      ? clampedCantidad * parseFloat(datos[index].precioUnitario)
      : parseFloat(datos[index].subTotal);
  
    setDatos((prevDatos) => {
      const updatedDatos = [...prevDatos];
      updatedDatos[index].cantidadPedido = clampedCantidad;
      updatedDatos[index].subTotal = newSubTotal;
      return updatedDatos;
    });
  
    const subtotalAnterior = parseFloat(datos[index].subTotal);
    const nuevoTotal =
      parseFloat(total) - subtotalAnterior + newSubTotal;
    setTotal(nuevoTotal);
  };
  

  return (
    <Modal
      className="myEstilo"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Agregar Usuario"
      shouldCloseOnOverlayClick={false}>
      <h2 className="modal-header">Realizar Venta</h2>
      <div className="modal-content">
        <form className="modal-form" onSubmit={pedido}>
          <div className="input-box-agregar-pedido">
            <span className="detalle-pedido-text">
              Nombre Del Producto A Vender
            </span>
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

            <span className="detalle-pedido-text">Cantidad</span>
            <input
              id="cantidadProducto"
              type="number"
              min="1"
              max={datos.cantidadMax}
              value={cantidadProducto}
              onChange={handleChangeCantidad}
            />
          </div>
        </form>
        <div className="centrado">
          <button type="button" className="modal-button" onClick={añadeTabla}>
            Añadir a la Lista
          </button>
        </div>
        <div className="centrado">
          <button type="button" className="modal-button" onClick={eliminaTabla}>
            Borrar Producto
          </button>
        </div>
        <p> Total= ${total}</p>
        <table className="tabla" id="tabla">
          <thead>
            <tr>
              {/* <th>ID</th> */}
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
                <td>{dato.nombreProducto}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max={dato.cantidadMax}
                    value={dato.cantidadPedido}
                    onChange={(e) => handleCantidadChange(e, index)}
                  />
                </td>

                <td>{dato.precioUnitario}</td>
                <td>{dato.subTotal}</td>
                <td>
                  <button onClick={() => eliminarDato(index, dato.subTotal)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <button
              type="button"
              className="modal-button"
              onClick={handleSubmit}>
              Realizar Venta
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

export default RealizarVentaModal;
