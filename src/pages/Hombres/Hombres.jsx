
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
import BreadCumb from "../../components/CategoríasComponents/BreadCumb";
import BannersCategorias from "../../components/CategoríasComponents/BannersCategorías";
import LeftCategorias from "../../components/CategoríasComponents/LeftCategorías";
import { useState } from 'react';
import FiltrosCategoriasLeft from "../../components/CategoríasComponents/FiltrosCategoriasLeft";

export default function Hombres() {

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

    // Filtra los productos por precio
    productosFiltrados = productosFiltrados.filter(producto => producto.price >= rangoPrecio[0] && producto.price <= rangoPrecio[1]);
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Grid container>
                <Grid container style={{ width: isMdDown ? '100%' : '77%', display: 'flex', margin: '0 auto', flexDirection: 'column' }}>
                    <div className="BreadCumbCat">
                        <BreadCumb />
                    </div>
                    <BannersCategorias />

                    <div className="CategoríasMain">
                        <div>
                            <LeftCategorias />
                           <FiltrosCategoriasLeft onFiltroChange={handleFiltroChange} onRangoPrecioChange={handleRangoPrecioChange} />
                        </div>
                        <div>
                            {productosFiltrados.map((producto) => (
                                <div key={producto.id}>
                                    <h2>{producto.name}</h2>
                                    <p>{producto.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </Grid>
            </Grid>
        </>
    )
}