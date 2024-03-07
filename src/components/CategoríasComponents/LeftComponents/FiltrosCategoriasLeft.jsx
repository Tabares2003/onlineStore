import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Radio, FormControlLabel, Box, Hidden, Drawer } from '@mui/material';
import { Checkbox, createTheme, ThemeProvider } from '@mui/material';
import { CiFilter } from "react-icons/ci";
import LeftCategorias from './LeftCategorías';
import { IoClose } from 'react-icons/io5';


function FiltrosCategoriasLeft({ onFiltroChange, onRangoPrecioChange, cantidadTodos, cantidadEnExistencia, cantidadAgotados }) {

    const [filtro, setFiltro] = useState('todos'); // 'todos', 'enExistencia', 'agotados'
    const [rangoPrecio, setRangoPrecio] = useState([0, 400000]);


    const theme = createTheme({
        components: {
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: 'black',
                        '& .MuiSvgIcon-root': {
                            borderRadius: 0,
                        },
                    },
                    checked: {},
                },
            },
        },
        palette: {
            primary: {
                main: '#000000',
            },
        },
    });




    const handleRangoPrecioChange = (event, newValue) => {
        setRangoPrecio(newValue);
        onRangoPrecioChange(newValue);
    };

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
        onFiltroChange(e.target.value);
    };



    const [drawerOpenLeft, setDrawerOpenLeft] = useState(false);

    const handleDrawerOpenLeft = () => {
        setDrawerOpenLeft(true);
    };

    const handleDrawerCloseLeft = () => {
        setDrawerOpenLeft(false); // Aquí estaba el error
    };

    return (
        <div className='mainFiltrosLeft'>

            <Hidden lgDown>
                <div className='DisponibilidadMain'>
                    <div className='leftCatTitle'>
                        <p>Disponibilidad</p>
                    </div>
                    <ThemeProvider theme={theme}>
                        <div className='DispChecks'>
                            <div className='divCheckMain'>
                                <Checkbox checked={filtro === 'todos'} onChange={handleFiltroChange} name="filtro" value="todos" />
                                <label htmlFor="todos">Todos ({cantidadTodos})</label>
                            </div>
                            <div className='divCheckMain'>
                                <Checkbox checked={filtro === 'enExistencia'} onChange={handleFiltroChange} name="filtro" value="enExistencia" />
                                <label htmlFor="enExistencia">En existencia ({cantidadEnExistencia})</label>
                            </div>
                            <div className='divCheckMain'>
                                <Checkbox checked={filtro === 'agotados'} onChange={handleFiltroChange} name="filtro" value="agotados" />
                                <label htmlFor="agotados">Agotados ({cantidadAgotados})</label>
                            </div>
                        </div>
                    </ThemeProvider>


                    <div className='PrecioLeft'>
                        <div className='LeftDispTitle'>
                            <p>Precio</p>
                        </div>
                        <ThemeProvider theme={theme}>
                            <div className='SliderPrecio'>
                                <Slider
                                    value={rangoPrecio}
                                    onChange={handleRangoPrecioChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={400000}
                                />
                            </div>
                        </ThemeProvider>
                        <div className='RangoPrice'>
                            <div className='RangoDiv'>
                                <p>${rangoPrecio[0]}</p>
                            </div>

                            <div className='RangoA'>
                                <p>a</p>
                            </div>

                            <div className='RangoDiv'>
                                <p>${rangoPrecio[1]}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Hidden>

            <Hidden lgUp>
                <div className='iconOpenLeftFilters' onClick={handleDrawerOpenLeft}>
                    <CiFilter />
                    <p>Filtrar</p>
                </div>
            </Hidden>



            <Drawer anchor="left" open={drawerOpenLeft} onClose={handleDrawerCloseLeft}>
                <div className='filtrarPormobile'>
                    <div className='closeFP' onClick={handleDrawerCloseLeft}>
                        <p>Filtrar por</p>
                        <IoClose />
                    </div>
                    <div className='CategoriasMobileT'>
                        <div className='titleCatF'>
                            <p>Categorías</p>
                        </div>
                        <LeftCategorias />
                    </div>

                    <div className='disponibMobile'>
                        <div className='titleCatF titleCatF2'>
                            <p>Disponibilidad</p>
                        </div>

                        <ThemeProvider theme={theme}>
                            <div className='DispChecks'>
                                <div className='divCheckMain'>
                                    <Checkbox checked={filtro === 'todos'} onClick={handleDrawerCloseLeft} onChange={handleFiltroChange} name="filtro" value="todos" />
                                    <label htmlFor="todos">Todos ({cantidadTodos})</label>
                                </div>
                                <div className='divCheckMain'>
                                    <Checkbox checked={filtro === 'enExistencia'} onChange={handleFiltroChange} onClick={handleDrawerCloseLeft} name="filtro" value="enExistencia" />
                                    <label htmlFor="enExistencia">En existencia ({cantidadEnExistencia})</label>
                                </div>
                                <div className='divCheckMain'>
                                    <Checkbox checked={filtro === 'agotados'} onChange={handleFiltroChange} name="filtro" value="agotados" />
                                    <label htmlFor="agotados">Agotados ({cantidadAgotados})</label>
                                </div>
                            </div>
                        </ThemeProvider>


                    </div>

                    <div className='disponibMobile'>  
                        <div className='titleCatF titleCatF2'>
                            <p>Precio</p>
                        </div>
                        <ThemeProvider theme={theme} >
                            <div className='SliderPrecio' >
                                <Slider
                                    value={rangoPrecio}
                                    onChange={handleRangoPrecioChange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={400000}
                                />
                            </div>
                        </ThemeProvider>
                        <div className='RangoPrice'>
                            <div className='RangoDiv'>
                                <p>${rangoPrecio[0]}</p>
                            </div> 
                            <div className='RangoA'>
                                <p>a</p>
                            </div> 
                            <div className='RangoDiv'>
                                <p>${rangoPrecio[1]}</p>
                            </div>
                        </div> 
                    </div>


                </div>
            </Drawer>
        </div>

    );
}

export default FiltrosCategoriasLeft;