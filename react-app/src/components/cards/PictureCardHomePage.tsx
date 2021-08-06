import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import Typography from "@material-ui/core/Typography";

import CardContent from "@material-ui/core/CardContent";
import theme from "../../themes/theme";

const useStyles = makeStyles({
  root: {
    backgroundImage: "url(salg2.jpg)",
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
    background: "rgba(0,0,0,0.1)",
  },
  content: {
    height: "250px",
  },

  text: {
    fontWeight: 400,
  },
  textDescription: {
    marginTop: theme.spacing(20),
  },
});

const PictureCardHomePage = ({ title, description, image }: any) => {
  const classes = useStyles();
  const testStyles = makeStyles({
    image: {
      backgroundImage: "url(" + image + ")",
      backgroundRepeat: "no-repeat, repeat",
      backgroundSize: "cover",
      // //background: "rgba(0,0,0,0.1)",
      //color: "black",
    },
  });
  const classes2 = testStyles();

  return (
    <Card className={classes2.image}>
      <CardContent className={classes.content}>
        <Typography
          align="center"
          //color="primary"
          variant="h2"
          component="h2"
          className={classes.text}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PictureCardHomePage;
/*        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image="leieboer.jpg"
          title="Contemplative Reptile"
        /> */
