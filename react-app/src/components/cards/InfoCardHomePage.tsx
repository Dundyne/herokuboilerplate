import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
//import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//import Typography from "@material-ui/core/Typography";
import { Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import theme from "../../themes/theme";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignitems: "center",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.0);",
  },
  buttonCenter: {
    display: "flex",
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
  },
  title: {
    marginBottom: theme.spacing(1),
    fontFamily: "EB Garamond"
  },
  para: {
    fontFamily: "EB Garamond",
    fontSize: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: 800,
    //color: "cyan"
  },
  icon: {
    color: "#cc7000",
    fontSize: 40,

    
    
  }
});

const InfoCard = ({ title, description, linkdescription, link }: any) => {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root}>
      <CardContent>
        <Typography color="textPrimary" variant="h3" component="h3" className={classes.title}>
          {title}
        </Typography>
        <Typography color="textPrimary" variant="subtitle1" component="p" className={classes.para}>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonCenter}>
        <Link
          {...{
            component: RouterLink,
            to: link,
            color: "inherit",
            style: { textDecoration: "none" },
            key: "label",
          }}
        >
          <Button size="medium" color="primary" endIcon={<ArrowForwardIcon className={classes.icon}></ArrowForwardIcon>} className={classes.button} >
            {linkdescription}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
