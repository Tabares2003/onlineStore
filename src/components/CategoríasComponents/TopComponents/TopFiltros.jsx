import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Checkbox from '@mui/material/Checkbox';
import { IoMenuOutline } from "react-icons/io5";
import { LuTally2 } from "react-icons/lu";
import { LuTally3 } from "react-icons/lu";
import { LuTally4 } from "react-icons/lu";




function TopFiltros({ onCantidadPorPaginaChange, onOrdenChange, onEstiloChange }) {

    const [estiloSeleccionado, setEstiloSeleccionado] = useState('EstilosPrimercheck');

    const handleEstiloChange = (event) => {
        setEstiloSeleccionado(event.target.value);
        onEstiloChange(event.target.value);
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

    return (
        <div className='TopFilters'>

            <div className='TopFiltersDiv'>
                <div className='DivVerComo'>
                    <div className='TitleVerComo'>
                        <p>Ver como</p>
                    </div>
                    <div className='IconsVerComo'>
                        <div>
                            <IoMenuOutline />
                        </div>
                        <div>
                            <LuTally2 className='dosVista' />
                        </div>
                        <div>
                            <LuTally3 className='tresVista' />
                        </div> 
                    </div>
                </div>
                <div>
                    <Checkbox checked={estiloSeleccionado === 'EstilosPrimercheck'} onChange={handleEstiloChange} value="EstilosPrimercheck" />
                    <Checkbox checked={estiloSeleccionado === 'EstilosSegundocheck'} onChange={handleEstiloChange} value="EstilosSegundocheck" />
                    <Checkbox checked={estiloSeleccionado === 'EstilosTercercheck'} onChange={handleEstiloChange} value="EstilosTercercheck" />
                </div>

            </div>
            <div>
                <LuTally4 />
            </div>
            <div className='TopFiltersDivRight'>
                <div>
                    <Select value={cantidadPorPagina} onChange={handleCantidadPorPaginaChange}>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                        {/* puedes agregar más opciones aquí */}
                    </Select>
                </div>
                <div>
                    <Select value={orden} onChange={handleOrdenChange}>
                        <MenuItem value={'Alfabéticamente, A-Z'}>Alfabéticamente, A-Z</MenuItem>
                        <MenuItem value={'Alfabéticamente, Z-A'}>Alfabéticamente, Z-A</MenuItem>
                        <MenuItem value={'Precio, menor a mayor'}>Precio, menor a mayor</MenuItem>
                        <MenuItem value={'Precio, mayor a menor'}>Precio, mayor a menor</MenuItem>
                    </Select>
                </div>
            </div>







        </div>
    );
}













function Paginacion({ count, onPaginaChange }) {
    return (
        <div>
            <Pagination count={count} onChange={onPaginaChange} />
        </div>
    );
}

export { TopFiltros, Paginacion };