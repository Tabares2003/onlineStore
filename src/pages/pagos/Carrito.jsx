import { useState, useEffect } from 'react';
export default function Carrito() {

    // Definimos el estado para el carrito
    const [carrito, setCarrito] = useState([]);

    // Usamos useEffect para cargar los productos del carrito desde el almacenamiento local cuando se monta el componente
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (idProducto) => {
        const nuevoCarrito = carrito.filter((producto) => producto.id !== idProducto);
        setCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    }

    // Función para calcular el total del carrito
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


    return (
        <>
            <div>
                Carrito
                {carrito.map((producto) => (
                    <div key={producto.id}>
                        <h2>{producto.name}</h2>
                        <p>{producto.price}</p>
                        <input type="number" value={producto.cantidad} onChange={(e) => actualizarCantidad(producto.id, e.target.value)} />
                        <button onClick={() => eliminarDelCarrito(producto.id)}>
                            Eliminar del carrito
                        </button>
                    </div>
                ))}
                <p>Total: {calcularTotal()}</p>

            </div>
        </>
    )
}