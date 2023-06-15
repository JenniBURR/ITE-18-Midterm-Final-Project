import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Input,
} from "reactstrap";

const initialUser = { email: "", password: "", username: "" };

const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (!!res) {
          toast.success("Registered successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      signUp();
    }
  };

  return (
    <Row className="register">
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div className="register-container">
          <h1>Cat Moments</h1>
          <h2>Sign Up Now!</h2>
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Enter your Username"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Enter Email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              onKeyDown={handleKeyPress}
              placeholder="Enter Password"
            />
          </FormGroup>
          <Button color="primary" onClick={signUp}>
            Sign Up
          </Button>
          <h6>
            Back to <Link to="/login">Login</Link>
          </h6>
        </div>
      </Col>
    </Row>
  );
};

export default Registration;
