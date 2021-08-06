/* eslint-disable no-useless-escape */
import {
  Button,
  Card,
  CardContent,
  Container,
  makeStyles,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { AcroFormCheckBox, jsPDF } from "jspdf";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
export interface IContract {
  fileName: string;
  adress: string;
  apartmentNumber: Number;
  name: string;
  socialSecurityNumber: Number;
  phoneNumber: Number;
  email: string;
  rentTime1: Date;
  rentTime2: Date;
  rentTime3: Number;
  rent1: Number;
  rent1a: Number;
  rent2: Number;
  rent3: Date;
  rent4: Number;
  rent4a: Date;
  electrictyNumber: Number;
  electrictyDate: Date;
  memberName1: string;
  memberSSN1: string;
  memberName2: string;
  memberSSN2: string;
  memberName3: string;
  memberSSN3: string;
  memberName4: string;
  memberSSN4: string;
  read: Date;
  leietakerOrdner: string;
}

var header = createHeaders(["Navn", "Personnr"]);

function createHeaders(keys: any) {
  return keys.map((key: any) => ({
    name: key,
    prompt: key,
    width: 110,
    height: 2,
    align: "center",
  }));
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      //alignitems: "center",
      textAlign: "center",
      padding: theme.spacing(1),
    },
  },
  error: {
    color: "red",
  },
  member: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
  member1: {
    // marginTop: theme.spacing(5),
    //width: "100%",
  },

  test5: {
    display: "flex",
    //justifyContent : 'center',
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
}));

