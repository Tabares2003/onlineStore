import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import hombresCamisas from '../../../../data/camisetasHombres';
import CarritoDrawer from '../../../components/NavBar/CarritoDrawer';
import { CarritoContext } from '../../../components/NavBar/CarritoProvider';



export default function RecomendadosHombres() {

    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);


    //Función para agregar al carrito por medio del local y se abre drawer de Mui
    const agregarAlCarrito = (producto) => {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);

        if (productoEnCarrito) {
            // Si el producto ya está en el carrito y no excede el stock disponible
            if (productoEnCarrito.cantidad < producto.stock) {
                // Incrementa la cantidad del producto en el carrito
                setCarrito(carritoActual => carritoActual.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                ));
            }
        } else {
            // Si el producto no está en el carrito, lo agrega
            setCarrito((carritoActual) => [...carritoActual, { ...producto, cantidad: 1 }]);
        }

        // Abre el drawer
        setDrawerOpen(true);
    };




    return (
        <section className="RecomendadosInicioTop">
            <div className="mainMasVendidos">
                <div className='verTodo'>
                    <Link to={`/Hombres`}>
                        <p>Ver todo</p>
                    </Link>
                </div>
                <div className="SubMainMasVendidos">
                    <Swiper slidesPerView={5} breakpoints={{
                        // cuando la pantalla es >= 320px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 5
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
                        {hombresCamisas.slice(0, 10).map((producto, index) => {
                            const [isHovered, setIsHovered] = React.useState(false);
                            const descuento = producto.offert ? Math.round((1 - producto.offert / producto.price) * 100) : 0;
                            return (
                                <SwiperSlide key={index} >
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
                                                        <div className='EnviarCarritoSwiper' onClick={() => agregarAlCarrito(producto)}>
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

                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} disableScrollLock={true}>
                    <CarritoDrawer />
                </Drawer>
            </div>
        </section>
    );
}; 
