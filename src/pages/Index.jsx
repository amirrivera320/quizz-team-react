import React, { useEffect, useState } from 'react';
import { Layout, Button, Row, Col, Card, Modal, Input, message } from 'antd'; // Importa 'message' de antd
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { Header, Content } = Layout;

const Index = () => {
  const cookies = new Cookies();
  const usuario = cookies.get('usuario');
  const pk_usuario = cookies.get('pk_usuario');
  const tipo = cookies.get('tipo');
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [crearEquipoModal, setCrearEquipoModal] = useState(false);
  const [unirseEquipoModal, setUnirseEquipoModal] = useState(false);
  const [equipoPassword, setEquipoPassword] = useState(''); // Para almacenar la contraseña del equipo
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
  // Función para mostrar el modal de cerrar sesión
  const mostrarLogoutModal = () => {
    setLogoutModal(true);
  };

  // Función para manejar la confirmación del modal de cerrar sesión
  const handleLogoutOk = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, pk_usuario, tipo }),
      });

      const data = await response.json();
      if (response.ok) {
        cookies.remove('usuario'); // Eliminar la cookie al cerrar sesión
        cookies.remove('pk_usuario'); // Eliminar la cookie al cerrar sesión
        cookies.remove('tipo'); // Eliminar la cookie al cerrar sesión
        setLogoutModal(false);
        navigate('/');
      } else {
        console.error('Error al cerrar sesión:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  // Función para manejar la cancelación del modal de cerrar sesión
  const handleLogoutCancel = () => {
    setLogoutModal(false);
  };

  // Función para mostrar el modal de crear equipo
  const mostrarCrearEquipoModal = () => {
    setCrearEquipoModal(true);
    console.log("Mostrar modal, pk_usuario:", pk_usuario); // Para verificar que pk_usuario no sea undefined

  };

  // Función para manejar la confirmación del modal de crear equipo
  const handleCrearEquipoOk = async () => {
    // Verifica si el campo de contraseña está vacío
    if (!equipoPassword) {
      message.error('Por favor completa todos los campos.');
      return;
    }

    try {
      // Aquí puedes realizar la petición para insertar los valores en tu base de datos
      const response = await fetch('http://localhost:8000/crear_equipo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_sala: equipoPassword, // La contraseña es el código de la sala
          fk_usuario: pk_usuario,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Equipo creado exitosamente:', data);
        setCrearEquipoModal(false);
        // Puedes realizar acciones adicionales después de crear el equipo si es necesario
        const codigoSala = data.codigo_sala;
      if (codigoSala) {
        navigate(`/equipo/${codigoSala}`); // Redirige a la página del equipo usando `codigo_sala`
      } else {
        message.error('No se pudo obtener el código de la sala.');
      }
    } else {
      console.error('Error al crear equipo:', data.error);
      message.error(data.error || 'Error al crear equipo');
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    message.error('Error al procesar la solicitud');
  }
};

  // Función para manejar la cancelación del modal de crear equipo
  const handleCrearEquipoCancel = () => {
    setEquipoPassword(''); // Limpia el valor del campo de contraseña al cancelar
    setCrearEquipoModal(false);
  };


  // Función para mostrar el modal de crear equipo
  const mostrarUnirseEquipoModal = () => {
    setUnirseEquipoModal(true);
    console.log("Mostrar modal, pk_usuario:", pk_usuario); // Para verificar que pk_usuario no sea undefined

  };




  
  // Función para manejar la confirmación del modal de crear equipo
  const handleUnirseEquipoOk = async () => {
    // Verifica si el campo de contraseña está vacío
    if (!equipoPassword) {
      message.error('Por favor completa todos los campos.');
      return;
    }

    try {
      // Aquí puedes realizar la petición para insertar los valores en tu base de datos
      const response = await fetch('http://localhost:8000/unirse_equipo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_sala: equipoPassword, // La contraseña es el código de la sala
          fk_usuario: pk_usuario,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Ingresaste a la sala exitosamente:', data);
        setUnirseEquipoModal(false);
        // Puedes realizar acciones adicionales después de crear el equipo si es necesario
        const codigoSala = data.codigo_sala;
      if (codigoSala) {
        navigate(`/equipo/${codigoSala}`); // Redirige a la página del equipo usando `codigo_sala`
      } else {
        message.error('No se pudo obtener el código de la sala.');
      }
    } else {
      console.error('Error al crear equipo:', data.error);
      message.error(data.error || 'Error al crear equipo');
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    message.error('Error al procesar la solicitud');
  }
};

  // Función para manejar la cancelación del modal de crear equipo
  const handleUnirseEquipoCancel = () => {
    setEquipoPassword(''); // Limpia el valor del campo de contraseña al cancelar
    setUnirseEquipoModal(false);
  };
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <div>
          <Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              height: '100px',
              background: '#fff',
              position: 'relative'
            }}
          >
            <img src="img/logo-quiz-soft.gif" alt="Logo" style={{ width: '100px', height: '100px' }} />
            <Button
              type="primary"
              onClick={mostrarLogoutModal}
              style={{
                borderRadius: '25px',
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                color: '#fff'
              }}
            >
              Cerrar sesión
            </Button>
            <hr
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                margin: 0,
                border: 0,
                borderBottom: '1px solid #000'
              }}
            />
          </Header>
        </div>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
            <h1 style={{ textAlign: 'center' }}>Bienvenido {usuario} </h1>
            <Row justify="space-around" gutter={[16, 16]} style={{ marginTop: 50 }}>
              {/* Columna para crear equipo */}
              <Col xs={24} sm={12} md={10} lg={8}>
                <Card title="Crear Equipo" style={{ height: '100%' }}>
                  <p style={{ textAlign: 'center' }}>Forma tu propio equipo aquí.</p>
                  <Button type="primary" style={{ width: '100%' }} onClick={mostrarCrearEquipoModal}>
                    Crear equipo
                  </Button>
                </Card>
              </Col>
              {/* Columna para unirse a equipo */}
              <Col xs={24} sm={12} md={10} lg={8}>
                <Card title="Unirse a Equipo" style={{ height: '100%' }}>
                  <p style={{ textAlign: 'center' }}>Únete a un equipo existente.</p>
                  <Button type="primary" style={{ width: '100%' }} onClick={mostrarUnirseEquipoModal}>
                    Unirse a equipo
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      {/* Modal de confirmación para cerrar sesión */}
      <Modal
        title="Confirmación"
        visible={logoutModal}
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
        okText="Sí"
        cancelText="No"
        footer={[
          <Button key="ok" type="primary" onClick={handleLogoutOk}>
            Sí
          </Button>,
          <Button key="cancel" onClick={handleLogoutCancel}>
            No
          </Button>,
        ]}
      >
        <p>¿Estás seguro de salir?</p>
      </Modal>

      {/* Modal para crear equipo */}
      <Modal
        title="Crear Equipo"
        visible={crearEquipoModal}
        onOk={handleCrearEquipoOk}
        onCancel={handleCrearEquipoCancel}
        okText="Crear"
        cancelText="Cancelar"
        footer={[
          <Button key="ok" type="primary" onClick={handleCrearEquipoOk}>
            Crear
          </Button>,
          <Button key="cancel" onClick={handleCrearEquipoCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Input
          placeholder="Contraseña"
          value={equipoPassword}
          onChange={(e) => setEquipoPassword(e.target.value)}
          required  // Esta es la propiedad para hacer el campo requerido
        />
      </Modal>


       {/* Modal para crear equipo */}
       <Modal
        title="Unirse Equipo"
        visible={unirseEquipoModal}
        onOk={handleUnirseEquipoOk}
        onCancel={handleUnirseEquipoCancel}
        okText="Unirse"
        cancelText="Cancelar"
        footer={[
          <Button key="ok" type="primary" onClick={handleUnirseEquipoOk}>
            Unirse
          </Button>,
          <Button key="cancel" onClick={handleUnirseEquipoCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Input
          placeholder="Contraseña"
          value={equipoPassword}
          onChange={(e) => setEquipoPassword(e.target.value)}
          required  // Esta es la propiedad para hacer el campo requerido
        />
      </Modal>
    </Layout>
  );
};

export default Index;
