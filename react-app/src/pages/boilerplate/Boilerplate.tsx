import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
//import CarCard from "../../components/cards/CarCard";
//import { Button, Input } from "@material-ui/core";

const useStyles = makeStyles({
  root: { flexGrow: 1 },
});

const Boilerplate = () => {
  const [data, setData] = useState([] as any);

  const getData = () => {
    fetch("cars.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setData(myJson.car);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  const CornRow = () => {
    return <>{data}</>;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <CornRow />
        </Grid>
      </Grid>
    </div>
  );
};

export default Boilerplate;
