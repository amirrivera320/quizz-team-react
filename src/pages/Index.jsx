import React, { useEffect, useState } from "react";
import { Layout, Button, Row, Col, Card, Drawer, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

const { Header, Content, Sider } = Layout;

const Index = () => {
  const cookies = new Cookies();
  const usuario = cookies.get("usuario");
  const navigate = useNavigate();
  // const [drawerVisible, setDrawerVisible] = useState(false); // Estado para controlar la visibilidad del drawer

  // // Función para mostrar el drawer
  // const showDrawer = () => {
  //   setDrawerVisible(true);
  // };

  // // Función para cerrar el drawer
  // const closeDrawer = () => {
  //   setDrawerVisible(false);
  // };

  // Cerrar sesión
  const handleLogout = () => {
    cookies.remove("usuario"); // Eliminar la cookie al cerrar sesión

    navigate("/");
  };

  useEffect(() => {
    // Verificar si hay usuario autenticado
    if (!usuario) {
      // Si no hay usuario, redirigir al login
      navigate("/");
    }
  }, [usuario, navigate]);

  // Si no hay usuario, no renderizamos el componente
  if (!usuario) {
    return null;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Drawer para el menú en pantallas pequeñas */}
      {/* <Drawer
        title="Menú"
        placement="left"
        closable={true}
        // onClose={closeDrawer}
        // visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu theme="light" mode="vertical" defaultSelectedKeys={['1']} style={{ marginTop: '16px' }}>
          <Menu.Item key="1">
            <Link to="/crear-equipo" onClick={closeDrawer}>Crear Equipo</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/unirse-equipo" onClick={closeDrawer}>Unirse a Equipo</Link>
          </Menu.Item>
        </Menu>
      </Drawer> */}
      {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
      {/* Contenido principal */}
      <Layout className="site-layout">
        <div>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              height: "100px",
              background: "#fff",
              position: "relative",
            }}
          >
            <img
              src="img/logo-quiz-soft.gif"
              alt="Logo"
              style={{ width: "100px", height: "100px" }}
            />

            <Button
              type="primary"
              onClick={handleLogout}
              style={{
                borderRadius: "25px",
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
                color: "#fff",
              }}
            >
              Cerrar sesión
            </Button>
            <hr
              style={{
                width: "100%",
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: 0,
                border: 0,
                borderBottom: "1px solid #000",
              }}
            />
          </Header>
        </div>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
            <h1 style={{ textAlign: "center" }}>Bienvenido {usuario} </h1>

            <Row
              justify="space-around"
              gutter={[16, 16]}
              style={{ marginTop: 50 }}
            >
              {/* Columna para crear equipo */}
              <Col xs={24} sm={12} md={10} lg={8}>
                <Card title="Crear Equipo" style={{ height: "100%" }}>
                  <p style={{ textAlign: "center" }}>
                    Forma tu propio equipo aquí.
                  </p>
                  <Button type="primary" style={{ width: "100%" }}>
                    <Link to="/crear-equipo">Crear Equipo</Link>
                  </Button>
                </Card>
              </Col>

              {/* Columna para unirse a equipo */}
              <Col xs={24} sm={12} md={10} lg={8}>
                <Card title="Unirse a Equipo" style={{ height: "100%" }}>
                  <p style={{ textAlign: "center" }}>
                    Únete a un equipo existente.
                  </p>
                  <Button type="primary" style={{ width: "100%" }}>
                    <Link to="/unirse-equipo">Unirse a Equipo</Link>
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      {/* Icono de hamburguesa para abrir el drawer en pantallas pequeñas */}
      {/* <MenuOutlined
        className="menu-icon"
        style={{ fontSize: '24px', position: 'fixed', right: '16px', top: '16px', zIndex: 100 }}
        onClick={showDrawer}
      /> */}
    </Layout>
  );
};

export default Index;
