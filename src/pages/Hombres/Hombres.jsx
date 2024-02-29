
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
} from "@mui/material";
import hombresCamisas from "../../../data/camisetasHombres";
import Titulo from "../../components/Titulo";
import BreadCumb from "../../components/CategoríasComponents/TopComponents/BreadCumb";
import BannersCategorias from "../../components/CategoríasComponents/TopComponents/BannersCategorías";
import LeftCategorias from "../../components/CategoríasComponents/LeftComponents/LeftCategorías";
import { useState } from 'react';
import FiltrosCategoriasLeft from "../../components/CategoríasComponents/LeftComponents/FiltrosCategoriasLeft";

import { Paginacion, TopFiltros } from "../../components/CategoríasComponents/TopComponents/TopFiltros";

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
                            <div>
                                {estiloSeleccionado === 'EstilosPrimercheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => (
                                    <div key={producto.id} className="EstilosPrimercheck">
                                        <h2>{producto.name}</h2>
                                        <p>{producto.price}</p>
                                    </div>
                                ))}
                                {estiloSeleccionado === 'EstilosSegundocheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => (
                                    <div key={producto.id} className="EstilosSegundocheck">
                                        <h2>{producto.name}</h2>
                                        <p>{producto.price}</p>
                                    </div>
                                ))}
                                {estiloSeleccionado === 'EstilosTercercheck' && productosFiltrados.slice((paginaActual - 1) * cantidadPorPagina, paginaActual * cantidadPorPagina).map((producto) => (
                                    <div key={producto.id} className="EstilosTercercheck">
                                        <h2>{producto.name}</h2>
                                        <p>{producto.price}</p>
                                    </div>
                                ))}
                            </div>
                        </Grid>
                    </Grid>



                    <div className="CategoríasMain">
                        <div>


                        </div>
                        <div>

                            <div>

                            </div>



                            <Paginacion count={Math.ceil(productosFiltrados.length / cantidadPorPagina)} onPaginaChange={handlePaginaChange} />
                        </div>
                    </div>

                </Grid>
            </Grid>
        </>
    )
}