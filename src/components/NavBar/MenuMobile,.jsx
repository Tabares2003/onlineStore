// Buscar.jsx

import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import React from "react";
import { FaChevronRight } from "react-icons/fa6";

function MenuMobile({ onClose }) { 

    const menuItems = [
        { title: 'INICIO', path: '/' },
        { title: 'HOMBRES', path: '/Hombres' },
        { title: 'NIÑOS', path: '/RopaNiños' },
        { title: 'MUJERES', path: '/Mujeres' },
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