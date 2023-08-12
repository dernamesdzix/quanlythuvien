import React from "react";
import { Form } from "antd";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

function Register() {
  const onFinish = (value) => {
    console.log("Success:", value);
  };

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
