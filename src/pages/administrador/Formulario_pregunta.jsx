import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const { Option } = Select;

const FormularioPregunta = () => {
  
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
        const response = await fetch('http://localhost:8000/formulario_categorias');
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

  const onFinish = async (values) => {
    console.log('Received values: ', values);
    try {
      const response = await fetch('http://localhost:8000/crear_pregunta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Pregunta y opciones guardadas exitosamente');
        // Reiniciar el formulario
        form.resetFields();
      } else {
        message.error(`Error: ${data.error}`);
      }
    } catch (error) {
      message.error('Error al guardar la pregunta y opciones');
      console.error('Error:', error);
    }
  };

  const [form] = Form.useForm(); // Usar form para resetear el formulario

  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <Col span={12}>
        <Form
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="contenidoPregunta"
            label="Contenido de la pregunta"
            rules={[{ required: true, message: 'Por favor ingresa el contenido de la pregunta' }]}
          >
            <Input placeholder="Escribe la pregunta" />
          </Form.Item>

          <Form.Item
            name="fk_categoria"
            label="Categoría"
            rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
          >
            <Select placeholder="Selecciona una categoría">
              {categorias.map((categoria) => (
                <Option key={categoria.pk_categoria} value={categoria.pk_categoria}>
                  {categoria.nombre_categoria}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.List name="opciones">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Row key={key} gutter={16} align="middle">
                    <Col span={14}>
                      <Form.Item
                        {...restField}
                        name={[name, 'contenidoopcion']}
                        fieldKey={[fieldKey, 'contenidoopcion']}
                        rules={[{ required: true, message: 'Por favor ingresa el contenido de la opción' }]}
                      >
                        <Input placeholder="Escribe la opción" />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        {...restField}
                        name={[name, 'esCorrecta']}
                        fieldKey={[fieldKey, 'esCorrecta']}
                        valuePropName="checked"
                      >
                        <Select placeholder="Es correcta">
                          <Option value={true}>Sí</Option>
                          <Option value={false}>No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Añadir opción
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Guardar pregunta
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default FormularioPregunta;
