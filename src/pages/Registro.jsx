import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 0 },
};

function Registro() {
  const [form] = Form.useForm();
  const [integrantes, setIntegrantes] = useState([{ id: 1, nombre: '' }]);

  const agregarIntegrante = () => {
    if (integrantes.length < 3) {
      const newId = integrantes.length > 0 ? integrantes[integrantes.length - 1].id + 1 : 1;
      setIntegrantes([...integrantes, { id: newId, nombre: '' }]);
    }
  };

  const eliminarIntegrante = (id) => {
    if (integrantes.length > 1) {
      setIntegrantes(integrantes.filter(integrante => integrante.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', 
    minHeight: '100vh' }}>
      {/* Estilos personalizados CSS */}
      <style jsx>{`
        .form-container {
          background: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          min-width: 300px;
        }
        .ant-input, .ant-input-password {
          font-size: 1.2em;
          padding: 0.4em 1em;
        }
        .ant-btn {
          font-size: 1.4em;
          padding: 1.1em;
        }
        .ant-form-item-label {
          font-size: 1em;
          margin-bottom: 12px;
        }
        .ant-form-item .ant-form-item-label > label {
          font-size: 20px;
        }
        @media screen and (max-width: 1024px) {
          .ant-input, .ant-input-password {
            font-size: 1.7em;
            padding: 0.4em 1em;
          }
          .ant-btn {
            font-size: 1.8em;
            padding: 1em;
          }
          .ant-form-item-label {
            font-size: 1.2em;
            margin-bottom: 12px;
          }
          .ant-form-item .ant-form-item-label > label {
            font-size: 26px;
          }
        }
         
        @media screen and (max-width: 767px) {
          .ant-input, .ant-input-password {
            font-size: 1.3em;
            padding: 0.4em 1em;
          }
          .ant-btn {
            font-size: 1.3em;
            padding: 1em;
          }
          .ant-form-item .ant-form-item-label > label {
            font-size: 20px;
          }
          .ant-form-item-label {
            font-size: 1.2em;
            margin-bottom: 12px;
          }
        }
      `}</style>
      <div className="form-container">
        <Title level={3} style={{ textAlign: 'center' }}>Registro del Equipo</Title>
        <Form
          {...formItemLayout}
          form={form}
          name="basic"
          autoComplete="off"
        >
          <Form.Item
            label="Nombre del equipo"
            name="nombre_equipo"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el nombre del equipo',
              },
            ]}
          >
            <Input placeholder="Ingresa el nombre del equipo por favor." />
          </Form.Item>

          {integrantes.map((integrante, index) => (
            <Form.Item
              key={integrante.id}
              label={index === 0 ? 'Nombre del integrante' : ''}
              name={`nombre_integrante_${integrante.id}`}
              rules={[
                {
                  required: true,
                  message: 'Por favor ingrese el nombre del integrante'
                },
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  style={{ flex: 3 }}
                  placeholder="Ingresa el nombre del integrante por favor."
                />
                {index === 0 && integrantes.length < 3 && (
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: 'green', borderColor: 'green', marginLeft: '8px' }}
                    onClick={agregarIntegrante}
                  />
                )}
                {integrantes.length > 1 && (
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<CloseOutlined />}
                    style={{ backgroundColor: 'red', borderColor: 'red', marginLeft: '8px' }}
                    onClick={() => eliminarIntegrante(integrante.id)}
                  />
                )}
              </div>
            </Form.Item>
          ))}

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Registrarse
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Registro;
