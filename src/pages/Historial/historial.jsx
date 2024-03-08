
import { Link, useNavigate } from 'react-router-dom';


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
    Drawer,
    Hidden,
} from "@mui/material";
import BreadCumb from '../../components/CategoríasComponents/TopComponents/BreadCumb';
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useState, useContext } from "react";

export default function historial() {

    //Medidas Mui
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('lg'));
 
    const navigate = useNavigate();
  const [historial, setHistorial] = useState(JSON.parse(localStorage.getItem('historial')) || []);
    const eliminarHistorial = () => {
        localStorage.removeItem('historial');
        window.location.reload(); // Recargar la página para ver los cambios
    };

  

    const eliminarProducto = (id) => {
        // Encuentra el producto en el historial
        const productoIndex = historial.findIndex(product => product.id === id);

        // Si el producto existe en el historial, lo elimina
        if (productoIndex !== -1) {
            const nuevoHistorial = [...historial];
            nuevoHistorial.splice(productoIndex, 1);

            // Actualiza el historial en localStorage
            localStorage.setItem('historial', JSON.stringify(nuevoHistorial));

            // Actualiza el estado del componente
            setHistorial(nuevoHistorial);
        }
    };



    return (
        <>
            <Grid container>
                <Grid container style={{ width: isMdDown ? '100%' : '77%', display: 'flex', margin: '0 auto', flexDirection: 'column' }}>
                    <div className='TitleHistorial'>
                        <h3>Historial</h3>
                    </div>
                    <Grid container>
                        {historial.map(product => (
                            <Grid item xs={6} sm={4} md={3} key={product.id}>
                                <div className='itemHistorial'>
                                    <img onClick={() => navigate(`/Producto/${product.id}`)} src={product.image2} alt={product.name} />
                                    <div className='hitorialData'>
                                        <div className='pricesHistorial'>
                                            <h6>{product.name}</h6>
                                            <div className='priceH'>
                                                <p style={product.offert ? { textDecoration: 'line-through' } : {}}>${product.price}</p>
                                                {product.offert && <p style={{ color: 'red' }}>${product.offert}</p>}
                                            </div>
                                        </div>
                                        <div onClick={() => eliminarProducto(product.id)}>
                                            <RiDeleteBin6Line />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    <div>
                        <button onClick={eliminarHistorial}>Eliminar historial</button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}