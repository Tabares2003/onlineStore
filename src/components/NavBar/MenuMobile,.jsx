// Buscar.jsx
import { Button, Divider, Drawer, Grid, InputAdornment, InputBase, List, ListItem, ListItemText, Popover, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import hombresCamisas from '../../../data/camisetasHombres';
import mujeresCamisetas from '../../../data/camisetasMujeres';
import chaquetas from '../../../data/chaquetas';
import niñosCamisetas from '../../../data/camisetasNiños';
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import { FaChevronRight } from "react-icons/fa6";

function MenuMobile({ onClose }) { 

    const menuItems = [
        { title: 'INICIO', path: '/' },
        { title: 'HOMBRES', path: '/hombres' },
        { title: 'NIÑOS', path: '/niños' },
        { title: 'MUJERES', path: '/mujeres' },
        { title: 'PROMOCIONES', path: '/promociones' },
        { title: 'HISTORIAL', path: '/historial' },
    ];


    return (
        <div className='mainMenuMobile'>
            <div onClick={onClose}>
                <p>MENÚ</p>
                <IoClose />
            </div>
            {menuItems.map((item, index) => (
                <Link to={item.path} key={index} onClick={onClose}>
                    <div > 
                        <p>{item.title}</p> 
                        <FaChevronRight />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default MenuMobile;