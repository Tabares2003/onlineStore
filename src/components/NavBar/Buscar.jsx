// Buscar.jsx
import { Drawer, List, ListItem, ListItemText, TextField } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import niñosCamisetas from '../../../data/camisetasNiños';
import hombresCamisas from "../../../data/camisetasHombres";

function Buscar() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    const results = niñosCamisetas.concat(hombresCamisas).filter(product => product.name.toLowerCase().includes(query));
    setSearchResults(results);
  };

  return (
    <>
      <div onClick={handleDrawerOpen}><IoSearchOutline /></div>
      <Drawer anchor="top" open={open} onClose={handleDrawerClose}>
        <TextField label="Buscar" variant="outlined" onChange={handleSearchChange} />
        <List>
          {searchResults.map((product) => (
            <ListItem button key={product.id} component={RouterLink} to={`/producto/${product.id}`} onClick={handleDrawerClose}>
              <ListItemText primary={product.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Buscar;