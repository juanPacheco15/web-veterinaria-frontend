import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./CitasPages.css";
import { Link } from 'react-router-dom';
import HomeRecicladoMedico from './HomeRecicladoMedico';
import MyCalendar from '../otros/MyCalendar';

function CitasPages() {
    const navigate = useNavigate();
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin' || userRole === 'veterinario') {
            if (userRole === 'admin') {
                navigate('/home');
            }
        } else {
            navigate('/login');
        }
        //actualizarTabla();//
    }, [navigate]);
    if (localStorage.getItem("auth")!==null) {
    return (
        <div className='contenedorPage'>
            <HomeRecicladoMedico></HomeRecicladoMedico>
            <div className="contenedorBotones">
                <Link to={"/home2"}><button className="boton" >Inicio</button></Link>
            </div>
            <div className='contenedorTabla'>
                <h1 className='centrado'>Calendario de Citas</h1>
                {/*<CalendarComponent />*/}
                <MyCalendar></MyCalendar>
            </div>


        </div>
    );
} else {
    window.location='/login';
}
}



export default CitasPages;