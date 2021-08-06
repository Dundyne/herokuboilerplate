/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { postData } from "../../utils/fetchPost";

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
  error: {
    color: "red",
  },
  marginBottom: {
    marginBottom: theme.spacing(3),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const methods = useForm();
  const [, setDatas] = useState("");
  const { handleSubmit, control, errors } = methods;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const onSubmit = (data: any, e: any) => {
    setDatas("sending" + data.status);

    postData("api/auth/login", data)
      .then((data) => {
        setDatas("sending" + data.status);
        if (!data.ok) {
          setOpenError(true);
          throw data;
        }
        setOpen(true);
        return data.json();
      })
      .then((data) => {
        window.location.href = "/";
      })
      .catch((err) => {
        err.text().then((errorMessage: any) => {
          var dd = JSON.parse(errorMessage);
          setDatas(dd.data);
        });
      });
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Logget inn!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Fikk ikke logget inn, prøv igjen!
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Logg inn
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Må være en gyldig email",
              },
            }}
            error={!!errors.email}
            variant="outlined"
            margin="normal"
            fullWidth
            autoComplete="email"
            autoFocus
            rows={2}
            label="Email Adresse*"
            id="text"
          />
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}
          <Controller
            as={TextField}
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              pattern: {
                value: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
                message: "Passord ikke sterkt nok/Må være 6 bokstaver",
              },
            }}
            margin="normal"
            fullWidth
            error={!!errors.password}
            variant="outlined"
            rows={2}
            label="Passord*"
            id="text"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className={classes.error}>{errors.password.message}</span>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LOGG INN
          </Button>
          <Grid container>
            <Grid item xs className={classes.marginBottom}>
              <Link to="/forgot">Glemt passord?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

/*            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/login/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid> */
