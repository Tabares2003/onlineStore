//Componente que nos muestra en las categorías que nos sirve para mostrarle al usuario donde está y donde puede ir copn el Location de rrdom

import { Link, useLocation } from 'react-router-dom';
import { GoChevronRight } from 'react-icons/go';


function LeftCategorias() {
    const location = useLocation();

    const categorias = [
        { ruta: '/Mujeres', nombre: 'Mujeres' },
        { ruta: '/Hombres', nombre: 'Hombres' },
        { ruta: '/Niños', nombre: 'Niños' },
        { ruta: '/Promociones', nombre: 'Promociones' },
        
    ];

    return (
        <div className='MainLeftCategorías'>
            <div className='leftCatTitle'>
                <p>Categorías</p>
            </div>
            <div className='categoriasLeftList'>
                {categorias.map((categoria) => (
                    <Link to={categoria.ruta} key={categoria.nombre}>
                        <div className={location.pathname === categoria.ruta ? 'activeCategoria' : 'inactiveCategoría'}>
                            {location.pathname === categoria.ruta && <GoChevronRight />}
                            <p>{categoria.nombre}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default LeftCategorias;