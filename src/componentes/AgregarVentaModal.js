import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AgregarVentaModal.css";
import TextFieldEditor from './TextFieldEditor';
import Swal from 'sweetalert2';
Modal.setAppElement('#root');

function AgregarUsuarioModal({ isOpen, onClose, onGuardar }) {
    //Manejadores de Datos
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

    const handleGuardar = () => {
        let puesto = document.getElementById("puesto").selectedOptions[0].text;
        const nuevoUsuario = {
            nombre, apellidoPaterno, apellidoMaterno, puesto, usuario, contraseña,
        };
        console.log(nuevoUsuario);
        if (errorNombre || errorApellidoPaterno || errorApellidoMaterno || errorUsuario || errorContraseña) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            onGuardar(nuevoUsuario);
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

    const limpiarCampos = () => {
        setNombre(''); setApellidoPaterno(''); setApellidoMaterno(''); setUsuario(''); setContraseña('');
        setErrorNombre(valorDefecto); setErrorApellidoPaterno(valorDefecto); setErrorApellidoMaterno(valorDefecto);
        setErrorUsuario(valorDefecto); setErrorContraseña(valorDefecto);
    }

    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Usuario"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header' >Realizar Venta</h2>
            <div className='modal-content'>
                <form className='modal-form'>
                    <TextFieldEditor
                        id="nombre"
                        label="Fecha"
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
                        label="Nombre Ptoducto"
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
                        label="Cantidad Producto"
                        value={apellidoMaterno}
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de apellido inválido"
                        onChange={actualizarApellidoMaterno}
                        actualizarError={actualizarErrorApellidoMaterno}
                    />
                    
                    <TextFieldEditor
                        id="usuario"
                        label="Precio Unitario"
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
                        label="Subtotal"
                        value={contraseña}
                        minLength={8}
                        maxLength={16}
                        validator={/^[A-Za-z0-9!@#$%&]+$/}
                        errorMessage="Solo numeros, letras y !@#$%&"
                        onChange={actualizarContraseña}
                        actualizarError={actualizarErrorContraseña}
                    />
                    <TextFieldEditor
                        id="contraseña"
                        label="Impuesto"
                        value={contraseña}
                        minLength={8}
                        maxLength={16}
                        validator={/^[A-Za-z0-9!@#$%&]+$/}
                        errorMessage="Solo numeros, letras y !@#$%&"
                        onChange={actualizarContraseña}
                        actualizarError={actualizarErrorContraseña}
                    />
                    <TextFieldEditor
                        id="contraseña"
                        label="Total"
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