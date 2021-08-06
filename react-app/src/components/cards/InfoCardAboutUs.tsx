import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
//import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignitems: "center",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0);",
    borderRadius: 25,
  },
  buttonCenter: {
    display: "flex",
    justifyContent: "center",

    alignitems: "center",
    textAlign: "center",
  },

  title: {
    fontFamily: "EB Garamond",
    fontSize: "35px",
  },

  description: {
    letterSpacing: "2px",
    lineHeight: "2",
    fontFamily: "EB Garamond",
    fontWeight: 400,
    fontSize: 20,
  },
});

const InfoCardAboutUs = ({ title, description }: any) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent>
        <Box component="h2" className={classes.title}>
          {title}
        </Box>
        <Box className={classes.description}>{description}</Box>
      </CardContent>
      <CardActions className={classes.buttonCenter}></CardActions>
    </Card>
  );
};

export default InfoCardAboutUs;
