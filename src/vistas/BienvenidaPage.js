import "./BienvenidaPage.css";

function BienvenidaPage() {
    return (
        <div className='contenedorPage'>
            <div className="contenedorBienvenida">
                Bienvenido
            </div>
            <div className="top-left">
                <img className="img" src={process.env.PUBLIC_URL + '/imagenes/patitas.png'} alt="ISI" />
            </div>
            <div className="top-right">
                <img className="img" src={process.env.PUBLIC_URL + '/imagenes/patitas.png'} alt="ISD"/>
            </div>
            <div className="bottom-left">
                <img className="img" src={process.env.PUBLIC_URL + '/imagenes/patitas.png'} alt="INI"/>
            </div>
            <div className="bottom-right">
                <img className="img" src={process.env.PUBLIC_URL + '/imagenes/patitas.png'} alt="IND"/>
            </div>
        </div>
    );
}

export default BienvenidaPage;