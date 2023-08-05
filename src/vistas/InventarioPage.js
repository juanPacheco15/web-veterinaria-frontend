import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./InventarioPage.css";
import { API_URL } from "../otros/ConexionAPI";
import AgregarProductoModal from "../componentes/AgregarProductoModal";
import Swal from "sweetalert2";
import AgregarProveedorModal from "../componentes/AgregarProveedorModal";
import { useFetch } from "../hoooks/useFetch";
import { Link } from 'react-router-dom';
import HomeReciclado from "./HomeReciclado";

function InventarioPage() {
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  const { data } = useFetch(
    `${API_URL}/proveedor`
  );
  const [proveedor, setProveedor] = useState({
    proveedor: "",
  });
  const [select, setSelect] = useState({
    idProducto: "",
    categoria: "",
    nombre: "",
    precio: "",
    cantidad: "",
    proveedor: ""

  });
  const [datos1, setDatos1] = useState([]);
  const [datos, setDatos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalAbierto1, setModalAbierto1] = useState(false);
  const [idProductoEditar, setIdProductoEditar] = useState(null);
  const [idProveedorEditar, setIdProveedorEditar] = useState(null);
  const abrirModal = () => {
    setModalAbierto(true);
  };
  const abrirModal1 = () => {
    setModalAbierto1(true);
  };
  const cerrarModal = () => {
    setModalAbierto(false);
    setIdProductoEditar(null);
  };
  const cerrarModal1 = () => {
    setModalAbierto1(false);
    setIdProveedorEditar(null);
  };
  const irBienvenida = () => {
    window.location.reload();
  };

  const actualizarTablaSelect = () => {
    fetch(`${API_URL}/inventarioSelect`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(select)
    })
      .then(response => response.json())
      .catch(error => console.log(error));
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
  }, [datos, datos1]);*/

  const actualizarTabla = () => {
    fetch(`${API_URL}/productos`)
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
        setDatos1(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actualizarTablaProveedor = () => {
    fetch(`${API_URL}/proveedor`)
      .then((response) => response.json())
      .then((data) => {
        // setDatos(data);
        setDatos1(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };




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
      })
      .catch((error) => console.error(error));
  };
  const registrarDatoProve = (producto) => {
    fetch(`${API_URL}/addproveedor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data1) => {
        actualizarTablaProveedor();
      })
      .catch((error) => console.error(error));
  };

  const editar = (id) => {
    //console.log(`Editar elemento ${id}`);
    setIdProductoEditar(id);
    abrirModal();
  };

  const eliminar = (id) => {
    console.log(id);
    Swal.fire({
      title: "Eliminar Producto",
      text: "¿Está seguro de que desea eliminar éste producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrarlo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/deleteproducto/${id}`, {
          method: "DELETE",
        })
          .then((response) => response)
          .then((data) => {
            actualizarTabla();
            Swal.fire(
              "Borrado Exitoso",
              "El producto ha sido eliminado",
              "success"
            );
          })
          .catch((error) => console.error(error));
      }
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target.value;
    console.log(event.target.value);
    setProveedor((prevState) => ({ ...prevState, [name]: value }));
    // console.log(setDatos1);
  };

  const handleChangeSelect = (event, datos) => {
    console.log(event.target.value);
    console.log(datos);
    select.idProducto = datos.idProducto;
    select.categoria = datos.categoria;
    select.nombre = datos.nombre;
    select.precio = datos.precio;
    select.precioVenta = datos.precioVenta;
    select.cantidad = datos.cantidad;
    select.proveedor = event.target.value;
    actualizarTablaSelect();
  };
  const handleChangeBusqueda = (e) => {
    setBusqueda(e.target.value);
    //filtrar(busqueda);
  };

  //filtrar la busqueda
  let resultado = [];
  if (!busqueda) {
    resultado = datos;
  } else {
    resultado = datos.filter(
      (dato) => dato.nombre.toLowerCase().includes(busqueda.toLowerCase())
      // (cat) => cat.proveedor.toLowerCase().includes(busqueda.toLowerCase())
      //console.log(dato.curp.toLowerCase().includes(busqueda.toLowerCase()))
    );
  }

  if (localStorage.getItem("auth")!==null) {
  return (
    <div className="contenedorPage">
      <HomeReciclado></HomeReciclado>
      <div className="contenedorBotones">
        <Link to={"/home"}><button className="boton" >Inicio</button></Link>
        {/* <button className="boton" onClick={irBienvenida}>
          Inicio
        </button> */}
        {/* <button className="boton" onClick={abrirModal}>
          Agregar
        </button> */}
      </div>
      <div className="contenedor-busqueda-empleado">
        Busqueda<input
          className="input-busqueda-empleados"
          type="text"
          name="busquedaClasificacion"
          placeholder="Ingresa la Busqueda"
          onChange={handleChangeBusqueda}
          value={busqueda}
        />
        <span className="buscar-empleado-icono">
          <i class="bx bx-search buscar-icono-empleado"></i>
        </span>
      </div>
      <div className="contenedorTabla">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoria</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Precio Venta</th>
              <th>Cantidad</th>
              <th>Proveedor</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {resultado.map((elemento) => (
              <tr key={elemento.idProducto}>
                <td>{elemento.idProducto}</td>
                <td>{elemento.categoria}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.precio}</td>
                <td>{elemento.precioVenta}</td>
                <td>{elemento.cantidad}</td>
                <td>
                  {elemento.proveedor ?
                    elemento.proveedor :
                    (<select name="proveedor" onChange={event => { handleChangeSelect(event, elemento) }} >
                      <option value="">Elige una opcion</option>
                      {data && data.map((el) => (
                        <option key={el.idProveedor} value={el.idProveedor}>

                          {el.nombre}


                        </option>
                      ))}
                    </select>)

                  }
                  {elemento.proveedor ?
                    (<br />) :
                    (<button onClick={abrirModal1}>Agregar Nuevo Proveedor</button>)


                  }

                </td>
                <td>
                  <button
                    className="botonMini btnEditar"
                    onClick={() => editar(elemento.idProducto)}
                  >
                    Editar
                  </button>
                  <button
                    className="botonMini btnEliminar"
                    onClick={() => eliminar(elemento.idProducto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AgregarProductoModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onGuardar={(nuevoUsuario) => registrarDato(nuevoUsuario)}
        idProductoEditar={idProductoEditar}
      />
      <AgregarProveedorModal
        isOpen={modalAbierto1}
        onClose={cerrarModal1}
        onGuardar={(nuevoProveedor) => registrarDatoProve(nuevoProveedor)}
        idProveedorEditar={idProveedorEditar}
      />
    </div>
  );
} else {
  window.location='/login';
}
}

export default InventarioPage;
