import React, { useMemo, useEffect, useState } from "react";
import withWidth from "@material-ui/core/withWidth";
import { Redirect, useHistory } from "../helpers/history";
import { alpha, useTheme, makeStyles } from "@material-ui/core/styles";
import { useModulesManager } from "../helpers/modules";
import LogoutButton from "./LogoutButton";
import Help from "../pages/Help";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Tooltip,
  Button,
  Hidden,
  ClickAwayListener,
} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from "@material-ui/icons/Menu";
import Contributions from "./generics/Contributions";
import FormattedMessage from "./generics/FormattedMessage";
import MainMenuBar from "./MainMenuBar";
import JournalDrawer from "./JournalDrawer";
import { useBoolean, useAuthentication } from "../helpers/hooks";
import LanguageQuickPicker from "../pickers/LanguageQuickPicker";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Switch } from "@material-ui/core";
import { useTranslations } from "../helpers/i18n";
import { DEFAULT } from "../constants";

const DRAWER_COLLAPSED_STORAGE_KEY = 'openimis_drawer_collapsed';


export const APP_BAR_CONTRIBUTION_KEY = "core.AppBar";
export const MAIN_MENU_CONTRIBUTION_KEY = "core.MainMenu";
export const MAIN_SEARCHER_CONTRIBUTION_KEY = "core.MainSearcher";
export const ECONOMIC_UNIT_BUTTON_CONTRIBUTION_KEY = "policyholder.EconomicUnitChangeButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    verticalAlign: "middle",
    margin: theme.typography.title.fontSize / 2,
    maxHeight: theme.typography.title.fontSize * 2,
  },
  appBar: {
    paddingRight: theme.jrnlDrawer.close.width,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarDrawer: {
    margin: theme.spacing(-1, 0, -1, 0),
    paddingRight: theme.jrnlDrawer.close.width,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.secondary.second,
    color: theme.palette.text.primary
  },
  toolbarDrawer: {
    minHeight: 56,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  
  toolbarDrawerLogout: {
    color: theme.palette.text.primary,
    button: {
      margin: theme.spacing(2),
      color: theme.palette.text.primary,
    },
  },
  toolbarDrawerLanguage: {
    color: "white !important",
    "& .MuiSelect-root": {
      color: "white !important",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white !important",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white !important",
    },
    "& .MuiSelect-icon": {
      color: "white !important",
    },
    "& .MuiFormLabel-root": {
      color: "white !important",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white !important",
    },
  },
  toolbarDrawerSearch: {
    color: "white !important",
    "& .MuiInputBase-input": {
      color: "white !important",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white !important",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white !important",
    },
    "& .MuiFormLabel-root": {
      color: "white !important",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "white !important",
    },
  },
  
  appBarShift: {
    width: `calc(100% - ${theme.menu.drawer.width})`,
    marginLeft: theme.menu.drawer.width,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: theme.spacing(0, 1, 0, 1),
    padding: 0,
  },
  drawerMenuButton: {
    margin: theme.spacing(0, 1, 0, 0),
    padding: theme.spacing(0.5),
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  autoHideMenuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    marginTop: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.menu.drawer.width,
      flexShrink: 0,
    },
    backgroundColor: theme.menu.drawer.backgroundColor
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    margin: theme.spacing(1, 0, 1, 0),
    backgroundColor: theme.menu.drawer.backgroundColor
  },
  drawerPaper: {
    width: theme.menu.drawer.width,
    backgroundColor: theme.menu.drawer.backgroundColor,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperCollapsed: {
    width: 64,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerCollapsed: {
    width: 64,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    flexGrow: 1,
    paddingRight: theme.jrnlDrawer.close.width - theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.menu.drawer.width,
  },
  appName: {
    color: theme.palette.secondary.main,
    textTransform: "none",
    fontSize: theme.typography.title.fontSize,
  },
  appVersionsBox: {
    padding: 0,
    margin: 0,
    minWidth: theme.typography.title.fontSize / 2,
  },
  appVersions: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.title.fontSize / 2,
    verticalAlign: "text-bottom",
    marginRight: theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 10),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  drawer: {
    ...theme.mixins.toolbar,
    width: theme.menu.drawer.width,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.menu.drawer.width,
    backgroundColor: theme.menu.drawer.backgroundColor
  },
  drawerContainer: {
    overflow: 'auto',
  },
  contentShiftLeftSideMenu: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.menu.drawer.width,
    marginRight: theme.jrnlDrawer.close.width
  },
  contentShiftCollapsed: {
    marginLeft: 64,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const RequireAuth = (props) => {
  const {
    children,
    logo,
    whiteLogo,
    redirectTo,
    isSecondaryCalendar,
    setSecondaryCalendar,
    onEconomicDialogOpen,
    ...others
  } = props;  const [isOpen, setOpen] = useBoolean();
  const [isDrawerOpen, setDrawerOpen] = useBoolean();
  
  // Utiliser localStorage pour persister l'état du drawer
  const [isDrawerCollapsed, setDrawerCollapsedState] = useState(() => {
    const saved = localStorage.getItem(DRAWER_COLLAPSED_STORAGE_KEY);
    return saved ? JSON.parse(saved) : false;
  });

  // Sauvegarder l'état dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem(DRAWER_COLLAPSED_STORAGE_KEY, JSON.stringify(isDrawerCollapsed));
  }, [isDrawerCollapsed]);

  const setDrawerCollapsed = {
    toggle: () => setDrawerCollapsedState(prev => !prev),
    on: () => setDrawerCollapsedState(true),
    off: () => setDrawerCollapsedState(false),
  };

  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const auth = useAuthentication();
  const cfg = children.props.modulesManager.cfg;
  const calendarSwitch = modulesManager.getConf(
    "fe-core",
    "allowSecondCalendar",
    false,
  );
  const isWorker = modulesManager.getConf("fe-core", "isWorker", DEFAULT.IS_WORKER);
  const showJournalSidebar = modulesManager.getConf("fe-core", "showJournalSidebar", DEFAULT.SHOW_JOURNAL_SIDEBAR);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const journalDrawerEnabled = showJournalSidebar && !isSmallScreen;
  const isAppBarMenu = useMemo(() => theme.menu.variant.toUpperCase() === "APPBAR", [theme.menu.variant]);

  if (!auth.isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }
  if (cfg['openimis-fe-core_js']?.menuLeft === true) {
    const { formatMessage } = useTranslations("core", modulesManager);
    return (
      <>
        <AppBar position="fixed" className={classes.appBarDrawer}>
          <Toolbar className={classes.toolbarDrawer}>
            <Contributions {...others} contributionKey={APP_BAR_CONTRIBUTION_KEY}>
              <div className={classes.grow} />
            </Contributions>
            <div className={classes.toolbarDrawerLanguage}>
              <LanguageQuickPicker />
            </div>
            <LogoutButton className={classes.toolbarDrawerLogout}/>
            <Help />
          </Toolbar>
        </AppBar>
        <Drawer
          className={clsx(classes.drawer, {
            [classes.drawerCollapsed]: isDrawerCollapsed,
          })}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerPaperCollapsed]: isDrawerCollapsed,
            }),
          }}
          anchor="left"
        >
          <Button className={classes.appName} onClick={(e) => (window.location.href = "/front")}>
            <IconButton
              color="inherit"
              onClick={(e) => {
                e.stopPropagation();
                setDrawerCollapsed.toggle();
              }}
              className={classes.drawerMenuButton}
              size="small"
            >
              <MenuIcon />
            </IconButton>
            {!isDrawerCollapsed && (
              <>
                {isAppBarMenu && (
                  <Hidden smDown implementation="css">
                    <img className={classes.logo} src={isWorker && !!whiteLogo ? whiteLogo : logo} alt="Logo of openIMIS" />
                  </Hidden>
                )}
                <FormattedMessage module="core" id="appName" defaultMessage={<FormattedMessage id="root.appName" />} />
                <Hidden smDown implementation="css">
                  <Tooltip title={modulesManager.getModulesVersions().join(", ")}>
                    <Typography variant="caption" className={classes.appVersions}>
                      {modulesManager.getOpenIMISVersion()}
                    </Typography>
                  </Tooltip>
                </Hidden>
              </>
            )}
          </Button>
          <div className={classes.drawerContainer}></div>
            <MainMenuBar {...others} menuVariant="Drawer" contributionKey={MAIN_MENU_CONTRIBUTION_KEY} isDrawerCollapsed={isDrawerCollapsed}>
              <Divider />
            </MainMenuBar>
          <div/>
        </Drawer>  
        {journalDrawerEnabled && <JournalDrawer open={isDrawerOpen} handleDrawer={setDrawerOpen.toggle} />}
        <main
          className={clsx(classes.contentShiftLeftSideMenu, {
          [classes.contentShiftCollapsed]: isDrawerCollapsed,
        })}
          style={journalDrawerEnabled ? undefined : { marginRight: 0 }}
        >
          {children}
        </main>
      </>
    );
  }
  const { formatMessage } = useTranslations(module, modulesManager);
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx({
          [classes.appBarShift]: isOpen && theme.breakpoints.up("md"),
          [classes.appBar]: journalDrawerEnabled,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={setOpen.toggle}
            className={clsx(classes.menuButton, isAppBarMenu && classes.autoHideMenuButton, isOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Button className={classes.appName} onClick={(e) => history.push("/")}>
            {isAppBarMenu && (
              <Hidden smDown implementation="css">
                <img className={classes.logo} src={isWorker && !!whiteLogo ? whiteLogo : logo} alt="Logo of openIMIS" />
              </Hidden>
            )}
            {!isWorker && (
              <FormattedMessage module="core" id="appName" defaultMessage={<FormattedMessage id="root.appName" />} />
            )}
          </Button>
          <Hidden smDown implementation="css">
            <Tooltip title={modulesManager.getModulesVersions().join(", ")}>
              <Typography variant="caption" className={classes.appVersions}>
                {modulesManager.getOpenIMISVersion()}
              </Typography>
            </Tooltip>
          </Hidden>
          {isAppBarMenu && (
            <Hidden smDown implementation="css">
              <MainMenuBar {...others} menuVariant="AppBar" contributionKey={MAIN_MENU_CONTRIBUTION_KEY}>
                <div onClick={setOpen.off} />
              </MainMenuBar>
            </Hidden>
          )}
          {isWorker ? (
            <div className={classes.grow} />
          ) : (
            <Contributions {...others} contributionKey={APP_BAR_CONTRIBUTION_KEY}>
              <div className={classes.grow} />
            </Contributions>
          )}
          {!!calendarSwitch && (
            <FormControlLabel
              control={
                <Switch color="secondary" checked={isSecondaryCalendar} onChange={setSecondaryCalendar.toggle} />
              }
              label={formatMessage("core.calendarSwitcher")}
              labelPlacement="start"
            />
          )}
          <LanguageQuickPicker />
          <Contributions
            contributionKey={ECONOMIC_UNIT_BUTTON_CONTRIBUTION_KEY}
            onEconomicDialogOpen={onEconomicDialogOpen}
          />
          <LogoutButton />
          <Help />
        </Toolbar>
      </AppBar>
      {isOpen && (
        <ClickAwayListener onClickAway={setOpen.off}>
          <nav className={classes.drawer}>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={isOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <MainMenuBar {...others} menuVariant="Drawer" contributionKey={MAIN_MENU_CONTRIBUTION_KEY}>
                <Divider />
              </MainMenuBar>
            </Drawer>
          </nav>
        </ClickAwayListener>
      )}
      {journalDrawerEnabled && <JournalDrawer open={isDrawerOpen} handleDrawer={setDrawerOpen.toggle} />}
      <div className={classes.toolbar} />
      <main
        className={clsx({
          [classes.jrnlContentShift]: isDrawerOpen,
          [classes.content]: journalDrawerEnabled,
        })}
        style={journalDrawerEnabled ? undefined : { marginRight: 0 }}
      >
        {children}
      </main>
    </>
  );
};

export default withWidth()(RequireAuth);
