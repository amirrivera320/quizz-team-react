import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Layout, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { Content } = Layout;
const { Title } = Typography;

const Categoria = () => {
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
  const [categoria, setCategoria] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:8000/agregar_categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_categoria: values.nombre_categoria }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Categoría agregada exitosamente');
        setCategoria('');
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error('Error al procesar la solicitud');
      console.error('Error:', error);
    }
  };

  return (
    <Layout style={{ minHeight: '50vh', padding: '20px' }}>
      <Content style={{ background: '#fff', padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Agregar nueva categoría</Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ nombre: categoria }}
        >
          <Form.Item
            label="Nombre de la categoría"
            name="nombre_categoria"
            rules={[{ required: true, message: 'Por favor ingresa el nombre de la categoría' }]}
          >
            <Input 
              placeholder="Ingrese el nombre de la categoría"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Agregar categoría
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Categoria;
