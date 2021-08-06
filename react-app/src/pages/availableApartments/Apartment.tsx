/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ApartmentCard from "../../components/cards/ApartmentCard";
import Fade from "@material-ui/core/Fade";
import Pagination from "@material-ui/lab/Pagination";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import queryString from "query-string";
import theme from "../../themes/theme";
import { useFetch } from "../../hooks/useFetch";
import { IApartment } from "../../interfaces/IApartment";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { useHistory, useLocation } from "react-router-dom";
//import Typography from "material-ui/styles/typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  filterPaper: {},
  buttonCenter: {
    backgroundColor: "rgba(0, 0, 0, 0.6);",
    display: "flex",
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
  },
  emptyText: {
    marginTop: theme.spacing(5),
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
    fontWeight: "bold",
  },

  emptyText2: {
    marginTop: theme.spacing(5),
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
  },

  menuButton: {
    fontWeight: 700,
    fontSize: 20,
    borderRadius: 10,
    borderWidth: "10px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarmobile: {
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
  },
  inputStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.2);",
  },

  leftGrid: {},
  topGrid: {
    display: "flex",
    flexDirection: "column",
    //position: "static",
  },
  gridheader: {
    backgroundImage: "url(stairs.jpg)",
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
    height: "auto",
    //minHeight: "1000px",
  },
  test: {
    height: "2000px",
    display: "flex",
    justifyContent: "center",
    alignitems: "center",
    textAlign: "center",
    backgroundImage: "url(navsmoke3.jpg)",
    backgroundRepeat: "no-repeat, repeat",
    backgroundSize: "cover",
    opacity: "40%",
  },
  pictureLogo: {
    marginTop: theme.spacing(10),
    height: theme.spacing(10),
    width: theme.spacing(10),
  },
  formLabel: {},
  checkboxCard: {
    display: "flex",
    //justifyContent: "space-between",
    flexDirection: "column",
    margin: "0",
    backgroundColor: "rgba(0, 0, 0, 0.1);",
  },
  checkboxCardDesktop: {
    display: "flex",
    justifyContent: "space-between",
    //flexDirection: "row",
    margin: "0",
    backgroundColor: "rgba(255,255,255, 0.1);",
  },
  leftCheckBox: {
    display: "flex",
    flexDirection: "column",
    minWidth: theme.spacing(20),
  },
  button: {
    width: "50%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  button1: {
    marginTop: theme.spacing(5),
    width: "100%",
    marginBottom: theme.spacing(5),
  },
});

