import React from "react";

import { IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { HelpOutline } from "@material-ui/icons";

import { useModulesManager } from "@openimis/fe-core";
import { CORE_MIS_CONFLUENCE_URL, DEFAULT_URL, MODULE_NAME } from "../constants";
import { useTranslations } from "../helpers/i18n";
import { useHistory } from "../helpers/history";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
});

const Help = ({ classes }) => {
  const modulesManager = useModulesManager();
  const history = useHistory();
  const { formatMessage } = useTranslations(MODULE_NAME, modulesManager);
  const useInternalHelp = modulesManager.getConf("fe-core", "useInternalHelp", true);
  
  const onClick = () => {
    if (useInternalHelp) {
      // Rediriger vers la page d'aide interne
      history.push("/help");
    } else {
      // Ouvrir l'URL externe (comportement par défaut)
      const isCoreMISHelp = modulesManager.getConf("fe-core", "redirectToCoreMISConfluenceUrl", false);
      const url = isCoreMISHelp ? CORE_MIS_CONFLUENCE_URL : DEFAULT_URL;
      window.open(url);
    }
  };

  return (
    <Tooltip title={formatMessage("core.tooltip.help")}>
      <IconButton className={classes.button} onClick={onClick}>
        <HelpOutline />
      </IconButton>
    </Tooltip>
  );
};

export default withStyles(styles)(Help);
