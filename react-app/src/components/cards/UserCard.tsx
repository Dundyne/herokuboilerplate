import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { IUserProps } from "../../interfaces/IUser";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    marginBottom: 0,
    padding: 0,
    "&:hover": {
      boxShadow: "17px 17px 18px #D4D2D2",
      transition: "all 0.2s ease-in",
    },
  },
  media: {
    height: 100,
  },

  card: {
    maxWidth: 345,
  },
  redbutton: {
    backgroundColor: "#c70000",
    color: "white",

    "&:hover": {
      backgroundColor: "#3b0000",
    },
  },

  greenbutton: {
    color: "white",
    backgroundColor: "#008040",

    "&:hover": {
      backgroundColor: "#408000",
    },
  },
});

const UserCard = ({ props }: IUserProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onMouseOver={() => ({ shadow: 1 })}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {props.firstName} {props.lastName}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {props.email}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.password}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {props.role}
        </Typography>
      </CardContent>

      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant={"contained"}
          className={classes.greenbutton}
          endIcon={<EditIcon></EditIcon>}
          size={"large"}
        >
          Rediger bruker
        </Button>

        <Button
          variant={"contained"}
          className={classes.redbutton}
          endIcon={<DeleteIcon></DeleteIcon>}
          size={"large"}
        >
          Slett bruker
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
