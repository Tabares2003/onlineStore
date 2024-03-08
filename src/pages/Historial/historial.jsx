
import { Link, useNavigate } from 'react-router-dom';


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
import BreadCumb from '../../components/CategoríasComponents/TopComponents/BreadCumb';
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState, useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SnackbarContent from '@mui/material/SnackbarContent';
import { MdOutlineShoppingCart } from "react-icons/md";
import { CarritoContext } from '../../components/NavBar/CarritoProvider';
import CarritoDrawer from '../../components/NavBar/CarritoDrawer';

export default function historial() {


    // Define el estado inicial de tus variables
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem('historial')) || []);

    // Extrae las variables del estado y del contexto
    const { carrito, setCarrito } = useContext(CarritoContext);
    const { vertical, horizontal, open } = state;

    // Define las funciones de navegación y tema
    const navigate = useNavigate();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));

    // Define las funciones para manejar los eventos de click y cierre
    const handleClick = (newState, message) => () => {
        setState({ ...newState, open: true });
        setMessage(message);
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    // Actualiza el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // Define la función para eliminar el historial
    const eliminarHistorial = () => {
        // Elimina el historial de localStorage
        localStorage.removeItem('historial');
        // Actualiza el estado del historial en el componente a un array vacío
        setHistorial([]);
        // Muestra un Snackbar con un mensaje de éxito
        handleClick({ vertical: 'bottom', horizontal: 'center' }, 'Listo! borraste correctamente el historial')();
    };
    // Define la función para eliminar un producto
    const eliminarProducto = (id) => {
        // Busca el índice del producto en el historial usando su id
        const productoIndex = historial.findIndex(product => product.id === id);

        // Si el producto existe en el historial (productoIndex !== -1)
        if (productoIndex !== -1) {
            // Crea una copia del historial actual
            const nuevoHistorial = [...historial];
            // Elimina el producto del nuevo historial
            nuevoHistorial.splice(productoIndex, 1);
            // Actualiza el historial en localStorage
            localStorage.setItem('historial', JSON.stringify(nuevoHistorial));
            // Actualiza el estado del historial en el componente
            setHistorial(nuevoHistorial);
            // Muestra un Snackbar con un mensaje de éxito
            handleClick({ vertical: 'bottom', horizontal: 'center' }, 'Listo! borraste correctamente este producto del historial')();
        }
    };

    // Define la función para agregar un producto al carrito
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
                    <div className='TitleHistorial'>
                        <h3>Historial</h3>
                        {historial.length > 0 && <p onClick={eliminarHistorial}>Eliminar historial</p>}
                    </div>
                    <Grid container>
                        {historial.length > 0 ? (
                            <>
                                {historial.map(product => (
                                    <Grid item xs={6} sm={4} md={3} key={product.id} >
                                        <div className='itemHistorial' onMouseEnter={() => setHoveredProduct(product.id)} onMouseLeave={() => setHoveredProduct(null)}>
                                            <img onClick={() => navigate(`/Producto/${product.id}`)} src={product.image2} alt={product.name} />
                                            {product.offert && (
                                                <div className='offertHistorial'>
                                                    <p>{((1 - product.offert / product.price) * 100).toFixed(0)}%</p>
                                                </div>
                                            )}
                                            {hoveredProduct === product.id && (
                                                <Hidden mdDown>
                                                    <div className='senCartHistorial' onClick={() => agregarAlCarrito(product)}>
                                                        <div>
                                                            <span>Agregar al carrito</span>
                                                            <MdOutlineShoppingCart />
                                                        </div>
                                                    </div>
                                                </Hidden>
                                            )}
                                            <Hidden mdUp>
                                                <div className='SendCarritoMobile' onClick={() => agregarAlCarrito(product)}>
                                                    <span>Agregar al carrito</span>
                                                    <MdOutlineShoppingCart />
                                                </div>
                                            </Hidden>
                                        </div>
                                        <div className='hitorialData'>
                                            <div className='pricesHistorial'>
                                                <h6 onClick={() => navigate(`/Producto/${product.id}`)}>{product.name}</h6>
                                                <div className='priceH'>
                                                    <p style={product.offert ? { textDecoration: 'line-through' } : {}}>${Number(product.price).toLocaleString('es-CO')}</p>
                                                    {product.offert && <p style={{ color: 'red' }}>${Number(product.offert).toLocaleString('es-CO')}</p>}
                                                </div>
                                            </div>
                                            <div onClick={() => eliminarProducto(product.id)}>
                                                <RiDeleteBin6Line />
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </>
                        ) : (
                            <div className='inexstHistorial'>
                                <h5>Aún no viste productos!</h5>
                                <button onClick={() => navigate(`/`)}>Descubrir nuevos productos</button>
                            </div>
                        )}

                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={3000} // Duración de 3 segundos
                            key={vertical + horizontal}
                        >
                            <SnackbarContent
                                style={{ backgroundColor: 'black', color: 'white', borderRadius: '0' }} // Sin borde redondeado
                                message={message}
                            />
                        </Snackbar>
                    </Grid>
                </Grid>

                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <CarritoDrawer />
                </Drawer>
            </Grid>
        </>
    )
}