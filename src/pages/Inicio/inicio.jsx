import Banner from "./bannerYbottom/Banner";
import RecomendadosHombres from "./recomendadosInicio/RecomendadosHombres";
import Categorias from "./categoriasInicio/Categorias";
import Chaquetas from "./recomendadosInicio/Chaquetas";
import Mujeres from "./categoriasInicio/Mujeres";
import RecomendadoMujeres from "./recomendadosInicio/RecomendadoMujeres";
import RecomendadosNinos from "./recomendadosInicio/RecomendadosNinos";
import ColeccionesInicio from "./bannerYbottom/ColeccionesInicio";
import Ventajas from "./bannerYbottom/Ventajas";
export default function inicio() {  
    return (
        <>
            <div className="divInicio">
                <Banner />
                <RecomendadosHombres/>
                <Categorias/>
                <Chaquetas/>
                <Mujeres/>  
                <RecomendadoMujeres/>
                <RecomendadosNinos/>
                <ColeccionesInicio/>
                <Ventajas/>
            </div>
        </>
    )
}