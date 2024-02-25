import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
export default function ColeccionesInicio() {




    return (
        <section className="ColeccionesInicio">
            <div>
                <span>Contamos con envíos nacionales por Servientrega</span>
                <p>Todos nuestros productos son replicas 1.1</p>
                <Link to="/Catalogo" style={{ textDecorationLine: 'none' }}>
                    <button>AQUÍ PUEDES VER TODO EL CATALOGO</button>
                </Link>

            </div>
        </section>
    );
}; 
