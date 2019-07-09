import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Paper,
  Grid,
  Typography
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import RenewPassword from "./RenewPassword";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  let [authData, setAuthData] = useState({ username: "", password: "" });
  const classes = useStyles();
  let { setUser, setModalOpen } = useContext(AuthContext);
  const onLogin = async e => {
    e.preventDefault();
    try {
      const user = await Auth.signIn({ ...authData });
      if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        const { requiredAttributes } = user.challengeParam;
        console.log(requiredAttributes);
        setUser(user);
        setModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
    // alert("loggin in");
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar> */}
            <Typography component="h1" variant="h3">
              Notarías 98 y 24
            </Typography>
            <Typography component="h4" variant="h6">
              Entrar:
            </Typography>
            <form className={classes.form} onSubmit={onLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={authData.username}
                label="Usuario"
                name="username"
                onChange={e => {
                  const { value } = e.target;
                  setAuthData(prev => {
                    return { ...prev, username: value };
                  });
                }}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={authData.password}
                name="password"
                label="Contraseña"
                type="password"
                onChange={e => {
                  const { value } = e.target;
                  setAuthData(prev => {
                    return { ...prev, password: value };
                  });
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
          <RenewPassword />
        </Box>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default LoginForm;
