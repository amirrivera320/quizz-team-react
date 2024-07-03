import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const Categorias_preguntas = () => {
    const cookies = new Cookies();
  const usuario = cookies.get('usuario');
  const tipo = cookies.get('tipo');
  const pk_usuario = cookies.get('pk_usuario');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay usuario autenticado
    if (!usuario) {
      // Si no hay usuario, redirigir al login
      navigate('/');
    }
  }, [usuario, navigate]);

  // Si no hay usuario, no renderizamos el componente
  if (!usuario) {
    return null;
  }
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8000/categorias_preguntas');
        const data = await response.json();

        if (response.ok) {
          setCategorias(data);
        } else {
          console.error(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
      }
    };

    cargarCategorias();
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {categorias.map(categoria => (
        <Col key={categoria.pk_categoria} xs={24} sm={12} md={8} lg={6}>
          <Card title={categoria.nombre_categoria}>
            <Link to={`/administrador/preguntas/${categoria.pk_categoria}`}>
              <Button type="primary">Ver preguntas</Button>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Categorias_preguntas;
