import React, { useEffect, useState } from 'react';
import { Layout, Button, List, Modal } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { Header, Content } = Layout;

const Equipo = () => {
  const cookies = new Cookies();
  const usuario = cookies.get('usuario');
  const pk_usuario = cookies.get('pk_usuario');
  const tipo = cookies.get('tipo');
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [usuariosActivos, setUsuariosActivos] = useState([]);

  useEffect(() => {
    if (!usuario) {
      navigate('/');
    } else {
      cargarUsuariosActivos();
      const interval = setInterval(() => {
        cargarUsuariosActivos();
      }, 3000); // 5000ms = 5 segundos

      return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }
  }, [usuario, navigate]);

  const cargarUsuariosActivos = async () => {
    try {
      const response = await fetch('http://localhost:8000/usuarios_activos');
      const data = await response.json();

      if (response.ok) {
        setUsuariosActivos(data);
      } else {
        console.error('Error al cargar usuarios activos:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const mostrarLogoutModal = () => {
    setLogoutModal(true);
  };

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
        cookies.remove('usuario');
        cookies.remove('pk_usuario');
        cookies.remove('tipo');
        setLogoutModal(false);
        navigate('/');
      } else {
        console.error('Error al cerrar sesión:', data.error);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const handleLogoutCancel = () => {
    setLogoutModal(false);
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
            <img src="/img/logo-quiz-soft.gif" alt="Logo" style={{ width: '100px', height: '100px' }} />
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
            <h2 style={{ textAlign: 'center', margin: '50px 0 20px' }}>Usuarios activos:</h2>
            <List
              itemLayout="horizontal"
              dataSource={usuariosActivos}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={`/perfil/${item.pk_usuario}`}>{item.usuario}</Link>}
                  />
                </List.Item>
              )}
            />
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
      {/* Modal para unirse a equipo */}
    </Layout>
  );
};

export default Equipo;
