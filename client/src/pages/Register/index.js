import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/user";

function Register() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
          DzixLibrary - REGISTER
        </h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish} className="mt-1">
          <Form.Item label="Name" name="name">
            <input type="text" placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item label="Phone number" name="phone">
            <input type="number" placeholder="Phone number" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input type="password" placeholder="Password" />
          </Form.Item>

          <div className="text-center mt-1 flex flex-col gap-1">
            <Button title="Register" type="Submit" />
            <Link to="/login" className="text-primary text-sm underline">
              Already have an account? Login here!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
