
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
import mujeresCamisetas from "../../../data/camisetasMujeres";
import Titulo from "../../components/Titulo";
import BreadCumb from "../../components/CategoríasComponents/TopComponents/BreadCumb";
import BannersCategorias from "../../components/CategoríasComponents/TopComponents/BannersCategorías";
import LeftCategorias from "../../components/CategoríasComponents/LeftComponents/LeftCategorías";
import FiltrosCategoriasLeft from "../../components/CategoríasComponents/LeftComponents/FiltrosCategoriasLeft";
import { useState } from 'react';
export default function Mujeres() {


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
        productosFiltrados = mujeresCamisetas.filter(producto => producto.stock > 0);
    } else if (filtro === 'agotados') {
        productosFiltrados = mujeresCamisetas.filter(producto => producto.stock === 0);
    } else {
        productosFiltrados = mujeresCamisetas;
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
                        <LeftCategorias />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <Titulo />
                        <FiltrosCategoriasLeft onFiltroChange={handleFiltroChange} onRangoPrecioChange={handleRangoPrecioChange} />
                        {productosFiltrados.map((producto) => (
                            <div key={producto.id}>
                                <h2>{producto.name}</h2>
                                <p>{producto.price}</p>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </>
    )
}