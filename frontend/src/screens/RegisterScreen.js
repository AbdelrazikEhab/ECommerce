import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { register } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer.js";

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
     const [password, setPassword] = useState();
     const [confirmpassword, setconfirmpassword] = useState();
     const [message, setMessage] = useState(null);



  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password!== confirmpassword){
        setMessage('password not match');
    }else{
        dispatch(register(name,email, password ));
    }
    
  };

  return (
    <FormContainer>
      <h1 className="register">Sign Up</h1>
      {error && <Message variant="danger">{message}</Message>}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group className="register">
          <Form.Label md="3">Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="register">
          <Form.Label md="3">Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="register">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group controlId="confirmpassword" className="register">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Register
        </Button>
        </Form>

        <Row className="py-3">
        <Col>
        Have an accout?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>

    </FormContainer>
  );
};

export default RegisterScreen;
