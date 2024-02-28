import { useLocation } from 'react-router-dom';

function Titulo() {
    const location = useLocation();

    let titulo;
    if (location.pathname === '/Mujeres') {
        titulo = 'Camisetas de Mujeres';
    } else if (location.pathname === '/Hombres') {
        titulo = 'Camisetas de Hombres';
    }

    return <h2>{titulo}</h2>;
}

export default Titulo;