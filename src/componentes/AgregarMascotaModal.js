import React, { useState } from 'react';
import Modal from 'react-modal';
import "./AgregarMascotaModal.css";
import TextFieldEditor from './TextFieldEditor';
import { API_URL } from '../otros/ConexionAPI';
import Swal from 'sweetalert2';
Modal.setAppElement('#root');

function AgregarMascotaModal({ isOpen, onClose, onGuardar, idMascotasEditar }) {
    const idMascotas = idMascotasEditar;
    //Manejadores de Datos
    const [nombre, setNombre] = useState('');
    const [raza, setRaza] = useState('');
    const [color, setColor] = useState('');
    const [nacimiento, setNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [nombreDueno, setNombreDueno] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    //Manejadores de Validacion
    const valorDefecto = true;
    const [errorNombre, setErrorNombre] = useState(valorDefecto);
    const [errorRaza, setErrorRaza] = useState(valorDefecto);
    const [errorColor, setColorError] = useState(valorDefecto);
    const [errorNacimiento, setErrorNacimiento] = useState(valorDefecto);
    const [errorEdad, setErrorEdad] = useState(valorDefecto);
    const [errorPeso, setErrorPeso] = useState(valorDefecto);
    const [errorNombreDueno, setErrorNombreDueno] = useState(valorDefecto);
    const [errorDireccion, setErrorDireccion] = useState(valorDefecto);
    const [errorTelefono, setErrorTelefono] = useState(valorDefecto);

    const handleGuardar = () => {
        // let puesto = document.getElementById("puesto").selectedOptions[0].text;
        if (errorNombre || errorRaza || errorColor || errorNacimiento || errorEdad || errorPeso || errorNombreDueno || errorDireccion || errorTelefono) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            if (idMascotas) {
                const mascotaModificada = {
                    idMascotas: idMascotas, nombre: nombre, raza: raza, color: color, nacimiento: nacimiento, edad: edad, peso: peso, nombreDueno: nombreDueno, direccion: direccion, telefono: telefono,
                };
                fetch(`${API_URL}/updatemascota`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mascotaModificada)
                }).then(response => response.json())
                    .then(data => { })
                    .catch(error => console.error(error));
            } else {
                const mascotaNueva = {
                    nombre: nombre, raza: raza, color: color, nacimiento: nacimiento, edad: edad, peso: peso, nombreDueno: nombreDueno, direccion: direccion, telefono: telefono,
                };
                onGuardar(mascotaNueva);
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
    const actualizarRaza = (newValor) => { setRaza(newValor); }
    const actualizarErrorRaza = (newValor) => { setErrorRaza(newValor); }
    const actualizarColor = (newValor) => { setColor(newValor); }
    const actualizarErrorColor = (newValor) => { setColorError(newValor); }
    const actualizarNacimiento = (newValor) => { setNacimiento(newValor); }
    const actualizarErrorNacimiento = (newValor) => { setErrorNacimiento(newValor); }
    const actualizarEdad = (newValor) => { setEdad(newValor); }
    const actualizarErrorEdad = (newValor) => { setErrorEdad(newValor); }
    const actualizarPeso = (newValor) => { setPeso(newValor); }
    const actualizarErrorPeso = (newValor) => { setErrorPeso(newValor); }
    const actualizarNombreDueno = (newValor) => { setNombreDueno(newValor); }
    const actualizarErrorNombreDueno = (newValor) => { setErrorNombreDueno(newValor); }
    const actualizarDireccion = (newValor) => { setDireccion(newValor); }
    const actualizarErrorDireccion = (newValor) => { setErrorDireccion(newValor); }
    const actualizarTelefono = (newValor) => { setTelefono(newValor); }
    const actualizarErrorTelefono = (newValor) => { setErrorTelefono(newValor); }


    const limpiarCampos = () => {
        setNombre('');
        setRaza('');
        setColor('');
        setNacimiento('');
        setEdad('');
        setPeso('');
        setNombreDueno('');
        setDireccion('');
        setTelefono('');
        setErrorNombre(valorDefecto);
        setErrorRaza(valorDefecto);
        setColorError(valorDefecto);
        setErrorNacimiento(valorDefecto);
        setErrorEdad(valorDefecto);
        setErrorPeso(valorDefecto);
        setErrorNombreDueno(valorDefecto);
        setErrorDireccion(valorDefecto);
        setErrorTelefono(valorDefecto);

    }

    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Usuario"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header' >Agregar Mascota</h2>
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
                        id="raza"
                        label="Raza"
                        value={raza}
                        minLength={3}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de nombre inválido"
                        onChange={actualizarRaza}
                        actualizarError={actualizarErrorRaza}
                    />
                    <TextFieldEditor
                        id="color"
                        label="Color"
                        value={color}
                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de apellido inválido"
                        onChange={actualizarColor}
                        actualizarError={actualizarErrorColor}
                    />
                    <TextFieldEditor
                        id="nacimiento"
                        label="Nacimiento"
                        value={nacimiento}

                        maxLength={10}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numero"
                        onChange={actualizarNacimiento}
                        actualizarError={actualizarErrorNacimiento}
                    />
                    <TextFieldEditor
                        id="edad"
                        label="Edad"
                        value={edad}
                        // minLength={3}
                        maxLength={3}
                        validator={/^[0-9]+$/}
                        errorMessage="Formato de nombre inválido"
                        onChange={actualizarEdad}
                        actualizarError={actualizarErrorEdad}
                    />
                    <TextFieldEditor
                        id="peso"
                        label="Peso"
                        value={peso}

                        maxLength={16}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numeros y letras"
                        onChange={actualizarPeso}
                        actualizarError={actualizarErrorPeso}
                    />
                    <TextFieldEditor
                        id="nombreDueno"
                        label="Nombre Dueño"
                        value={nombreDueno}

                        maxLength={16}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)+$/}
                        errorMessage="Solo letras con la primera mayuscula"
                        onChange={actualizarNombreDueno}
                        actualizarError={actualizarErrorNombreDueno}
                    />
                    <TextFieldEditor
                        id="direccion"
                        label="Direccion"
                        value={direccion}

                        maxLength={20}
                        validator={/^[A-Z][a-z]*([ ][A-Z][a-z]*)?$/}
                        errorMessage="Formato de nombre inválido"
                        onChange={actualizarDireccion}
                        actualizarError={actualizarErrorDireccion}
                    />
                    <TextFieldEditor
                        id="telefono"
                        label="Telefono"
                        value={telefono}
                        minLength={3}
                        maxLength={10}
                        validator={/^[0-9]+$/}
                        errorMessage="Solo numero"
                        onChange={actualizarTelefono}
                        actualizarError={actualizarErrorTelefono}
                    />

                    {/* <div>
                    <label>Ingresa la fecha para agendar</label>
                    <input type='date' id='fecha' />
                    </div> */}

                </form>
                <div className='centrado'>
                    <button type="button" className='modal-button' onClick={handleClose}>Cerrar</button>
                    <button type="button" className='modal-button' onClick={handleGuardar}>Registrar Mascota</button>
                </div>
            </div>
        </Modal>
    );
}

export default AgregarMascotaModal;