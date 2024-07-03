import React, { useEffect, useState } from 'react';
import { Layout, Button, Row, Col, Card, Modal, Input, message } from 'antd'; // Importa 'message' de antd
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { Header, Content } = Layout;

const Administrador = () => {
  const cookies = new Cookies();
  const usuario = cookies.get('usuario');
  const tipo = cookies.get('tipo');
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

  return (
    <Layout style={{ minHeight: '50vh' }}>
        <p>hola</p>
     
    </Layout>
  );
};

export default Administrador;
