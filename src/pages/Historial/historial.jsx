import { useNavigate } from 'react-router-dom';




export default function historial() {

    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const navigate = useNavigate();

    const eliminarHistorial = () => {
        localStorage.removeItem('historial');
        window.location.reload(); // Recargar la página para ver los cambios
    };



    return (
        <>
            <div>
                <h1>Historial de productos visitados</h1>
                <button onClick={eliminarHistorial}>Eliminar historial</button>
                {historial.map((producto, index) => (
                    <div key={index}>
                        <h2>{producto.name}</h2>
                        <p>Precio: ${producto.price}</p>
                        {producto.offert && <p>Oferta: ${producto.offert}</p>}
                        <img src={producto.image} alt={producto.name} onClick={() => navigate(`/Producto/${producto.id}`)} style={{ cursor: 'pointer' }} />
                    </div>
                ))}
            </div>
        </>
    )
}