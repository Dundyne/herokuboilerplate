import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ContactNewForm from "../../components/forms/ContactNewForm";
//import LoadingScreen from "../../components/loading/LoadingScreen";

const ContactNew = () => {
  const [, setImageLoad] = useState(false);
  const image = new Image();
  image.onload = function () {
    setImageLoad(true);
  };
  image.src = "/salg1.jpg";
  const useStyles = makeStyles({
    root: { flexGrow: 1 },
    gridheader: {
      backgroundImage: "url(" + image.src + ")",
      backgroundRepeat: "no-repeat, repeat",
      backgroundSize: "cover",
      minHeight: "1000px",
    },
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid className={classes.gridheader} container>
        <Container>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <ContactNewForm></ContactNewForm>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </div>
  );
};

export default ContactNew;
