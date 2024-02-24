
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
import React, { useEffect, useState, useContext } from "react";


import hombresCamisas from "../../../data/camisetasHombres";
import { useParams } from 'react-router-dom';
export default function Producto() {


    // Guardar el producto visitado en el historial cuando el componente se monta
    const { productId } = useParams();
    const producto = hombresCamisas.find(p => p.id === Number(productId));

    // Guardar el producto visitado en el historial cuando el componente se monta
    useEffect(() => {
        if (producto) {
            let historial = localStorage.getItem('historial');
            historial = historial ? JSON.parse(historial) : [];

            // Eliminar el producto del historial si ya está en él
            historial = historial.filter(p => p.id !== producto.id);

            // Agregar el producto al principio del historial
            historial.unshift(producto);

            localStorage.setItem('historial', JSON.stringify(historial));
        }
    }, [producto]);


    return (
        <>
            <Grid container>
                {producto ? (
                    <>
                        <h1>{producto.name}</h1>
                        <p>Precio: ${producto.price}</p>
                        {producto.offert && <p>Oferta: ${producto.offert}</p>}
                        <img src={producto.image} alt={producto.name} />
                        {/* Aquí puedes mostrar más detalles del producto */}
                    </>
                ) : (
                    <p>Producto no encontrado</p>
                )}
            </Grid>
        </>
    )
}