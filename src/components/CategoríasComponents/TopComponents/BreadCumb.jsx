import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { IoChevronForward } from 'react-icons/io5'; // Asegúrate de importar el icono IoChevronForward

function BreadCumb() {
    const location = useLocation();

    let breadcrumb;
    if (location.pathname === '/Mujeres') {
        breadcrumb = (
            <div className="breadCat">
                <Breadcrumbs separator={<IoChevronForward />} aria-label="breadcrumb">
                    <Link href="/">
                        <p>Inicio</p>
                    </Link>
                    <p>Mujeres</p>
                </Breadcrumbs>
            </div>
        );
    } else if (location.pathname === '/Hombres') {
        breadcrumb = (
            <div className="breadCat">
                <Breadcrumbs separator={<IoChevronForward />} aria-label="breadcrumb">
                    <Link href="/">
                        <p>Inicio</p>
                    </Link>
                    <p>Hombres</p>
                </Breadcrumbs>
            </div>
        );
    } else if (location.pathname === '/Promociones') {
        breadcrumb = (
            <div className="breadCat">
                <Breadcrumbs separator={<IoChevronForward />} aria-label="breadcrumb">
                    <Link href="/">
                        <p>Inicio</p>
                    </Link>
                    <p>Promociones</p>
                </Breadcrumbs>
            </div>
        );
    } else if (location.pathname === '/historial') {
        breadcrumb = (
            <div className="breadCat">
                <Breadcrumbs separator={<IoChevronForward />} aria-label="breadcrumb">
                    <Link href="/">
                        <p>Inicio</p>
                    </Link>
                    <p>Historial</p>
                </Breadcrumbs>
            </div>
        );
    }

    return breadcrumb;
}

export default BreadCumb;