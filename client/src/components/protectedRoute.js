import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getLoggedInUserDetails } from "../api/user";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const validateUserToken = async () => {
    try {
      const response = await getLoggedInUserDetails();
      if (response.success) {
        setUser(response.data);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateUserToken();
    }
  }, []);

  return (
    <div>
      {user && (
        <>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
          <h1>{user.phone}</h1>
          <h1>{user.role}</h1>
          {children}
        </>
      )}
    </div>
  );
}

export default ProtectedRoute;
