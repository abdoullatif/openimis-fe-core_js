import React, { Component, Fragment } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import {
  Fab,
  Grid,
  Paper,
  IconButton,
  Typography,
  Divider,
  CircularProgress,
  Backdrop,
  Fade,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import FormattedMessage from "./FormattedMessage";
import Contributions from "./Contributions";
import withHistory from "../../helpers/history";
import { withTooltip, formatMessage } from "../../helpers/i18n";

const styles = (theme) => ({
  paper: theme.paper.paper,
  paperHeader: theme.paper.header,
  paperHeaderAction: theme.paper.action,
  tooltipContainer: theme.tooltipContainer,
  flexTooltip: theme.flexTooltip,
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

// Alert Material-UI helper
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Form extends Component {
  state = {
    dirty: false,
    saving: false,
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarSeverity: "success",
  };

  componentDidMount() {
    if (!!this.props.forcedDirty) {
      this.setState({ dirty: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset || prevProps.edited_id !== this.props.edited_id) {
      this.setState({ dirty: false, saving: false });
    } else if (!this.state.dirty && !!this.props.forcedDirty) {
      this.setState({ dirty: true });
    } else if (prevProps.update !== this.props.update) {
      // Si une mise à jour est détectée, stopper le loader et afficher succès
      this.setState({
        saving: false,
        snackbarOpen: true,
        snackbarMessage: "Enregistrement réussi !",
        snackbarSeverity: "success",
      });
    } else if (prevProps.error !== this.props.error && this.props.error) {
      // Gestion d'une erreur
      this.setState({
        saving: false,
        snackbarOpen: true,
        snackbarMessage: "Erreur lors de l’enregistrement.",
        snackbarSeverity: "error",
      });
    }
  }

  onEditedChanged = (data) => {
    this.setState({ dirty: true }, () => this.props.onEditedChanged(data));
  };

  save = (data) => {
    this.setState({ saving: true }, this.props.save(data));
  };

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const {
      classes,
      module,
      back,
      add,
      addTooltip,
      openDirty = false,
      save,
      canSave,
      saveTooltip,
      actions = [],
      fab = null,
      fabAction = null,
      fabTooltip = null,
      title,
      titleParams = [],
      HeadPanel,
      headPanelContributionsKey,
      Panels,
      contributedPanelsKey = null,
      additionalTooltips = null,
      enableActionButtons = false,
      ...others
    } = this.props;

    const defaultTooltips = [
      {
        condition: !this.state.dirty && !!add && !save,
        content: (
          <span>
            <Fab color="primary" onClick={add}>
              <AddIcon />
            </Fab>
          </span>
        ),
        tooltip: addTooltip || formatMessage(this.props.intl, module, "addTooltip"),
      },
      {
        condition: (!!this.state.dirty || !!openDirty) && !!save,
        content: (
          <span>
            <div style={{ position: "relative" }}>
              <Fab
                color="primary"
                disabled={!!this.state.saving || (!!canSave && !canSave())}
                onClick={(e) => this.save(this.props.edited)}
              >
                {this.state.saving ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SaveIcon />
                )}
              </Fab>
            </div>
          </span>
        ),
        tooltip: saveTooltip || formatMessage(this.props.intl, module, "saveTooltip"),
      },
      {
        condition: (!!this.state.dirty || !!openDirty) && !!fab,
        content: (
          <span>
            <Fab color="primary" onClick={(e) => fabAction(this.props.edited)}>
              {fab}
            </Fab>
          </span>
        ),
        tooltip: fabTooltip,
      },
    ];

    const allTooltips = [...(additionalTooltips || []), ...defaultTooltips];
    const filteredTooltips = allTooltips.filter((tooltip) => tooltip.condition);

    return (
      <Fragment>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* === HEADER === */}
                <Grid container alignItems="center" direction="row" className={classes.paperHeader}>
                  <Grid item xs={8}>
                    <Grid container alignItems="center">
                      {!!back && (
                        <Grid item>
                          <IconButton onClick={back}>
                            <ChevronLeftIcon />
                          </IconButton>
                        </Grid>
                      )}
                      {!!title && (
                        <Grid item>
                          <Typography variant="h6">
                            <FormattedMessage module={module} id={title} values={titleParams} />
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  {!!actions && (
                    <Grid item xs={4}>
                      <Grid container justify="flex-end">
                        {actions.map((a, idx) => {
                          if (!!a.onlyIfDirty && !this.state.dirty) return null;
                          if (!!a.onlyIfNotDirty && !!this.state.dirty) return null;
                          return (
                            <Grid item key={`form-action-${idx}`} className={classes.paperHeaderAction}>
                              {withTooltip(
                                !!a.button ? (
                                  a.button
                                ) : (
                                  <IconButton onClick={a.doIt} disabled={a?.disabled}>
                                    {a.icon}
                                  </IconButton>
                                ),
                                a.tooltip
                              )}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                {/* === HEAD PANEL === */}
                {(HeadPanel || headPanelContributionsKey) && (
                  <Grid item xs={12}>
                    {!!HeadPanel && (
                      <HeadPanel
                        edited={this.props.edited}
                        edited_id={this.props.edited_id}
                        {...others}
                        onEditedChanged={this.onEditedChanged}
                      />
                    )}
                    {!!headPanelContributionsKey && (
                      <Contributions {...others} contributionKey={headPanelContributionsKey} />
                    )}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>

          {/* === PANELS === */}
          {!!Panels &&
            Panels.map((P, idx) => (
              <Grid key={`form_panel_${idx}`} item xs={12}>
                <P
                  {...others}
                  edited={this.props.edited}
                  edited_id={this.props.edited_id}
                  save={this.save}
                  isSaving={this.state.saving}
                  canSave={this.props.canSave}
                  onEditedChanged={this.onEditedChanged}
                />
              </Grid>
            ))}

          {/* === CONTRIBUTIONS PANELS === */}
          {!!contributedPanelsKey && (
            <Contributions
              {...this.props}
              onEditedChanged={this.onEditedChanged}
              contributionKey={contributedPanelsKey}
            />
          )}
        </form>

        {/* === FLOATING ACTION BUTTONS === */}
        {!enableActionButtons && (
          <div className={classes.tooltipContainer}>
            {filteredTooltips.map((item, index) => (
              <div className={classes.flexTooltip} key={index}>
                {withTooltip(item.content, item.tooltip, index === 0 ? "top" : "left")}
              </div>
            ))}
          </div>
        )}

        {/* === BACKDROP LOADING OVERLAY === */}
        <Fade in={this.state.saving} timeout={{ enter: 300, exit: 300 }}>
          <Backdrop className={classes.backdrop} open={this.state.saving}>
            <CircularProgress color="inherit" />
            <Typography variant="subtitle1">Enregistrement en cours...</Typography>
          </Backdrop>
        </Fade>

        {/* === SNACKBAR NOTIFICATIONS === */}
        <Snackbar
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={this.handleSnackbarClose} severity={this.state.snackbarSeverity}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

export default withHistory(injectIntl(withTheme(withStyles(styles)(Form))));
