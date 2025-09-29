import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import {
  HelpOutline,
  Info,
  QuestionAnswer,
  ContactSupport,
  Book,
  VideoLibrary,
  Phone,
} from "@material-ui/icons";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
  },
  card: {
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[2],
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  icon: {
    color: theme.palette.primary.main,
  },
  contactCard: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

const HelpPage = () => {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core", modulesManager);

  const helpSections = [
    {
      title: "Guide de démarrage",
      items: [
        "Comment se connecter à l'application",
        "Navigation dans l'interface",
        "Configuration de votre profil",
        "Premiers pas avec le système",
      ],
    },
    {
      title: "Fonctionnalités principales",
      items: [
        "Gestion des utilisateurs",
        "Configuration des modules",
        "Rapports et statistiques",
        "Administration système",
      ],
    },
    {
      title: "Résolution de problèmes",
      items: [
        "Problèmes de connexion",
        "Erreurs courantes",
        "Restauration de mot de passe",
        "Support technique",
      ],
    },
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Centre d'aide ANIES
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Trouvez rapidement les réponses à vos questions
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {helpSections.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" className={classes.sectionTitle}>
                    {section.title}
                  </Typography>
                  <List>
                    {section.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} className={classes.listItem}>
                        <ListItemIcon>
                          <Info className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card className={`${classes.card} ${classes.contactCard}`}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <ContactSupport style={{ marginRight: 16, fontSize: 32 }} />
              <Typography variant="h5">
                Besoin d'aide supplémentaire ?
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Notre équipe de support est là pour vous aider. N'hésitez pas à nous contacter
              si vous avez des questions ou des problèmes techniques.
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center">
                <ContactSupport style={{ marginRight: 8 }} />
                <Typography>support@anies.org</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone style={{ marginRight: 8 }} />
                <Typography>+221 XX XX XX XX</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default HelpPage;
