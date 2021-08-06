import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import { IApartmentProps } from "../../interfaces/IApartment";
import Divider from "@material-ui/core/Divider";
import theme from "../../themes/theme";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: 0,
    padding: 0,
    //padding: theme.spacing(4),
    //maxWidth: 550,
    "&:hover": {
      boxShadow: "17px 17px 18px #D4D2D2",
      transition: "all 0.2s ease-in",
      marginTop: 3,
      marginBottom: 7,
    },
  },
  media: {
    height: 100,
  },

  card: {
    maxWidth: 365,
  },
  text: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  secondInformationText: {
    //marginTop: theme.spacing(1),
    float: "right",
    fontWeight: "bold",
  },
  secondInformationText2: {
    marginTop: theme.spacing(1),
    //float: "right",
    fontWeight: "bold",
  },
  flexContent: {},
});

const ApartmentCard = ({ props }: IApartmentProps) => {
  const classes = useStyles();
  //const uri = "api/image/" + props?.imagePath[0]!;

  useEffect(() => {}, []);

  return (
    <RouterLink
      to={`apartmentview/${props._id}`}
      {...{
        color: "inherit",
        style: { textDecoration: "none" },
        key: "label",
      }}
    >
      <Card className={classes.root} onMouseOver={() => ({ shadow: 3 })}>
        {props.imagePath ? (
          <>
            <CardMedia
              component="img"
              height="300"
              alt="Bildet laster..."
              image={"api/image/" + props.imagePath[0]}
              title="Leilighet"
            />
          </>
        ) : (
          <>
            <CardMedia
              component="img"
              height="300"
              alt="Bildet laster..."
              image="hus.jpg"
              title="Leilighet"
            />
          </>
        )}
        <CardContent className={classes.flexContent}>
          <Typography gutterBottom variant="h4" component="h4">
            <span className={classes.secondInformationText2}>
              {props?.title}
            </span>{" "}
          </Typography>
          <Divider />

          <Typography variant="h6" component="h6" className={classes.text}>
            <span className={classes.secondInformationText2}>
              {props?.address}, {props?.city}
            </span>{" "}
          </Typography>

          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" className={classes.text}>
                Areal{" "}
                <span className={classes.secondInformationText}>
                  {props?.squareMeter}m²
                </span>{" "}
              </Typography>

              {props.newlyBuilt ? (
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.text}
                >
                  Kjøpspris{" "}
                  <span className={classes.secondInformationText}>
                    {props?.price}
                  </span>{" "}
                  kr
                </Typography>
              ) : (
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.text}
                >
                  Pris{" "}
                  <span className={classes.secondInformationText}>
                    {props?.price} Kr
                  </span>{" "}
                </Typography>
              )}

              <Typography variant="h6" component="h6" className={classes.text}>
                Antall soverom{" "}
                <span className={classes.secondInformationText}>
                  {props?.bedrooms}
                </span>{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="h6" className={classes.text}>
                Antall bad{" "}
                <span className={classes.secondInformationText}>
                  {props?.bathrooms}
                </span>{" "}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </RouterLink>
  );
};

export default ApartmentCard;
