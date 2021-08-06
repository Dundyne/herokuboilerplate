/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Card, Container, Snackbar } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignitems: "center",
      textAlign: "center",
    },
  },

  error: {
    color: "red",
  },
  city: {
    marginBottom: theme.spacing(2),
  },

  formCard: {
    textAlign: "center",
    justifyContentjustifyContent: "center",
    alignitems: "center",
    width: "50%",
    //padding: theme.spacing(5),

    "@media only screen and (max-width: 800px)": {
      width: "100%",
    },
  },
  title: {
    fontFamily: "EB Garamond",
  },
  grid: { marginTop: theme.spacing(10) },
  button: {
    width: "100%",
  },
  fields: {
    marginBottom: theme.spacing(3),
  },
}));

const ContactNew = () => {
  const classes = useStyles();
  const methods = useForm();
  //const [datas, setDatas] = useState("");
  const { handleSubmit, control, errors, reset } = methods;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

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
    postData("/contact/sendmail", data).then((data) => {
      if (data.status === 250) {
        setOpen(true);
        reset();
      } else {
        setOpenError(true);
      }
    });
  };

  const params = useParams() as any;

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Mailen er sendt til oss, og vi vil svare deg så fort som mulig!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Det oppstod noe feil, fyll ut alle feltene og prøv igjen!
        </Alert>
      </Snackbar>
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Card className={classes.formCard}>
            <Typography
              variant="h4"
              component="h4"
              gutterBottom
              className={classes.title}
            >
              Ta kontakt om du ønsker å vite mer om vår eiendommer
            </Typography>
            <Divider></Divider>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box mb={2}>
                <Controller
                  as={TextField}
                  name="address"
                  control={control}
                  defaultValue={params.address}
                  variant="outlined"
                  label="Adresse"
                  id="subject"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Controller
                as={TextField}
                name="city"
                control={control}
                defaultValue={params.city}
                variant="outlined"
                label="By"
                id="city"
                InputProps={{
                  readOnly: true,
                }}
              />

              <Controller
                as={TextField}
                name="firstname"
                control={control}
                className={classes.fields}
                defaultValue=""
                multiline
                label="Vennligst skriv inn ditt fornavn.."
                id="first"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                    message: "Bare bokstaver tillatt",
                  },
                }}
                error={!!errors.firstname}
              />
              {errors.firstname && (
                <span className={classes.error}>
                  {errors.firstname.message}
                </span>
              )}
              <Controller
                as={TextField}
                name="lastname"
                control={control}
                className={classes.fields}
                defaultValue=""
                multiline
                label="Vennligst skriv inn ditt etternavn.."
                id="namelast"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                    message: "Bare bokstaver tillatt",
                  },
                }}
                error={!!errors.lastname}
              />
              {errors.lastname && (
                <span className={classes.error}>{errors.lastname.message}</span>
              )}

              <Controller
                as={TextField}
                name="number"
                control={control}
                defaultValue=""
                className={classes.fields}
                multiline
                label="Vennligst skriv inn ditt telefonnummer.."
                id="number"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[[0-9]{8,8}]*$/,
                    message: "Telefon nummer er 8 tall, kun tillat med tall.",
                  },
                }}
                error={!!errors.number}
              />
              {errors.number && (
                <span className={classes.error}>{errors.number.message}</span>
              )}

              <Controller
                as={TextField}
                name="subject"
                control={control}
                defaultValue=""
                className={classes.fields}
                multiline
                label="Vennligst skriv inn din epost adresse.."
                id="email"
                rules={{
                  required: true,
                  pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Skriv inn en gyldig epost addresse..",
                  },
                }}
                error={!!errors.subject}
              />
              {errors.subject && (
                <span className={classes.error}>{errors.subject.message}</span>
              )}

              <Controller
                as={TextField}
                name="text"
                control={control}
                defaultValue=""
                className={classes.fields}
                multiline
                label="Kort beskrivelse av hva du ønsker.."
                id="description"
              />

              <Divider></Divider>
              <Typography
                variant="h6"
                component="h6"
                gutterBottom
                className={classes.title}
              >
                Informasjonen du sender inn vil kun bli brukt for å besvare din
                henvendelse og vil ikke bli brukt til generell markedsføring.
              </Typography>
              <Divider></Divider>
              <Button
                className={classes.button}
                type="submit"
                variant={"contained"}
                color="primary"
                endIcon={<MailIcon></MailIcon>}
                size={"large"}
              >
                {" "}
                Send oss en mail{" "}
              </Button>
            </form>
          </Card>
        </Grid>
      </Container>
    </>
  );
};
export default ContactNew;
