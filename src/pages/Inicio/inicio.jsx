import hombresCamisas from "../../../data/camisetasHombres"
import { useState, useEffect } from 'react';
import niñosCamisetas from "../../../data/camisetasNiños";

export default function inicio() {

    const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];
    const [carrito, setCarrito] = useState(carritoInicial);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        if (carrito.find(item => item.id === producto.id)) {
            alert('Ya tienes este producto en el carrito');
        } else {
            setCarrito((carritoActual) => [...carritoActual, { ...producto, cantidad: 1 }]);
        }
    }



    return (
        <>
            <>
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
            </>
        </>
    )
}