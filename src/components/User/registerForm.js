import { Button, Form, Message } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { Fragment, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import { Redirect } from "react-router-dom";

export default function RegisterForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const [state, dispatch] = useContext(UserContext);

  const registerUser = (data) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://192.168.86.66:8000/api/auth/register", data, config)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {
        if (err.response.data.username) {
          setError("username", {
            type: "takenUsername",
            message: "Dont Forget Your Username Should Be Cool!",
          });
          console.log(err.response.data.username);
        }
        console.log(err.response);
      });
  };

  const allergyManager = (data) => {
    var string = "";
    if (data.vegan) {
      string += "vegan, ";
    }
    if (data.vegetarian) {
      string += "vegetarian, ";
    }
    if (data.glutenfree) {
      string += "glutenfree, ";
    }
    if (data.lactose_free) {
      string += "lactose_free ";
    }
    if (data.no_nut) {
      string += "no_nut, ";
    }
    if (data.no_egg) {
      string += "no_egg, ";
    }
    return string;
  };

  const onSubmit = (data) => {
    const body = {
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      gender: data.gender.value,
      birthday: data.birthday,
      first_name: data.first_name,
      last_name: data.last_name,
      bio: data.bio,
      password: data.password,
      allergy: allergyManager(data),
    };
    console.log(data);
    registerUser(body);
  };

  const genderOptions = [
    { label: "Mann", value: "m" },
    { label: "Kvinne", value: "f" },
    { label: "Annet", value: "o" },
  ];

  const validatePassword = () => watch("password") === watch("password2");

  if (state.isAuthenticated) {
    return <Redirect to="/dinnerEvent" />;
  }

  return (
    <Fragment>
      <Form error onSubmit={handleSubmit(onSubmit)}>
        <Form.Group widths="equal">
          <Form.Field error={errors.first_name ? true : false}>
            <label>Fornavn</label>
            <input
              id="first_name"
              type="text"
              placeholder="Fornavn"
              {...register("first_name", { required: true, maxLength: 30 })}
            />
            {errors.first_name && "First name is required"}
          </Form.Field>
          <Form.Field error={errors.last_name ? true : false}>
            <label>Etternavn</label>
            <input
              type="text"
              placeholder="Etternavn"
              {...register("last_name", { required: true, maxLength: 30 })}
            />
          </Form.Field>
          <Form.Field error={errors.gender ? true : false}>
            <label>Kjønn</label>
            <Controller
              name="gender"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Kjønn"
                  {...field}
                  options={genderOptions}
                />
              )}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field error={errors.birthday ? true : false}>
          <label>Fødselsdag</label>
          <input type="date" {...register("birthday", { required: true })} />
        </Form.Field>
        <Form.Field error={errors.email ? true : false}>
          <label>E-post</label>
          <input
            type="email"
            placeholder="E-post"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </Form.Field>
        <Form.Field error={errors.phoneNumber ? true : false}>
          <label>Mobilnummer</label>
          <input
            type="tel"
            placeholder="Mobilnummer"
            {...register("phoneNumber", {
              required: true,
              minLength: 8,
              maxLength: 11,
            })}
          />
        </Form.Field>
        <Form.Field error={errors.username ? true : false}>
          <label>Brukernavn</label>
          <input
            type="text"
            placeholder="Brukernavn"
            {...register("username", {
              required: true,
            })}
          />
          <Message error>
            {(errors.username && errors.username.type === "takenUsername"
              ? true
              : false) &&
              "Brukernavnet er opptatt, venligst velg et annen brukernavn."}
          </Message>
        </Form.Field>
        <Form.Field error={errors.password ? true : false}>
          <label>Passord</label>
          <input
            type="password"
            placeholder="Passord"
            {...register("password", {
              required: true,
              validate: validatePassword,
            })}
          />
        </Form.Field>
        <Form.Field error={errors.password2 ? true : false}>
          <input
            type="password"
            placeholder="Gjenta passord"
            {...register("password2", {
              required: true,
              validate: validatePassword,
            })}
          />
        </Form.Field>

        <Form.Field error={errors.bio ? true : false}>
          <label>Bio</label>
          <textarea
            placeholder="Skriv litt om deg selv"
            {...register("bio", { required: true, maxLength: 500 })}
          />
        </Form.Field>
        <b>Matpreferanser</b>
        <Form.Group inline>
          <Form.Field>
            <input type="checkbox" {...register("vegan")} />
            <label>Vegansk</label>
          </Form.Field>
          <Form.Field>
            <input type="checkbox" {...register("vegetarian")} />
            <label>Vegetar</label>
          </Form.Field>
          <Form.Field>
            <input type="checkbox" {...register("glutenfree")} />
            <label>Glutenfri</label>
          </Form.Field>
        </Form.Group>
        <Form.Group inline>
          <Form.Field>
            <input type="checkbox" {...register("lactose_free")} />
            <label>Laktosefri</label>
          </Form.Field>
          <Form.Field>
            <input type="checkbox" {...register("no_nut")} />
            <label>Uten nøtter</label>
          </Form.Field>
          <Form.Field>
            <input type="checkbox" {...register("no_egg")} />
            <label>Uten egg</label>
          </Form.Field>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </Fragment>
  );
}
