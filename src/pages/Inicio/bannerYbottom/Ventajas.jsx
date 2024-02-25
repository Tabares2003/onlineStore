import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Grid, } from '@mui/material';
import { BsCashCoin } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";
import { PiTShirtDuotone } from "react-icons/pi";



export default function Ventajas() {




    return (
        <section className="VentajasInicio">
            <Grid container spacing={5} padding={5} style={{ height: '100%' }} >
                <Grid item xs={12} md={4}>
                    <div className="ventajasDiv">
                        <BsCashCoin />
                        <h3>Pago contra entrega</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam magnam aperiam maiores quod velit neque. Officiis, provident ea. Repudiandae dolorum enim ullam ad nostr</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="ventajasDiv">
                        <PiTShirtDuotone />
                        <h3>Pago contra entrega</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam magnam aperiam maiores quod velit neque. Officiis, provident ea. Repudiandae dolorum enim ullam ad nostr</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className="ventajasDiv">
                        <GrDeliver />
                        <h3>Envío gratis</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam magnam aperiam maiores quod velit neque. Officiis, provident ea. Repudiandae dolorum enim ullam ad nostr</p>
                    </div>
                </Grid>

            </Grid>
        </section>
    );
}; 
