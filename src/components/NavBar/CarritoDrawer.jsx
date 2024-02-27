import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useState, useContext } from "react";
import Buscar from './Buscar';
import { IoClose } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { CarritoContext } from "./CarritoProvider";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";


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

    const calcularCantidadTotal = () => {
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    }

    return (
        <div className="menuCarritoRight">
            <div className="closeCarrito">
                <p>CARRITO ({calcularCantidadTotal()})</p> {/* Muestra la cantidad total de productos aquí */}
                <IoClose />
            </div>
            <div className="mapCart">
                {carrito.map((producto) => (
                    <div className="itemTopCarrito" key={producto.id}>
                        <img src={producto.image2} alt="" />
                        <div className="subItemCarrito">
                            <div className="dataItemCart">
                                <p className="namCarritoP">{producto.name}</p>
                                <div className="PricesItemCart">
                                    <p className={`priceCart ${producto.offert && 'tachadoCart'}`}>${producto.price}</p>
                                    {producto.offert && <p className="offertCart">${producto.offert}</p>}
                                </div>
                            </div>
                            <div className="CantCarrito">
                                <button onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)} disabled={producto.cantidad <= 1}><IoRemoveOutline /></button>
                                <p>{producto.cantidad}</p>
                                <button onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)} disabled={producto.cantidad >= producto.stock}><IoAddOutline /></button>
                                <div className="deleteCartItem" onClick={() => eliminarDelCarrito(producto.id)}><IoClose /></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="subTotCart">
                <p>Subtotal</p>
                <p>${calcularTotal()}</p>
            </div>

            <div className="buttonsCart">
                <button>REALIZAR PEDIDO</button>
                <button>VER CARRITO</button>
            </div>


        </div>
    );
}

export default CarritoDrawer;