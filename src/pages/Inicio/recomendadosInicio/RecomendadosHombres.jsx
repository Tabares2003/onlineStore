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
import hombresCamisas from '../../../../data/camisetasHombres';
import { useNavigate } from 'react-router-dom';
import CarritoDrawer from '../../../components/NavBar/CarritoDrawer';



export default function RecomendadosHombres() {

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
            setCarrito((carritoActual) => [...carritoActual, { ...producto, cantidad: 1 }], () => {
                // Abre el drawer después de que el estado del carrito se haya actualizado
                setDrawerOpen(true);
            });
        }
    };
 




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
                                                        <div className='EnviarCarritoSwiper'  onClick={() => agregarAlCarrito(producto)}>
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
                    <CarritoDrawer/>
                </Drawer>
            </div>
        </section>
    );
}; 
