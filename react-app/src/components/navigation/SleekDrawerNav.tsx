import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Box, Button, SvgIcon } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ContactMailSharpIcon from "@material-ui/icons/ContactMailSharp";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    //display: "flex",
  },
  drawer: {
    width: drawerWidth,
    //flexShrink: 0,
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

  menuItems: {
    opacity: "100%",
    color: "#FFFFFF",
    marginTop: theme.spacing(2),
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: "lightgreen",
      opacity: "100%",
      textUnderlineOffset: "30px",
    },
  },
  toolbar: {},

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
  },

  content: {},
  closeMenuButton: {
    marginLeft: "auto",
    marginRight: 0,
  },
}));

function SleekDrawerNav() {
  const headersData = [
    {
      label: "HJEM",
      href: "/",
      comp: HomeIcon,
    },
    {
      label: "VÅRE LEILIGHETER",
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
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [newPage, setNewPage] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  function checkNewPage() {
    setNewPage(!newPage);
    handleDrawerToggle();
    setNewPage(!newPage);
  }
  const getMenuButtons = () => {
    return headersData.map(({ label, href, comp }: any) => {
      return (
        <Box>
          <Button
            onClick={checkNewPage}
            {...{
              key: label,
              to: href,
              component: RouterLink,
              className: classes.menuItems,
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
    <Box>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "left" : "right"}
          open={mobileOpen}
          onClose={checkNewPage}
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

          <Typography
            color="textPrimary"
            variant="h6"
            component="h6"
            className={classes.title}
          >
            Placeholder
          </Typography>

          {getMenuButtons()}

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
SleekDrawerNav.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};
export default SleekDrawerNav;
