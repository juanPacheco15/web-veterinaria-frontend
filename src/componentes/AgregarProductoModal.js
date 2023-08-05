import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./AgregarProductoModal.css";
import TextFieldEditor from './TextFieldEditor';
import Swal from 'sweetalert2';
import { API_URL } from '../otros/ConexionAPI';
Modal.setAppElement('#root');

function AgregarProductoModal({ isOpen, onClose, onGuardar, idProductoEditar }) {
    //Manejadores de Datos
    const idProducto = idProductoEditar;
    //const [categoria] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [proveedor, setProveedor] = useState('');
    //Manejadores de Validacion
    const valorDefecto = true;
    const [errorNombre, setErrorNombre] = useState(valorDefecto);
    const [errorPrecio, setErrorPrecio] = useState(valorDefecto);
    const [errorPrecioVenta, setErrorPrecioVenta] = useState(valorDefecto);
    const [errorCantidad, setErrorCantidad] = useState(valorDefecto);
    const [errorProveedor, setErrorProveedor] = useState(valorDefecto);

    useEffect(() => {
        if (idProducto) {
            fetch(`${API_URL}/getproducto/${idProducto}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(producto => {
                        actualizarNombre(producto.nombre);
                        actualizarPrecio(producto.precio);
                        actualizarPrecioVenta(producto.precioVenta);
                        actualizarCantidad(producto.cantidad);
                        actualizarProveedor(producto.proveedor);
                        actualizarErrorNombre(false);
                        actualizarErrorPrecio(false);
                        actualizarErrorPrecioVenta(false);
                        actualizarErrorCantidad(false);
                        actualizarErrorProveedor(false);
                        cambiarValorModalItem(producto.categoria, 'categoria');
                    });
                })
                .catch(error => { console.error(error); });
        }
    },// [idProducto]
    );

    function cambiarValorModalItem(texto, idItem) {
        const item = document.getElementById(idItem);
        if (item) {
            const opciones = item.getElementsByTagName('option');
            for (let i = 0; i < opciones.length; i++) {
                if (opciones[i].innerText === texto) {
                    item.value = opciones[i].value;
                    break;
                }
            }
        }
    }

    const handleGuardar = () => {
        let categoria = document.getElementById("categoria").selectedOptions[0].text;
        //console.log("A guardar: ");
        //console.log(nuevo);
        //console.log(errorNombre + "_" + errorPrecio + "_" + errorCantidad);
        if (errorNombre || errorPrecio || errorPrecioVenta || errorCantidad) {//
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            if (idProducto) {
                const productoModificado = {
                    idProducto: idProducto, categoria: categoria, nombre: nombre, precio: precio, precioVenta: precioVenta, cantidad: cantidad, proveedor: proveedor
                };
                fetch(`${API_URL}/updateproducto`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productoModificado)
                }).then(response => response.json())
                    .then(data => { })
                    .catch(error => console.error(error));
            } else {
                const productoNuevo = {
                    categoria: categoria, nombre: nombre, precio: precio, precioVenta: precioVenta, cantidad: cantidad, proveedor: proveedor
                };
                onGuardar(productoNuevo);
            }
            handleClose();
        }
    };

    const handleClose = () => {
        limpiarCampos();
        onClose();
    };

    const actualizarNombre = (newValor) => { setNombre(newValor); }
    const actualizarErrorNombre = (newValor) => { setErrorNombre(newValor); }
    const actualizarPrecio = (newValor) => { setPrecio(newValor); }
    const actualizarPrecioVenta = (newValor) => { setPrecioVenta(newValor); }
    const actualizarErrorPrecio = (newValor) => { setErrorPrecio(newValor); }
    const actualizarErrorPrecioVenta = (newValor) => { setErrorPrecioVenta(newValor); }
    const actualizarCantidad = (newValor) => { setCantidad(newValor); }
    const actualizarErrorCantidad = (newValor) => { setErrorCantidad(newValor); }
    const actualizarProveedor = (newValor) => { setProveedor(newValor); }
    const actualizarErrorProveedor = (newValor) => { setErrorProveedor(newValor); }

    const limpiarCampos = () => {
        setNombre(''); setPrecio(''); setCantidad(''); setProveedor(''); setPrecioVenta('');
        setErrorNombre(valorDefecto); setErrorPrecio(valorDefecto); setErrorCantidad(valorDefecto); setErrorProveedor(valorDefecto); setErrorPrecioVenta(valorDefecto);
        idProductoEditar = null;
    }

    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Usuario"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header' >Agregar Producto</h2>
            <div className='modal-content'>
                <form className='modal-form'>
                    <div className='modal-item'>
                        <label htmlFor="categoria">Categoria:</label>
                        <select id="categoria">
                            <option value="medicamento">Medicamento</option>
                            <option value="alimento">Alimento</option>
                            <option value="accesorio">Accesorio</option>
                        </select>
                    </div>
                    <TextFieldEditor
                        id="nombre"
                        label="Nombre"
                        value={nombre}
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de nombre inválido"
                        onChange={actualizarNombre}
                        actualizarError={actualizarErrorNombre}
                    />
                    <TextFieldEditor
                        id="precio"
                        label="Precio"
                        value={precio}
                        minLength={1}
                        maxLength={4}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numeros"
                        onChange={actualizarPrecio}
                        actualizarError={actualizarErrorPrecio}
                    />
                    <TextFieldEditor
                        id="precioVenta"
                        label="Precio Venta"
                        value={precioVenta}
                        minLength={1}
                        maxLength={4}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numeros"
                        onChange={actualizarPrecioVenta}
                        actualizarError={actualizarErrorPrecioVenta}
                    />
                    <TextFieldEditor
                        id="cantidad"
                        label="Cantidad"
                        value={cantidad}
                        minLength={1}
                        maxLength={4}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numeros"
                        onChange={actualizarCantidad}
                        actualizarError={actualizarErrorCantidad}
                    />
                    <TextFieldEditor
                        id="proveedor"
                        label="Proveedor"
                        value={proveedor}
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de nombre inválido"
                        onChange={actualizarProveedor}
                        actualizarError={actualizarErrorProveedor}
                    />
                </form>
                <div className='centrado'>
                    <button type="button" className='modal-button' onClick={handleClose}>Cerrar</button>
                    <button type="button" className='modal-button' onClick={handleGuardar}>Guardar</button>
                </div>
            </div>
        </Modal>
    );
}

export default AgregarProductoModal;