# Configuration Sanity Studio pour le Portfolio

## 🎯 Informations du Projet

- **Project ID** : `1fswcosx`
- **Dataset** : `production`
- **Studio URL** : `https://portfolio-studio.sanity.studio`

## 🚀 Commandes de Déploiement

### Développement local :
```bash
cd backend_saniy
npm run dev
# Ouvre http://localhost:3333
```

### Déploiement du Studio :
```bash
cd backend_saniy
npm run deploy-studio
# Déploie sur https://portfolio-studio.sanity.studio
```

### Déploiement GraphQL (optionnel) :
```bash
cd backend_saniy
npm run deploy-graphql
```

## 🔧 Configuration des Variables

Créez un fichier `.env.local` dans `backend_saniy/` :

```bash
SANITY_STUDIO_PROJECT_ID=1fswcosx
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2025-02-19
SANITY_STUDIO_API_TOKEN=your_sanity_token
```

## 📊 Schémas Disponibles

Votre Sanity Studio contient les schémas suivants :
- `about` - Informations personnelles
- `brands` - Marques/partenaires
- `contact` - Messages de contact
- `experience` - Expériences professionnelles
- `skills` - Compétences techniques
- `testimonials` - Témoignages
- `workExperiences` - Expériences de travail
- `works` - Projets/portfolio

## 🔗 Intégration avec le Frontend

Le frontend React se connecte à Sanity via :
- **Client Sanity** : `@sanity/client`
- **Image URL** : `@sanity/image-url`
- **Configuration** : Variables d'environnement React

## 📝 Gestion du Contenu

1. **Accédez au Studio** : https://portfolio-studio.sanity.studio
2. **Connectez-vous** avec votre compte Sanity
3. **Gérez le contenu** via l'interface graphique
4. **Les changements** sont automatiquement synchronisés avec le frontend

## 🔄 Workflow de Mise à Jour

1. **Modifier le contenu** dans Sanity Studio
2. **Le frontend** se met à jour automatiquement
3. **Pas de redéploiement** nécessaire pour le contenu
4. **Redéploiement** uniquement pour les changements de code
