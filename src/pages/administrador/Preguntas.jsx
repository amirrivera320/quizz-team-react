import React, { useState, useEffect } from 'react';
import { List, Typography, Card, Button, Modal, Form, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const { Title, Text } = Typography;

const Preguntas = () => {
  const cookies = new Cookies();
  const usuario = cookies.get('usuario');
  const navigate = useNavigate();
  const { pk_categoria } = useParams();

  const [preguntas, setPreguntas] = useState([]);
  const [modalVisibleEditar, setModalVisibleEditar] = useState(false); // Estado para el modal de editar
  const [modalVisibleConfirmar, setModalVisibleConfirmar] = useState(false); // Estado para el modal de confirmar
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(null);
  const [nuevoContenidoPregunta, setNuevoContenidoPregunta] = useState('');
  const [opcionesPregunta, setOpcionesPregunta] = useState([]);
  const [nuevaOpcion, setNuevaOpcion] = useState('');

  useEffect(() => {
    if (!usuario) {
      navigate('/');
    }
  }, [usuario, navigate]);

  useEffect(() => {
    const cargarPreguntas = async () => {
      try {
        const response = await fetch(`http://localhost:8000/preguntas/${pk_categoria}`);
        const data = await response.json();

        if (response.ok) {
          setPreguntas(data);
        } else {
          console.error(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error('Error al cargar las preguntas:', error);
      }
    };

    cargarPreguntas();
  }, [pk_categoria]);

  const mostrarModalEditar = (pregunta) => {
    setPreguntaSeleccionada(pregunta);
    setNuevoContenidoPregunta(pregunta.contenidoPregunta);
    setOpcionesPregunta(pregunta.opciones.map(opcion => ({ ...opcion })));
    setModalVisibleEditar(true); // Mostrar modal de editar
  };

  const cambiarEstatusPregunta = async () => {
    if (!preguntaSeleccionada) return;
  
    const nuevoEstatus = preguntaSeleccionada.estatus === 1 ? 0 : 1;
  
    try {
      const response = await fetch(`http://localhost:8000/preguntas/eliminarydardealta/${preguntaSeleccionada.pk_pregunta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estatus: nuevoEstatus }), // Aquí solo pasamos el estatus
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setPreguntas(preguntas.map(pregunta =>
          pregunta.pk_pregunta === preguntaSeleccionada.pk_pregunta ? 
          { ...pregunta, estatus: nuevoEstatus } : pregunta
        ));
        message.success(`Categoría ${nuevoEstatus === 1 ? 'activada' : 'eliminada'} exitosamente`);
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error(`Error al ${nuevoEstatus === 1 ? 'activar' : 'eliminar'} la categoría`);
      console.error('Error:', error);
    } finally {
      setModalVisibleConfirmar(false); // Ocultar modal de confirmación
      setPreguntaSeleccionada(null);
    }
  };

  const editarPregunta = async () => {
    if (!preguntaSeleccionada) return;

    try {
      const response = await fetch(`http://localhost:8000/preguntas/${preguntaSeleccionada.pk_pregunta}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenidoPregunta: nuevoContenidoPregunta, opciones: opcionesPregunta }),
      });

      const data = await response.json();

      if (response.ok) {
        setPreguntas(preguntas.map(pregunta =>
          pregunta.pk_pregunta === preguntaSeleccionada.pk_pregunta ?
            { ...pregunta, contenidoPregunta: nuevoContenidoPregunta, opciones: opcionesPregunta } : pregunta
        ));
        message.success('Pregunta editada exitosamente');
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error('Error al editar la pregunta');
      console.error('Error:', error);
    } finally {
      setModalVisibleEditar(false); // Ocultar modal de editar
      setPreguntaSeleccionada(null);
      setOpcionesPregunta([]);
      setNuevaOpcion('');
    }
  };

  return (
    <div>
      <Title level={3}>Preguntas de la categoría</Title>
      <List
        dataSource={preguntas}
        renderItem={(pregunta) => (
          <Card style={{ marginBottom: 16 }}>
            <Title level={4}>{pregunta.contenidoPregunta}</Title>
            <List
              dataSource={pregunta.opciones}
              renderItem={(opcion, index) => (
                <List.Item key={index}>
                  <Text>{opcion.contenidoopcion}</Text>
                  <Text type={opcion.esCorrecta ? 'success' : 'danger'}>
                    {opcion.esCorrecta ? ' (Correcta)' : ' (Incorrecta)'}
                  </Text>
                </List.Item>
              )}
            />
            <Button type="primary" onClick={() => mostrarModalEditar(pregunta)} style={{ marginRight: '8px' }}>Editar</Button>
            <Button type="primary" 
            danger={pregunta.estatus === 1}
            onClick={() => {
              setPreguntaSeleccionada(pregunta);
              setModalVisibleConfirmar(true); // Mostrar modal de confirmar
            }}>
              {pregunta.estatus === 1 ? 'Eliminar' : 'Dar de alta'}
            </Button>
          </Card>
        )}
      />
      <Modal
        title={`Confirmar ${preguntaSeleccionada?.estatus === 1 ? 'eliminación' : 'activación'}`}
        visible={modalVisibleConfirmar}
        onOk={cambiarEstatusPregunta}
        onCancel={() => setModalVisibleConfirmar(false)}
        okText="Sí"
        cancelText="No"
        footer={[
          <Button key="ok" type="primary" onClick={cambiarEstatusPregunta}>
            Sí
          </Button>,
          <Button key="cancel" onClick={() => setModalVisibleConfirmar(false)}>
            No
          </Button>,
        ]}
      >
        <p>¿Estás seguro de que quieres {preguntaSeleccionada?.estatus === 1 ? 'eliminar' : 'dar de alta'} esta pregunta?</p>
      </Modal>
      <Modal
        title="Editar pregunta"
        visible={modalVisibleEditar}
        onOk={editarPregunta}
        onCancel={() => setModalVisibleEditar(false)}
      >
        <Form>
          <Form.Item label="Contenido de la pregunta">
            <Input value={nuevoContenidoPregunta} onChange={(e) => setNuevoContenidoPregunta(e.target.value)} />
          </Form.Item>
          <Form.Item label="Opciones">
            <List
              dataSource={opcionesPregunta}
              renderItem={(opcion, index) => (
                <List.Item key={index}>
                  <Input value={opcion.contenidoopcion} onChange={(e) => {
                    const nuevasOpciones = [...opcionesPregunta];
                    nuevasOpciones[index].contenidoopcion = e.target.value;
                    setOpcionesPregunta(nuevasOpciones);
                  }} />
                </List.Item>
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Preguntas;
