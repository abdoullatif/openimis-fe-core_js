import React, { useState, useEffect } from "react";
import { useHistory } from "../helpers/history";
import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, LinearProgress, Divider, Link, Typography } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useAuthentication } from "../helpers/hooks";
import Contributions from "./../components/generics/Contributions";
import { baseApiUrl } from "../actions";
import { DEFAULT, SAML_LOGIN_PATH } from "../constants";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => {
  // Construire le chemin de l'image en tenant compte du basename
  const basename = process.env.PUBLIC_URL || '/front';
  const imagePath = `${basename}/login-background.jpeg`;
  
  return {
    root: {
      minHeight: "100vh",
      backgroundImage: `url('${imagePath}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1,
      },
    },
  container: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(2),
  },
  loginCard: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: theme.spacing(2),
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    maxWidth: 450,
    width: "100%",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  logo: {
    width: "100%",
    padding: theme.spacing(2),
    maxWidth: 200,
    margin: "0 auto",
    display: "block",
  },
  formContainer: {
    padding: theme.spacing(4),
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  button: {
    marginTop: theme.spacing(2),
    height: 48,
    borderRadius: theme.spacing(1),
    textTransform: "none",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  forgotPassword: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
  backButton: {
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  },
  };
});

const LOGIN_PAGE_CONTRIBUTION_KEY = "core.LoginPage";
const LOGIN_PAGE_MPASS_CONTRIBUTION_KEY = "workerVoucher.MPassLoginButton";

const LoginPage = ({ logo }) => {
  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.LoginPage", modulesManager);
  const [credentials, setCredentials] = useState({});
  const [serverResponse, setServerResponse] = useState({ loginStatus: "", message: null });
  const auth = useAuthentication();
  const [isAuthenticating, setAuthenticating] = useState(false);
  const showMPassProvider = modulesManager.getConf("fe-core", "LoginPage.showMPassProvider", false);
  const linkToUserGuide = modulesManager.getConf("fe-core", "LoginPage.linkToUserGuide", "https://docs.openimis.org/");
  const isWorker = modulesManager.getConf("fe-core", "isWorker", DEFAULT.IS_WORKER);
  const enablePublicPage = modulesManager.getConf("fe-core", "App.enablePublicPage", DEFAULT.ENABLE_PUBLIC_PAGE);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const handleLoginError = (errorMessage) => {
    setServerResponse({ loginStatus: "CORE_AUTH_ERR", message: errorMessage });
    setAuthenticating(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setAuthenticating(true);
  
    try {
      const response = await auth.login(credentials);
      if (response.payload?.errors?.length) {
        handleLoginError(response.payload.errors[0].message);
        return;
      }
  
      const { loginStatus, message } = response;
      setServerResponse({ loginStatus, message });
  
      if (loginStatus === "CORE_AUTH_ERR") {
        setAuthenticating(false);
      } else {
        history.push("/");
      }
    } catch (error) {
      setAuthenticating(false);
    }
  };
  

  const redirectToForgotPassword = (e) => {
    e.preventDefault();
    history.push("/forgot_password");
  };

  const errorMessages = {
    INCORRECT_CREDENTIALS: formatMessage("core.LoginPage.authError"),
    HF_CONTRACT_INVALID: formatMessage("core.LoginPage.authErrorHealthFacilityContractInvalid"),
    GENERAL: formatMessage("core.LoginPage.authErrorGeneral"),
  };

  const getErrorMessage = (messageKey) => {
    return errorMessages[messageKey] || messageKey;
  };

  const redirectToMPassLogin = (e) => {
    e.preventDefault();
    const redirectToURL = new URL(`${window.location.origin}${baseApiUrl}${SAML_LOGIN_PATH}`);

    window.location.href = redirectToURL.href;
  };

  return (
    <div className={classes.root}>
      <Helmet title={formatMessage("pageTitle")} />
      
      {isAuthenticating && (
        <Box position="absolute" top={0} left={0} right={0} zIndex={3}>
          <LinearProgress className="bootstrap" />
        </Box>
      )}
      
      {enablePublicPage && (
        <Box position="absolute" top={20} left={20} zIndex={3}>
          <Button
            onClick={() => history.push("/")}
            startIcon={<ArrowBackIcon />}
            className={classes.backButton}
            variant="contained"
          >
            {formatMessage("backButton")}
          </Button>
        </Box>
      )}
      
      <div className={classes.container}>
        <Paper className={classes.loginCard} elevation={0}>
          <Box className={classes.formContainer}>
            <Box textAlign="center" mb={3}>
              <img className={classes.logo} src={logo} alt="Logo" />
              {!isWorker && (
                <Typography variant="h4" className={classes.title}>
                  {formatMessage("appName")}
                </Typography>
              )}
            </Box>
            
            <form onSubmit={onSubmit}>
              <Grid container spacing={3} direction="column">
                {showMPassProvider ? (
                  <Grid item>
                    <Box display="flex" alignItems="center" justifyContent="center" my={2}>
                      <Typography style={{ textTransform: "uppercase" }} variant="body2">
                        {formatMessage("loginCaption")}
                      </Typography>
                    </Box>
                    <Contributions contributionKey={LOGIN_PAGE_MPASS_CONTRIBUTION_KEY} onClick={redirectToMPassLogin} />
                    <Box display="flex" alignItems="center" mt={4} mb={2}>
                      <Divider style={{ flex: 1 }} />
                      <Link
                        href={linkToUserGuide}
                        underline="hover"
                        style={{ margin: "0 12px", cursor: "pointer" }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography style={{ textTransform: "uppercase" }} variant="body1">
                          {formatMessage("howToUse")}
                        </Typography>
                      </Link>
                      <Divider style={{ flex: 1 }} />
                    </Box>
                  </Grid>
                ) : (
                  <>
                    <Grid item>
                      <TextInput
                        required
                        readOnly={isAuthenticating}
                        label={formatMessage("username.label")}
                        fullWidth
                        defaultValue={credentials.username}
                        onChange={(username) => setCredentials({ ...credentials, username })}
                      />
                    </Grid>
                    <Grid item>
                      <TextInput
                        required
                        readOnly={isAuthenticating}
                        type="password"
                        label={formatMessage("password.label")}
                        fullWidth
                        onChange={(password) => setCredentials({ ...credentials, password })}
                      />
                    </Grid>
                    {serverResponse?.message && (
                      <Grid item>
                        <Box color="error.main" textAlign="center">
                          {getErrorMessage(serverResponse.message)}
                        </Box>
                      </Grid>
                    )}
                    <Grid item>
                      <Button
                        fullWidth
                        type="submit"
                        disabled={isAuthenticating || !(credentials.username && credentials.password)}
                        color="primary"
                        variant="contained"
                        className={classes.button}
                      >
                        {formatMessage("loginBtn")}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button 
                        onClick={redirectToForgotPassword}
                        className={classes.forgotPassword}
                        variant="text"
                      >
                        {formatMessage("forgotPassword")}
                      </Button>
                      <Contributions contributionKey={LOGIN_PAGE_CONTRIBUTION_KEY} />
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
