/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { IUser } from "../interfaces/IUser";
import UserCard from "./cards/UserCard";
import Fade from "@material-ui/core/Fade";

const FetchUsers = () => {
  const url = "api/auth/getlistUsers";
  const { status, data } = useFetch(url);
  const [users, setData] = useState<IUser[]>([]);

  useEffect(() => {
    setData(data);
  }, [status]);

  const CornRow = () => {
    return (
      <>
        {users.map((data, index) => (
          <Fade
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 2000 } : {})}
          >
            <Grid key={index} item xs={12} md={6}>
              <UserCard key={index} props={data}></UserCard>
            </Grid>
          </Fade>
        ))}
      </>
    );
  };

  return (
    <>
      <Grid container spacing={4}>
        <CornRow />
      </Grid>
    </>
  );
};

export default FetchUsers;
