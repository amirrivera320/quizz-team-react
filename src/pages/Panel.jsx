import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Row, Col } from 'antd';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import React, { useEffect, useState  } from 'react';
import Cookies from 'universal-cookie';

// Este es el archivo del panel

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));


function getItem(label, key, icon, children, type, ruta) {
  return {
    key,
    icon,
    children,
    label,
    type,
    ruta,
  };
}
const rootSubmenuKeys = ['sub0', 'sub1', 'sub2', 'sub3', 'sub4'];
const Panel = ({ componente }) => {
const cookies = new Cookies();
const usuario = cookies.get('usuario');
const tipo = cookies.get('tipo');
const navigate = useNavigate();
const [logoutModal, setLogoutModal] = useState(false);


console.log('usuario:', usuario); // Asegúrate de incluir `usuario` aquí para mostrar su valor


  const {
    token: { colorBgContainer },
  } = theme.useToken();


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



// Cerrar sesión

const handleLogoutOk = async () => {
  try {
    const response = await fetch('http://localhost:8000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, tipo }),
    });

    const data = await response.json();
    if (response.ok) {
      cookies.remove('usuario'); // Eliminar la cookie al cerrar sesión
      cookies.remove('tipo'); // Eliminar la cookie al cerrar sesión
      cookies.remove('pk_usuario'); // Eliminar la cookie al cerrar sesión
      setLogoutModal(false);

      navigate('/');
    } else {
      console.error('Error al cerrar sesión:', data.error);
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
  }
}




// Función para mostrar el modal de cerrar sesión
const mostrarLogoutModal = () => {
  setLogoutModal(true);
};
// Función para manejar la cancelación del modal de cerrar sesión
const handleLogoutCancel = () => {
  setLogoutModal(false);
};
  return (

    <Layout className="header">

      <div>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100px', background: '#fff', position: 'relative' }}>
          <img src="../img/logo-quiz-soft.gif" alt="Logo" style={{ width: '100px', height: '100px' }} />
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#FDCB4F', width: '200px', height: '100px', borderBottomLeftRadius: '25px', borderBottomRightRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 100 100">
                <text x="6" y="55" fontSize="20" fontWeight="bold" fill="#333" transform="rotate(-15 50 50)">Quiz-Soft</text>
              </svg>
            </div>
          </div>
          <hr style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, margin: 0, border: 0, borderBottom: '1px solid #000' }} />
        </Header>
      </div>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item onClick={() => navigate('/administrador')}>Página administrador</Menu.Item>
            <SubMenu key="sub1" title="Categorías">
              <Menu.Item onClick={() => navigate('/administrador/categoria')}>Agregar categoría</Menu.Item>
              <Menu.Item onClick={() => navigate('/administrador/lista_categoria')}>Lista de categorías</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Preguntas">
            <Menu.Item onClick={() => navigate('/administrador/formulario_pregunta')}>Agregar preguntas</Menu.Item>
            <Menu.Item onClick={() => navigate('/administrador/categorias_preguntas')}>Preguntas</Menu.Item>
            </SubMenu>
            <Menu.Item onClick={mostrarLogoutModal}>Cerrar sesión</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 10px 24px' }}>


          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {componente}
          </Content>
        </Layout>
      </Layout>
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
    </Layout>
  );
};

export default Panel;
