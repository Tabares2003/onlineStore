//Componente que nos muestra en las categorías que nos sirve para mostrarle al usuario donde está y donde puede ir copn el Location de rrdom
import { Link, useLocation } from 'react-router-dom';

import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function LeftCategorias() {
    const location = useLocation();

    const categorias = [
        { ruta: '/Mujeres', nombre: 'Mujeres' },
        { ruta: '/Hombres', nombre: 'Hombres' },
        { ruta: '/Niños', nombre: 'Niños' },
        { ruta: '/Promociones', nombre: 'Promociones' },

    ];

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <Grid container>
            {!matches ? (
                <div className='MainLeftCategorías'>
                    <div className='leftCatTitle'>
                        <p>Categorías</p>
                    </div>
                    <div className='categoriasLeftList'>
                        {categorias.map((categoria) => (
                            <Link to={categoria.ruta} key={categoria.nombre}>
                                <div className={location.pathname === categoria.ruta ? 'activeCategoria' : 'inactiveCategoría'}>
                                    {location.pathname === categoria.ruta && <GoChevronRight />}
                                    <p>{categoria.nombre}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='categMobile'>
                    {categorias.map((categoria) => (
                        <Link to={categoria.ruta} key={categoria.nombre}>
                            <div className={location.pathname === categoria.ruta ? 'activeCategoriaMobile' : 'inactiveCategoríaMobile'}>
                                <p>{categoria.nombre}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </Grid>
    );
}

export default LeftCategorias;