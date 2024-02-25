// Buscar.jsx
import { Button, Drawer, Grid, InputAdornment, InputBase, List, ListItem, ListItemText, Popover, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

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

  const handleInputClick = () => {
    setIsClicked(true);
    setIsTyped(false);
  };

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

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
          {isClicked && <div className='ContRecomendadosBuscar'>Contenido recomendado</div>}


          {isTyped && (
            <div className='conEncontrados'>
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.slice(0, 5).map((product) => (
                    <Link key={product.id} to={`/producto/${product.id}`} onClick={toggleDrawer(false)}>
                      <div>
                        <h2>{product.name}</h2>
                      </div>
                    </Link>
                  ))}
                  <Button variant="contained" color="primary" onClick={toggleDrawer(false)}>
                    <Link to={`/Resultados/${inputValue}`}>
                      Ver todos los resultados ({filteredProducts.length})
                    </Link>
                  </Button>
                </>
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