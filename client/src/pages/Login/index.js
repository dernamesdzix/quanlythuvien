import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <div className="authentication-form bg-white p-3">
        <h1 className="text-secondary text-xl font-bold mb-1">
          DzixLibrary - LOGIN
        </h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish} className="mt-1">
          <Form.Item label="Email" name="email">
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" placeholder="Password" />
          </Form.Item>

          <Button title="Login" type="Submit" />

          <div className="text-center mt-1">
            <Link to="/register" className="text-primary text-sm underline">
              Don't have an account? Click here to Register!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
