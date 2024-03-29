import { Grid, } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Mujeres() {


    const imagenes = [
        "https://i.postimg.cc/MGFcnwCj/Mujer3.png",
        "https://i.postimg.cc/bNct0zsx/Mujer2.png",
        "https://i.postimg.cc/MGFcnwCj/Mujer3.png",
    ];

    const imagenesMobile = [
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
        "https://i.postimg.cc/43t86Sjh/PRUEBA.png",
    ];

    return (
        <section className="BannerMujeresInicio">
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
        </section>
    );
}; 
