
//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import hombresCamisas from "../../../data/camisetasHombres";

export default function Hombres() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Grid container>
                <Grid container style={{ width: isMdDown ? '100%' : '79%', display: 'flex', margin: '0 auto' }}>
                    <div>
                        <h2>Camisetas de Hombres</h2>
                        {hombresCamisas.map((producto) => (
                            <div key={producto.id}>
                                <h2>{producto.name}</h2>
                                <p>{producto.price}</p>
                            </div>
                        ))}
                    </div>
                </Grid> 
            </Grid>
        </>
    )
}