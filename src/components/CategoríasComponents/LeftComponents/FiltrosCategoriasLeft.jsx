import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Radio, FormControlLabel, Box } from '@mui/material';
import { Checkbox, createTheme, ThemeProvider } from '@mui/material';
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


    return (
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
    );
}

export default FiltrosCategoriasLeft;