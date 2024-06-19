import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom'; // Importa el componente Link


const { Content } = Layout;

const IndexPage = () => {
  return (
    <Layout style={{ height: '75vh' }}>
      {/* Estilos personalizados CSS */}
      <style jsx>{`
        @media screen and (max-width: 767px) {
          .image-tetris {
            display: none;
          }
          .image-1 {
            display: block !important;
          }
        }
          
        @media screen and (max-width: 772px) {
          .image-tetris2 {
            display: none;
          }
          .image-1 {
            display: block !important;
          }
        }
          @media screen and (max-width: 1400px) {
          .image-tetris3 {
            display: none;
          }
          .image-1 {
            display: block !important;
          }
        }
            @media screen and (max-width: 400px) {
          .image-5 {
            width: 100px !important;
            height: 100px !important;
          }
        }
         
      `}</style>
      <Content style={{ display: 'flex' }}>
        {/* Lado izquierdo - Texto y Botón */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: '20px' }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>
            Q
            <span style={{ color: '#FDCC50' }}>u</span>
            i
            <span style={{ color: '#66C7D5' }}>z</span>
            {' '}
            S
            <span style={{ color: '#66C7D5' }}>o</span>
            f
            <span style={{ color: '#D4C8F6' }}>t</span>
          </h1>
          <Link to="/login">
            <Button type="primary" size="large" style={{ background: 'linear-gradient(45deg, #FDCC50, #66C7D5, #D4C8F6)', border: 'none' }}>Jugar</Button>
          </Link>        </div>
        {/* Lado derecho - Imágenes estilo Tetris */}
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
          <div className="image-5" style={{ padding: '5px', background: 'linear-gradient(45deg, #FDCC50, #66C7D5, #D4C8F6)', borderRadius: '15px', margin: '10px' }}>
            <img src="img/ruleta2.gif" alt="Imagen 5" style={{ width: '200px', height: '200px', borderRadius: '10px' }} />
          </div>
          <img className="image-tetris2" src="img/prueba.png" alt="Imagen 2" style={{ width: '150px', height: '150px', margin: '10px', borderRadius: '10px', border: '5px solid', borderImage: 'linear-gradient(45deg, #FED843, #F03800) 3' }} />
          <img className="image-tetris3" src="img/quiz-nimals.gif" alt="Imagen 3" style={{ width: '200px', height: '300px', margin: '10px', borderRadius: '15px', border: '5px solid #000' }} />
          <img className="image-tetris3" src="img/quizas.png" alt="Imagen 5" style={{ width: '150px', height: '150px', margin: '10px', borderRadius: '10px', border: '5px solid #6B5B95', borderImage: 'linear-gradient(45deg, #5AB267, #EC4C36, #3D4B66) 3' }} />
          <img className="image-tetris3" src="img/comunicacion.png" alt="Imagen 6" style={{ width: '100px', height: '100px', margin: '10px', borderRadius: '10px', border: '2px solid #88B04B' }} />
        </div>
      </Content>
    </Layout>
  );
};

export default IndexPage;
