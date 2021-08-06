import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { IApartment } from "../../interfaces/IApartment";
import { postData, postImage } from "../../utils/fetchPost";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
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
}));
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ContactForm = () => {
  const classes = useStyles();
  const methods = useForm();
  const [datas, setDatas] = useState("");
  const [images, setImages] = useState([]) as any;
  const { handleSubmit, control, errors, reset } = methods;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const uri = "/api/multer/images/";

  const [formd, setFormd] = useState() as any;
  const [imgarr, setImgarr] = useState() as any;
  const [fortsett, setFortsett] = useState(false);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const updateState = (e: boolean) => {
    setFortsett(e);
  };
  const handleChangeSubmit = () => {
    updateState(fortsett);
  };

  useEffect(() => {
    const getMethod = {
      method: "GET", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      // No need to have body, because we don't send nothing to the server.
    };

    const fetchy = async () => {
      const formData = new FormData();
      var boll = true;
      for (const file of images) {
        // eslint-disable-next-line no-loop-func
        await fetch(uri + file.name, getMethod).then(async (response) => {
          let testbool = response.status === 200 ? false : true;

          if (testbool === false) {
            boll = false;
          }
        });

        formData.append("image", file);
        setFormd(formData);
      }
      return boll;
    };

    const test = async () => {
      if (images.length > 0) {
        const arrayTankyB: any = [];
        Object.entries(images).map(([key, value]) => arrayTankyB.push(value));
        setImgarr(arrayTankyB.map((x: { name: any }) => x.name));

        var t = await fetchy();

        if (t === true) {
          setFortsett(true);
          //setFormd(formData);
          setDatas("Bilder godkjent");
        } else {
          setFortsett(false);
          setDatas(
            "Et av bildene eksisterer fra før av, vennligst endre bildenavn. Bilde må også være jpg/jpeg"
          );
        }
      }
    };

    test();
  }, [images, ignored, forceUpdate]);

  const onSubmit = async (data: IApartment, e: any) => {
    if (fortsett === true) {
      postImage("/api/multer/uploadimage", formd);
      data.imagePath = imgarr;
      postData("/api/apartments/add", data)
        .then((data) => {
          //setDatas("sending" + data.status);
          if (!data.ok) {
            setOpenError(true);
            throw data;
          }
          setOpen(true);
          setDatas("Leilighet og bilder er lagt til!");
          reset();
          return data.json();
        })
        .then((data) => {})
        .catch((err) => {
          err.text().then((errorMessage: any) => {});
        });
    } else {
      setOpenError(true);
    }
  };
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

  function handleClick() {
    forceUpdate();
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Leilighet og bilder ble lagt til!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Leiligheten ble ikke lagt til.. Bildenavn finnes fra før, vennligst
          endre navn på bilde.
        </Alert>
      </Snackbar>
      <Typography variant="h4" component="h2">
        Legg til leilighet
      </Typography>
      <Typography>{datas}</Typography>
      <form encType="multipart/form-data">
        <Typography>Legg til bilde</Typography>
        <input
          type="file"
          name="image"
          multiple
          onChange={async (e) => {
            await setImages(e.target.files);
            await handleClick();
          }}
        />
      </form>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          as={TextField}
          name="title"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'\\?\\!]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.title}
          defaultValue=""
          variant="outlined"
          label="Skriv inn tittel..."
        />
        {errors.title && (
          <span className={classes.error}>{errors.title.message}</span>
        )}
        <Controller
          as={TextField}
          name="description"
          control={control}
          multiline
          rows={10}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'-\\?\\!]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.description}
          defaultValue=""
          variant="outlined"
          label="Skriv inn beskrivelse..."
        />
        {errors.description && (
          <span className={classes.error}>{errors.description.message}</span>
        )}
        <Controller
          as={TextField}
          name="address"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'`-]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.address}
          defaultValue=""
          variant="outlined"
          label="Skriv inn addresse..."
        />
        {errors.address && (
          <span className={classes.error}>{errors.address.message}</span>
        )}
        <Controller
          as={TextField}
          name="rentGuarantee"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.rentGuarantee}
          defaultValue=""
          variant="outlined"
          label="Skriv inn husleiegaranti..."
        />
        {errors.rentGuarantee && (
          <span className={classes.error}>{errors.rentGuarantee.message}</span>
        )}
        <Controller
          as={TextField}
          name="squareMeter"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.squareMeter}
          defaultValue=""
          variant="outlined"
          label="Skriv inn kvadratmeter..."
        />
        {errors.squareMeter && (
          <span className={classes.error}>{errors.squareMeter.message}</span>
        )}
        <Controller
          as={TextField}
          name="bedrooms"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.bedrooms}
          defaultValue=""
          variant="outlined"
          label="Skriv inn antall soverom..."
        />
        {errors.bedrooms && (
          <span className={classes.error}>{errors.bedrooms.message}</span>
        )}
        <Controller
          as={TextField}
          name="bathrooms"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.bedrooms}
          defaultValue=""
          variant="outlined"
          label="Skriv inn antall bad..."
        />
        {errors.bathrooms && (
          <span className={classes.error}>{errors.bathrooms.message}</span>
        )}
        <Controller
          as={TextField}
          name="price"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.price}
          defaultValue=""
          variant="outlined"
          label="Skriv inn pris..."
        />
        {errors.price && (
          <span className={classes.error}>{errors.price.message}</span>
        )}
        <Controller
          as={TextField}
          name="deposit"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.deposit}
          defaultValue=""
          variant="outlined"
          label="Skriv inn depositum..."
        />
        {errors.deposit && (
          <span className={classes.error}>{errors.deposit.message}</span>
        )}
        <Typography>Velg By</Typography>
        <Controller
          rules={{
            required: true,
            pattern: {
              value: /^[A-Za-z]*$/,
              message: "Bare bokstaver tillatt/Må fylles ut!",
            },
          }}
          as={Select}
          error={!!errors.city}
          name="city"
          control={control}
        >
          <MenuItem value={"Sarpsborg"}>Sarpsborg</MenuItem>
          <MenuItem value={"Halden"}>Halden</MenuItem>
          <MenuItem value={"Fredrikstad"}>Fredrikstad</MenuItem>
          <MenuItem value={"Moss"}>Moss</MenuItem>
        </Controller>
        {errors.city && (
          <span className={classes.error}>{errors.city.message}</span>
        )}

        <FormGroup>
          <Typography>Velg type bolig (Velg en eller flere)</Typography>
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="apartment"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Leilighet"
          />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="house"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Hus"
          />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="incoming"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Innkommende leilighet"
          />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="commerce"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Næringsbygg"
          />
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="newlyBuilt"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Nybygg"
          />
        </FormGroup>
        <FormGroup>
          <Typography>Hva har boligen? (Velg en eller flere)</Typography>
          <FormControlLabel
            control={
              <Controller
                control={control}
                name="parking"
                defaultValue={false}
                render={({ onChange, value }) => (
                  <Checkbox
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
              />
            }
            label="Parkering"
          />
        </FormGroup>
        <Button
          type="submit"
          onClick={() => handleChangeSubmit}
          variant={"contained"}
          color="primary"
          endIcon={<AddIcon></AddIcon>}
          size={"large"}
        >
          Legg til annonse{" "}
        </Button>
      </form>
    </>
  );
};
export default ContactForm;
