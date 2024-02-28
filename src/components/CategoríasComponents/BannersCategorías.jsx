import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Hidden } from '@mui/material';

// Define las imágenes para cada página en un objeto
const imagenesPorPagina = {
    '/Mujeres': ['https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/FFZgdc1V/CatImg2.png', 'https://i.postimg.cc/rs81ZyZ4/CatImg1.png'], // reemplaza 'url1', 'url2', 'url3' con las URLs de tus imágenes
    '/Hombres': ['https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png']  // reemplaza 'url4', 'url5', 'url6' con las URLs de tus imágenes
    // puedes agregar más páginas y conjuntos de imágenes aquí
};

const imagenesPorPaginaMobile = {
    '/Mujeres': ['https://i.postimg.cc/BQFH0wRb/Mobile1.png', 'https://i.postimg.cc/CxVDLsVN/Mobile2.png', 'https://i.postimg.cc/WpCgxPWx/Mobile3.png'], // reemplaza 'url1', 'url2', 'url3' con las URLs de tus imágenes
    '/Hombres': ['https://i.postimg.cc/WpCgxPWx/Mobile3.png', 'https://i.postimg.cc/WpCgxPWx/Mobile3.png', 'https://i.postimg.cc/CxVDLsVN/Mobile2.png']  // reemplaza 'url4', 'url5', 'url6' con las URLs de tus imágenes
    // puedes agregar más páginas y conjuntos de imágenes aquí
};

function BannersCategorias() {


    const location = useLocation();

    // Selecciona el conjunto de imágenes correcto en base a la ruta actual
    const imagenes = imagenesPorPagina[location.pathname];
    const imagenesMobile = imagenesPorPaginaMobile[location.pathname];

    return (
        <div className="banner-categoria">
            <div className='CarruselCategorías'>

                <Hidden smDown>
                    <Carousel controls={false} touch={false}>
                        {imagenes.map((imagen, index) => (
                            <Carousel.Item key={index} interval={4000}>
                                <img
                                    className="d-block w-100"
                                    src={imagen}
                                    alt={`Imagen ${index + 1}`}
                                    style={{ width: '100%', height: '200px' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Hidden>

                <Hidden smUp>
                    <Carousel controls={false} touch={false} indicators={false} >
                        {imagenesMobile.map((imagen, index) => (
                            <Carousel.Item key={index} interval={4000}>
                                <img
                                    className="d-block w-100"
                                    src={imagen}
                                    alt={`Imagen ${index + 1}`}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Hidden>

            </div>
        </div>
    );
}

export default BannersCategorias;