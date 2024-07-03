import React, { useEffect, useState } from 'react';
import { List, message, Row, Col, Button, Modal, Input, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Lista_categorias = () => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevoNombreCategoria, setNuevoNombreCategoria] = useState(''); // Estado para el nuevo nombre de categoría

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await fetch('http://localhost:8000/categorias');
        const data = await response.json();

        if (response.ok) {
          setCategorias(data);
        } else {
          message.error(`Error: ${data.error}`);
        }
      } catch (error) {
        message.error('Error al cargar las categorías');
        console.error('Error:', error);
      }
    };

    cargarCategorias();
  }, []);

  const mostrarModalEliminar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setModalVisible(true);
  };

  const mostrarModalEditar = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setNuevoNombreCategoria(categoria.nombre_categoria); // Establecer el nombre actual de la categoría en el estado
    setEditModalVisible(true);
  };

  const cambiarEstatusCategoria = async () => {
    if (!categoriaSeleccionada) return;
  
    const nuevoEstatus = categoriaSeleccionada.estatus === 1 ? 0 : 1;
  
    try {
      const response = await fetch(`http://localhost:8000/categorias/${categoriaSeleccionada.pk_categoria}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estatus: nuevoEstatus }), // Aquí solo pasamos el estatus
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCategorias(categorias.map(categoria => 
          categoria.pk_categoria === categoriaSeleccionada.pk_categoria ? 
          { ...categoria, estatus: nuevoEstatus } : categoria
        ));
        message.success(`Categoría ${nuevoEstatus === 1 ? 'activada' : 'eliminada'} exitosamente`);
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error(`Error al ${nuevoEstatus === 1 ? 'activar' : 'eliminar'} la categoría`);
      console.error('Error:', error);
    } finally {
      setModalVisible(false);
      setCategoriaSeleccionada(null);
    }
  };
  



  const editarCategoria = async () => {
    if (!categoriaSeleccionada) return;

    try {
      const response = await fetch(`http://localhost:8000/categorias/${categoriaSeleccionada.pk_categoria}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_categoria: nuevoNombreCategoria, estatus: 1 }), // Usar nuevoNombreCategoria
      });

      const data = await response.json();

      if (response.ok) {
        setCategorias(categorias.map(categoria =>
          categoria.pk_categoria === categoriaSeleccionada.pk_categoria ?
            { ...categoria, nombre_categoria: nuevoNombreCategoria } : categoria
        ));
        message.success('Categoría editada exitosamente');
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error('Error al editar la categoría');
      console.error('Error:', error);
    } finally {
      setEditModalVisible(false);
      setCategoriaSeleccionada(null);
    }
  };

  return (
    <div>
      <Row style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        <Col span={8}>Nombre</Col>
        <Col span={8}>Estatus</Col>
        <Col span={8}>Opciones</Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={categorias}
        renderItem={item => (
          <List.Item>
            <Row style={{ width: '100%' }}>
              <Col span={8}>{item.nombre_categoria}</Col>
              <Col span={8}>{item.estatus}</Col>
              <Col span={8}>
                <Button
                  type="primary"
                  onClick={() => mostrarModalEditar(item)}
                  style={{ marginRight: '8px' }}
                >
                  Editar
                </Button>
                <Button
                  type="primary"
                  danger={item.estatus === 1}
                  onClick={() => mostrarModalEliminar(item)}
                >
                  {item.estatus === 1 ? 'Eliminar' : 'Dar de alta'}
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
      <Modal
        title={`Confirmar ${categoriaSeleccionada?.estatus === 1 ? 'eliminación' : 'activación'}`}
        visible={modalVisible}
        onOk={cambiarEstatusCategoria}
        onCancel={() => setModalVisible(false)}
        okText="Sí"
        cancelText="No"
        footer={[
          <Button key="ok" type="primary" onClick={cambiarEstatusCategoria}>
            Sí
          </Button>,
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            No
          </Button>,
        ]}
      >
        <p>¿Estás seguro de que quieres {categoriaSeleccionada?.estatus === 1 ? 'eliminar' : 'dar de alta'} esta categoría?</p>
      </Modal>
      <Modal
        title="Editar categoría"
        visible={editModalVisible}
        onOk={editarCategoria}
        onCancel={() => setEditModalVisible(false)}
        okText="Guardar"
        cancelText="Cancelar"
        footer={[
          <Button key="ok" type="primary" onClick={editarCategoria}>
            Guardar
          </Button>,
          <Button key="cancel" onClick={() => setEditModalVisible(false)}>
            Cancelar
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Nombre de la categoría">
            <Input
              value={nuevoNombreCategoria}
              onChange={(e) => setNuevoNombreCategoria(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Lista_categorias;
