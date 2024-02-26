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

function Buscar({ toggleDrawer }) {


  //Consts measured, 80% and in md 100%.
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const allProducts = [...hombresCamisas, ...mujeresCamisetas, ...chaquetas, ...niñosCamisetas];
  const [inputValue, setInputValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isTyped, setIsTyped] = useState(false);

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputClick = () => {
    setIsClicked(true);
    setIsTyped(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value) {
      setIsTyped(true);
      setIsClicked(false);
    } else {
      setIsTyped(false);
      setIsClicked(true);
    }
  };



  const categories = [
    { name: 'Camisetas hombres', path: '/Hombres' },
    { name: 'Camisetas mujeres', path: '/Mujeres' },
    { name: 'Promociones', path: '/Promociones' },
    { name: 'Chaquetas', path: '/Chaquetas' },
    { name: 'Camisetas niños', path: '/Niños' },
  ];

  const randomProductos = [];
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * allProducts.length);
    randomProductos.push(allProducts[randomIndex]);
    allProducts.splice(randomIndex, 1);  // Elimina el producto seleccionado del array para evitar duplicados
  }

  return (
    <div className='mainBuscar'>
      <Grid container style={{ width: isMdDown ? '100%' : '72%', display: 'flex', margin: '0', flexDirection: 'column' }} className='subMainBuscar'>
        <div className='inputBuscar'>
          <InputBase
            onClick={handleInputClick}
            onChange={handleInputChange}
            placeholder="Buscar productos..."
            sx={{
              borderBottom: '2px solid black',
              borderRadius: '0px',
              backgroundColor: 'white',
              padding: '4px',
              marginRight: '8px',
              width: '100%',
              fontSize: '18px',
              height: '3.5rem',
              padding: '10px',
              fontWeight: '600',
              fontFamily: 'Segoe UI'
            }}
            endAdornment={
              <InputAdornment position="end">
                <IoSearch className='iconSearch' />
              </InputAdornment>
            }
          />
          <div className='IconCloseBuscar'>
            <IoClose onClick={toggleDrawer(false)} />
          </div>
        </div>
        <div className='BajoBuscar'>
          {isClicked &&
            <div className='ContRecomendadosBuscar'>
              <div className='titleEncontrados'>
                <h4>Categorías recomendadas</h4>
              </div>

              <div className='catRecomendadas'>
                {categories.map((category) => (
                  <Link to={category.path} key={category.name} onClick={toggleDrawer(false)}>
                    <div>
                      <IoSearch className='iconSearch' />
                      <p>{category.name}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className='titleEncontrados titleEncontradosDos'>
                <h4>Productos populares</h4>
              </div>

              <Grid container className='mainEncontr'>
                {randomProductos.map((product) => (
                  <Grid item xs={6} sm={4} md={3} key={product.id}>
                    <Link to={`/producto/${product.id}`} onClick={toggleDrawer(false)}>
                      <div className="itemBusc">
                        <img src={product.image2} alt={product.name} loading="lazy" />
                        <div className='dataEnc'>
                          <div className='divdataEnc'>
                            <p>{product.name}</p>
                          </div>
                          <div className='pricesEncontr'>
                            <p style={product.offert ? { textDecoration: 'line-through' } : {}}>${product.price}</p>
                            {product.offert && <h6>${product.offert}</h6>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>

            </div>
          }


          {isTyped && (
            <div className='conEncontrados'>
              <div className='titleEncontrados'>
                <h4>Productos encontrados</h4>
              </div>
              {filteredProducts.length > 0 ? (
                <Grid className='Encontrados'>

                  <Grid container className='mainEncontr'>
                    {filteredProducts.slice(0, 4).map((product) => (
                      <Grid item xs={6} sm={4} md={3} key={product.id}>
                        <Link to={`/producto/${product.id}`} onClick={toggleDrawer(false)}>
                          <div className="itemBusc">
                            <img src={product.image2} alt={product.name} loading="lazy" />
                            <div className='dataEnc'>
                              <div className='divdataEnc'>
                                <p>{product.name}</p>
                              </div>
                              <div className='pricesEncontr'>
                                <p style={product.offert ? { textDecoration: 'line-through' } : {}}>${product.price}</p>
                                {product.offert && <h6>${product.offert}</h6>}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>

                  <div className='TodosLosRes'>
                    <Link to={`/Resultados/${inputValue}`}>
                      <button onClick={toggleDrawer(false)}>
                        Ver todos los resultados ({filteredProducts.length})
                      </button>
                    </Link>
                  </div>

                </Grid>
              ) : (
                <p>No se encontraron resultados</p>
              )}
            </div>
          )}


        </div>

      </Grid>
    </div>
  );
}

export default Buscar;