import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Checkbox from '@mui/material/Checkbox';
import { IoMenuOutline } from "react-icons/io5";
import { LuTally2 } from "react-icons/lu";
import { LuTally3 } from "react-icons/lu";
import { LuTally4 } from "react-icons/lu";
import { IconButton } from '@mui/material';
import { Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';



function TopFiltros({ onCantidadPorPaginaChange, onOrdenChange, onEstiloChange }) {

    const [estiloSeleccionado, setEstiloSeleccionado] = useState('EstilosPrimercheck');

    const handleEstiloChange = (value) => {
        setEstiloSeleccionado(value);
        onEstiloChange(value);
        console.log(value); // Añade esta línea para verificar el valor seleccionado
    };



    const [cantidadPorPagina, setCantidadPorPagina] = useState(10);

    const handleCantidadPorPaginaChange = (event) => {
        setCantidadPorPagina(event.target.value);
        onCantidadPorPaginaChange(event.target.value);
    };



    const [orden, setOrden] = useState('Alfabéticamente, A-Z');

    const handleOrdenChange = (event) => {
        setOrden(event.target.value);
        onOrdenChange(event.target.value);
    };




    const theme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: { 
                        color:'black',
                        fontWeight:'500', 
                        borderRadius: 0,
                        height: '46px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Cambia el color del borde a negro
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': { // Estilo del elemento seleccionado
                            backgroundColor: 'black', // Fondo negro
                            color: 'white', // Texto blanco
                            '&:hover': {
                                backgroundColor: 'black', // Fondo negro al pasar el cursor
                            },
                        },
                        '&:hover': {
                            backgroundColor: '#f4f4f4',
                        },
                    },
                },
            },
        },
    });

    const themeDos = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        color:'black',
                        fontWeight:'500', 
                        width:'200px',
                        borderRadius: 0,
                        height: '46px',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black',
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'black', // Cambia el color del borde a negro
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&.Mui-selected': { // Estilo del elemento seleccionado
                            backgroundColor: 'black', // Fondo negro
                            color: 'white', // Texto blanco
                            '&:hover': {
                                backgroundColor: 'black', // Fondo negro al pasar el cursor
                            },
                        },
                        '&:hover': {
                            backgroundColor: '#f4f4f4',
                        },
                    },
                },
            },
        },
    });

    return (
        <div className='TopFilters'>

            <div className='TopFiltersDiv'>
                <div className='DivVerComo'>
                    <div className='TitleVerComo'>
                        <p>VER COMO</p>
                    </div>
                    <div className='IconsVerComo'>
                        <div onClick={() => handleEstiloChange('EstilosPrimercheck')}>
                            <IoMenuOutline color={estiloSeleccionado === 'EstilosPrimercheck' ? 'black' : '#767677'} />
                        </div>
                        <div onClick={() => handleEstiloChange('EstilosSegundocheck')}>
                            <LuTally2 className='dosVista' color={estiloSeleccionado === 'EstilosSegundocheck' ? 'black' : '#767677'} />
                        </div>
                        <div onClick={() => handleEstiloChange('EstilosTercercheck')}>
                            <LuTally3 className='tresVista' color={estiloSeleccionado === 'EstilosTercercheck' ? 'black' : '#767677'} />
                        </div>
                        <div onClick={() => handleEstiloChange('EstilosCuartaCheck')}>
                            <LuTally4 className='cuartaVista' color={estiloSeleccionado === 'EstilosCuartaCheck' ? 'black' : '#767677'} />
                        </div>
                    </div>
                </div>


            </div>
            <div className='TopFiltersDivRight'>
                <div className='elementsPorPag'>
                    <div>
                        <p>ELEMENTOS POR PAGINA</p>
                    </div>
                    <ThemeProvider theme={theme}>
                        <Select value={cantidadPorPagina} onChange={handleCantidadPorPaginaChange}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </ThemeProvider>
                </div>

                <div className='elementsPorPag'>
                    <div>
                        <p>ORDENAR</p>
                    </div>
                    <ThemeProvider theme={themeDos}>
                        <Select value={orden} onChange={handleOrdenChange}>
                            <MenuItem value={'Alfabéticamente, A-Z'}>Alfabéticamente, A-Z</MenuItem>
                            <MenuItem value={'Alfabéticamente, Z-A'}>Alfabéticamente, Z-A</MenuItem>
                            <MenuItem value={'Precio, menor a mayor'}>Precio, menor a mayor</MenuItem>
                            <MenuItem value={'Precio, mayor a menor'}>Precio, mayor a menor</MenuItem>
                        </Select>
                    </ThemeProvider>
                </div>
            </div>







        </div>
    );
}













function Paginacion({ count, onPaginaChange }) {
    return (
        <div className='PaginacionMui'>
            <Pagination count={count} onChange={onPaginaChange} />
        </div>
    );
}

export { TopFiltros, Paginacion };