import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {},
  picture: {
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
  },
});

const ImageCard = ({ url }: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.picture}
        component="img"
        alt="Sarpsborg"
        image={url}
        title="Sarpsborg"
        width="100%"
        height="auto"
      />
    </Card>
  );
};
export default ImageCard;
