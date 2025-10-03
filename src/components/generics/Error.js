import React, { Fragment, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";

const styles = (theme) => ({
  error: {
    padding: theme.spacing(2),
  },
  errorHeader: {
    color: theme.palette.error.main,
  },
  errorDetail: {
    color: theme.palette.error.main,
  },
});

function Error(props) {
  const { classes, error } = props;
  const dispatch = useDispatch();
  
  // Intercepter les erreurs CSRF et déclencher un logout
  useEffect(() => {
    if (error && 
        error.message === "Server returned data error status" && 
        error.detail?.includes("CSRF token missing or incorrect")) {
      // Logout immédiat en cas d'erreur CSRF
      dispatch(logout());
    }
  }, [error, dispatch]);
  
  return (
    <div className={classes.error}>
      <Typography variant="h6" className={classes.errorHeader}>
        {error.code} {error.code && ": "} {error.message}
      </Typography>
      {!!error.detail && (
        <Fragment>
          <Divider />
          <Typography variant="body1" className={classes.errorDetail}>
            {error.detail}
          </Typography>
        </Fragment>
      )}
    </div>
  );
}

export default withStyles(styles)(Error);
