import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useState, useContext } from "react";
import Buscar from './Buscar';
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import { CarritoContext } from "./CarritoProvider";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { IoRemoveOutline } from "react-icons/io5";
import hombresCamisas from "../../../data/camisetasHombres";
import mujeresCamisetas from "../../../data/camisetasMujeres";
import chaquetas from "../../../data/chaquetas";
import niñosCamisetas from "../../../data/camisetasNiños";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


function CarritoDrawer({ setDrawerOpen }) {


    const todosLosProductos = [...hombresCamisas, ...mujeresCamisetas, ...chaquetas, ...niñosCamisetas];

    const seleccionarProductosAleatorios = () => {
        const productosAleatorios = [];
        for (let i = 0; i < 5; i++) {
            const indiceAleatorio = Math.floor(Math.random() * todosLosProductos.length);
            productosAleatorios.push(todosLosProductos[indiceAleatorio]);
        }
        return productosAleatorios;
    }

    const [productosAleatorios, setProductosAleatorios] = useState(seleccionarProductosAleatorios());

    useEffect(() => {
        setProductosAleatorios(seleccionarProductosAleatorios());
    }, []);



    const location = useLocation();
    const { carrito, setCarrito } = useContext(CarritoContext);
    const [cantidadCarrito, setCantidadCarrito] = useState(0);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const cerrarDrawer = () => {
        setDrawerOpen(false);
    };

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
        return carrito.reduce((total, producto) => {
            // Si el producto tiene una oferta, suma el precio de la oferta
            if (producto.offert) {
                return total + (Number(producto.offert) * producto.cantidad);
            }
            // Si el producto no tiene una oferta, suma el precio normal
            else {
                return total + (Number(producto.price) * producto.cantidad);
            }
        }, 0);
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
        return carrito.length;
    }

    return (
        <div className="menuCarritoRight">
            <div className="closeCarrito" onClick={cerrarDrawer}>
                <p>CARRITO ({calcularCantidadTotal()})</p> {/* Muestra la cantidad total de productos aquí */}
                <IoClose />
            </div>
            <div className="mapCart">
                {carrito.length > 0 ? (
                    carrito.map((producto) => (
                        <div className="itemTopCarrito" key={producto.id}>
                            <Link to={`/Producto/${producto.id}`} onClick={cerrarDrawer}>
                                <img src={producto.image2} alt="" />
                            </Link>
                            <div className="subItemCarrito">
                                <div className="dataItemCart">
                                    <Link to={`/Producto/${producto.id}`} onClick={cerrarDrawer}>
                                        <p className="namCarritoP">{producto.name}</p>
                                    </Link>
                                    <div className="PricesItemCart">
                                        <p className={`priceCart ${producto.offert && 'tachadoCart'}`}>${Number(producto.price).toLocaleString()}</p>
                                        {producto.offert && <p className="offertCart">${Number(producto.offert).toLocaleString()}</p>}
                                    </div>
                                </div>
                                <div className="CantCarrito">
                                    <button onClick={(e) => { e.preventDefault(); actualizarCantidad(producto.id, producto.cantidad - 1); }} disabled={producto.cantidad <= 1}><IoRemoveOutline /></button>
                                    <p>{producto.cantidad}</p>
                                    <button onClick={(e) => { e.preventDefault(); actualizarCantidad(producto.id, producto.cantidad + 1); }} disabled={producto.cantidad >= producto.stock}><IoAddOutline /></button>
                                    <div className="deleteCartItem" onClick={(e) => { e.preventDefault(); eliminarDelCarrito(producto.id); }}><IoClose /></div>
                                </div>
                            </div>


                        </div>
                    ))
                ) : (
                    <div className="carritoVacio">
                        <p>Tu carrito está vacío.</p>
                        <Link to={`/`} onClick={cerrarDrawer}>
                            <button>SEGUIR COMPRANDO</button>
                        </Link>
                    </div>
                )}

                {carrito.length > 0 && (
                    <div className="TePuedeInteresar">
                        <div className="titleTePuedeInteresar">
                            <p>Te podría interesar</p>
                        </div>
                        <div className="SwiperCarruselKart">
                            <Swiper spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
                                {productosAleatorios.map((producto) => (
                                    <SwiperSlide key={producto.id}>
                                        <Link to={`/Producto/${producto.id}`} onClick={cerrarDrawer}>
                                            <div className="MainTep">
                                                <div className="imgTeProdía">
                                                    <img src={producto.image2} alt="" />
                                                </div>
                                                <div className="dataTePodríaInt">
                                                    <p className="namCarritoP">{producto.name}</p>
                                                    <div className="PricesItemCart">
                                                        <p className={`priceCart ${producto.offert && 'tachadoCart'}`}>${Number(producto.price).toLocaleString()}</p>
                                                        {producto.offert && <p className="offertCart">${Number(producto.offert).toLocaleString()}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}


            </div>


            {carrito.length > 0 && (
                <div className="subTotCart">
                    <p>Subtotal</p>
                    <p>${Number(calcularTotal()).toLocaleString()}</p>
                </div>
            )}

            {carrito.length > 0 && (
                <div className="buttonsCart">
                    <Link to={`/Pedido`} onClick={cerrarDrawer}>
                        <button>REALIZAR PEDIDO</button>
                    </Link>
                    <Link to={`/Carrito`} onClick={cerrarDrawer}>
                        <button>VER CARRITO</button>
                    </Link>
                </div>
            )}


        </div>
    );
}

export default CarritoDrawer;