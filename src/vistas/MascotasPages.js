import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./MascotasPages.css";
import { API_URL } from '../otros/ConexionAPI';
// import AgregarMascotaModal from '../componentes/AgregarMascotaModal';
// import Swal from 'sweealert2';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import HomeRecicladoMedico from './HomeRecicladoMedico';
import AgregarMascotaModal from '../componentes/AgregarMascotaModal';

function MascotasPages() {
    const navigate = useNavigate();
    const [Mascotas, setMascotas] = useState([]);
    const [idMascotasEditar, setIdMascotasEditar] = useState(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const abrirModal = () => { setModalAbierto(true); }
    const cerrarModal = () => { setModalAbierto(false); }
    const irBienvenida = () => { window.location.reload(); }
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' || userRole === 'veterinario') {
            if (userRole === 'admin') {
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
    }, []
    );*/

    const actualizarTabla = () => {
        fetch(`${API_URL}/mascotas`)
            .then(response => response.json())
            .then(data => { setMascotas(data); })
            .catch(error => { console.error(error); });
    }

    const registrarMascota = (mascota) => {
        fetch(`${API_URL}/addmascota`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mascota)
        }).then(response => response.json())
            .then(data => {
                actualizarTabla();
            })
            .catch(error => console.error(error));
    }



    const editarMascota = (idMascota) => {
        console.log(`Editar Mascota ${idMascota}`);
    }

    const eliminarMascota = (idMascota) => {
        Swal.fire({
            title: 'Eliminar Mascota',
            text: "¿Está seguro de que desea eliminar ésta Mascota?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/deletecita/${idMascota}`, {
                    method: 'DELETE'
                }).then(response => response)
                    .then(data => {
                        actualizarTabla();
                        Swal.fire(
                            'Borrado Exitoso',
                            'La Mascota ha sido eliminado',
                            'success'
                        )
                    }).catch(error => console.error(error));
            }
        })
    }
    if (localStorage.getItem("auth")!==null) {
    return (

        <div className='contenedorPage'>
            <HomeRecicladoMedico></HomeRecicladoMedico>
            {/* <div className='contaier_botones'>
            <Link to={"/home2"}><button className="boton" >Inicio</button></Link>
            <button className="boton" onClick={irBienvenida}>Inicio</button>
                <button className="boton" onClick={abrirModal}>Agregar</button>
            </div> */}
            <div className="contenedorBotones">
                <Link to={"/home2"}><button className="boton" >Inicio</button></Link>
                {/* <button className="boton" onClick={irBienvenida}>Inicio</button> */}
                {/* <button className="boton" onClick={abrirModal}>Agregar</button> */}
            </div>
            <div className='contenedorTabla'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Raza</th>
                            <th>Color</th>
                            <th>Nacimiento</th>
                            <th>Edad</th>
                            <th>Peso</th>
                            <th>Nombre Dueno</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Mascotas.map(cita => (
                            <tr key={cita.idMascota}>
                                <td>{cita.idMascota}</td>
                                <td>{cita.nombre}</td>
                                <td>{cita.raza}</td>
                                <td>{cita.color}</td>
                                <td>{cita.nacimiento}</td>
                                <td>{cita.edad}</td>
                                <td>{cita.peso}</td>
                                <td>{cita.nombreDueno}</td>
                                <td>{cita.direccion}</td>
                                <td>{cita.telefono}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AgregarMascotaModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                onGuardar={(nuevaMascota) => registrarMascota(nuevaMascota)}
                idMascotasEditar={idMascotasEditar}
            />
        </div>
    );
} else {
    window.location='/login';
}

}

/*
<td>
    <button className='botonMini btnEditar' onClick={() => editarMascota(cita.idMascotas)}>Editar</button>
    <button className='botonMini btnEliminar' onClick={() => eliminarMascota(cita.idMascota)}>Eliminar</button>
</td>
*/

export default MascotasPages;