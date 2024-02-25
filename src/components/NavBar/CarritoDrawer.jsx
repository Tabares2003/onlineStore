import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useState, useContext } from "react";
import Buscar from './Buscar';
import { useLocation } from 'react-router-dom';
import { CarritoContext } from "./CarritoProvider"; 
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function CarritoDrawer() {


    const location = useLocation();
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

    const [openDos, setOpenDos] = React.useState(false);

    const toggleDrawer = (openDos) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDos(openDos);
    };


    return ( 
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
    );
}

export default CarritoDrawer;