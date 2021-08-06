import React from "react";
import Grid from "@material-ui/core/Grid";
import theme from "../../themes/theme";
import InfoCardHomePage from "../../components/cards/InfoCardHomePage";
import PictureCard from "../../components/cards/PictureCardHomePage";
import { useMediaQuery } from "@material-ui/core";
const Home = () => {
  const matches2 = useMediaQuery(theme.breakpoints.down("xs"));

  const MobileView = () => {
    return (
      <>
        <Grid item xs={12}>
          <InfoCardHomePage
            title="Leiligheter"
            description="Vi har leiligheter i Sarpsborg, Moss, Fredrikstad og Halden. Her har vi alt fra hybler til leiligheter med 4 soverom."
            link="welcome?apartment=true&city=&commerce=false&house=false&incoming=false&newlyBuilt=false&page=1"
            linkparam="apartment"
            linkdescription="Trykk her for å se ledige leiligheter"
          ></InfoCardHomePage>
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="21stue.jpg" />
        </Grid>
        <Grid item xs={12}>
          <InfoCardHomePage
            title="Hus"
            description="Vi driver med utleie og salg av hus i Sarpsborg og Halden."
            link="welcome?apartment=false&city=&commerce=false&house=true&incoming=false&newlyBuilt=false&page=1"
            linkdescription="Trykk her for å se ledige hus"
          ></InfoCardHomePage>
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="60bad[226].jpg" />
        </Grid>

        <Grid item xs={12}>
          <InfoCardHomePage
            title="Nybygg"
            description="Prosjekter vi jobber med for salg."
            link="welcome?apartment=false&city=&commerce=false&house=false&incoming=false&newlyBuilt=true&page=1"
            linkdescription="Trykk her for å se ledige nybygg"
          ></InfoCardHomePage>
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="kul22.jpg" />
        </Grid>
        <Grid item xs={12}>
          <InfoCardHomePage
            title="Næringsbygg"
            description="Vi har kontorer, lager og butikk for utleie."
            link="welcome?apartment=false&city=&commerce=true&house=false&incoming=false&newlyBuilt=false&page=1"
            linkdescription="Trykk her for å se ledige næringsbygg og kontorer"
          ></InfoCardHomePage>
        </Grid>
        <Grid item xs={12}>
          <PictureCard image="office.jpeg" />
        </Grid>
      </>
    );
  };
  const DesktopView = () => {
    return (
      <>
        <Grid item xs={6}>
          <InfoCardHomePage
            title="Leiligheter"
            description="Vi har leiligheter i Sarpsborg, Moss, Fredrikstad og Halden. Her har vi alt fra hybler til leiligheter med 4 soverom."
            link="welcome?apartment=true&city=&commerce=false&house=false&incoming=false&newlyBuilt=false&page=1"
            linkparam="apartment"
            linkdescription="Trykk her for å se ledige leiligheter"
          ></InfoCardHomePage>
        </Grid>
        <Grid item sm={6}>
          <PictureCard image="21stue.jpg" />
        </Grid>
        <Grid item sm={6}>
          <PictureCard image="60bad[226].jpg" />
        </Grid>
        <Grid item sm={6}>
          <InfoCardHomePage
            title="Hus"
            description="Vi driver med utleie og salg av hus i Sarpsborg og Halden."
            link="welcome?apartment=false&city=&commerce=false&house=true&incoming=false&newlyBuilt=false&page=1"
            linkdescription="Trykk her for å se ledige hus"
          ></InfoCardHomePage>
        </Grid>
        <Grid item sm={6}>
          <InfoCardHomePage
            title="Nybygg"
            description="Prosjekter vi jobber med for salg."
            link="welcome?apartment=false&city=&commerce=false&house=false&incoming=false&newlyBuilt=true&page=1"
            linkdescription="Trykk her for å se ledige nybygg"
          ></InfoCardHomePage>
        </Grid>
        <Grid item sm={6}>
          <PictureCard image="kul22.jpg" />
        </Grid>
        <Grid item sm={6}>
          <PictureCard image="office.jpeg" />
        </Grid>
        <Grid item sm={6}>
          <InfoCardHomePage
            title="Næringsbygg"
            description="Vi har kontorer, lager og butikk for utleie."
            link="welcome?apartment=false&city=&commerce=true&house=false&incoming=false&newlyBuilt=false&page=1"
            linkdescription="Trykk her for å se ledige næringsbygg og kontorer"
          ></InfoCardHomePage>
        </Grid>
      </>
    );
  };
  return (
    <Grid container item xs={12}>
      {matches2 ? <MobileView></MobileView> : <DesktopView></DesktopView>}
    </Grid>
  );
};

export default Home;
