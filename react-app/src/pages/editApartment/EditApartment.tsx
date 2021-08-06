import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import EditApartmentForm from "../../components/forms/EditApartmentForm";
import { Container } from "@material-ui/core";

/*const useStyles = makeStyles({
  root: { flexGrow: 1 },
});*/

const EditApartment = () => {
  //const classes = useStyles();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container>
        <EditApartmentForm></EditApartmentForm>
      </Container>
    </>
  );
};

export default EditApartment;
