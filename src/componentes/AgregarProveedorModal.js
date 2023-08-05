import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./AgregarProveedorModal.css";
import TextFieldEditor from './TextFieldEditor';
import Swal from 'sweetalert2';
import { API_URL } from '../otros/ConexionAPI';
Modal.setAppElement('#root');

function AgregarProveedorModal({ isOpen, onClose, onGuardar, idProveedorEditar }) {
    //Manejadores de Datos
    const idProveedor = idProveedorEditar;
    //const [categoria] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [numeroTelefono, setNumeroTelefono] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [cuentaBancaria, setCuentaBancaria] = useState('');

    
    //Manejadores de Validacion
    const valorDefecto = true;
    const [errorNombre, setErrorNombre] = useState(valorDefecto);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(valorDefecto);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState(valorDefecto);
    const [errorDescripcion, setErrorDescripcion] = useState(valorDefecto);
    const [errorDireccion, setErrorDireccion] = useState(valorDefecto);
    const [errorNumeroTelefono, setErrorNumeroTelefono] = useState(valorDefecto);
    const [errorCorreoElectronico, setErrorCorreoElectronico] = useState(valorDefecto);
    const [errorCuentaBancaria, setErrorCuentaBancaria] = useState(valorDefecto);

    useEffect(() => {
        if (idProveedor) {
            fetch(`${API_URL}/getproveedor/${idProveedor}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(proveedor => {
                        actualizarNombre(proveedor.nombre);
                        actualizarApellidoPaterno(proveedor.apellidoPaterno);
                        actualizarApellidoMaterno(proveedor.apellidoMaterno);
                        actualizarDescripcion(proveedor.descripcion);
                        actualizarDireccion(proveedor.descripcion);
                        actualizarTelefono(proveedor.numeroTelefono);
                        actualizarCorreo(proveedor.correoElectronico);
                        actualizarCuentaBancaria(proveedor.cuentaBancaria);
                        actualizarErrorNombre(false);
                        actualizarErrorApellidoPaterno(false);
                        actualizarErrorApellidoMaterno(false);
                        actualizarErrorDescripcion(false);
                        actualizarErrorDireccion(false);
                        actualizarErrorTelefono(false);
                        actualizarErrorCorreo(false);
                        actualizarErrorCuentaBancaria(false);
                        
                        // cambiarValorModalItem(proveedor.categoria, 'categoria');
                    });
                })
                .catch(error => { console.error(error); });
        }
    }, [idProveedor]);

    // function cambiarValorModalItem(texto, idItem) {
    //     const item = document.getElementById(idItem);
    //     if (item) {
    //         const opciones = item.getElementsByTagName('option');
    //         for (let i = 0; i < opciones.length; i++) {
    //             if (opciones[i].innerText === texto) {
    //                 item.value = opciones[i].value;
    //                 break;
    //             }
    //         }
    //     }
    // }

    const handleGuardar = () => {
        // let categoria = document.getElementById("categoria").selectedOptions[0].text;
        //console.log("A guardar: ");
        //console.log(nuevo);
        //console.log(errorNombre + "_" + errorPrecio + "_" + errorCantidad);
        if (errorNombre|| errorApellidoPaterno||errorApellidoMaterno || errorDescripcion || errorDireccion|| errorNumeroTelefono||errorCorreoElectronico||errorCuentaBancaria) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            if (idProveedor) {
                const proveedorModificado = {
                    idProveedor: idProveedor, nombre: nombre,apellidoPaterno: apellidoPaterno,apellidoMaterno:apellidoMaterno, descripcion: descripcion, direccion: direccion, numeroTelefono: numeroTelefono, correoElectronico: correoElectronico, cuentaBancaria: cuentaBancaria,
                };
                fetch(`${API_URL}/updateproveedor`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(proveedorModificado)
                }).then(response => response.json())
                    .then(data => { })
                    .catch(error => console.error(error));
            } else {
                const proveedorNuevo = {
                    nombre: nombre,apellidoPaterno: apellidoPaterno,apellidoMaterno:apellidoMaterno, descripcion: descripcion, direccion: direccion, numeroTelefono: numeroTelefono, correoElectronico: correoElectronico, cuentaBancaria: cuentaBancaria,
                };
                onGuardar(proveedorNuevo);
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
    const actualizarApellidoPaterno = (newValor) => { setApellidoPaterno(newValor); }
    const actualizarErrorApellidoPaterno = (newValor) => { setErrorApellidoPaterno(newValor); }
    const actualizarApellidoMaterno = (newValor) => { setApellidoMaterno(newValor); }
    const actualizarErrorApellidoMaterno = (newValor) => { setErrorApellidoMaterno(newValor); }
    const actualizarDescripcion = (newValor) => { setDescripcion(newValor); }
    const actualizarErrorDescripcion = (newValor) => { setErrorDescripcion(newValor); }
    const actualizarDireccion = (newValor) => { setDireccion(newValor); }
    const actualizarErrorDireccion = (newValor) => { setErrorDireccion(newValor); }
    const actualizarTelefono = (newValor) => { setNumeroTelefono(newValor); }
    const actualizarErrorTelefono = (newValor) => { setErrorNumeroTelefono(newValor); }
    const actualizarCorreo = (newValor) => { setCorreoElectronico(newValor); }
    const actualizarErrorCorreo = (newValor) => { setErrorCorreoElectronico(newValor); }
    const actualizarCuentaBancaria = (newValor) => { setCuentaBancaria(newValor); }
    const actualizarErrorCuentaBancaria = (newValor) => { setErrorCuentaBancaria(newValor); }

    const limpiarCampos = () => {
        setNombre(''); setApellidoPaterno(''); setApellidoMaterno(''); setDescripcion(''); setDireccion('');setNumeroTelefono('');setCorreoElectronico('');setCuentaBancaria('');
        setErrorNombre(valorDefecto); setErrorApellidoPaterno(''); setErrorApellidoMaterno(''); setErrorDescripcion(valorDefecto); setErrorDireccion(valorDefecto);setErrorNumeroTelefono(valorDefecto); setErrorCorreoElectronico(valorDefecto); setErrorCuentaBancaria(valorDefecto); 
    }

    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Usuario"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header' >Agregar Proveedor</h2>
            <div className='modal-content'>
                <form className='modal-form'>
                    {/* <div className='modal-item'>
                        <label htmlFor="categoria">Categoria:</label>
                        <select id="categoria">
                            <option value="medicamento">Medicamento</option>
                            <option value="alimento">Alimento</option>
                            <option value="accesorio">Accesorio</option>
                        </select>
                    </div> */}
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
                        id="apellidoPaterno"
                        label="Apellido Paterno"
                        value={apellidoPaterno}
                        minLength={1}
                        maxLength={150}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="formato de nombre invalido"
                        onChange={actualizarApellidoPaterno}
                        actualizarError={actualizarErrorApellidoPaterno}
                    />
                    <TextFieldEditor
                        id="apellidoMaterno"
                        label="Apellido Materno"
                        value={apellidoMaterno}
                        minLength={1}
                        maxLength={150}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="formato de nombre invalido"
                        onChange={actualizarApellidoMaterno}
                        actualizarError={actualizarErrorApellidoMaterno}
                    />
                    <TextFieldEditor
                        id="descripcion"
                        label="Descripcion Del Proveedor"
                        value={descripcion}
                        minLength={1}
                        maxLength={150}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="formato de nombre invalido"
                        onChange={actualizarDescripcion}
                        actualizarError={actualizarErrorDescripcion}
                    />
                    <TextFieldEditor
                        id="direccion"
                        label="Direccion"
                        value={direccion}
                        minLength={1}
                        maxLength={50}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de nombre invalido"
                        onChange={actualizarDireccion}
                        actualizarError={actualizarErrorDireccion}
                    />
                    <TextFieldEditor
                        id="telefono"
                        type="number"
                        label="Numero Telefonico"
                        value={numeroTelefono}
                        minLength={1}
                        maxLength={10}
                        validator={/^[0-9]+$/}
                        errorMessage="solo numeros"
                        onChange={actualizarTelefono}
                        actualizarError={actualizarErrorTelefono}
                    />
                    <TextFieldEditor
                        id="correo"
                        label="Correo Electronico"
                        value={correoElectronico}
                        minLength={1}
                        maxLength={50}
                        validator={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                        errorMessage="Formato de nombre invalido"
                        onChange={actualizarCorreo}
                        actualizarError={actualizarErrorCorreo}
                    />
                    <TextFieldEditor
                        id="banco"
                        type="number"
                        label="Clave Inter Bancaria"
                        value={cuentaBancaria}
                        minLength={1}
                        maxLength={18}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numeros"
                        onChange={actualizarCuentaBancaria}
                        actualizarError={actualizarErrorCuentaBancaria}
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

export default AgregarProveedorModal;