import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CarritoContext } from './CarritoProvider';

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

import Buscar from './Buscar';
import { useLocation } from 'react-router-dom';

function mainNav() {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);






    const { carrito } = useContext(CarritoContext);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    // Actualiza la cantidad de productos en el carrito
    const actualizarCantidadCarrito = () => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCantidadCarrito(carritoGuardado.length);
        }
    }
    useEffect(() => {
        // Actualiza la cantidad de productos en el carrito al montar el componente
        actualizarCantidadCarrito();
        // Escucha los cambios en el almacenamiento local
        window.addEventListener('storage', actualizarCantidadCarrito);
        // Elimina el evento al desmontar el componente
        return () => {
            window.removeEventListener('storage', actualizarCantidadCarrito);
        }
    }, []);



    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerOpen = () => {
        document.body.style.overflow = 'hidden';
        setOpen(true);
    };

    const handleDrawerClose = () => {
        document.body.style.overflow = 'unset';
        setOpen(false);
    };

    return (
        <nav  className='muiNav'>
            {isMobile ? (
                <>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <IoMdMenu />
                    </IconButton>
                    <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
                    <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                        <List>
                            {['Inicio', 'Hombres', 'Niños', 'Mujeres', 'Promociones'].map((text) => (
                                <ListItem button key={text} component={RouterLink} to={`/${text}`} onClick={handleDrawerClose}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </>
            ) : (
                <div className='navStylesPc'>
                    <div className='iconNavPc'>
                        <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
                    </div>

                    <div className='linksNavPc'>
                        <Link to="/"><p>INICIO</p></Link>
                        <Link to="/Hombres"><p>HOMBRES</p></Link>
                        <Link to="/Niños"><p>NIÑOS</p></Link>
                        <Link to="/Mujeres"><p>MUJERES</p></Link>
                        <Link to="/Promociones"><p>PROMOCIONES</p></Link>
                        <Link to="/Historial"><p>HISTORIAL</p></Link>
                    </div>

                    <div className='iconsNavPc'>
                        <div>
                            <IoSearch />
                        </div>
                        <div className='cartNav'>
                            <div className='cartNavIcon'>
                                <MdOutlineShoppingCart />
                                <span className='cartCount'>{carrito.length}</span>
                            </div>
                        </div>
                    </div> 
                </div>
            )} 
        </nav>
    );
}
export default mainNav;