import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import "./AgregarUsuarioModal.css";
import TextFieldEditor from './TextFieldEditor';
import Swal from 'sweetalert2';
import { API_URL } from '../otros/ConexionAPI';
Modal.setAppElement('#root');

function AgregarUsuarioModal({ isOpen, onClose, onGuardar, idUsuarioEditar, actualizarTabla }) {
    //Manejadores de Datos
    const [idUsuario, setIdUsuario] = useState(null);

    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    //Manejadores de Validacion
    const valorDefecto = true;
    const [errorNombre, setErrorNombre] = useState(valorDefecto);
    const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(valorDefecto);
    const [errorApellidoMaterno, setErrorApellidoMaterno] = useState(valorDefecto);
    const [errorUsuario, setErrorUsuario] = useState(valorDefecto);
    const [errorContraseña, setErrorContraseña] = useState(valorDefecto);

    const limpiarCampos = useCallback(() => {
        setNombre(''); setApellidoPaterno(''); setApellidoMaterno(''); setUsuario(''); setContraseña('');
        setErrorNombre(valorDefecto); setErrorApellidoPaterno(valorDefecto); setErrorApellidoMaterno(valorDefecto);
        setErrorUsuario(valorDefecto); setErrorContraseña(valorDefecto);
    }, [valorDefecto]);

    useEffect(() => {
        if (isOpen) {
            if (idUsuarioEditar) {
                setIdUsuario(idUsuarioEditar);
                fetch(`${API_URL}/getusuario/${idUsuarioEditar}`)
                    .then(response => response.json())
                    .then(data => {
                        data.forEach(usuario => {
                            actualizarNombre(usuario.nombre);
                            actualizarApellidoPaterno(usuario.apellidoPaterno);
                            actualizarApellidoMaterno(usuario.apellidoMaterno);
                            actualizarUsuario(usuario.usuario);
                            actualizarContraseña(usuario.contraseña);
                            actualizarErrorNombre(false);
                            actualizarErrorApellidoPaterno(false);
                            actualizarErrorApellidoMaterno(false);
                            actualizarErrorUsuario(false);
                            actualizarErrorContraseña(false);
                            cambiarValorModalItem(usuario.puesto, 'puesto');
                        });
                    }).catch(error => { console.error(error); });
            } else {
                setIdUsuario(null);
                limpiarCampos();
            }
        }
    }, [isOpen, idUsuarioEditar, limpiarCampos]);

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
        let puesto = document.getElementById("puesto").selectedOptions[0].text;
        //console.log(nuevoUsuario);
        if (errorNombre || errorApellidoPaterno || errorApellidoMaterno || errorUsuario || errorContraseña) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            if (idUsuario) {
                const usuarioModificado = {
                    idUsuario: idUsuario, nombre: nombre, apellidoPaterno: apellidoPaterno, apellidoMaterno: apellidoMaterno, puesto: puesto, usuario: usuario, contraseña: contraseña,
                };
                fetch(`${API_URL}/updateusuario`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(usuarioModificado)
                }).then(response => response.json())
                    .then(data => {
                        actualizarTabla();
                    })
                    .catch(error => console.error(error));
            } else {
                const usuarioNuevo = {
                    nombre, apellidoPaterno, apellidoMaterno, puesto, usuario, contraseña,
                };
                onGuardar(usuarioNuevo);
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
    const actualizarUsuario = (newValor) => { setUsuario(newValor); }
    const actualizarErrorUsuario = (newValor) => { setErrorUsuario(newValor); }
    const actualizarContraseña = (newValor) => { setContraseña(newValor); }
    const actualizarErrorContraseña = (newValor) => { setErrorContraseña(newValor); }



    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Usuario"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header' >Agregar Usuario</h2>
            <div className='modal-content'>
                <form className='modal-form'>
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
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de apellido inválido"
                        onChange={actualizarApellidoPaterno}
                        actualizarError={actualizarErrorApellidoPaterno}
                    />
                    <TextFieldEditor
                        id="apellidoMaterno"
                        label="Apellido Materno"
                        value={apellidoMaterno}
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de apellido inválido"
                        onChange={actualizarApellidoMaterno}
                        actualizarError={actualizarErrorApellidoMaterno}
                    />
                    <div className='modal-item'>
                        <label htmlFor="puesto">Puesto:</label>
                        <select
                            id="puesto"
                        //value={puesto}//
                        //onChange={(event) => setPuesto(event.target.value)}//
                        >
                            <option value="veterinario">Médico Veterinario</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <TextFieldEditor
                        id="usuario"
                        label="Usuario"
                        value={usuario}
                        minLength={5}
                        maxLength={16}
                        validator={/^[A-Za-z0-9]+$/}
                        errorMessage="Solo numeros y letras"
                        onChange={actualizarUsuario}
                        actualizarError={actualizarErrorUsuario}
                    />
                    <TextFieldEditor
                        id="contraseña"
                        label="Contraseña"
                        value={contraseña}
                        minLength={8}
                        maxLength={16}
                        validator={/^[A-Za-z0-9!@#$%&]+$/}
                        errorMessage="Solo numeros, letras y !@#$%&"
                        onChange={actualizarContraseña}
                        actualizarError={actualizarErrorContraseña}
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

export default AgregarUsuarioModal;