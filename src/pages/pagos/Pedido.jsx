import { useState, useEffect } from 'react';

export default function Pedido() {

    
    // Definimos el estado para el nombre y el email
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    // Definimos el estado para el carrito
    const [carrito, setCarrito] = useState([]);

    // Usamos useEffect para cargar los productos del carrito desde el almacenamiento local cuando se monta el componente
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
        if (carritoGuardado) {
            setCarrito(carritoGuardado);
        }
    }, []);

    // Función para calcular el total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => total + (Number(producto.price) * producto.cantidad), 0);
    }

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, email].includes("")) {
            alert("Por favor, completa todos los campos");
            return;
        } else {
            let mensajeEnvio = `Hola, quisiera realizar un pedido.\n==============\n📝 Productos:`;
            carrito.forEach((producto) => {
                mensajeEnvio += `\n✔️ ${producto.name} - Cantidad: ${producto.cantidad}`;
            });
            mensajeEnvio += `\n==============`;
            mensajeEnvio += `\nTotal: ${calcularTotal()}`;
            mensajeEnvio += `\n==============`;
            mensajeEnvio += `\nDetalles del cliente`;
            mensajeEnvio += `\n👤 Nombre: ${nombre}`;
            mensajeEnvio += `\n📧 Email: ${email}`;
            mensajeEnvio += `\n==============`;

            let whatsappLink =
                "https://api.whatsapp.com/send?phone=573011379166&text=" +
                encodeURI(mensajeEnvio);
            window.open(whatsappLink, "_blank");
        }
    }

    return (
        <>
            <div>
                Pedido
                {carrito.map((producto) => (
                    <div key={producto.id}>
                        <h2>{producto.name}</h2>
                        <img src={producto.image} alt={producto.name} style={{ width: '100px' }} />
                        <p>{producto.price}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                    </div>
                ))}
                <p>Total: {calcularTotal()}cop</p>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <button type="submit">Hacer pedido</button>
                </form>
            </div>
        </>
    )
}