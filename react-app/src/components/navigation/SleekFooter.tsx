import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      className={classes.GridItemCopy}
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" className={classes.GridItemCopy}>
        PLACEHOLDER A/S
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    //minHeight: "25vh",
    maxWidth: "100%",
    overflowX: "hidden",
  },

  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },

  footer: {
    textAlign: "center",
    position: "sticky",
    backgroundImage:
      "radial-gradient(circle, rgba(25,25,25,1) 100%, rgba(3,104,233,1) 100%)",

    padding: theme.spacing(0, 0),

    "@media (max-width: 900px)": {
      //marginTop: theme.spacing(10),
    },
  },
  sweet: {
    background:
      "radial-gradient(circle, rgba(13,27,42,1) 100%, rgba(3,104,233,1) 100%)",
  },
  gridContainer: {
    marginTop: theme.spacing(1),
  },
  GridItems: {
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
    color: "white",
    fontSize: 22,
    fontWeight: 800,
    fontFamily: "EB Garamond",
    textAlign: "right",
    marginTop: theme.spacing(3),

    "@media (max-width: 1200px)": {
      textAlign: "center",
      fontSize: 14,
      marginBottom: theme.spacing(4),
    },
  },

  GridItemsPara: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
  },
  GridItemCopy: {
    color: "white",
    fontSize: 13,
    fontWeight: 400,
  },
  pictureLogo: {
    marginTop: theme.spacing(4),
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
}));

const footers = [
  {
    title: "Placeholder  A/S",
    description: [{ name: "Placeholder" }],
  },
  {
    title: "KONTAKTINFORMASJON",
    description: [
      { name: "Åpningstider: 09:00 - 15:00" },
      { name: "Sentralbord: " },
      { name: "Kontakt oss", link: "contactus" },
    ],
  },

  {
    title: "NETTSIDE LAGET AV",
    description: [
      {
        name: "Placeholder",
        link: "Linkedin Link",
      },
      {
        name: "Placeholder",
        link: "Linkedin Link",
      },
    ],
  },
];

export default function SleekFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box component="footer" className={classes.footer}>
        <Grid
          container
          spacing={1}
          justify="space-evenly"
          className={classes.gridContainer}
        >
          <Avatar
            className={classes.pictureLogo}
            alt="logo"
            src={process.env.PUBLIC_URL + "/placeholder.jpg"}
          />

          {footers.map((footer) => (
            <Grid
              item
              xs={6}
              sm={5}
              md={2}
              lg={2}
              className={classes.GridItems}
              key={footer.title}
            >
              <Typography gutterBottom className={classes.GridItems}>
                {footer.title}
              </Typography>

              <ul>
                {footer.description.map((item: any) => (
                  <li key={item.name}>
                    <Link
                      className={classes.GridItemsPara}
                      href={item.link}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5} p={2} className={classes.sweet}>
          <Copyright />
        </Box>
      </Box>
    </div>
    /* End footer */
  );
}
