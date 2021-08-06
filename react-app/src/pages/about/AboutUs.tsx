import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box, Container, useMediaQuery } from "@material-ui/core";
import InfoCardAboutUs from "../../components/cards/InfoCardAboutUs";
import theme from "../../themes/theme";

//import CarCard from "../../components/cards/CarCard";
//import { Button, Input } from "@material-ui/core";
import PictureCard from "../../components/cards/PictureCardHomePage";
const useStyles = makeStyles({
  root: { flexGrow: 1 },

  boxborder: {
    border: "2px solid black",
  },
  textSchtyle: {
    borderBottom: "0.1mm ridge rgb(50, 50, 100, .6)",
    fontSize: 50,
    fontWeight: 800,
    textAlign: "center",
    fontFamily: "EB Garamond",
    marginTop: 30,
    marginBottom: 25,
  },
  titleSchtyle: {
    textAlign: "center",
    fontFamily: "EB Garamond",
    fontWeight: 800,
    fontSize: 50,
  },
});

const AboutUs = () => {
  const classes = useStyles();

  const titleString = "HVEM ER VI?";
  const descriptionString =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet vestibulum urna. Integer luctus est lacus, malesuada consectetur ante dignissim a. Pellentesque est libero, tincidunt nec quam vel, posuere rutrum nulla. Nulla dictum feugiat ex. Mauris bibendum, tellus non suscipit sollicitudin, purus ex egestas felis, sed sodales nunc turpis vitae mi. Pellentesque vel augue dignissim, eleifend lacus vitae, interdum felis. Nunc sed suscipit diam. Aliquam erat volutpat. Duis sed commodo lacus. Curabitur elementum lectus orci, et egestas lectus rutrum ut. Morbi sapien ex, aliquam eu felis in, semper ornare nisi.";
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const InfoRow = () => {
    return (
      <>
        <Grid item xs={12}>
          {" "}
          <InfoCardAboutUs
            title={titleString}
            description={descriptionString}
          ></InfoCardAboutUs>
        </Grid>
      </>
    );
  };

  const DesktopView = () => {
    return (
      <Grid container item sm={12}>
        <Grid item sm={12} md={6}>
          <InfoRow />
        </Grid>
        <Grid item sm={12} md={6}>
          <Grid container item xs={12}>
            <Grid item sm={12} xs={12}>
              <PictureCard image="23stue.jpg" />
            </Grid>
            <Grid item sm={12} xs={12}>
              <PictureCard image="20stue.jpg" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  const MobileView = () => {
    return (
      <Grid container item sm={12}>
        <Grid item xs={12}>
          <InfoRow />
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="23stue.jpg" />
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="20stue.jpg" />
        </Grid>
      </Grid>
    );
  };
  const matches2 = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Box className={classes.root} mt={6}>
      <Grid container>
        <Container>
          {matches2 ? <MobileView></MobileView> : <DesktopView></DesktopView>}
        </Container>
      </Grid>
    </Box>
  );
};

export default AboutUs;