const Home = () => {
  const url2 = "api/apartments/getlist";
  const history = useHistory();

  const { search } = useLocation();
  const values = queryString.parse(search);

  const { status, data } = useFetch(url2);
  const [emptyText, setEmptyText] = useState("");
  //const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const [apartment, setApartment] = useState<boolean>(
    typeof values.apartment === "boolean" ? values.apartment : true
  );
  const [page, setPage] = useState<number>(
    typeof values.apartment === "number" ? values.apartment : 1
  );
  const [incoming, setIncoming] = useState<boolean>(
    typeof values.incoming === "boolean" ? values.incoming : true
  );
  const [house, setHouse] = useState<boolean>(
    typeof values.house === "boolean" ? values.house : true
  );
  const [commerce, setCommerce] = useState<boolean>(
    typeof values.commerce === "boolean" ? values.commerce : true
  );
  const [newlyBuilt, setNewlyBuilt] = useState<boolean>(
    typeof values.newlyBuilt === "boolean" ? values.newlyBuilt : true
  );

  const [realEstate, setData] = useState<IApartment[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setData(data);
  }, [data]);

  useEffect(() => {
    if (values.city !== "") {
      setCity(values.city as string);
    }
    if (!values.city) {
      setCity("");
    }

    if (values.page) {
      setPage(parseInt(values.page! as string));
    }
    if (!values.city) {
      setCity("");
    }

    if (values.apartment !== "false") {
      setApartment(true);
    } else {
      setApartment(false);
    }

    if (values.incoming !== "false") {
      setIncoming(true);
    } else {
      setIncoming(false);
    }

    if (values.house !== "false") {
      setHouse(true);
    } else {
      setHouse(false);
    }

    if (values.commerce !== "false") {
      setCommerce(true);
    } else {
      setCommerce(false);
    }

    if (values.newlyBuilt !== "false") {
      setNewlyBuilt(true);
    } else {
      setNewlyBuilt(false);
    }
  }, []);

  useEffect(() => {
    history.replace({
      search: `?${queryString.stringify({
        page,
        city,
        apartment,
        incoming,
        house,
        commerce,
        newlyBuilt,
      })}`,
    });
  }, [apartment, city, commerce, history, house, incoming, newlyBuilt, page]);

  const predictedView1 = realEstate.filter((x) => {
    return city === "" ? x : city === x.city;
  });

  const predictedView = predictedView1.filter((x) => {
    return (
      (apartment && x.apartment === true) ||
      (incoming && x.incoming === true) ||
      (house && x.house === true) ||
      (commerce && x.commerce === true) ||
      (newlyBuilt && x.newlyBuilt === true)
    );
  });

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const paginate = function (array: any, index: any, size: any) {
    // transform values
    index = Math.abs(parseInt(index));
    index = index > 0 ? index - 1 : index;
    size = parseInt(size);
    size = size < 1 ? 1 : size;

    // filter
    return [
      ...array.filter(
        (value: any, n: any) => n >= index * size && n < (index + 1) * size
      ),
    ];
  };
  const paginatedApartments = paginate(predictedView, page, 4);
  const classes = useStyles();

  useEffect(() => {
    if (
      predictedView.length > 0 &&
      page > Math.ceil(predictedView.length / 4)
    ) {
      setPage(1);
    }
    if (paginatedApartments.length === 0) {
      setEmptyText("Ingen ledige leiligheter tilgjenglig");
    } else {
      setEmptyText("");
    }
  }, [paginatedApartments, predictedView.length]);
  const CornRow = () => {
    return (
      <>
        {paginatedApartments.map((data, index) => (
          <Fade
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 2000 } : {})}
          >
            <Grid key={index} item xs={12} md={6}>
              <ApartmentCard key={index} props={data}></ApartmentCard>
            </Grid>
          </Fade>
        ))}
      </>
    );
  };

  const FilterButtons = () => {
    return (
      <Box mt={6} className={classes.toolbar}>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Sarpsborg");
            setPage(1);
          }}
        >
          Sarpsborg
        </Button>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Halden");
            setPage(1);
          }}
        >
          Halden
        </Button>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Moss");
            setPage(1);
          }}
        >
          Moss
        </Button>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Fredrikstad");
            setPage(1);
          }}
        >
          Fredrikstad
        </Button>
      </Box>
    );
  };

  const FilterButtonsMobile = () => {
    return (
      <Box mt={6} className={classes.toolbarmobile}>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Sarpsborg");
            setPage(1);
          }}
        >
          Sarpsborg
        </Button>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Halden");
            setPage(1);
          }}
        >
          Halden
        </Button>
        <br></br>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Moss");
            setPage(1);
          }}
        >
          Moss
        </Button>
        <Button
          className={classes.menuButton}
          onClick={() => {
            setCity("Fredrikstad");
            setPage(1);
          }}
        >
          Fredrikstad
        </Button>
      </Box>
    );
  };

  const RightGridDesktop = () => {
    return (
      <Grid key="RightGrid" item xs={12}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12}>
            <FilterButtons />
          </Grid>
          <Grid item xs={12}>
            <TopGridDesktop></TopGridDesktop>
          </Grid>

          {paginatedApartments.length !== 0 ? (
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(predictedView.length / 4)}
                page={page}
                onChange={handleChange}
              />
            </Grid>
          ) : null}
          <CornRow />

          <Box>
            <Typography
              variant="h2"
              component="h2"
              className={classes.emptyText}
            >
              {emptyText}
            </Typography>
          </Box>

          {paginatedApartments.length !== 0 ? (
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(predictedView.length / 4)}
                page={page}
                onChange={handleChange}
              />
            </Grid>
          ) : (
            <React.Fragment>
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                className={classes.emptyText2}
              >
                Vi får stadig inn flere leiligheter, ta gjerne kontakt med oss
                for mer informasjon.
              </Typography>

              <Button
                variant={"contained"}
                color="primary"
                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                size={"large"}
                className={classes.button}
                href="/contact"
              >
                {" "}
                Gå til kontaktskjema{" "}
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    );
  };

  const DesktopView = () => {
    return status === "fetched" ? (
      <div className={classes.root}>
        <Grid className={classes.gridheader} container spacing={0}>
          <Container>
            <Grid container item xs={12}>
              <RightGridDesktop></RightGridDesktop>
            </Grid>
          </Container>
        </Grid>
      </div>
    ) : (
      <LoadingScreen></LoadingScreen>
    );
  };

  const TopGridMobile = () => {
    return (
      <Grid item xs={12}>
        <Card className={classes.checkboxCard}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setHouse(!house)}
                name="checkedHouse"
                color="primary"
                value={house}
                checked={house}
              />
            }
            label="Hus"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setApartment(!apartment)}
                name="checkedApartment"
                color="primary"
                value={apartment}
                checked={apartment}
              />
            }
            label="Leilighet"
            className={classes.formLabel}
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setIncoming(!incoming)}
                name="checkedIncoming"
                color="primary"
                value={incoming}
                checked={incoming}
              />
            }
            label="Innkommende"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setCommerce(!commerce)}
                name="checkedCommerce"
                color="primary"
                value={commerce}
                checked={commerce}
              />
            }
            label="Næringsbygg"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setNewlyBuilt(!newlyBuilt)}
                name="checkedB"
                color="primary"
                value={newlyBuilt}
                checked={newlyBuilt}
              />
            }
            label="Nybygg"
            className={classes.formLabel}
          />
        </Card>
      </Grid>
    );
  };

  const TopGridDesktop = () => {
    return (
      <Grid item xs={12}>
        <Card className={classes.checkboxCardDesktop}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setHouse(!house)}
                name="checkedHouse"
                color="primary"
                value={house}
                checked={house}
              />
            }
            label="Hus"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setApartment(!apartment)}
                name="checkedApartment"
                color="primary"
                value={apartment}
                checked={apartment}
              />
            }
            label="Leilighet"
            className={classes.formLabel}
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setIncoming(!incoming)}
                name="checkedIncoming"
                color="primary"
                value={incoming}
                checked={incoming}
              />
            }
            label="Innkommende"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setCommerce(!commerce)}
                name="checkedCommerce"
                color="primary"
                value={commerce}
                checked={commerce}
              />
            }
            label="Næringsbygg"
            className={classes.formLabel}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setNewlyBuilt(!newlyBuilt)}
                name="checkedB"
                color="primary"
                value={newlyBuilt}
                checked={newlyBuilt}
              />
            }
            label="Nybygg"
            className={classes.formLabel}
          />
        </Card>
      </Grid>
    );
  };

  const BottomGridMobile = () => {
    return (
      <Grid item xs={12}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <FilterButtonsMobile />
          </Grid>
          <TopGridMobile></TopGridMobile>

          {paginatedApartments.length !== 0 ? (
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(predictedView.length / 4)}
                page={page}
                onChange={handleChange}
              />
            </Grid>
          ) : null}
          <CornRow />

          <Box>
            <Typography
              variant="h2"
              component="h2"
              className={classes.emptyText}
            >
              {emptyText}
            </Typography>
          </Box>

          {paginatedApartments.length !== 0 ? (
            <Grid item xs={12}>
              <Pagination
                count={Math.ceil(predictedView.length / 4)}
                page={page}
                onChange={handleChange}
              />
            </Grid>
          ) : (
            <React.Fragment>
              <Typography
                variant="h4"
                component="h4"
                gutterBottom
                className={classes.emptyText2}
              >
                Vi får stadig inn flere leiligheter, ta gjerne kontakt med oss
                for mer informasjon.
              </Typography>

              <Button
                variant={"contained"}
                color="primary"
                endIcon={<ArrowForwardIcon></ArrowForwardIcon>}
                size={"large"}
                className={classes.button1}
                href="/contact"
              >
                {" "}
                Gå til kontaktskjema{" "}
              </Button>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    );
  };

  const MobileView = () => {
    return status === "fetched" ? (
      <div className={classes.root}>
        <Grid className={classes.gridheader} container spacing={0}>
          <Container>
            <Grid container item xs={12}>
              <BottomGridMobile></BottomGridMobile>
            </Grid>
          </Container>
        </Grid>
      </div>
    ) : (
      <div className={classes.test}>
        <Avatar
          className={classes.pictureLogo}
          alt="logo"
          src="placeholder.jpg"
        />
      </div>
    );
  };
  const matches1 = useMediaQuery(theme.breakpoints.down("xs"));
  const matches2 = useMediaQuery(theme.breakpoints.up("sm"));
  const matches3 = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box className={classes.root}>
        {matches3 ? (
          <DesktopView></DesktopView>
        ) : matches2 ? (
          <DesktopView></DesktopView>
        ) : matches1 ? (
          <MobileView></MobileView>
        ) : null}
      </Box>
    </>
  );
};

export default Home;
