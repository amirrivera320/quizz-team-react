import React from "react";
import { Button, Form, Input, message } from "antd";
import { redirect, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BACKEND_URL } from "../../global/config";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailFormItemLayout = {
  wrapperCol: { span: 24, offset: 0 },
};

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const onFinish = async (values) => {
    //console.log('Datos enviados al backend:', values);  // Verificar datos enviados

    try {
      // Envía los datos del formulario al backend
      const response = await fetch(`${BACKEND_URL}login`, {
        method: "POST",

        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      //console.log('Datos enviados al backend:', values);  // Verificar datos enviados

      const data = await response.json();
      console.log("Respuesta del backend:", data);
      //console.log('Datos enviados al backend:', values);  // Verificar datos enviados

      // Aquí puedes manejar la respuesta del backend según tu lógica
      if (data.message === "Login exitoso") {
        cookies.set("usuario", values.usuario, { path: "/" }); // Guardar nombre de usuario en cookie

        //message.error('Correcto');
        navigate("/index"); // Redirige a la página de inicio después del login exitoso

        //history.push('/index.php'); // Redirige a la página de index después del login exitoso
      } else {
        message.error("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      message.error("Credenciales incorrectas");
      console.log("Datos enviados al backend1:", values);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
        padding: "0 20px",
      }}
    >
      {/* Estilos personalizados CSS */}
      <style jsx>{`
      .form-container {
          background: white;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      @media screen and (max-width: 1024px) {
          .ant-input, .ant-input-password {
            font-size: 1.7em;
            padding: 0.4em 1em;
          }
          .ant-btn {
          font-size: 1.8em;
            padding: 1.1em 2em;
          }

          .ant-form-item-label {
            font-size: 1.2em;
            margin-bottom: 12px;
          }
           .ant-form-item .ant-form-item-label >label {
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
            padding: 1em 1.7em;
          }
          .ant-form-item .ant-form-item-label >label {
          font-size: 20px;
          }
          .ant-form-item-label {
            font-size: 1.2em;
            margin-bottom: 12px;
          }
        } 
           .ant-input, .ant-input-password {
            font-size: 1.2em;
            padding: 0.4em 1em;
          }
          .ant-btn {
          font-size: 1.4em;
            padding: 1.1em
          }

          .ant-form-item-label {
            font-size: 1em;
            margin-bottom: 12px;
          }
           .ant-form-item .ant-form-item-label >label {
          font-size: 20px;
          }
        }
      `}</style>
      <div className="form-container">
        <Form
          {...formItemLayout}
          form={form}
          name="basic"
          style={{ width: "100%", maxWidth: "400px", minWidth: "300px" }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish} // Llama a la función onFinish cuando se envía el formulario
        >
          <Form.Item
            label="Usuario"
            name="usuario"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el usuario",
              },
            ]}
          >
            <Input placeholder="Ingresa el usuario por favor." />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="pass"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la contraseña",
              },
            ]}
          >
            <Input.Password placeholder="Ingresa la contraseña por favor." />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Aceptar
            </Button>
          </Form.Item>
          <p>
            ¿No tienes una cuenta?{" "}
            <a href="/registro">
              <b>registrate aquí</b>
            </a>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
