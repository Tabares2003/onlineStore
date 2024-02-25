import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CarritoContext } from './CarritoProvider'; 
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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



    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const abrirDrawer = () => {
        setDrawerOpen(true);
    }


    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]); 
 
    //Función para sumar local de todos los productos en carrito
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + (Number(producto.price) * producto.cantidad), 0);
    }

    // Función para actualizar la cantidad de un producto en el carrito
    const actualizarCantidad = (idProducto, nuevaCantidad) => {
        setCarrito((carritoActual) => {
            const nuevoCarrito = carritoActual.map((producto) =>
                producto.id === idProducto ? { ...producto, cantidad: nuevaCantidad } : producto
            );
            localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
            return nuevoCarrito;
        });
    }


    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (idProducto) => {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== idProducto);
        setCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    }

    return (
        <nav className='muiNav'>
            {isMobile ? (
                <>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <IoMdMenu />
                    </IconButton>
                    <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
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
                                <MdOutlineShoppingCart onClick={abrirDrawer}/>
                                <span className='cartCount' onClick={abrirDrawer}>{carrito.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    {carrito.map((producto) => (
                        <ListItem key={producto.id}>
                            <ListItemText primary={producto.name} secondary={`Cantidad: ${producto.cantidad}`} />
                            <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)} disabled={producto.cantidad >= producto.stock}>+</button>
                            <button onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)} disabled={producto.cantidad <= 1}>-</button>
                            <button onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                        </ListItem>
                    ))}
                    <ListItem>
                        <ListItemText primary={`Total: ${calcularTotal()}`} />
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    );
}
export default mainNav;