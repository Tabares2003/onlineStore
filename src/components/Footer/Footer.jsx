import { Grid, Typography, Divider, Box, IconButton } from "@mui/material"

import { AiFillLinkedin } from 'react-icons/ai'
import { AiFillGithub } from 'react-icons/ai'
import { Link } from "react-router-dom"

// This component renders the footer section of the website
export default function Footer() {
    return (
        <>
            {/* Container for the footer */}
            <Box bgcolor="black" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', marginTop:'6rem' }}>
                <Box bgcolor="black" color="white" display={'flex'} sx={{ width: '80%', flexDirection: 'column' }}>
                    {/* Horizontal divider line */}
                    <Divider sx={{ border: '1px solid white', marginBottom: '2rem', marginTop: '2.3rem' }} />

                    {/* Grid container for footer content */}
                    <div className="middleFooter" >
                        {/* Support section */}
                        <Grid item xs={6} md={3} p={1}>
                            <p className="titleFooter">CATÁLOGO</p>
                            {/* Links for support */}
                            <Link to="/Mujeres" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Camisetas mujeres
                                </p>
                            </Link>
                            <Link to="/Hombres" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Camisetas Hombres
                                </p>

                            </Link>
                            <Link to="/Niños" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Camisetas Niños
                                </p>
                            </Link>
                            <Link to="/Chaquetas" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Chaquetas
                                </p>
                            </Link>

                        </Grid>

                        {/* About Us section */}
                        <Grid item xs={6} md={2} style={{ padding: '1rem' }}>
                            <p className="titleFooter">MI CUENTA</p>
                            <Link to="/Carrito" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Carrito
                                </p>
                            </Link>
                            <Link to="/Pedido" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Pedidos
                                </p>
                            </Link>
                            <Link to="/Historial" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Historial
                                </p>
                            </Link>
                        </Grid>

                        <Grid item xs={6} md={2} style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
                            <p className="titleFooter">ESPECIAL</p>
                            <Link to="/Carrito" style={{ textDecorationLine: 'none' }}>
                                <p className="subTfooter">
                                    Promociones
                                </p>
                            </Link>
                        </Grid>

                        {/* Social Media section */}
                        <Grid item xs={6} md={2} style={{ padding: '1rem' }}>
                            <Typography style={{ margin: '0 0 10px 10px', fontWeight: '500', fontFamily: 'Segoe UI', fontWeight: '800', fontSize: '.9rem' }}>
                                MIS REDES
                            </Typography>

                            {/* Links to LinkedIn and GitHub */}
                            <Link to="https://www.linkedin.com/in/pablo-tabares-17483b231/" style={{ textDecorationLine: 'none' }}>
                                <IconButton sx={{
                                    fill: 'white', color: 'white', height: '41px', width: '41px', '&:hover': {
                                        color: '#0a66c2',
                                    },
                                }}>
                                    <AiFillLinkedin />
                                </IconButton>
                            </Link>
                            <Link to="https://github.com/Tabares2003" style={{ textDecorationLine: 'none' }}>
                                <IconButton sx={{
                                    fill: 'white', color: 'white', height: '41px', width: '41px', '&:hover': {
                                        color: 'gray',
                                    },
                                }}>
                                    <AiFillGithub />
                                </IconButton>
                            </Link>
                        </Grid> 


                        {/* Logo */}
                        <Grid item xs={6} md={2} style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <Link to="/" style={{ textDecorationLine: 'none' }}>
                                <img src="https://i.postimg.cc/x8pzQ3cg/LogoTS.png" alt="" />
                            </Link>
                        </Grid>


                    </div>

                    {/* Horizontal divider line */}
                    <Divider sx={{ border: '1px solid white', marginBottom: '1rem', marginTop: '2.3rem' }} />

                    {/* Copyright notice */}
                    <Typography style={{ fontSize: '.9rem', fontFamily: 'Segoe UI', fontWeight: '500', textAlign: 'center', color: 'gray', marginBottom: '1rem', }}>
                        Todos los derechos reservados de las tiendas mencionadas. ©
                    </Typography>
                </Box>
            </Box>
        </>
    )
}