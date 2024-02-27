import Hidden from '@mui/material/Hidden';
import { MdOutlineShoppingCart } from "react-icons/md";
import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CarritoContext } from '../../../components/NavBar/CarritoProvider';
import { useNavigate } from 'react-router-dom';
import niñosCamisetas from '../../../../data/camisetasNiños';


export default function RecomendadosNinos() {

    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);


    //Función para agregar al carrito por medio del local y se abre drawer de Mui
    const agregarAlCarrito = (producto) => {
        if (carrito.find(item => item.id === producto.id)) {
            setDrawerOpen(true);
        } else {
            setCarrito((carritoActual) => [...carritoActual, { ...producto, cantidad: 1 }]);
            setDrawerOpen(true);
        }
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




    return (
        <section className="RecomendadosInicioTop">
            <div className="mainMasVendidos">
                <div className='verTodo'>
                    <p>Ver todo</p>
                </div>
                <div className="SubMainMasVendidos">
                    <Swiper slidesPerView={5} breakpoints={{
                        // cuando la pantalla es >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        // cuando la pantalla es >= 480px
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 5
                        },
                        // cuando la pantalla es >= 640px
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 5
                        },
                        // cuando la pantalla es >= 768px
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 7
                        },
                        // cuando la pantalla es >= 1024px
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 7
                        }
                    }}>
                        {niñosCamisetas.slice(0, 10).map((producto, index) => {
                            const [isHovered, setIsHovered] = React.useState(false);
                            const descuento = producto.offert ? Math.round((1 - producto.offert / producto.price) * 100) : 0;
                            return (
                                <SwiperSlide key={index}>
                                    <div className="SlideSwiper"
                                        onMouseOver={() => setIsHovered(true)}
                                        onMouseOut={() => setIsHovered(false)}
                                    >
                                        <div className="SlideSwiperImgDescuento">
                                            <div className="subSlideSwiperImgDescuento">
                                                <img onClick={() => navigate(`/Producto/${producto.id}`)} src={isHovered ? producto.image : producto.image2} alt={`Imagen ${index + 1}`}
                                                    style={{ transform: isHovered ? 'scale(1.2)' : 'scale(1)', transition: 'transform .9s' }} />
                                                {isHovered && (
                                                    <Hidden mdDown>
                                                        <div className='EnviarCarritoSwiper'>
                                                            <div>
                                                                <span>Agregar al carrito</span>
                                                                <MdOutlineShoppingCart />
                                                            </div>
                                                        </div>
                                                    </Hidden>
                                                )}
                                                {producto.offert && (
                                                    <div className='DescuentoSwiper'>
                                                        <span>-{descuento}%</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Hidden mdUp>
                                            <div className='SendCarritoMobile' onClick={() => agregarAlCarrito(producto)}>
                                                <span>Agregar al carrito</span>
                                                <MdOutlineShoppingCart />
                                            </div>
                                        </Hidden>
                                        <div className='DataProductsSwiper' onClick={() => navigate(`/Producto/${producto.id}`)}>
                                            <p>{producto.name}</p>
                                            <div>
                                                <span style={{ textDecoration: producto.offert ? 'line-through' : 'none' }}>${producto.price}</span>
                                                <span style={{ color: producto.offert ? 'red' : 'black' }}>{producto.offert ? `$${producto.offert}` : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

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
            </div>
        </section>
    );
}; 
