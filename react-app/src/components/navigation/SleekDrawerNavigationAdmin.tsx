import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Box, Button, SvgIcon } from "@material-ui/core";
import { Link, Link as RouterLink } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import { useAuthContext } from "../../context/AuthProvider";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Badge from "@material-ui/core/Badge";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
    backgroundColor: theme.palette.primary.main,
  },
  drawer: {
    width: drawerWidth,
    //flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
  },

  title: {
    fontFamily: "EB Garamond",
    marginBottom: theme.spacing(3),
    color: "#FFFFFF",
    borderBottom: "1px solid lightgreen",
    paddingBottom: "5px",
  },
  title2: {
    fontFamily: "EB Garamond",
    marginBottom: theme.spacing(3),
    color: "#FFFFFF",
    borderBottom: "1px solid white",
    paddingBottom: "5px",
  },

  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    position: "relative",
  },
  menuButton: {
    float: "right",
  },

  pictureLogo: {
    height: theme.spacing(17),
    width: theme.spacing(17),
    marginLeft: theme.spacing(5.5),
    marginTop: theme.spacing(30),
    opacity: "50%",
  },
  containerNav: {},
  btnLogOut: {
    marginTop: theme.spacing(5),
  },

  menuItems: {
    opacity: "100%",
    color: "#FFFFFF",
    marginTop: theme.spacing(2),
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "lightgreen",
      opacity: "100%",
      textUnderlineOffset: "15px",
    },
  },
  toolbar: {},

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },

  content: { backgroundColor: theme.palette.primary.main },
  closeMenuButton: {
    marginLeft: "auto",
    marginRight: 0,
  },
  link: {
    textDecoration: "none",
  },
}));

function SleekDrawerNavigationAdmin() {
  const { setUser, user } = useAuthContext() as any;

  const getUserInfo = async () => {
    try {
      return await fetch("api/auth/logout").then((response) => response.json());
    } catch (err) {
      return err.response;
    }
  };

  const handleLogout = async () => {
    await getUserInfo();

    setUser(null);
  };

  const headersData = [
    {
      label: "Lag Kontrakt",
      href: "/pdf",
      comp: AddIcon,
    },
    {
      label: "Legg ut annonse",
      href: "/addApartment",
      comp: AddCircleIcon,
    },
    {
      label: "Lag bruker",
      href: "/createuser",
      comp: PersonAddIcon,
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const getMenuButtons = () => {
    return headersData.map(({ label, href, comp, onclick }: any) => {
      return (
        <Box>
          <Button
            {...{
              key: label,
              to: href,
              component: RouterLink,
              className: classes.menuItems,
              onClick: onclick,
            }}
          >
            <Box mr={1}>
              <Avatar className={classes.icon}>
                <SvgIcon component={comp} />
              </Avatar>
            </Box>
            {label}
          </Button>
        </Box>
      );
    });
  };

  return (
    <Box className={classes.containerNav}>
      <IconButton
        color="secondary"
        aria-label="Open drawer"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <Badge color="error">
          <AccountCircleIcon fontSize="large" />
        </Badge>
      </IconButton>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "left" : "right"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <CloseIcon style={{ color: "white" }} />
          </IconButton>

          <Typography variant="h6" component="h6" className={classes.title}>
            Velkommen, {user.firstName} {user.lastName}!
          </Typography>

          <Link
            to="Eiendom LEIEKONTRAKT HUSORDENSREGLER 2 sider[125].pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className={classes.link}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={<CloudDownloadIcon>HUSORDENSREGLER</CloudDownloadIcon>}
            >
              HUSORDENSREGLER
            </Button>
          </Link>

          <Link
            to="Eiendom LEIEKONTRAKT LEILIGHET NY STANDARD 2021[126].pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className={classes.link}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={
                <CloudDownloadIcon>Standard leiekontrakt</CloudDownloadIcon>
              }
            >
              Standard leiekontrakt
            </Button>
          </Link>

          <Link
            to="Leiekontrakt Sverdrups gt.[124].pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className={classes.link}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={
                <CloudDownloadIcon>
                  Leiekontrakt Sverdrups gate
                </CloudDownloadIcon>
              }
            >
              Leiekontrakt Sverdrups gate
            </Button>
          </Link>

          {getMenuButtons()}

          <Button
            variant="contained"
            color="secondary"
            className={classes.btnLogOut}
            onClick={handleLogout}
            endIcon={<ExitToAppIcon>LOGG UT</ExitToAppIcon>}
          >
            LOGG UT
          </Button>

          <Avatar
            className={classes.pictureLogo}
            alt="logo"
            src={process.env.PUBLIC_URL + "/placeholder.jpg"}
          />
        </Drawer>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </Box>
  );
}
SleekDrawerNavigationAdmin.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default SleekDrawerNavigationAdmin;
