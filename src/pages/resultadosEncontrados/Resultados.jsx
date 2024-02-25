import React from 'react';
import { Link, useParams } from 'react-router-dom';
import hombresCamisas from "../../../data/camisetasHombres";
import mujeresCamisetas from "../../../data/camisetasMujeres";
import chaquetas from "../../../data/chaquetas";
import niñosCamisetas from "../../../data/camisetasNiños";

function Resultados() {
    const { query } = useParams();

    const todosLosProductos = [...hombresCamisas, ...mujeresCamisetas, ...chaquetas, ...niñosCamisetas];

    const productosFiltrados = todosLosProductos.filter(producto =>
        producto.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <h1>Resultados de búsqueda para "{query}" ({productosFiltrados.length})</h1>
            {productosFiltrados.map((producto) => (
                <Link key={producto.id} to={`/producto/${producto.id}`}>
                    <div>
                        <h2>{producto.name}</h2>
                        <p>{producto.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Resultados;