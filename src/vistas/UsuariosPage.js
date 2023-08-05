import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./UsuariosPage.css";
import { API_URL } from '../otros/ConexionAPI';
import AgregarUsuarioModal from '../componentes/AgregarUsuarioModal';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import HomeReciclado from './HomeReciclado';

function UsuariosPage() {
    const navigate = useNavigate();
    const [contraseñasVisibles, setContraseñasVisibles] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [idUsuarioEditar, setIdUsuarioEditar] = useState(null);
    const abrirModal = () => { setModalAbierto(true); }
    const cerrarModal = () => { setModalAbierto(false); }

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' || userRole === 'veterinario') {
            if (userRole === 'veterinario') {
                navigate('/home');
            }
        } else {
            navigate('/login');
        }
        actualizarTabla();
    }, [navigate]);

    const actualizarTabla = () => {
        fetch(`${API_URL}/usuarios`)
            .then(response => response.json())
            .then(data => { setUsuarios(data); })
            .catch(error => { console.error(error); });
    }

    const registrarUsuario = (usuario) => {
        fetch(`${API_URL}/addusuario`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }).then(response => response.json())
            .then(data => { actualizarTabla(); })
            .catch(error => console.error(error));
        actualizarTabla();
    }

    const ocultarContraseña = (contraseña) => {
        const longitudContraseña = contraseña.length;
        const contraseñaOculta = '*'.repeat(longitudContraseña);
        return contraseñaOculta;
    };

    const alternarMostrarContraseña = (idUsuario) => {
        setContraseñasVisibles(prevState => ({
            ...prevState,
            [idUsuario]: !prevState[idUsuario]
        }));
    };

    const alternarMostrarOcultarContraseña = (idUsuario) => {
        if (contraseñasVisibles[idUsuario]) {
            alternarMostrarContraseña(idUsuario);
        } else {
            const user = localStorage.getItem('user');
            const password = localStorage.getItem('password');
            Swal.fire({
                title: user,
                text: 'Ingrese su contraseña para confirmar',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (value === password) {
                        alternarMostrarContraseña(idUsuario);
                    } else {
                        return 'Contraseña incorrecta.';
                    }
                },
            });
        }
    };

    const editarUsuario = (idUsuario) => {
        setIdUsuarioEditar(idUsuario);
        abrirModal();
        //console.log(`Editar usuario ${idUsuario}`);
    }

    const eliminarUsuario = (idUsuario) => {
        Swal.fire({
            title: 'Eliminar Usuario',
            text: "¿Está seguro de que desea eliminar éste usuario?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/deleteusuario/${idUsuario}`, {
                    method: 'DELETE'
                }).then(response => response)
                    .then(data => {
                        actualizarTabla();
                        Swal.fire(
                            'Borrado Exitoso',
                            'El usuario ha sido eliminado',
                            'success'
                        )
                    }).catch(error => console.error(error));
            }
        })
    }
    if (localStorage.getItem("auth")!==null) {
    return (
        <div className='contenedorPage'>
            <HomeReciclado></HomeReciclado>
            <div className="contenedorBotones">
                <Link to={"/home"}><button className="boton" >Inicio</button></Link>
                {/* <button className="boton" onClick={irBienvenida}>Inicio</button> */}
                {/* <button className="boton" onClick={abrirModal}>Agregar</button> */}
            </div>
            <div className='contenedorTabla'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Puesto</th>
                            <th>Usuario</th>
                            <th>Contraseña</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.idUsuario}>
                                <td>{usuario.idUsuario}</td>
                                <td>{usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</td>
                                <td>{usuario.puesto}</td>
                                <td>{usuario.usuario}</td>
                                <td>
                                    {contraseñasVisibles[usuario.idUsuario] ? usuario.contraseña : ocultarContraseña(usuario.contraseña)}
                                    <button onClick={() => alternarMostrarOcultarContraseña(usuario.idUsuario)}>
                                        {contraseñasVisibles[usuario.idUsuario] ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </td>
                                <td>
                                    <button className='botonMini btnEditar' onClick={() => editarUsuario(usuario.idUsuario)}>Editar</button>
                                    <button className='botonMini btnEliminar' onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AgregarUsuarioModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                onGuardar={(nuevoUsuario) => registrarUsuario(nuevoUsuario)}
                idUsuarioEditar={idUsuarioEditar}
                actualizarTabla={actualizarTabla}
            />
        </div>
        
    );
} else {
    window.location='/login';
}
}

export default UsuariosPage;