import { useState } from 'react';
import Slider from '@mui/material/Slider';


function FiltrosCategoriasLeft({ onFiltroChange, onRangoPrecioChange }) {

    const [filtro, setFiltro] = useState('todos'); // 'todos', 'enExistencia', 'agotados'
    const [rangoPrecio, setRangoPrecio] = useState([0, 400000]);
    const handleRangoPrecioChange = (event, newValue) => {
        setRangoPrecio(newValue);
        onRangoPrecioChange(newValue);
    }; 



    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
        onFiltroChange(e.target.value);
    };


 


    return (
        <div>
            <div>
                <input type="radio" id="todos" name="filtro" value="todos" checked={filtro === 'todos'} onChange={handleFiltroChange} />
                <label htmlFor="todos">Todos</label>
            </div>
            <div>
                <input type="radio" id="enExistencia" name="filtro" value="enExistencia" checked={filtro === 'enExistencia'} onChange={handleFiltroChange} />
                <label htmlFor="enExistencia">En existencia</label>
            </div>
            <div>
                <input type="radio" id="agotados" name="filtro" value="agotados" checked={filtro === 'agotados'} onChange={handleFiltroChange} />
                <label htmlFor="agotados">Agotados</label>
            </div>

            <div>
                <Slider
                    value={rangoPrecio}
                    onChange={handleRangoPrecioChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={400000}
                />
            </div>

        </div>
    );
}

export default FiltrosCategoriasLeft;