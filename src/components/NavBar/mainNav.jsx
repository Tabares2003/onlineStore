import { Link } from 'react-router-dom';

function mainNav() {
    return (
        <nav className='mainNav'>
            <Link to="/">Inicio</Link> 
            <Link to="/Hombres">Hombres</Link> 
            {/* Agrega más enlaces según las páginas que tengas */}
        </nav>
    );
}

export default mainNav;