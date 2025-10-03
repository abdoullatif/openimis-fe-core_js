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
            label="Version 0.1 - Mai 2025" 
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
                La section Protection Sociale vous permet de créer, consulter, modifier et gérer les régimes d'avantages sociale (Programme) et les informations relatives aux bénéficiaires du programme.
              </Typography>

              <Typography variant="h6" gutterBottom>Création d'un nouveau régime de prestation (Programme)</Typography>
              <StepComponent number="1">Accédez à la section "Régime d'avantages sociaux" depuis le menu principal</StepComponent>
              <StepComponent number="2">Utilisez le bouton + en bas à droite de l'écran</StepComponent>
              <StepComponent number="3">Vous devez entrer : Code, Nom, Date de début, Date de fin, Nombre de bénéficiaire max, Institution, Type (Individu ou Group), Description, Schéma</StepComponent>
              <StepComponent number="4">Cliquer sur télécharger pour charger la liste des bénéficiaires du programme à partir d'un fichier csv</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Enregistrement des bénéficiaires</Typography>
              <StepComponent number="1">Accédez à la section "Régime d'avantages sociaux" depuis le menu principal</StepComponent>
              <StepComponent number="2">Cliquer sur le régime de prestation en cliquant sur l'Icon "crayon" à droite de l'écran</StepComponent>
              <StepComponent number="3">Puis cliquer sur télécharger pour charger la liste des bénéficiaires du programme à partir d'un fichier .CSV</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Recherche de bénéficiaires</Typography>
              <StepComponent number="1">Accédez à la section "Individus" depuis le menu principal</StepComponent>
              <StepComponent number="2">Utilisez la barre de recherche</StepComponent>
              <StepComponent number="3">Vous pouvez rechercher par : Nom et prénom, Région/localité, Préfecture/localité, Sous-préfecture/localité, District/localité</StepComponent>
              <StepComponent number="4">Les résultats s'affichent sous forme de liste avec les informations principales</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Créer un groupe (Ménage)</Typography>
              <StepComponent number="1">Accédez à la section "Groupes" depuis le sou menu de Protection sociale</StepComponent>
              <StepComponent number="2">Utilisez le bouton + en bas à droite de l'écran</StepComponent>
              <StepComponent number="3">Vous devez entrer : Code, Les localités jusqu'au niveau district</StepComponent>
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
              <StepComponent number="2">Cliquer sur le bouton + en bas à droite de l'écran pour créer un plan de paiement</StepComponent>
              <StepComponent number="3">Sectionner la localité d'intervention de l'opérateur, jusqu'au niveau district</StepComponent>
              <StepComponent number="4">Sélectionner un gestionnaire de points de paiement</StepComponent>
              <StepComponent number="5">Le Nom du point de paiement (opérateur)</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 2 : Planifier un paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Plans de paiement"</StepComponent>
              <StepComponent number="2">Cliquer sur le bouton + en bas à droite de l'écran pour créer un plan de paiement</StepComponent>
              <StepComponent number="3">Dans le champ type sélectionner "Régime d'avantages sociaux"</StepComponent>
              <StepComponent number="4">Entrer : Un code pour le plan de paiement, Nom, Règle de calcul, Benefit Plan, Date de début, Date de fin</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 3 : Enregistrer le cycle de paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Cycle de paiement"</StepComponent>
              <StepComponent number="2">Cliquer sur le bouton + en bas à droite de l'écran pour créer un cycle de paiement</StepComponent>
              <StepComponent number="3">Entrer un code pour le cycle de paiement, Date de début, Date de fin, Statut</StepComponent>

              <Typography variant="subtitle2" gutterBottom style={{ marginTop: 16 }}>Étape 4 : Créer le paiement</Typography>
              <StepComponent number="1">Dans la section "Paiements", cliquez sur "Paiements"</StepComponent>
              <StepComponent number="2">Cliquer sur le bouton + en bas à droite de l'écran pour créer un paiement</StepComponent>
              <StepComponent number="3">Entrer un nom pour le paiement, Sélectionner le plan de paiement, Sélectionner le prestataire, Sélectionner le mode de paiement (Offline ou Online)</StepComponent>

              <Typography variant="body2" color="textSecondary" style={{ marginTop: 16, fontStyle: 'italic' }}>
                NB : Stratégie Offline permet d'effectuer un paiement sans intégration avec l'API de l'opérateur. La stratégie Online permet d'effectuer un paiement par interconnexion entre le COREMIS et le système de l'opérateur.
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
              <StepComponent number="2">Cliquer sur le bouton + en bas à droite de l'écran pour créer un groupe d'exécutant de tâche</StepComponent>
              <StepComponent number="3">Vous devez ensuite entrer : Un code pour le groupe d'exécutant, Le statut de la police, Les exécutants, Et en fin la source des tâches</StepComponent>
              <StepComponent number="4">Puis cliquer sur le bouton disquette en bas à droite de l'écran pour enregistrer et créer le groupe d'exécutant</StepComponent>
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

              <Typography variant="h6" gutterBottom>Enregistrement d'une plainte</Typography>
              <StepComponent number="1">Accédez à la section "Grief" dans le menu principal</StepComponent>
              <StepComponent number="2">Cliquez sur "Ajouter grief"</StepComponent>
              <StepComponent number="3">Complétez le formulaire : Information sur le plaignant, Titre de la plainte, Date de l'incident, Catégorie de plainte, Drapeau, Canal de dépôt, Priorité, Utilisateur qui saisit la plainte, Description détaillée</StepComponent>
              <StepComponent number="4">Cliquer sur le bouton disquette en bas pour enregistrer et créer le Ticket (plainte)</StepComponent>

              <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>Traitement des plaintes</Typography>
              <StepComponent number="1">Depuis la liste des plaintes dans la section "Grief", filtrez par statut, catégorie, priorité</StepComponent>
              <StepComponent number="2">Cliquez sur l'Icon "crayon" à droite de l'écran pour voir ses détails</StepComponent>
              <StepComponent number="3">Ajoutez des commentaires internes sur les actions entreprises</StepComponent>
              <StepComponent number="4">Modifiez le statut en fonction de l'avancement du traitement : Reçu, Ouvert, En cours, Résolu, Fermé</StepComponent>
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
