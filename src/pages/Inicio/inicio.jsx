import hombresCamisas from "../../../data/camisetasHombres" 
import niñosCamisetas from "../../../data/camisetasNiños";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { CarritoContext } from "../../components/NavBar/CarritoProvider";
import { useContext, useEffect, useState } from 'react';     
import Banner from "./banner/Banner";
import RecomendadosInicio from "./recomendadosInicio/RecomendadosInicio";
export default function inicio() {

    const { carrito, setCarrito } = useContext(CarritoContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        if (carrito.find(item => item.id === producto.id)) {
            setDrawerOpen(true);
        } else {
            setCarrito((carritoActual) => [...carritoActual, { ...producto, cantidad: 1 }]);
            setDrawerOpen(true);
        }
    }

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
        <>
            <div className="divInicio">   
            <Banner/>
            <RecomendadosInicio/>
            
                <div>
                    <h2>Camisetas de Hombres</h2>
                    {hombresCamisas.map((producto) => (
                        <div key={producto.id}>
                            <h2>{producto.name}</h2>
                            <p>{producto.price}</p>
                            <button onClick={() => agregarAlCarrito(producto)}>
                                Agregar al carrito
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Camisetas de Niños</h2>
                    {niñosCamisetas.map((producto) => (
                        <div key={producto.id}>
                            <h2>{producto.name}</h2>
                            <p>{producto.price}</p>
                            <button onClick={() => agregarAlCarrito(producto)}>
                                Agregar al carrito
                            </button>
                        </div>
                    ))}
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
        </>
    )
}