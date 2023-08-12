import React from "react";
import { Form } from "antd";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Login() {
  const onFinish = (value) => {
    console.log("Success:", value);
  };

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

          <Button title="Register" type="Submit" />

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
