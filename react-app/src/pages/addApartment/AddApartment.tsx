import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import AddApartmentForm from "../../components/forms/AddApartmentForm";
import { Container } from "@material-ui/core";

/*const useStyles = makeStyles({
  root: { flexGrow: 1 },
});*/

const AddApartment = () => {
  //const classes = useStyles();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Container>
        <AddApartmentForm></AddApartmentForm>
      </Container>
    </>
  );
};

export default AddApartment;
