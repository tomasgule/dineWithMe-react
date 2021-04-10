import { Fragment, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Comment,
  Form,
  Button,
  Header,
  Message,
} from "semantic-ui-react";
import { DinnerContext } from "../../context/dinner-context";
import { UserContext } from "../../context/user-context";
import axios from "axios";

const DinnerComment = ({ comment }) => {
  return (
    <Comment>
      <Comment.Content>
        <Comment.Author as="a">
          {comment.user.first_name} {comment.user.last_name}
        </Comment.Author>
        <Comment.Metadata>
          <div>{new Date(comment.created_at).toLocaleString()}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

const DinnerList = () => {
  const [state, dispatch] = useContext(DinnerContext);
  const [user] = useContext(UserContext);
  const { dinnerId } = useParams();

  //const dinner = state.dinners.find((d) => d.id === dinnerId);
  const [dinner, setDinner] = useState({
    id: 0,
    comment: [],
    guests: [],
  });

  const [text, setText] = useState("");

  const handleText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const comment = (dinner_id, text) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
    };
    const body = JSON.stringify({ dinner_id, text });
    axios
      .post("http://127.0.0.1:8000/api/comment", body, config)
      .then((res) => {
        console.log(res.data);
        setDinner({
          ...dinner,
          comment: [...dinner.comment, res.data],
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://192.168.86.66:8000/api/dinnerEvent/" + dinnerId + "/"
      );
      setDinner(result.data);
    };
    fetchData();
  }, []);

  onsubmit = (data) => {
    comment(dinnerId, text);
    setText("");
  };

  const commentBox = (
    <Form reply>
      <Form.Input value={text} onChange={handleText} />
      <Button content="Kommenter" labelPosition="left" icon="edit" primary />
    </Form>
  );

  const editButton =
    user.user === dinner.host ? <Button>Endre middag</Button> : <Fragment />;
  const AttendButton = () => {
    console.log(user.user !== dinner.host);
    console.log();
    console.log(dinner.guests.length < dinner.maxGuests);
    console.log(user.isAuthenticated);
    if (
      user.isAuthenticated &&
      user.user !== dinner.host &&
      !dinner.guests.some((guest) => guest === user.user) &&
      dinner.guests.length < dinner.maxGuests
    ) {
      return <Button>Endre middag</Button>;
    }
    return <Fragment />;
  };

  return (
    <Fragment>
      <Container>
        <h1>{dinner.header}</h1>
      </Container>
      {editButton}
      <AttendButton />
      <Comment.Group>
        <Header as="h3" dividing>
          Kommentarer
        </Header>
        {dinner.comment.map((comment) => (
          <DinnerComment comment={comment} key={comment.id} />
        ))}
        {user.isAuthenticated ? (
          commentBox
        ) : (
          <Message>Du må være innlogget for å kommentere</Message>
        )}
      </Comment.Group>
    </Fragment>
  );
};

export default DinnerList;
