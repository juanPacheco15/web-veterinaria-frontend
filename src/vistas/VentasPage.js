import { useState, useEffect } from 'react';
import "./VentasPages.css";
import { API_URL } from '../otros/ConexionAPI';
import AgregarVentaModal from '../componentes/AgregarVentaModal';

import Swal from 'sweetalert2';

function VentasPages() {
    const [usuarios, setUsuarios] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const abrirModal = () => { handleClick(); setModalAbierto(true); }
    const cerrarModal = () => { setModalAbierto(false); }
    const irBienvenida = () => { window.location.reload(); }
    const [currentDate, setCurrentDate] = useState(null);



    useEffect(() => { setCurrentDate(new Date()); actualizarTabla(); }, []);

    const handleClick = () => {
        console.log(currentDate);
    }

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
    }

    const editarUsuario = (idUsuario) => {
        console.log(`Editar usuario ${idUsuario}`);
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

    return (
        <div className='contenedorPage'>
            <div className="contenedorBotones">
                <button className="boton" onClick={irBienvenida}>Inicio</button>
                <button className="boton" onClick={abrirModal} >Realizar Venta</button>
            </div>
            <div className='contenedorTabla'>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre Del Producto</th>
                            <th>Cantidad Del Producto</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            <th>Impuesto</th>
                            <th>Total</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.idVentas}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className='botonMini btnEditar' onClick={() => editarUsuario(usuario.idUsuario)}>Editar</button>
                                    <button className='botonMini btnEliminar' onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AgregarVentaModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                onGuardar={(nuevoUsuario) => registrarUsuario(nuevoUsuario)}
            />
        </div>
    );
}

export default VentasPages;