import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Header = ({ isAuth }) => {
  const auth = useContext(AuthContext);
  const classes = useStyles();

  const logoutHandler = () => {
    auth.logout();
  };
  const LinkRef = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <NavLink {...props} />
    </div>
  ));

  if (isAuth) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            />
            <Typography variant="h6" className={classes.title}>
              Сократи ссылку!!!
            </Typography>

            <Button color="inherit" component={LinkRef} to="/create">
              Create
            </Button>
            <Button color="inherit" component={LinkRef} to="/links">
              Links
            </Button>
            <Button color="inherit" onClick={logoutHandler}>
              Выйти
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  return <></>;
};
