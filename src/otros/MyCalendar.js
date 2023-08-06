import React, { useState, useEffect } from 'react';
import styles from './MyCalendar.module.css';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import AgregarCitaModal from '../componentes/AgregarCitaModal';
import { API_URL } from '../otros/ConexionAPI';

const MyCalendar = () => {
    const [citas, setCitas] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const abrirModal = () => { setModalAbierto(true); }
    const cerrarModal = () => {
        setModalAbierto(false);
        getCitas();
    }
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [viewSelected, setViewSelected] = useState("MES");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const startHour = 10;
    const endHour = 15;

    const getMonthDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        return eachDayOfInterval({ start: startDate, end: endDate });
    };

    const getWeekDays = () => {
        const weekStart = startOfWeek(currentMonth);
        const weekEnd = endOfWeek(currentMonth);
        return eachDayOfInterval({ start: weekStart, end: weekEnd });
    };

    const isToday = (day) => {
        const today = new Date();
        return format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
    };

    useEffect(() => {
        getCitas();
    }, [currentMonth]);

    const getCitas = () => {
        fetch(`${API_URL}/citas`)
            .then(response => response.json())
            .then(data => {
                setCitas(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentMonth);
        prevMonth.setDate(1);
        prevMonth.setMonth(currentMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const handlePrevWeek = () => {
        const prevWeek = new Date(currentMonth);
        prevWeek.setDate(currentMonth.getDate() - 7);
        setCurrentMonth(prevWeek);
    };

    const handleToday = () => {
        const todayMonth = new Date();
        setCurrentMonth(todayMonth);
    };
    const handleNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setDate(1);
        nextMonth.setMonth(currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentMonth);
        nextWeek.setDate(currentMonth.getDate() + 7);
        setCurrentMonth(nextWeek);
    };

    const handleDayClick = (day, hour) => {
        //console.log('Vista:' + viewSelected, format(day, 'yyyy-MM-dd'), `${hour}:00-${hour + 1}:00`);
        if (viewSelected === "MES") {
            const weekStart = startOfWeek(day);
            setViewSelected("SEMANA")
            setCurrentMonth(weekStart);
        } else if (viewSelected === "SEMANA") {
            setSelectedDay(format(day, 'yyyy-MM-dd'));
            setSelectedHour(hour + ":00");
            abrirModal();
        }
    };

    const getTitulo = () => {
        if (viewSelected === "MES") {
            return format(currentMonth, 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(currentMonth, 'MMMM yyyy', { locale: es }).slice(1);
        } else if (viewSelected === "SEMANA") {
            const weekDays = getWeekDays();
            const startOfWeekTitle = format(weekDays[0], 'dd MMMM', { locale: es });
            const endOfWeekTitle = format(weekDays[weekDays.length - 1], 'dd MMMM', { locale: es });
            return `${startOfWeekTitle} al ${endOfWeekTitle}`;
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const renderTableHeaders = () => {
        const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        if (viewSelected === "MES") {
            const weekDaysHeaders = weekdays.map((day, index) => (
                <th key={index} className={styles.th}>{day}</th>
            ));
            return <tr>{weekDaysHeaders}</tr>;
        } else if (viewSelected === "SEMANA") {
            const weekDays = getWeekDays();
            const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const weekDaysHeaders = weekDays.map((day, index) => {
                const formattedDay = format(day, 'EEEE dd', { locale: es }); // Obtener el nombre del día de la semana y el día del mes
                const dayToShow = viewSelected === "SEMANA" ? formattedDay : weekdays[index];
                return (
                    <th key={index} className={styles.th}>
                        {capitalizeFirstLetter(dayToShow)}
                    </th>
                );
            });
            return <tr><th className={styles.th}>Horario</th>{weekDaysHeaders}</tr>;
        }
    };

    const renderHourRows = () => { //Vista SEMANA
        const rows = [];
        const interval = endHour - startHour;
        for (let i = 0; i <= interval; i++) {
            const startHourStr = `${startHour + i}:00`;
            //const endHourStr = `${startHour + i + 1}:00`;            
            rows.push(
                <tr key={i}>
                    <td className={styles.hourCell}>{`${startHourStr}`}</td>
                    {renderHourCells(startHour + i)}
                </tr>
            );
        }
        return rows;
    };

    const renderHourCells = (hour) => { //AUX Vista SEMANA
        //const selectedDays = viewSelected === "MES" ? getMonthDays() : viewSelected === "SEMANA" ? getWeekDays() : undefined;
        let selectedDays = getWeekDays();

        return selectedDays.map((day, index) => {
            const isDayToday = isToday(day);
            const cita = citas.find(cita => cita.dia === format(day, 'yyyy-MM-dd') && cita.hora === `${hour}:00`);
            const citaContent = cita ? `${cita.idMascota} - ${cita.nombre}` : '';
            return (
                <td
                    key={index}
                    className={`${styles.currentMonth} ${styles.td} ${isDayToday ? styles.today : ''}`}
                    onClick={() => handleDayClick(day, hour)}
                >
                    {citaContent}
                </td>
            );
        });
    };

    const renderCalendarRows = () => { //Vista MES
        let selectedDays = getMonthDays();
        const rows = [];
        let cells = [];

        selectedDays.forEach((day, index) => {//Días-Filas
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const formattedDay = format(day, 'd');
            const isDayToday = isToday(day);
            const isDayOtherMonth = !isCurrentMonth && viewSelected !== "SEMANA";
            cells.push(
                <td
                    key={index}
                    className={`${isCurrentMonth ? styles.currentMonth : (isDayOtherMonth ? styles.otherMonth : styles.currentMonth)} ${styles.td} ${isDayToday ? styles.today : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {formattedDay}
                </td>
            );

            if (index === selectedDays.length - 1 || day.getDay() === 6) {
                rows.push(<tr key={rows.length}>{cells}</tr>);
                cells = [];
            }
        });
        return rows;
    };

    return (
        <div className={styles.MyCalendar}>
            <div className={styles.cabeceraCalendario}>
                <div>
                    <button className={styles.botonCalendario} onClick={viewSelected === "SEMANA" ? handlePrevWeek : handlePrevMonth}>Anterior</button>
                    <button className={styles.botonCalendario} onClick={handleToday}>Actual</button>
                    <button className={styles.botonCalendario} onClick={viewSelected === "SEMANA" ? handleNextWeek : handleNextMonth}>Siguiente</button>
                </div>
                <div className={styles.tituloActual}>
                    {getTitulo()}
                </div>
                <div>
                    <button
                        className={`${styles.botonCalendario} ${viewSelected === "MES" ? styles.selected : ""}`}
                        onClick={() => setViewSelected("MES")}
                    >
                        Mes
                    </button>
                    <button
                        className={`${styles.botonCalendario} ${viewSelected === "SEMANA" ? styles.selected : ""}`}
                        onClick={() => setViewSelected("SEMANA")}
                    >
                        Semana
                    </button>
                    {/*
                    <button
                        className={`${styles.botonCalendario} ${viewSelected === "DIA" ? styles.selected : ""}`}
                        onClick={() => setViewSelected("DIA")}
                    >
                        Dia
                    </button> */}
                </div>
            </div>
            <table className={styles.tabla} id="tabla">
                <thead>
                    {renderTableHeaders()}
                </thead>
                <tbody>
                    {viewSelected === "SEMANA" && renderHourRows()}
                    {viewSelected === "MES" && renderCalendarRows()}
                </tbody>
            </table>
            <AgregarCitaModal
                isOpen={modalAbierto}
                onClose={cerrarModal}
                day={selectedDay}
                hour={selectedHour}
            />
        </div>
    );
};

export default MyCalendar;
