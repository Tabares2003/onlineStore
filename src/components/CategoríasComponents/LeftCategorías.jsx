import { useLocation } from 'react-router-dom'; 

function LeftCategorias() {
    const location = useLocation();

    return (
        <div className='MainLeftCategorías'>
            <div>
                <div className={location.pathname === '/Mujeres' ? 'activeCategoria' : ''}>
                    Mujeres
                </div>
                <div className={location.pathname === '/Hombres' ? 'activeCategoria' : ''}>
                    Hombres
                </div>
            </div>
 
        </div>
    );
}

export default LeftCategorias;