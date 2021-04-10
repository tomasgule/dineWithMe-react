import { Menu } from "semantic-ui-react";
import { useState, useContext, Fragment } from "react";
import { UserContext } from "../context/user-context";
import { Link } from "react-router-dom";

export default function Header() {
  const [state, dispatch] = useContext(UserContext);
  const initialState = { activeItem: "" };
  const [activeItem, setActiveItem] = useState(initialState);

  const handleItemClick = (e, { value }) => {
    console.log("value");
    setActiveItem(value);
  };
  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };

  const auth = state.isAuthenticated ? (
    <Fragment>
      <Menu.Item>Velkommen {state.user.first_name}</Menu.Item>
      <Menu.Item value="logout" onClick={handleLogout}>
        Logg ut
      </Menu.Item>
    </Fragment>
  ) : (
    <Fragment>
      <Menu.Item
        as={Link}
        to="/register"
        value="register"
        onClick={handleItemClick}
        active={activeItem === "register"}
      >
        Registrer
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/login"
        value="login"
        onClick={handleItemClick}
        active={activeItem === "login"}
      >
        Logg inn
      </Menu.Item>
    </Fragment>
  );

  return (
    <Menu>
      <Menu.Item
        as={Link}
        value="home"
        onClick={handleItemClick}
        to="/dinnerEvent"
      >
        DineWithMe
      </Menu.Item>
      <Menu.Item
        as={Link}
        value="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        to="/dinnerEvent"
      >
        Hjem
      </Menu.Item>
      <Menu.Menu position="right">{auth}</Menu.Menu>
    </Menu>
  );
}
