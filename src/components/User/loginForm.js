import {
  Button,
  Form,
  Container,
  Message,
  Card,
  CardContent,
} from "semantic-ui-react";
import { UserContext } from "../../context/user-context";
import { Redirect } from "react-router-dom";
import React, { useState, useContext } from "react";
import axios from "axios";

export default function LoginForm() {
  const [state, dispatch] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    dispatch({
      type: "REMOVE_ERROR",
    });
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    dispatch({
      type: "REMOVE_ERROR",
    });
  };

  const errorMessage = state.error ? (
    <Message
      error
      header="Pålogging mislyktes"
      content="Passord eller brukernavn er feil"
    />
  ) : (
    ""
  );

  const login = (username, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });

    axios
      .post("http://192.168.86.66:8000/api/auth/login", body, config)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.data);
        dispatch({
          type: "LOGIN_FAILED",
          payload: err.data,
        });
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (state.isAuthenticated) {
    return <Redirect to="/dinnerEvent" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignSelf: "flex-start",
      }}
    >
      <Card>
        <CardContent>
          <Container textAlign="justified">
            <Form error onSubmit={onSubmit}>
              <Form.Input
                label="Brukernavn"
                type="text"
                placeholder="Brukernavn"
                value={username}
                onChange={handleUsername}
              />
              <Form.Input
                label="Passord"
                type="password"
                placeholder="Passord"
                value={password}
                onChange={handlePassword}
              />
              {errorMessage}
              <Button type="submit">Logg inn</Button>
            </Form>
          </Container>
        </CardContent>
      </Card>
    </div>
  );
}
