import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import Avatar from "@material-ui/core/Avatar";
import { Box } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    textTitle: {
      fontFamily: "EB Garamond",
      fontWeight: 800,
      borderBottom: "4px solid black",
    },

    textRole: {
      fontFamily: "EB Garamond",
      fontWeight: 500,

      marginBottom: theme.spacing(3),
    },

    textSchtyle: {
      fontFamily: "EB Garamond",
      fontWeight: 400,
      fontSize: 20,
      display: "flex",
      justifyContent: "center",
      alignitems: "center",
      textAlign: "center",

      marginBottom: theme.spacing(3),
    },
    icon: {
      display: "flex",
      marginRight: 10,
      height: theme.spacing(4),
      width: theme.spacing(4),
      backgroundColor: blue[200],
    },
  })
);

const EmployeeCard = ({ Name, Role, PhoneNumber, Email }: any) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Employee"
        width="100%"
        height="auto"
        image="employee.jpg"
        title="Employee"
      />

      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          align={"center"}
          component="h2"
          className={classes.textTitle}
        >
          {Name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          align={"center"}
          component="p"
          className={classes.textRole}
        >
          {Role}
        </Typography>
        <Box className={classes.textSchtyle}>
          <Avatar className={classes.icon}>
            <PhoneIcon fontSize="small" />
          </Avatar>
          {PhoneNumber}
        </Box>

        <Box className={classes.textSchtyle}>
          <Avatar className={classes.icon}>
            <EmailIcon />
          </Avatar>
          {Email}
        </Box>
      </CardContent>
    </Card>
  );
};
export default EmployeeCard;
