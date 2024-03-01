
//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    Drawer,
    Hidden,
} from "@mui/material";
import hombresCamisas from "../../../data/camisetasHombres";
import Titulo from "../../components/Titulo";
import BreadCumb from "../../components/CategoríasComponents/TopComponents/BreadCumb";
import BannersCategorias from "../../components/CategoríasComponents/TopComponents/BannersCategorías";
import LeftCategorias from "../../components/CategoríasComponents/LeftComponents/LeftCategorías";
import { useState, useContext, useEffect } from 'react';
import FiltrosCategoriasLeft from "../../components/CategoríasComponents/LeftComponents/FiltrosCategoriasLeft";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Paginacion, TopFiltros } from "../../components/CategoríasComponents/TopComponents/TopFiltros";
import { CarritoContext } from "../../components/NavBar/CarritoProvider";
import { Link, useNavigate } from 'react-router-dom';
import CarritoDrawer from "../../components/NavBar/CarritoDrawer";

export default function Hombres() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    const cantidadTodos = hombresCamisas.length;
    const cantidadEnExistencia = hombresCamisas.filter(producto => producto.stock > 0).length;
    const cantidadAgotados = hombresCamisas.filter(producto => producto.stock === 0).length;



    const [estiloSeleccionado, setEstiloSeleccionado] = useState('EstilosPrimercheck');

    const handleEstiloChange = (nuevoEstilo) => {
        setEstiloSeleccionado(nuevoEstilo);
    };







    const [orden, setOrden] = useState('Alfabéticamente, A-Z');

    const handleOrdenChange = (nuevoOrden) => {
        setOrden(nuevoOrden);
    };




    const [cantidadPorPagina, setCantidadPorPagina] = useState(10);

    const handleCantidadPorPaginaChange = (nuevaCantidadPorPagina) => {
        setCantidadPorPagina(nuevaCantidadPorPagina);
    };
    const [paginaActual, setPaginaActual] = useState(1);

    const handlePaginaChange = (event, nuevaPagina) => {
        setPaginaActual(nuevaPagina);
    };



    const [rangoPrecio, setRangoPrecio] = useState([0, 400000]);

    const handleRangoPrecioChange = (nuevoRangoPrecio) => {
        setRangoPrecio(nuevoRangoPrecio);
    };

    const [filtro, setFiltro] = useState('todos');

    const handleFiltroChange = (nuevoFiltro) => {
        setFiltro(nuevoFiltro);
    };

    let productosFiltrados;

    if (filtro === 'enExistencia') {
        productosFiltrados = hombresCamisas.filter(producto => producto.stock > 0);
    } else if (filtro === 'agotados') {
        productosFiltrados = hombresCamisas.filter(producto => producto.stock === 0);
    } else {
        productosFiltrados = hombresCamisas;
    }

    // Ordena los productos filtrados
    if (orden === 'Alfabéticamente, A-Z') {
        productosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orden === 'Alfabéticamente, Z-A') {
        productosFiltrados.sort((a, b) => b.name.localeCompare(a.name));
    } else if (orden === 'Precio, menor a mayor') {
        productosFiltrados.sort((a, b) => a.price - b.price);
    } else if (orden === 'Precio, mayor a menor') {
        productosFiltrados.sort((a, b) => b.price - a.price);
    }

    // Filtra los productos por precio
    productosFiltrados = productosFiltrados.filter(producto => producto.price >= rangoPrecio[0] && producto.price <= rangoPrecio[1]);












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
        <>
            <Grid container>
                <Grid container style={{ width: isMdDown ? '100%' : '77%', display: 'flex', margin: '0 auto', flexDirection: 'column' }}>
                    <div className="BreadCumbCat">
                        <BreadCumb />
                    </div>
                    <BannersCategorias />

                    <Grid container spacing={3}>
                        {!matches && (
                            <Grid item xs={12} md={3}>
                                <LeftCategorias />
                                <FiltrosCategoriasLeft onFiltroChange={handleFiltroChange} onRangoPrecioChange={handleRangoPrecioChange} cantidadTodos={cantidadTodos} cantidadEnExistencia={cantidadEnExistencia} cantidadAgotados={cantidadAgotados} />
                            </Grid>
                        )}
                        <Grid item xs={12} md={matches ? 12 : 9} display={'flex'} flexDirection={'column'}>
                            <TopFiltros onCantidadPorPaginaChange={handleCantidadPorPaginaChange} onOrdenChange={handleOrdenChange} onEstiloChange={handleEstiloChange} />
                            <div className="EstilosCheck">


                                <div className="primerStyleMain">
                                    {estiloSeleccionado === 'EstilosPrimercheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => {
                                        const descuento = producto.offert ? ((producto.price - producto.offert) / producto.price) * 100 : 0;
                                        return (
                                            <div key={producto.id} className="EstilosPrimercheck">
                                                <div className="imgPrimerEstilo">
                                                    {producto.offert && <div className="descuento">-{descuento.toFixed(0)}%</div>}
                                                    <img onClick={() => navigate(`/Producto/${producto.id}`)} src={producto.image2} alt={producto.name} />
                                                </div>
                                                <div>
                                                    <div className="dartaPrimerEstilo">
                                                        <h2 onClick={() => navigate(`/Producto/${producto.id}`)}>{producto.name}</h2>
                                                        <div>
                                                            <p style={{ textDecoration: producto.offert ? 'line-through' : 'none' }}>
                                                                ${Number(producto.price).toLocaleString('es-CO')}
                                                            </p>
                                                            {producto.offert && <p className="offerPrimerStyle">${Number(producto.offert).toLocaleString('es-CO')}</p>}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => agregarAlCarrito(producto)}>AÑADIR AL CARRITO <MdOutlineShoppingCart /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>



                                {estiloSeleccionado === 'EstilosSegundocheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => {
                                    const descuento = producto.offert ? ((producto.price - producto.offert) / producto.price) * 100 : 0;

                                    return (
                                        <Grid className="EstilosCuartaCheck" item xs={6} sm={6} md={6} key={producto.id}>
                                            <div className="itemCuartoEst">
                                                {producto.offert && <div className="descuento">-{descuento.toFixed(0)}%</div>}
                                                <img onClick={() => navigate(`/Producto/${producto.id}`)} src={producto.image2} alt={producto.name} loading="lazy" />
                                                <div className='hoverBox' onClick={() => agregarAlCarrito(producto)}><MdOutlineShoppingCart /></div>

                                                <Hidden mdUp>
                                                    <div className="addCartCuartStyle" onClick={() => agregarAlCarrito(producto)}>
                                                        <p>Agregar al carrito</p>
                                                        <MdOutlineShoppingCart />
                                                    </div>
                                                </Hidden>
                                                <div className='dataEnc'>
                                                    <div className='divdatCuarEst'>
                                                        <p onClick={() => navigate(`/Producto/${producto.id}`)}>{producto.name}</p>
                                                    </div>
                                                    <div className='pricesCuartEst'>
                                                        <p style={producto.offert ? { textDecoration: 'line-through' } : {}}>${Number(producto.price).toLocaleString('es-CO')}</p>
                                                        {producto.offert && <h6>${Number(producto.offert).toLocaleString('es-CO')}</h6>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    );
                                })}  
 

                                {estiloSeleccionado === 'EstilosTercercheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => {
                                    const descuento = producto.offert ? ((producto.price - producto.offert) / producto.price) * 100 : 0;

                                    return (
                                        <Grid className="EstilosCuartaCheck" item xs={6} sm={3} md={4} key={producto.id}>
                                            <div className="itemCuartoEst">
                                                {producto.offert && <div className="descuento">-{descuento.toFixed(0)}%</div>}
                                                <img onClick={() => navigate(`/Producto/${producto.id}`)} src={producto.image2} alt={producto.name} loading="lazy" />
                                                <div className='hoverBox' onClick={() => agregarAlCarrito(producto)}><MdOutlineShoppingCart /></div>

                                                <Hidden mdUp>
                                                    <div className="addCartCuartStyle" onClick={() => agregarAlCarrito(producto)}>
                                                        <p>Agregar al carrito</p>
                                                        <MdOutlineShoppingCart />
                                                    </div>
                                                </Hidden>

                                                <div className='dataEnc'>
                                                    <div className='divdatCuarEst'>
                                                        <p onClick={() => navigate(`/Producto/${producto.id}`)}>{producto.name}</p>
                                                    </div>
                                                    <div className='pricesCuartEst'>
                                                        <p style={producto.offert ? { textDecoration: 'line-through' } : {}}>${Number(producto.price).toLocaleString('es-CO')}</p>
                                                        {producto.offert && <h6>${Number(producto.offert).toLocaleString('es-CO')}</h6>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    );
                                })} 


                                {estiloSeleccionado === 'EstilosCuartaCheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => {
                                    const descuento = producto.offert ? ((producto.price - producto.offert) / producto.price) * 100 : 0;

                                    return (
                                        <Grid className="EstilosCuartaCheck" item xs={6} sm={4} md={3} key={producto.id}>
                                            <div className="itemCuartoEst">
                                                {producto.offert && <div className="descuento">-{descuento.toFixed(0)}%</div>}
                                                <img onClick={() => navigate(`/Producto/${producto.id}`)} src={producto.image2} alt={producto.name} loading="lazy" />
                                                <div className='hoverBox' onClick={() => agregarAlCarrito(producto)}><MdOutlineShoppingCart /></div>

                                                <Hidden mdUp>
                                                    <div className="addCartCuartStyle" onClick={() => agregarAlCarrito(producto)}>
                                                        <p>Agregar al carrito</p>
                                                        <MdOutlineShoppingCart />
                                                    </div>
                                                </Hidden>
                                                <div className='dataEnc'>
                                                    <div className='divdatCuarEst'>
                                                        <p onClick={() => navigate(`/Producto/${producto.id}`)}>{producto.name}</p>
                                                    </div>
                                                    <div className='pricesCuartEst'>
                                                        <p style={producto.offert ? { textDecoration: 'line-through' } : {}}>${Number(producto.price).toLocaleString('es-CO')}</p>
                                                        {producto.offert && <h6>${Number(producto.offert).toLocaleString('es-CO')}</h6>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    );
                                })} 



                                {productosFiltrados.length === 0 && <div><p>No hay productos disponibles.</p></div>}
                                <Paginacion count={Math.ceil(productosFiltrados.length / cantidadPorPagina)} onPaginaChange={handlePaginaChange} />
                            </div>
                        </Grid>
                    </Grid>


                    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} disableScrollLock={true}>
                        <CarritoDrawer />
                    </Drawer>
                </Grid>
            </Grid>
        </>
    )
}