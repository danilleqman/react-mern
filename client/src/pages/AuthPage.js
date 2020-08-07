import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const AuthPage = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      clearError();
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      clearError();
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Добро пожаловать
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={form.email}
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={form.password}
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <p>{error}</p>

          <Button
            type={"submit"}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </Button>
          <Button
            type={"submit"}
            fullWidth
            variant="contained"
            color="primary"
            onClick={registerHandler}
            disabled={loading}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </Container>
  );
};
