import { Box, Grid, } from '@mui/material';
import Hidden from '@mui/material/Hidden';

import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Categorias() { 

    return (
        <section className="section-bannerMR">
            <Grid container spacing={3} padding={5} style={{height: '100%' }} >
                <Grid item xs={12} md={6}>
                    <Box textAlign="center" height={'50%'} marginBottom={'7px'}>
                        <img src={'https://i.postimg.cc/NGnk8yrf/Nbpresentacion2.webp'} alt="Presentación 2 NB" style={{ width: "100%", }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box textAlign="center" height={'50%'} marginBottom={'7px'}>
                        <img src={'https://i.postimg.cc/NGnk8yrf/Nbpresentacion2.webp'} alt="Presentación 2 NB" style={{ width: "100%", }} />
                    </Box>
                </Grid>

            </Grid>
        </section>
    );
}; 
