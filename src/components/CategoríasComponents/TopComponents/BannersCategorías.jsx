import { useLocation } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Hidden } from '@mui/material';

// Define las imágenes para cada página en un objeto
const imagenesPorPagina = {
    '/Mujeres': ['https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/FFZgdc1V/CatImg2.png', 'https://i.postimg.cc/rs81ZyZ4/CatImg1.png'],
    '/Hombres': ['https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png'],
    '/Promociones': ['https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png', 'https://i.postimg.cc/GtqkW065/CatImg3.png']
};

const imagenesPorPaginaMobile = {
    '/Mujeres': ['https://i.postimg.cc/BQFH0wRb/Mobile1.png', 'https://i.postimg.cc/CxVDLsVN/Mobile2.png', 'https://i.postimg.cc/WpCgxPWx/Mobile3.png'],
    '/Hombres': ['https://i.postimg.cc/WpCgxPWx/Mobile3.png', 'https://i.postimg.cc/WpCgxPWx/Mobile3.png', 'https://i.postimg.cc/CxVDLsVN/Mobile2.png'], 
    '/Promociones': ['https://i.postimg.cc/BQFH0wRb/Mobile1.png', 'https://i.postimg.cc/CxVDLsVN/Mobile2.png', 'https://i.postimg.cc/WpCgxPWx/Mobile3.png'],
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
                    {imagenes && (
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
                    )}
                </Hidden>

                <Hidden smUp>
                    <Carousel controls={false} touch={false} indicators={false} >
                        {imagenesMobile && (
                            <Carousel controls={false} touch={false} indicators={false}>
                                {imagenesMobile.map((imagen, index) => (
                                    <Carousel.Item key={index} interval={4000}>
                                        <img
                                            className="d-block w-100"
                                            src={imagen}
                                            alt={`Imagen ${index + 1}`}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </Carousel>
                </Hidden>

            </div>
        </div>
    );
}

export default BannersCategorias;