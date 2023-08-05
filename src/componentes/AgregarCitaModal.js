import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import "./AgregarCitaModal.css";
import TextFieldEditor from './TextFieldEditor';
import Swal from 'sweetalert2';
import { API_URL } from '../otros/ConexionAPI';
Modal.setAppElement('#root');

function AgregarCitaModal({ isOpen, onClose, day, hour }) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [idMascota, setIdMascota] = useState('');
    const valorDefecto = true;
    const [errorIdMascota, setErrorIdMascota] = useState(valorDefecto);

    const limpiarCampos = useCallback(() => {
        setIdMascota('');
        setErrorIdMascota(valorDefecto);
    }, [valorDefecto]);

    useEffect(() => {
        if (isOpen) {
            if (day && hour) {
                //console.log("D: " + day + " _ H: " + hour);
                setSelectedDay(day);
                setSelectedHour(hour);
            }
        }
    }, [isOpen, day, hour, limpiarCampos]);

    const handleGuardar = () => {
        if (errorIdMascota) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Los campos no son validos',
                showConfirmButton: false,
                timer: 500
            });
        } else {
            const citaNueva = {
                dia: selectedDay, hora: selectedHour, idMascota: idMascota,
            };
            console.log("Cita Nueva");
            console.log(citaNueva);

            fetch(`${API_URL}/addcita`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(citaNueva)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    handleClose();
                })
                .catch(error => console.error(error));
        }
    };

    const handleClose = () => {
        limpiarCampos();
        onClose();
    };

    const actualizarIdMascota = (newValor) => { setIdMascota(newValor); }
    const actualizarErrorIdMascota = (newValor) => { setErrorIdMascota(newValor); }

    return (
        <Modal
            className="myEstilo"
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Cita"
            shouldCloseOnOverlayClick={false}
        >
            <h2 className='modal-header centrado'>Agregar Cita</h2>
            <div className='modal-content'>
                <form className='modal-form'>
                    <TextFieldEditor
                        id="idMascota"
                        label="ID Mascota"
                        value={idMascota}
                        minLength={1}
                        maxLength={5}
                        validator={/^[0-9]*?$/}
                        errorMessage="ID invalido, solo se aceptan números"
                        onChange={actualizarIdMascota}
                        actualizarError={actualizarErrorIdMascota}
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

export default AgregarCitaModal;