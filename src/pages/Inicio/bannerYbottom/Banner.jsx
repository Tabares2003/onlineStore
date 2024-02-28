import { Grid, } from '@mui/material';
import Hidden from '@mui/material/Hidden';

import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Banner() {

    const prevIcon = "https://i.postimg.cc/FsbgSDBn/prevIcon.png"; // Imagen para el botón "anterior"
    const nextIcon = "https://i.postimg.cc/kXPvDkfb/nextIcon.png"; // Imagen para el botón "siguiente"  
    // Componente personalizado para los botones
    const CustomButton = ({ iconUrl }) => (
        <span
            style={{
                display: 'inline-block',
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: 'cover',
                borderRadius: '12px',
                width: '50px',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            aria-hidden="true"
        />
    );
    const imagenes = [
        "https://i.postimg.cc/zGMqjyMq/nb1.png",
        "https://i.postimg.cc/zGMqjyMq/nb1.png",
        "https://i.postimg.cc/zGMqjyMq/nb1.png",
        "https://i.postimg.cc/zGMqjyMq/nb1.png"
    ];


    const imagenesMobile = [
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
    ];




    return (
        <section className="section-bannerMR">
            <Grid container style={{ width: '100%', height: 'auto' }}>
                <Grid item xs={12} md={6} style={{ padding: 0 }} display={'flex'} flexDirection={'column'}>
                    <Hidden smDown>
                        <Carousel slide={false} nextLabel="" prevLabel="">
                            {imagenes.map((imagen, index) => (
                                <Carousel.Item key={index} interval={4000}>
                                    <img
                                        className="d-block w-100"
                                        src={imagen}
                                        alt={`Imagen ${index + 1}`}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Hidden>
                    <Hidden smUp>
                        <Carousel slide={false} nextLabel="" prevLabel="">
                            {imagenesMobile.map((imagen, index) => (
                                <Carousel.Item key={index} interval={4000}>
                                    <img
                                        className="d-block w-100"
                                        src={imagen}
                                        alt={`Imagen ${index + 1}`}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Hidden>

                </Grid>
                <Grid item md={6} style={{ padding: 0 }} display={{ xs: 'none', md: 'block', lg: 'block' }}>
                    <img src="https://i.postimg.cc/zGMqjyMq/nb1.png" alt="Descripción de la imagen" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </section>
    );
}; 
