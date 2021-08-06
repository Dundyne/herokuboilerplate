import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, MenuItem, Select, Snackbar } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { IApartment } from "../../interfaces/IApartment";
import { postData } from "../../utils/fetchPost";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
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
const EditApartment = () => {
  const classes = useStyles();
  const methods = useForm();
  const [datas, setDatas] = useState("");
  const { handleSubmit, control, errors, reset } = methods;
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [realEstate, setRealEstate] = useState<IApartment>();
  const params = useParams() as any;
  const url2 = "/api/apartments/";
  const { data } = useFetch(url2 + params.id);

  useEffect(() => {
    if (params.id) {
      setRealEstate(data);

      reset({
        title: realEstate?.title,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, data, reset]);

  const onSubmit = (data: IApartment, e: any) => {
    /*if (images) {
      data.imagePath = images.name;
    }*/

    postData("/api/apartments/edit/" + params.id, data)
      .then((data) => {
        if (!data.ok) {
          setOpenError(true);
          throw data;
        }
        setOpen(true);
        setDatas("Leilighet endret!");
        return data.json();
      })
      .then((data) => {})
      .catch((err) => {
        err.text().then(() => {});
      });

    /*if (images) {
      const formData = new FormData();
      formData.append("image", images);
      postImage("/api/multer/uploadimage", formData);
    } */
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

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Leilighet er endret!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Leiligheten ble ikke endret, prøv igjen!
        </Alert>
      </Snackbar>
      <Typography variant="h4" component="h2">
        Endre en leilighet
      </Typography>
      <Typography>{datas}</Typography>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography>Endre tittel for annonse</Typography>
        <Controller
          as={TextField}
          name="title"
          control={control}
          defaultValue={realEstate?.title}
          value={realEstate?.title}
          rules={{
            required: false,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'\\?\\!]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.title}
          variant="outlined"
        />
        {errors.title && (
          <span className={classes.error}>{errors.title.message}</span>
        )}
        <Typography>Endre beskrivelse for annonse</Typography>
        <Controller
          as={TextField}
          name="description"
          control={control}
          multiline
          rows={10}
          rules={{
            required: false,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'-\\?\\!]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.description}
          defaultValue={realEstate?.description}
          value={realEstate?.description}
          variant="outlined"
        />
        {errors.description && (
          <span className={classes.error}>{errors.description.message}</span>
        )}
        <Typography>Endre addresse for annonse</Typography>
        <Controller
          as={TextField}
          name="address"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,'`-]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.address}
          defaultValue={realEstate?.address}
          variant="outlined"
        />
        {errors.address && (
          <span className={classes.error}>{errors.address.message}</span>
        )}
        <Typography>Endre huseleiegaranti for annonse</Typography>
        <Controller
          as={TextField}
          name="rentGuarantee"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[A-Za-z0-9" "ÆØÅæøå.,]*$/,
              message: "Bare bokstaver og nummer tillatt",
            },
          }}
          error={!!errors.rentGuarantee}
          defaultValue={realEstate?.rentGuarantee}
          variant="outlined"
        />
        {errors.rentGuarantee && (
          <span className={classes.error}>{errors.rentGuarantee.message}</span>
        )}
        <Typography>Endre kvadratmeter for annonse</Typography>
        <Controller
          as={TextField}
          name="squareMeter"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.squareMeter}
          defaultValue={realEstate?.squareMeter}
          variant="outlined"
        />
        {errors.squareMeter && (
          <span className={classes.error}>{errors.squareMeter.message}</span>
        )}
        <Typography>Endre antall soverom for annonse</Typography>
        <Controller
          as={TextField}
          name="bedrooms"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.bedrooms}
          defaultValue={realEstate?.bedrooms}
          variant="outlined"
        />
        {errors.bedrooms && (
          <span className={classes.error}>{errors.bedrooms.message}</span>
        )}
        <Typography>Endre antall bad for annonse</Typography>
        <Controller
          as={TextField}
          name="bathrooms"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.bedrooms}
          defaultValue={realEstate?.bathrooms}
          value={realEstate?.bathrooms}
          variant="outlined"
        />
        {errors.bathrooms && (
          <span className={classes.error}>{errors.bathrooms.message}</span>
        )}
        <Typography>Endre pris for annonse</Typography>
        <Controller
          as={TextField}
          name="price"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.price}
          defaultValue={realEstate?.price}
          variant="outlined"
        />
        {errors.price && (
          <span className={classes.error}>{errors.price.message}</span>
        )}
        <Typography>Endre depositum for annonse</Typography>
        <Controller
          as={TextField}
          name="deposit"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^[0-9]*$/,
              message: "Bare nummer tillatt",
            },
          }}
          error={!!errors.deposit}
          defaultValue={realEstate?.deposit}
          variant="outlined"
        />
        {errors.deposit && (
          <span className={classes.error}>{errors.deposit.message}</span>
        )}
        <Typography>Endre by</Typography>
        <Controller
          rules={{
            required: false,
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
          <MenuItem value={"Fredrikstad"}>Fredrikstad</MenuItem>
          <MenuItem value={"Moss"}>Moss</MenuItem>
        </Controller>
        {errors.city && (
          <span className={classes.error}>{errors.city.message}</span>
        )}

        <Button
          type="submit"
          variant={"contained"}
          color="primary"
          endIcon={<AddIcon></AddIcon>}
          size={"large"}
        >
          Endre annonse{" "}
        </Button>
      </form>
    </>
  );
};
export default EditApartment;
