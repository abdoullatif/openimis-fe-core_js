import React, { useState } from "react";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  HelpOutline,
  Info,
  QuestionAnswer,
  ContactSupport,
  Book,
  VideoLibrary,
  Phone,
  ExpandMore,
  People,
  Payment,
  Assignment,
  Dashboard,
  Security,
  Settings,
  PersonAdd,
  GroupAdd,
  FileUpload,
  Receipt,
  Gavel,
  Assessment,
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
  accordion: {
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[1],
  },
  accordionTitle: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  stepNumber: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '50%',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
  stepContent: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  roleChip: {
    margin: theme.spacing(0.5),
  },
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  faqItem: {
    marginBottom: theme.spacing(2),
  },
  faqQuestion: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  faqAnswer: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const HelpPage = () => {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core", modulesManager);

  const [expanded, setExpanded] = useState('intro');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const StepComponent = ({ number, children }) => (
    <Box className={classes.stepContent}>
      <Box className={classes.stepNumber}>{number}</Box>
      <Typography variant="body2">{children}</Typography>
    </Box>
  );

  const roles = [
    { name: "Administrateur système", description: "Accès complet à toutes les fonctionnalités et paramètres" },
    { name: "Direction", description: "Accès au tableau de bord, rapports et fonctions de supervision" },
    { name: "Coordinateur", description: "Gestion des opérations et supervision des équipes" },
    { name: "Gestionnaire financier", description: "Accès aux paiements et rapports financiers" },
    { name: "Agent de terrain", description: "Suivi des bénéficiaires et gestion des plaintes" },
    { name: "Sauvegarde", description: "Gestion des réclamations" },
    { name: "Auditeur", description: "Accès en lecture seule à toutes les données" },
  ];

  const faqData = [
    {
      question: "Comment réinitialiser mon mot de passe ?",
      answer: "Cliquez sur 'Mot de passe oublié' sur l'écran de connexion et suivez les instructions."
    },
    {
      question: "Que faire si un transfert est bloqué ?",
      answer: "Vérifiez le statut dans la section Paiements, notez le code d'erreur et contactez l'administrateur système."
    },
    {
      question: "Comment ajouter plusieurs bénéficiaires à la fois ?",
      answer: "Utilisez la fonction d'import, en téléchargeant le fichier .CSV"
    },
    {
      question: "Où trouver l'historique des modifications d'un bénéficiaire ?",
      answer: "Dans la fiche du bénéficiaire, cliquez sur l'onglet 'Historique'."
    }
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Box className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            COREMIS - Manuel d'Utilisateur
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Guide complet pour l'utilisation du système de gestion de la protection sociale
          </Typography>
          <Chip 
            label="Version 2.0.0 - Mars 2026" 
            color="primary" 
            style={{ marginTop: 16 }}
          />
        </Box>

        {/* Introduction */}
        <Accordion 
          expanded={expanded === 'intro'} 
          onChange={handleChange('intro')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Info className={classes.icon} style={{ marginRight: 8 }} />
              Introduction et Présentation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="h6" gutterBottom>
                Présentation du COREMIS
              </Typography>
              <Typography paragraph>
                COREMIS (Core Management Information System) est un logiciel open source polyvalent conçu pour prendre en charge l'administration des régimes de protection sociale, notamment les transferts monétaires inconditionnels. Le système est accessible via la plateforme www.nafa-mis.com et offre une solution complète pour la gestion des bénéficiaires, des paiements, des prestataires et des plaintes.
              </Typography>
              <Typography paragraph>
                Développé avec des technologies modernes comme React pour l'interface utilisateur, Django pour le back-end, GraphQL pour l'API et PostgreSQL pour la base de données, COREMIS est une solution robuste, flexible et évolutive qui s'adapte aux besoins spécifiques des programmes de protection sociale.
              </Typography>
              
              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>
                Public cible
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Direction :</Typography>
                  <Typography variant="body2">• Directeur Général, Directrice Générale Adjointe</Typography>
                  <Typography variant="body2">• Coordinateur</Typography>
                  <Typography variant="body2">• Responsable administratif et financier</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>Départements spécialisés :</Typography>
                  <Typography variant="body2">• Directrice d'inclusion financière</Typography>
                  <Typography variant="body2">• Directrice système d'information</Typography>
                  <Typography variant="body2">• DevOps, Experts, Spécialistes</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>
                Configuration requise
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Un ordinateur ou appareil mobile avec connexion Internet" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Un navigateur web récent (Chrome, Firefox, Safari ou Edge recommandés)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Vos identifiants de connexion (nom d'utilisateur et mot de passe)" />
                </ListItem>
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Démarrage */}
        <Accordion 
          expanded={expanded === 'start'} 
          onChange={handleChange('start')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Settings className={classes.icon} style={{ marginRight: 8 }} />
              Démarrage et Authentification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography variant="h6" gutterBottom>Accès au système</Typography>
              <StepComponent number="1">Ouvrez votre navigateur web</StepComponent>
              <StepComponent number="2">Saisissez l'adresse suivante dans la barre d'adresse : https://www.nafa-mis.com</StepComponent>
              <StepComponent number="3">La page d'accueil du COREMIS s'affiche</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Authentification</Typography>
              <StepComponent number="1">Sur la page d'accueil</StepComponent>
              <StepComponent number="2">Saisissez votre identifiant et votre mot de passe dans les champs appropriés</StepComponent>
              <StepComponent number="3">Cliquez sur le bouton "Login" (Se connecter)</StepComponent>
              <StepComponent number="4">Vous pouvez changer votre mot de passe dans les paramètres de votre profil</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                Note : Pour des raisons de sécurité, votre mot de passe doit contenir au moins 8 caractères, incluant des lettres majuscules, minuscules, des chiffres et des caractères spéciaux.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Protection Sociale */}
        <Accordion 
          expanded={expanded === 'social'} 
          onChange={handleChange('social')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <People className={classes.icon} style={{ marginRight: 8 }} />
              Protection Sociale
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                La section Protection sociale vous permet de créer, consulter, modifier et gérer les régimes d'avantages sociaux (programmes), ainsi que les informations relatives aux bénéficiaires.
              </Typography>

              <Typography variant="h6" gutterBottom>Création d'un nouveau régime de prestation (Programme)</Typography>
              <StepComponent number="1">Accédez à la section "Régime d'avantages sociaux" depuis le menu principal</StepComponent>
              <StepComponent number="2">Utilisez le bouton + en bas à droite de l'écran</StepComponent>
              <StepComponent number="3">Vous devez renseigner : code, nom, date de début, date de fin, nombre maximal de bénéficiaires, institution, type (Individu ou Groupe), description, schéma</StepComponent>
              <StepComponent number="4">Cliquez sur "Télécharger" pour charger la liste des bénéficiaires du programme à partir d'un fichier CSV</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Enregistrement des bénéficiaires</Typography>
              <StepComponent number="1">Accédez à la section "Régime d'avantages sociaux" depuis le menu principal</StepComponent>
              <StepComponent number="2">Cliquez sur le régime de prestation via l'icône "crayon" à droite de l'écran</StepComponent>
              <StepComponent number="3">Puis cliquez sur "Télécharger" pour charger la liste des bénéficiaires du programme à partir d'un fichier CSV</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Recherche de bénéficiaires</Typography>
              <StepComponent number="1">Accédez à la section "Individus" depuis le menu principal</StepComponent>
              <StepComponent number="2">Utilisez la barre de recherche</StepComponent>
              <StepComponent number="3">Vous pouvez rechercher par : Nom et prénom, Région/localité, Préfecture/localité, Sous-préfecture/localité, District/localité</StepComponent>
              <StepComponent number="4">Les résultats s'affichent sous forme de liste avec les informations principales</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Créer un groupe (Ménage)</Typography>
              <StepComponent number="1">Accédez à la section "Groupes" depuis le sous-menu de Protection sociale</StepComponent>
              <StepComponent number="2">Utilisez le bouton + en bas à droite de l'écran</StepComponent>
              <StepComponent number="3">Vous devez renseigner : code et localités jusqu'au niveau district</StepComponent>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Gestion des Paiements */}
        <Accordion 
          expanded={expanded === 'payments'} 
          onChange={handleChange('payments')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Payment className={classes.icon} style={{ marginRight: 8 }} />
              Gestion des Paiements
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                La section Paiements est l'une des fonctionnalités principales du COREMIS, permettant d'initier et de suivre les transferts monétaires vers les bénéficiaires.
              </Typography>

              <Typography variant="h6" gutterBottom>Initiation d'un transfert monétaire</Typography>
              <Typography variant="subtitle2" gutterBottom>Étape 1 : Enregistrer le prestataire</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Points de paiement"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + en bas à droite de l'écran pour créer un point de paiement</StepComponent>
              <StepComponent number="3">Sélectionnez la localité d'intervention de l'opérateur, jusqu'au niveau district</StepComponent>
              <StepComponent number="4">Sélectionnez un gestionnaire de points de paiement</StepComponent>
              <StepComponent number="5">Le Nom du point de paiement (opérateur)</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 2 : Planifier un paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Plans de paiement"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + en bas à droite de l'écran pour créer un plan de paiement</StepComponent>
              <StepComponent number="3">Dans le champ type, sélectionnez "Régime d'avantages sociaux"</StepComponent>
              <StepComponent number="4">Renseignez : code du plan de paiement, nom, règle de calcul, Benefit Plan, date de début, date de fin</StepComponent>
              <StepComponent number="5">Une fois le plan créé, il est soumis pour validation dans la gestion des tâches, et un email est envoyé au validateur pour l'alerter</StepComponent>
              <StepComponent number="6">Lorsque la validation est terminée, l'initiateur du plan reçoit une alerte de validation ou de rejet</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 3 : Enregistrer le cycle de paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Cycle de paiement"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + en bas à droite de l'écran pour créer un cycle de paiement</StepComponent>
              <StepComponent number="3">Renseignez : code du cycle de paiement, date de début, date de fin, statut</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 4 : Créer le paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Paiements"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + en bas à droite de l'écran pour créer un paiement</StepComponent>
              <StepComponent number="3">Renseignez un nom pour le paiement, puis sélectionnez le plan de paiement, le prestataire et le mode de paiement (Offline ou Online)</StepComponent>
              <StepComponent number="4">Toujours dans la section "Paiements", une fonctionnalité de gestion du rapport de paiement est disponible</StepComponent>
              <StepComponent number="5">Lorsque l'opérateur renvoie les paiements pour réconciliation et transmet un rapport PDF sur les opérations terrain, ce rapport doit être chargé dans le COREMIS avant la clôture de la campagne de transfert monétaire</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                NB : la stratégie Offline permet d'effectuer un paiement sans intégration avec l'API de l'opérateur. La stratégie Online permet d'effectuer un paiement par interconnexion entre le COREMIS et le système de l'opérateur.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Gestion des Tâches */}
        <Accordion 
          expanded={expanded === 'tasks'} 
          onChange={handleChange('tasks')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Assignment className={classes.icon} style={{ marginRight: 8 }} />
              Gestion des Tâches
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                La gestion des tâches permet de visualiser les tâches en attente d'approbation et les groupes d'utilisateur qui devront approuver ces tâches. Dès qu'une tâche est lancée, elle apparaît dans la liste des tâches avec un statut.
              </Typography>

              <Typography variant="h6" gutterBottom>Créer un groupe d'utilisateur pour exécuter une tâche</Typography>
              <StepComponent number="1">Dans la section "Gestion des tâches", cliquez sur "Groupes d'exécutant de tâche"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + en bas à droite de l'écran pour créer un groupe d'exécutants de tâches</StepComponent>
              <StepComponent number="3">Vous devez ensuite renseigner : un code pour le groupe d'exécutants, le statut de la police, les exécutants, puis la source des tâches</StepComponent>
              <StepComponent number="4">Puis cliquez sur le bouton disquette en bas à droite de l'écran pour enregistrer et créer le groupe d'exécutants</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Valider une tâche</Typography>
              <StepComponent number="1">Dans la section "Toutes les tâches", cliquez sur la tâche que vous souhaitez valider via l'icône œil à droite</StepComponent>
              <StepComponent number="2">Consultez les détails de la tâche, puis faites défiler vers le bas pour valider ou rejeter</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                NB : une mise à jour a été faite. Désormais, dès qu'une tâche est créée, une alerte email est envoyée automatiquement au groupe ou à la personne qui doit valider. Lorsqu'une personne valide, les autres membres du groupe sont alertés de la personne ayant validé et de celles en attente de validation. Enfin, lorsque tout le monde a validé et que la tâche passe au statut completed, un email est envoyé à l'initiateur pour l'alerter que la tâche est finalisée.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Suivi-Évaluation */}
        <Accordion
          expanded={expanded === 'monitoring'}
          onChange={handleChange('monitoring')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Assessment className={classes.icon} style={{ marginRight: 8 }} />
              Suivi-Évaluation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                Le module Suivi-Évaluation permet de suivre, analyser et rapporter les performances des projets et programmes à travers des indicateurs définis et mesurés périodiquement. Il constitue un outil d'aide à la décision, de redevabilité et de pilotage stratégique.
              </Typography>

              <Typography variant="h6" gutterBottom>Objectifs du module</Typography>
              <Typography variant="body2">- Centraliser l'ensemble des indicateurs de performance du projet</Typography>
              <Typography variant="body2">- Suivre l'évolution des indicateurs dans le temps</Typography>
              <Typography variant="body2">- Comparer les valeurs réalisées aux cibles prévues</Typography>
              <Typography variant="body2">- Faciliter la prise de décision basée sur les données</Typography>
              <Typography variant="body2">- Générer des tableaux de bord et des rapports exploitables</Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Accès au module</Typography>
              <StepComponent number="1">Connectez-vous à la plateforme Core MIS avec vos identifiants</StepComponent>
              <StepComponent number="2">Depuis le menu principal, cliquez sur "Suivi-Évaluation"</StepComponent>
              <StepComponent number="3">Accédez ensuite au tableau de bord ou à l'un des sous-menus disponibles selon votre profil</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Sous-menus disponibles</Typography>
              <Typography variant="subtitle2" gutterBottom>Indicateur PIP</Typography>
              <Typography paragraph>
                Ce sous-menu permet de gérer les indicateurs du Programme d'Inclusion Productive (PIP) : consultation de la liste, saisie et mise à jour des valeurs, suivi de l'évolution dans le temps et validation selon les droits de l'utilisateur.
              </Typography>
              <Typography variant="subtitle2" gutterBottom>Cadre de résultat</Typography>
              <Typography paragraph>
                Ce sous-menu permet de gérer les indicateurs stratégiques du projet, de visualiser les performances par période sous forme de tableaux et graphiques, et d'exporter les données pour les rapports de suivi-évaluation.
              </Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Gestion des indicateurs</Typography>
              <StepComponent number="1">Cliquez sur l'un des sous-menus "Indicateur PIP" ou "Cadre de résultat"</StepComponent>
              <StepComponent number="2">Utilisez la section de filtres pour affiner l'affichage selon le code, le libellé, le type d'indicateur, la période, le module ou le statut</StepComponent>
              <StepComponent number="3">Consultez le tableau central des indicateurs avec les informations principales : code, intitulé, description, méthode de calcul, fréquence, dernière valeur, statut et actions disponibles</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Visualisation d'un indicateur</Typography>
              <StepComponent number="1">Depuis la liste des indicateurs, double-cliquez sur la ligne de l'indicateur souhaité</StepComponent>
              <StepComponent number="2">Consultez l'en-tête de l'indicateur, les informations générales, les valeurs et statuts, l'historique des valeurs ainsi que l'évolution graphique</StepComponent>
              <StepComponent number="3">Selon vos droits, utilisez les actions disponibles : modification, impression, export PDF ou validation d'une valeur</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Ajout d'une valeur manuelle</Typography>
              <StepComponent number="1">Ouvrez la fiche d'un indicateur dont la méthode de calcul est définie comme manuelle</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton + dans la section "Valeurs & Statut"</StepComponent>
              <StepComponent number="3">Renseignez la valeur, la date de début de période et la date de fin de période, puis cliquez sur "Enregistrer"</StepComponent>
              <StepComponent number="4">La valeur est ajoutée à l'historique avec le statut "En attente de validation" jusqu'à sa validation</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                NB : seuls les indicateurs à méthode manuelle peuvent recevoir une saisie via cette fenêtre. Une période ne peut pas se chevaucher avec une période existante pour le même indicateur, et pour les indicateurs cumulatifs, la valeur saisie doit être supérieure ou égale à la dernière valeur enregistrée.
              </Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Ajout d'un indicateur</Typography>
              <StepComponent number="1">Accédez au menu "Suivi-Évaluation", puis ouvrez "Indicateur PIP" ou "Cadre de résultat"</StepComponent>
              <StepComponent number="2">Cliquez sur le bouton d'ajout d'indicateur (+) en bas à droite</StepComponent>
              <StepComponent number="3">Renseignez les informations de base : code, libellé, description</StepComponent>
              <StepComponent number="4">Définissez la méthode de calcul, le module, le type d'indicateur, le statut, la fréquence, la cible et l'unité</StepComponent>
              <StepComponent number="5">Cliquez sur l'icône Enregistrer pour créer l'indicateur et l'ajouter à la liste</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                Règles métier : le code de l'indicateur doit être unique. Un indicateur inactif ne peut pas recevoir de valeurs, et toute modification ultérieure peut impacter l'historique des valeurs.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Gestion des Plaintes */}
        <Accordion 
          expanded={expanded === 'complaints'} 
          onChange={handleChange('complaints')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Gavel className={classes.icon} style={{ marginRight: 8 }} />
              Gestion des Plaintes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                Le module de Gestion des Plaintes permet d'enregistrer, de suivre et de résoudre les réclamations des bénéficiaires.
              </Typography>

              <Typography variant="h6" gutterBottom>Vue d'ensemble du processus</Typography>
              <Typography paragraph>
                Le processus de gestion des réclamations débute par la saisie des plaintes par les Agents Communautaires (AC) à l'aide du formulaire Kobo. Une fois enregistrées, les plaintes sont synchronisées automatiquement vers le Core MIS via le module de synchronisation dédié.
              </Typography>
              <Typography paragraph>
                En fonction de la catégorie de la plainte, elle est affectée au CGR (cas non sensibles), au CGPR (cas spéciaux) ou à l'unité Sauvegardes (cas sensibles). Le mécanisme d'affectation est défini par le workflow de chaque catégorie afin d'assurer un traitement conforme, transparent et traçable.
              </Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Accès et consultation des réclamations</Typography>
              <StepComponent number="1">Connectez-vous à la plateforme Core MIS selon votre profil (CGR, CGPR, Expert, Sauvegardes)</StepComponent>
              <StepComponent number="2">Accédez au menu "Réclamations", puis au sous-menu "Réclamation"</StepComponent>
              <StepComponent number="3">Consultez la liste des réclamations disponibles selon vos droits d'accès</StepComponent>
              <StepComponent number="4">Utilisez les filtres (code, statut, catégorie, priorité, bénéficiaire, etc.), puis cliquez sur "Rechercher" ou "Réinitialiser les filtres"</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Colonnes principales de la liste</Typography>
              <Typography variant="body2">- Cases à cocher (actions groupées : Escalade, Résolution, Export)</Typography>
              <Typography variant="body2">- Code, Titre, Niveau, Priorité, Statut, Catégorie</Typography>
              <Typography variant="body2">- Exportée, Temps écoulé, Actions (dont Éditer)</Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Visualisation et traitement d'une réclamation</Typography>
              <StepComponent number="1">Depuis la liste, double-cliquez sur la ligne ou cliquez sur l'icône crayon pour ouvrir la fiche détaillée</StepComponent>
              <StepComponent number="2">Consultez la section "DÉTAILS DE L'ÉVÉNEMENT À L'ORIGINE DE LA PLAINTE" (titre, date, catégorie, type/sous-type, canal, priorité, affectation, statut, description)</StepComponent>
              <StepComponent number="3">Consultez la section historique du workflow pour voir les affectations et le niveau actuel de traitement</StepComponent>
              <StepComponent number="4">Ajoutez des commentaires de suivi, puis enregistrez</StepComponent>
              <StepComponent number="5">Si nécessaire, résolvez à partir d'un commentaire (icône check) ou escaladez la réclamation (icône trend + confirmation)</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Actions groupées</Typography>
              <Typography paragraph>
                Les actions groupées permettent d'appliquer une même action à plusieurs réclamations sélectionnées : Résoudre, Escalader, Exporter, Tout (dé)sélectionner.
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
                Avertissement : pour les actions Résoudre et Escalader, la saisie d'un commentaire est obligatoire. Ce commentaire est appliqué à toutes les réclamations sélectionnées.
              </Typography>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Ajout et clôture d'une réclamation</Typography>
              <StepComponent number="1">Pour ajouter une réclamation manuelle : depuis la liste, cliquez sur le bouton +, renseignez le formulaire, puis cliquez sur "Enregistrer"</StepComponent>
              <StepComponent number="2">Pour clôturer : ouvrez la fiche, vérifiez le statut Résolu, ajoutez si besoin un commentaire final, passez le statut à Fermé, puis enregistrez</StepComponent>
              <StepComponent number="3">Après clôture, la réclamation est archivée, reste consultable et toutes les informations sont conservées pour la traçabilité et l'audit</StepComponent>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Tableau de Bord */}
        <Accordion 
          expanded={expanded === 'dashboard'} 
          onChange={handleChange('dashboard')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Dashboard className={classes.icon} style={{ marginRight: 8 }} />
              Tableau de Bord
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                Le Tableau de Bord offre une vue d'ensemble des activités et statistiques clés du système.
              </Typography>

              <Typography variant="h6" gutterBottom>Vue d'ensemble</Typography>
              <Typography paragraph>
                La page principale du tableau de bord affiche :
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Nombre total de bénéficiaires actifs" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Montant total des paiements effectués (période en cours)" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Nombre de plaintes en cours et résolues" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Info className={classes.icon} /></ListItemIcon>
                  <ListItemText primary="Statistiques des derniers transferts" />
                </ListItem>
              </List>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Graphiques et indicateurs</Typography>
              <Typography paragraph>
                Le tableau de bord comporte plusieurs sections graphiques :
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Paiements :</Typography>
                  <Typography variant="body2">• Évolution des paiements sur une période</Typography>
                  <Typography variant="body2">• Répartition par prestataire</Typography>
                  <Typography variant="body2">• Taux de réussite des transferts</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Bénéficiaires :</Typography>
                  <Typography variant="body2">• Répartition géographique</Typography>
                  <Typography variant="body2">• Démographie (âge, genre)</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" gutterBottom>Plaintes :</Typography>
                  <Typography variant="body2">• Répartition par catégorie et statut</Typography>
                  <Typography variant="body2">• Temps moyen de résolution</Typography>
                  <Typography variant="body2">• Tendances mensuelles</Typography>
                </Grid>
              </Grid>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Rôles et Permissions */}
        <Accordion 
          expanded={expanded === 'roles'} 
          onChange={handleChange('roles')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <Security className={classes.icon} style={{ marginRight: 8 }} />
              Rôles et Permissions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography paragraph>
                COREMIS utilise un système de rôles et permissions pour contrôler l'accès aux différentes fonctionnalités.
              </Typography>

              <TableContainer className={classes.tableContainer}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Rôle</strong></TableCell>
                      <TableCell><strong>Description</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.map((role, index) => (
                      <TableRow key={index}>
                        <TableCell>{role.name}</TableCell>
                        <TableCell>{role.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* FAQ */}
        <Accordion 
          expanded={expanded === 'faq'} 
          onChange={handleChange('faq')}
          className={classes.accordion}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography className={classes.accordionTitle}>
              <QuestionAnswer className={classes.icon} style={{ marginRight: 8 }} />
              FAQ - Questions Fréquentes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              {faqData.map((faq, index) => (
                <Box key={index} className={classes.faqItem}>
                  <Typography className={classes.faqQuestion}>
                    Q : {faq.question}
                  </Typography>
                  <Typography className={classes.faqAnswer}>
                    R : {faq.answer}
                  </Typography>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        


        {/* Support technique */}
        <Card className={`${classes.card} ${classes.contactCard}`}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <ContactSupport style={{ marginRight: 16, fontSize: 32 }} />
              <Typography variant="h5">
                Support technique
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Pour toute assistance technique, notre équipe de support est là pour vous aider.
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center">
                <ContactSupport style={{ marginRight: 8 }} />
                <Typography>support@nafa-mis.com</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Phone style={{ marginRight: 8 }} />
                <Typography>00224 627 92 89 20</Typography>
              </Box>
            </Box>
            <Typography variant="body2" style={{ marginTop: 16, fontStyle: 'italic' }}>
              Heures d'ouverture : Lundi au vendredi, 8h00 - 17h00
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default HelpPage;
