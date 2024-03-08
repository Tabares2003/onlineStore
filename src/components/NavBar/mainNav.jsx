import { Link } from 'react-router-dom';

import { CarritoContext } from './CarritoProvider';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useState, useContext } from "react";
import Buscar from './Buscar';
import { useLocation } from 'react-router-dom';
import CarritoDrawer from './CarritoDrawer';
import MenuMobile from './MenuMobile,';

function mainNav() {

    const location = useLocation();
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerOpenDos, setDrawerOpenDos] = useState(false);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    // Usefect que me envía para arriba de la pantalla
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // AUsefect que me trae lo que hay en carrito
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);


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

    //funcion para abrir drawer cuando está en mobiles, left
    const handleDrawerOpen = () => {
        document.body.style.overflow = 'hidden';
        setOpen(true);
    };

    //funcion para cerrar drawer cuando está en mobiles, left
    const handleDrawerClose = () => {
        document.body.style.overflow = 'unset';
        setOpen(false);
    };

    //funcion para abrir drawer del carrito
    const abrirDrawer = () => {
        setDrawerOpen(true);
    }

    const abrirDrawerDos = () => {
        setDrawerOpenDos(true);
    }

    const handleDrawerCloseDos = () => {
        setDrawerOpenDos(false);
    };

    const [openDos, setOpenDos] = React.useState(false);

    const toggleDrawer = (openDos) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDos(openDos);
    };



    return (
        <nav className='muiNav'>
            {isMobile ? (
                <div className='mobileNav'>
                    <div className='iconMenuNav'>
                        <IoMdMenu onClick={abrirDrawerDos} />
                    </div>

                    <div className='logoNav'>
                        <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
                    </div>

                    <div className='iconsMobileNav'>
                        <div>
                            <IoSearch onClick={toggleDrawer(true)} />
                        </div>
                        <div className='cartNav'>
                            <div className='cartNavIcon'>
                                <MdOutlineShoppingCart onClick={abrirDrawer} />
                                <span className='cartCount'>{carrito.length}</span>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <div className='navStylesPc'>
                    <div className='iconNavPc'>
                        <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
                    </div>

                    <div className='linksNavPc'>
                        <Link to="/"><p>INICIO</p></Link>
                        <Link to="/Hombres"><p>HOMBRES</p></Link> 
                        <Link to="/Mujeres"><p>MUJERES</p></Link>
                        <Link to="/Promociones"><p>PROMOCIONES</p></Link>
                        <Link to="/Historial"><p>HISTORIAL</p></Link>
                    </div>

                    <div className='iconsNavPc'>
                        <div>
                            <IoSearch onClick={toggleDrawer(true)} />
                        </div>
                        <div className='cartNav'>
                            <div className='cartNavIcon'>
                                <MdOutlineShoppingCart onClick={abrirDrawer} />
                                <span className='cartCount' onClick={abrirDrawer}>{carrito.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} disableScrollLock={true}> 
                <CarritoDrawer setDrawerOpen={setDrawerOpen}/>
            </Drawer>

            <Drawer anchor='top' open={openDos} onClose={toggleDrawer(false)} disableScrollLock={true}>
                <Buscar toggleDrawer={toggleDrawer} />
            </Drawer>

            <Drawer anchor="left" open={drawerOpenDos} onClose={() => setDrawerOpenDos(false)}>
                <MenuMobile onClose={handleDrawerCloseDos} />
            </Drawer>
        </nav>
    );
}
export default mainNav;