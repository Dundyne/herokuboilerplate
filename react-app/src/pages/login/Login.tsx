import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import LoginUser from "../../components/forms/LoginUser";

/*const useStyles = makeStyles({
  root: { flexGrow: 1 },
});*/

const Login = () => {
  //const classes = useStyles();

  return (
    <>
      <Container>
        <LoginUser></LoginUser>
      </Container>
    </>
  );
};

export default Login;
