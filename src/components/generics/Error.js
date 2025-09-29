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

  useEffect(() => {
    // Détecter les erreurs CSRF et rediriger automatiquement
    if (error && 
        (error.detail?.includes("CSRF token missing or incorrect") ||
         error.detail?.includes("CSRF token") ||
         error.message?.includes("CSRF token"))) {
      
      // Nettoyer les tokens et rediriger vers login
      localStorage.removeItem('csrfToken');
      dispatch(logout());
      
      // Rediriger vers la page de login
      const basename = process.env.PUBLIC_URL || '/front';
      window.location.href = `${basename}/login`;
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
