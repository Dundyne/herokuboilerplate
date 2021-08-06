import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AddUser from "../../components/forms/AddUser";
import FetchUsers from "../../components/fetchUsers";
import Divider from '@material-ui/core/Divider';


const Register = () => {
 
  return (
    <>
      <Container>
        <AddUser></AddUser>
        <Divider/>
        <FetchUsers></FetchUsers>
      </Container>
    </>
  );
};

export default Register;