const PdfComponent = () => {
  const [, setFormData] = useState<IContract>();
  const methods = useForm();
  const { handleSubmit, control, errors } = methods;
  const classes = useStyles();
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
  const onSubmit = (data: IContract) => {
    setOpen(true);
    setFormData(data);
    PdfValues(data);
  };

  const PdfValues = (formData: IContract) => {
    var data = [
      {
        Navn: formData?.memberName1,
        Personnr: formData?.memberSSN1,
      },
      {
        Navn: formData?.memberName2,
        Personnr: formData?.memberSSN2,
      },
    ];
    var doc = new jsPDF();

    doc.line(10, 100, 200, 100);
    doc.line(10, 70, 200, 70);
    doc.line(10, 145, 200, 145);
    doc.line(10, 170, 200, 170);
    doc.line(10, 205, 200, 205);
    doc.line(10, 247, 200, 247);

    var img = new Image();
    img.src = "Placeholder.jpg";
    doc.addImage(img, "png", 150, 20, 30, 30);

    doc.setFont("Times New Roman", "bold");
    doc.setFontSize(22);
    doc.text("LEIEKONTRAKT", 100, 10, undefined, "center");

    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(14);
    doc.setFont("Times New Roman", "bold");
    doc.text("UTELEIER", 10, 30);
    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(12);
    doc.setFont("Times New Roman", "bold");
    doc.text("EIENDOM", 10, 50);
    doc.setFont("Times New Roman", "normal");
    doc.text("Adresse: " + formData?.adress, 10, 55);
    doc.text("Bolignr: " + formData?.apartmentNumber, 10, 60);
    doc.text("Avtalen gjelder:", 10, 65);

    doc.text("Hus", 70, 65);
    var checkBox = new AcroFormCheckBox();
    checkBox.fieldName = "leilighet1";
    checkBox.appearanceState = "Off";
    checkBox.x = 80;
    checkBox.y = 60;
    checkBox.width = 7;
    checkBox.height = 7;
    doc.addField(checkBox);

    doc.text("Leilighet", 99, 65);
    var checkBox1 = new AcroFormCheckBox();
    checkBox1.fieldName = "leilighet2";
    checkBox1.appearanceState = "Off";
    checkBox1.x = 118;
    checkBox1.y = 60;
    checkBox1.width = 7;
    checkBox1.height = 7;
    checkBox1.color = "black";
    doc.addField(checkBox1);

    doc.text("Rom", 138, 65);
    var checkBox2 = new AcroFormCheckBox();
    checkBox2.fieldName = "leilighet3";
    checkBox2.appearanceState = "Off";
    checkBox2.x = 148;
    checkBox2.y = 60;
    checkBox2.width = 7;
    checkBox2.height = 7;
    checkBox2.color = "black";
    doc.addField(checkBox2);

    doc.setFont("Times New Roman", "bold");
    doc.text("LEIETAKER", 10, 75);
    doc.setFont("Times New Roman", "normal");
    doc.text("Navn: " + formData?.name, 10, 80);
    doc.text("Personnr: " + formData?.socialSecurityNumber, 10, 85);
    doc.text("Tlf/Mobil: " + formData?.phoneNumber, 10, 90);
    doc.text("E-Post: " + formData?.email, 10, 95);

    doc.setFont("Times New Roman", "bold");
    doc.text("HUSSTANDSMEDLEMMER (som bor i samme leieenheten)", 10, 105);
    doc.table(20, 110, data, header, { autoSize: false });

    doc.setFont("Times New Roman", "bold");
    doc.text("LEIETID", 10, 150);
    doc.setFont("Times New Roman", "normal");
    doc.text(
      "Leieforholdet løper fra den:" +
        " " +
        moment(formData?.rentTime1).format("DD.MM.yyyy"),
      10,
      155
    );

    formData.rentTime2
      ? doc.text(
          "Leieforholdet opphører uten oppsigelse den:" +
            " " +
            moment(formData?.rentTime2).format("DD.MM.yyyy") +
            " " +
            "(minimum 3 år).",
          10,
          160
        )
      : doc.text("Leieforholdet opphører uten oppsigelse den:", 10, 160);

    doc.text(
      "I avtalt leieperiode er det:" +
        " " +
        formData?.rentTime3 +
        " " +
        "måneder gjensidig oppsigelsestid.",
      10,
      165
    );

    doc.setFont("Times New Roman", "bold");
    doc.text("LEIE", 10, 175);
    doc.setFont("Times New Roman", "normal");

    doc.text(
      "Leie Kr:" +
        " " +
        formData?.rent1 +
        ",-" +
        " " +
        "/ mnd, til konto" +
        " " +
        "15031579012" +
        " " +
        "i DNB Bank.",
      10,
      180
    );

    doc.text(
      "Leien betales forskuddsvis den:" +
        " " +
        formData?.rent2 +
        "." +
        " " +
        "hver måned.",
      10,
      185
    );

    doc.text(
      "Første husleie betales innen :" +
        " " +
        moment(formData?.rent3).format("DD.MM.yyyy") +
        " " +
        "til utleiers konto.",
      10,
      190
    );
    doc.setFontSize(12);
    doc.setFont("Times New Roman", "normal");
    doc.text(
      "Forskuddsleie Kr:" +
        " " +
        formData?.rent4 +
        ",-" +
        " " +
        "(=max. 2 mnd. husleie)," +
        " " +
        "betales innen" +
        " " +
        moment(formData?.rent4a).format("DD.MM.yyyy") +
        " " +
        "til utleiers konto.",
      10,
      195
    );
    doc.setFont("Times New Roman", "normal");
    doc.setFontSize(12);
    doc.setFont("Times New Roman", "italic");
    doc.text(
      "Ved bruk av depositumsgaranti er det leietakers plikt og til en hver tid passe på at denne er gyldig.",
      10,
      200
    );

    doc.setFont("Times New Roman", "bold");
    doc.text("STRØM", 10, 210);
    doc.setFont("Book Antiqua", "normal");
    var checkBoxStrøm = new AcroFormCheckBox();
    checkBoxStrøm.fieldName = "strøm1";
    checkBoxStrøm.appearanceState = "Off";
    checkBoxStrøm.x = 10;
    checkBoxStrøm.y = 214;
    checkBoxStrøm.width = 7;
    checkBoxStrøm.height = 7;
    checkBoxStrøm.color = "black";
    doc.addField(checkBoxStrøm);

    var checkBoxStrøm1 = new AcroFormCheckBox();
    checkBoxStrøm1.fieldName = "strøm2";
    checkBoxStrøm1.appearanceState = "Off";
    checkBoxStrøm1.x = 10;
    checkBoxStrøm1.y = 222;
    checkBoxStrøm1.width = 7;
    checkBoxStrøm1.height = 7;
    checkBoxStrøm1.color = "black";
    doc.addField(checkBoxStrøm1);

    doc.text("Strøm er IKKE inkludert i husleien. ", 20, 219);

    doc.text(formData?.leietakerOrdner, 82, 219);
    doc.setFont("Times New Roman", "normal");
    doc.text("Strøm er inkludert i husleien.", 20, 227);
    doc.setFont("Times New Roman", "bold");
    doc.text("STRØMMÅLERNR.: " + formData?.electrictyNumber, 10, 237);

    formData.electrictyDate
      ? doc.text(
          "DATO: " +
            " " +
            moment(formData?.electrictyDate).format("DD.MM.yyyy"),
          107,
          237
        )
      : doc.text("Dato: ", 107, 237);
    formData.read
      ? doc.text(
          "AVLEST: " + moment(formData?.read).format("DD.MM.yyyy"),
          160,
          237
        )
      : doc.text("AVLEST: ", 160, 237);
    doc.setFontSize(12);
    doc.text("Spørsmål  leieenhet:  ", 10, 242);
    doc.setFont("Times New Roman", "normal");
    doc.setTextColor(6, 69, 173);
    doc.text("placeholder@live.no", 49, 242);
    doc.setTextColor(0);
    doc.text("/ Spørsmål til faktura: ", 88, 242);
    doc.setTextColor(6, 69, 173);
    doc.text("placeholder.faktura@outlook.com", 127, 242);
    doc.setTextColor(0);

    doc.setFont("Times New Roman", "bold");
    doc.text("SIGNATURER", 10, 252);
    doc.text(
      "Utleier og leietaker vedtar herved ALLE punktene i denne avtalen, totalt 7 sider.",
      10,
      257
    );
    doc.setFont("Times New Roman", "normal");
    doc.text("Sted/Dato:", 10, 273);
    doc.text("Sted/Dato:", 120, 273);
    doc.setFont("Times New Roman", "bold");
    doc.text("Utleier:", 10, 295);
    doc.text("Leietaker:", 120, 295);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(30, 273, 114, 273);
    doc.line(140, 273, 200, 273);
    doc.line(27, 295, 115, 295);
    doc.line(140, 295, 200, 295);
    doc.save(formData?.fileName + ".pdf");
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Kontrakt er opprettet!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Kontrakt ble ikke laget.. Prøv igjen!
        </Alert>
      </Snackbar>
      <Container>
        <Typography variant="h4" component="h2" align={"center"}>
          Opprett kontrakt
        </Typography>

        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            as={TextField}
            name="fileName"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Navnet til pdf dokumentet"
            required
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9ÆØÅæøå" "-.,`]*$/,
                message: "Bare bokstaver og nummer tillatt",
              },
            }}
            error={!!errors.fileName}
          ></Controller>

          {errors.fileName && (
            <span className={classes.error}>{errors.fileName.message}</span>
          )}

          <Controller
            as={TextField}
            name="adress"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Skriv inn addresse..."
            required
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9" "ÆØÅæøå,." "-]*$/,
                message: "Bare bokstaver og nummer tillatt",
              },
            }}
            error={!!errors.adress}
          ></Controller>

          {errors.adress && (
            <span className={classes.error}>{errors.adress.message}</span>
          )}

          <Controller
            as={TextField}
            name="apartmentNumber"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Za-z0-9" "ÆØÅæøå]*$/,
                message: "Bare bokstaver og nummer er tillat.",
              },
            }}
            error={!!errors.apartmentNumber}
            defaultValue=""
            variant="outlined"
            label="Skriv inn bolignr..."
            required
          />

          {errors.apartmentNumber && (
            <span className={classes.error}>
              {errors.apartmentNumber.message}
            </span>
          )}

          <Controller
            as={TextField}
            name="name"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Skriv inn navn på leietaker.."
            required
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
                message: "Bare bokstaver tillatt",
              },
            }}
            error={!!errors.name}
          ></Controller>
          {errors.name && (
            <span className={classes.error}>{errors.name.message}</span>
          )}

          <Controller
            as={TextField}
            name="socialSecurityNumber"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Skriv inn personnummer til leietaker.."
            required
            rules={{
              required: false,
              pattern: {
                value: /^[[0-9]{2,11}]*$/,
                message:
                  "Personummer er 11 tall, kun tillat med tall fra 2 - 11.",
              },
            }}
            error={!!errors.socialSecurityNumber}
          ></Controller>
          {errors.socialSecurityNumber && (
            <span className={classes.error}>
              {errors.socialSecurityNumber.message}
            </span>
          )}

          <Controller
            as={TextField}
            name="phoneNumber"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Skriv inn telefonnummer til leietaker.."
            required
            rules={{
              required: false,
              pattern: {
                value: /^[[0-9]{8,8}]*$/,
                message: "Telefon nummer er 8 tall, kun tillat med tall.",
              },
            }}
            error={!!errors.phoneNumber}
          ></Controller>
          {errors.phoneNumber && (
            <span className={classes.error}>{errors.phoneNumber.message}</span>
          )}

          <Controller
            as={TextField}
            name="email"
            control={control}
            defaultValue=""
            variant="outlined"
            label="Skriv inn epost til leietaker.."
            required
            rules={{
              required: false,
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Skriv inn en gyldig epost addresse..",
              },
            }}
            error={!!errors.email}
          ></Controller>
          {errors.email && (
            <span className={classes.error}>{errors.email.message}</span>
          )}

          <Container className={classes.test5}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h6" gutterBottom>
                  Husstandsmedlem 1
                </Typography>
                <Controller
                  as={TextField}
                  name="memberName1"
                  className={classes.member}
                  defaultValue=" "
                  variant="outlined"
                  label="Skriv inn navn til husstandsmedlem 1"
                  control={control}
                  rules={{
                    required: false,
                    pattern: {
                      value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-/]+$/u,
                      message: "Bare bokstaver tillatt",
                    },
                  }}
                  error={!!errors.memberName1}
                ></Controller>
                {errors.memberName1 && (
                  <span className={classes.error}>
                    {errors.memberName1.message}
                  </span>
                )}

                <Controller
                  as={TextField}
                  name="memberSSN1"
                  className={classes.member}
                  control={control}
                  defaultValue=" "
                  variant="outlined"
                  label="Skriv inn personnummer til husstandsmedlem 1"
                  rules={{
                    required: false,
                    pattern: {
                      value: /^[[0-9" "/]{0,60}]*$/,
                      message: "Kun tall er tillat.",
                    },
                  }}
                  error={!!errors.memberSSN1}
                ></Controller>
                {errors.memberSSN1 && (
                  <span className={classes.error}>
                    {errors.memberSSN1.message}
                  </span>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h6" gutterBottom>
                  Husstandsmedlem 2
                </Typography>
                <Controller
                  as={TextField}
                  name="memberName2"
                  className={classes.member}
                  control={control}
                  defaultValue=" "
                  variant="outlined"
                  label="Skriv inn navn til husstandsmedlem 2"
                  rules={{
                    required: false,
                    pattern: {
                      value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-/]+$/u,
                      message: "Bare bokstaver tillatt",
                    },
                  }}
                  error={!!errors.memberName2}
                ></Controller>
                {errors.memberName2 && (
                  <span className={classes.error}>
                    {errors.memberName2.message}
                  </span>
                )}

                <Controller
                  as={TextField}
                  name="memberSSN2"
                  className={classes.member}
                  control={control}
                  defaultValue=" "
                  variant="outlined"
                  label="Skriv inn personummer til husstandsmedlem 2"
                  rules={{
                    required: false,
                    pattern: {
                      value: /^[[[0-9" "/]{0,60}]*$/,
                      message: "Kun tall er tillat - maks 11 tall.",
                    },
                  }}
                  error={!!errors.memberSSN2}
                ></Controller>
                {errors.memberSSN2 && (
                  <span className={classes.error}>
                    {errors.memberSSN2.message}
                  </span>
                )}
              </CardContent>
            </Card>
          </Container>

          <Typography>Leieforholdet løper fra den..</Typography>
          <Controller
            as={TextField}
            name="rentTime1"
            required
            type="Date"
            variant="filled"
            control={control}
          ></Controller>
          <Typography>Leieforholdet opphører uten oppsigelse den...</Typography>
          <Controller
            as={TextField}
            name="rentTime2"
            required
            type="Date"
            variant="filled"
            control={control}
          ></Controller>

          <Controller
            as={TextField}
            name="rentTime3"
            control={control}
            required
            defaultValue=""
            variant="outlined"
            label=" I avtalt leieperiode er det x måneder gjensidig oppsigelsestid.."
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Bare nummer tillatt",
              },
            }}
            error={!!errors.rentTime3}
          ></Controller>
          {errors.rentTime3 && (
            <span className={classes.error}>{errors.rentTime3.message}</span>
          )}

          <Controller
            as={TextField}
            name="rent1"
            control={control}
            required
            defaultValue=""
            variant="outlined"
            label=" Leie Kr i mnd"
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Bare nummer tillatt",
              },
            }}
            error={!!errors.rent1}
          ></Controller>
          {errors.rent1 && (
            <span className={classes.error}>{errors.rent1.message}</span>
          )}
          <Controller
            as={TextField}
            name="rent2"
            variant="outlined"
            required
            label=" Leien betales forskuddsvis den: x hver måned."
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Bare nummer tillatt",
              },
            }}
            error={!!errors.rent2}
          ></Controller>
          {errors.rent2 && (
            <span className={classes.error}>{errors.rent2.message}</span>
          )}

          <Typography>
            Første husleie betales innen : dato til utleiers konto.
          </Typography>
          <Controller
            as={TextField}
            name="rent3"
            type="Date"
            required
            variant="filled"
            control={control}
          ></Controller>

          <Controller
            as={TextField}
            name="rent4"
            control={control}
            defaultValue=""
            required
            variant="outlined"
            label=" Forskuddsleie Kr : (=max. 2 mnd. husleie)"
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]*$/,
                message: "Bare nummer tillatt",
              },
            }}
            error={!!errors.rent4}
          ></Controller>
          {errors.rent4 && (
            <span className={classes.error}>{errors.rent4.message}</span>
          )}

          <Typography>betales innen DATO til utleiers konto. </Typography>
          <Controller
            as={TextField}
            name="rent4a"
            type="Date"
            required
            variant="filled"
            control={control}
          ></Controller>

          <Controller
            as={TextField}
            name="electrictyNumber"
            control={control}
            required
            defaultValue=""
            variant="outlined"
            label=" STRØMMÅLERNR.:"
            rules={{
              required: false,
              pattern: {
                value: /^[[0-9]{17,17}]*$/,
                message: "Strømmåler nummer er 17 tall, kun tillat med tall.",
              },
            }}
            error={!!errors.electrictyNumber}
          ></Controller>
          {errors.electrictyNumber && (
            <span className={classes.error}>
              {errors.electrictyNumber.message}
            </span>
          )}

          <Typography>Strømmålerdato </Typography>
          <Controller
            as={TextField}
            name="electrictyDate"
            type="Date"
            variant="filled"
            control={control}
          ></Controller>

          <Typography>Avlest </Typography>
          <Controller
            as={TextField}
            name="read"
            type="Date"
            variant="filled"
            control={control}
          ></Controller>

          <Controller
            as={TextField}
            name="leietakerOrdner"
            control={control}
            defaultValue="Leietaker ordner strøm selv."
            variant="outlined"
            label="Leietaker ordner strøm selv?"
            required
            rules={{
              required: false,
              pattern: {
                value: /^[A-Za-z0-9" "ÆØÅæøå,." "-]*$/,
                message: "Bare bokstaver og nummer tillatt",
              },
            }}
            error={!!errors.leietakerOrdner}
          ></Controller>

          {errors.leietakerOrdner && (
            <span className={classes.error}>
              {errors.leietakerOrdner.message}
            </span>
          )}

          <Button
            type="submit"
            variant={"contained"}
            color="primary"
            endIcon={<AddIcon></AddIcon>}
            size={"large"}
          >
            {" "}
            Lag kontrakt
          </Button>
        </form>
      </Container>
    </>
  );
};

export default PdfComponent;
