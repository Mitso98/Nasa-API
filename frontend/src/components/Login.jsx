// src/components/Login.js
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import EmailVerification from "./EmailVerification";
import styles from "./Login.module.css";

function Login() {
  const { setUser } = useContext(AuthContext);
  const [verified, setVerified] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);
      setUser(response.data.user);
      navigate("/home");
    } catch (err) {
      if (err.response.status === 403) {
        setVerified(false);
      }
      setError(err.response.data.msg);
    }
  };

  return (
    <Container className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className={styles.submit}>
          Login
        </Button>
      </Form>
      {!verified && <EmailVerification />}
    </Container>
  );
}

export default Login;
