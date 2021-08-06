import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import CarCard from "../../components/cards/CarCard";
import PictureCard from "../../components/cards/PictureCardHomePage";
import { Box, Container, Typography, Divider } from "@material-ui/core";
import LoadingScreen from "../../components/loading/LoadingScreen";
import theme from "../../themes/theme";

const Frontpage = () => {
  const [imageLoad, setImageLoad] = useState(false);
  const [imageLoad1, setImageLoad1] = useState(false);
  const [imageLoad2, setImageLoad2] = useState(false);
  const [imageLoad3, setImageLoad3] = useState(false);
  const [imageLoad4, setImageLoad4] = useState(false);
  const img = new Image();
  const img1 = new Image();
  const img2 = new Image();
  const img3 = new Image();
  const img4 = new Image();
  img.onload = function () {
    setImageLoad(true);
  };
  img.src = "pic8.jpg";

  img1.onload = function () {
    setImageLoad1(true);
  };
  img1.src = "pic6-min.jpg";

  img2.onload = function () {
    setImageLoad2(true);
  };
  img2.src = "pic5.jpg";

  img3.onload = function () {
    setImageLoad3(true);
  };
  img3.src = "pic3.jpg";

  img4.onload = function () {
    setImageLoad4(true);
  };
  img4.src = "pic4.jpg";

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const useStyles = makeStyles({
    root: { flexGrow: 1 },
    gridheader: {
      backgroundImage: "url(" + img.src + ")",
      backgroundRepeat: "no-repeat, repeat",
      backgroundSize: "cover",
    },
    titleBox: {
      textAlign: "center",
    },
    boxContainerHeaderTitle: {
      marginBottom: theme.spacing(4),
    },
    text: {
      fontWeight: 500,
    },
  });
  const classes = useStyles();

  const FancyRow = () => {
    return (
      <>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Box className={classes.boxContainerHeaderTitle}>
              <Typography
                variant="h2"
                component="h2"
                align={"center"}
                className={classes.text}
              >
                Velkommen!
              </Typography>

              <Typography variant="h2" component="h2" align={"center"}>
                Hva ønsker du å leie?
              </Typography>

              <Divider />
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <PictureCard title={"Leiligheter"} image={img1.src} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PictureCard title={"Hus"} image={img2.src} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PictureCard title={"Kommende boliger"} image={img3.src} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PictureCard title={"Næringsbygg"} image={img4.src} />
        </Grid>
      </>
    );
  };

  return imageLoad && imageLoad1 && imageLoad2 && imageLoad3 && imageLoad4 ? (
    <div>
      <Grid container item xs={12}>
        <Grid className={classes.gridheader} item xs={12}>
          <Container>
            <Box m={4}>
              <Grid container item xs={12}>
                <FancyRow />
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  ) : (
    <LoadingScreen></LoadingScreen>
  );
};

export default Frontpage;
