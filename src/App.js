import { Component } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./components/header";
import LoginForm from "./components/User/loginForm";
import RegisterForm from "./components/User/registerForm";
import DinnerList from "./components/Dinners/DinnerList";
import { UserContextProvider } from "./context/user-context";
import { DinnerContextProvider } from "./context/dinner-context";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <Router>
        <UserContextProvider>
          <DinnerContextProvider>
            <Header />
            <Container>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dinnerEvent" />;
                </Route>
                <Route path="/dinnerEvent">
                  <DinnerList />
                </Route>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route path="/register">
                  <RegisterForm />
                </Route>
              </Switch>
            </Container>
          </DinnerContextProvider>
        </UserContextProvider>
      </Router>
    );
  }
}

export default App;
