import {
  AppBar,
  Toolbar,
  //Typography,
  makeStyles,
  Button,
  Box,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
//import { sizing } from "@material-ui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
//import { Height } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
//import FolderIcon from "@material-ui/icons/Folder";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ContactMailSharpIcon from "@material-ui/icons/ContactMailSharp";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import theme from "../../themes/theme";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SleekDrawerNav from "./SleekDrawerNav";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles({
  menuButton: {
    opacity: "100%",
    color: "#FFFFFF",

    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "lightgreen",
      opacity: "100%",
      textUnderlineOffset: "30px",
    },

    [theme.breakpoints.down("lg")]: {
      //marginLeft: theme.spacing(10),
      textAlign: "center",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  logo: { display: "flex", justifyContent: "space-evenly" },
  content: theme.mixins.toolbar,
  gucciFlip: {
    //backgroundColor: "rgba(0, 0, 0, 0.8);",
  },
  header: {
    position: "sticky",
    margin: "0",
  },

  icon: {
    backgroundColor: theme.palette.secondary.main,
  },
  pictureLogo: {
    height: theme.spacing(10),
    width: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
  sexyText: {
    fontFamily: "EB Garamond",
    borderBottom: "2px solid white",
    //marginRight: theme.spacing(20),
    [theme.breakpoints.down("lg")]: {
      //marginLeft: theme.spacing(10),
      textAlign: "left",
      borderBottom: "none",
    },
  },
});

const headersData = [
  {
    label: "HJEM",
    href: "/",
    comp: HomeIcon,
  },
  {
    label: "LEDIG LEILIGHETER",
    href: "/welcome",
    comp: HomeWorkIcon,
  },
  {
    label: "KONTAKT OSS",
    href: "/contactus",
    comp: ContactMailSharpIcon,
  },
  {
    label: "OM OSS",
    href: "/aboutus",
    comp: ImportContactsIcon,
  },
  {
    label: "Logg Inn",
    href: "/loginuser",
    comp: ImportContactsIcon,
  },
];

const SleekNav = () => {
  const classes = useStyles();
  const getMenuButtons = () => {
    return headersData.map(({ label, href, comp }: any) => {
      return (
        <Button
          {...{
            key: label,
            to: href,
            component: RouterLink,
            className: classes.menuButton,
          }}
        >
          <Box mr={1}>
            <Avatar className={classes.icon}>
              <SvgIcon component={comp} />
            </Avatar>
          </Box>
          {label}
        </Button>
      );
    });
  };

  const DisplayMobileSmall = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Link
          {...{
            component: RouterLink,
            to: "/",
            color: "inherit",
            style: { textDecoration: "none" },
            key: "label",
          }}
        >
          <Box>
            <Avatar
              className={classes.pictureLogo}
              alt="logo"
              src={process.env.PUBLIC_URL + "/placeholder1.jpg"}
            />
          </Box>
        </Link>
        <Box className={classes.logo}>{SleekDrawerNav}</Box>
      </Toolbar>
    );
  };

  const DisplayMobileMedium = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Link
          {...{
            component: RouterLink,
            to: "/",
            color: "inherit",
            style: { textDecoration: "none" },
            key: "label",
          }}
        >
          <Box>
            <Avatar
              className={classes.pictureLogo}
              alt="logo"
              src={process.env.PUBLIC_URL + "/placeholder1.jpg"}
            />
          </Box>
        </Link>
        <Box>
          <Typography variant="h4" component="h1" className={classes.sexyText}>
            placeholder A/S
          </Typography>
        </Box>
        <Box className={classes.logo}>{SleekDrawerNav}</Box>
      </Toolbar>
    );
  };

  const DisplayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Box className={classes.logo}>
          <Link
            {...{
              component: RouterLink,
              to: "/",
              color: "inherit",
              style: { textDecoration: "none" },
              key: "label",
            }}
          >
            <Avatar
              className={classes.pictureLogo}
              alt="logo"
              src={process.env.PUBLIC_URL + "/placeholder1.jpg"}
            />
          </Link>

          <Typography variant="h4" component="h1" className={classes.sexyText}>
            PLACEHOLDER <br />
            PLACEHOLDER
          </Typography>
        </Box>
        <Box borderRadius={16} className={classes.gucciFlip}>
          {getMenuButtons()}
        </Box>
      </Toolbar>
    );
  };

  const matches1 = useMediaQuery(theme.breakpoints.down("xs"));
  const matches2 = useMediaQuery(theme.breakpoints.up("sm"));
  const matches3 = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Box component="header">
        {matches3 ? (
          <AppBar className={classes.header}>
            <DisplayDesktop></DisplayDesktop>
          </AppBar>
        ) : matches2 ? (
          <AppBar className={classes.header}>
            <DisplayMobileMedium></DisplayMobileMedium>
          </AppBar>
        ) : matches1 ? (
          <AppBar className={classes.header}>
            <DisplayMobileSmall></DisplayMobileSmall>
          </AppBar>
        ) : null}
      </Box>
    </>
  );
};

export default SleekNav;
