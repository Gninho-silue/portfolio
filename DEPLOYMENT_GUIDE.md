# 🚀 Guide de Déploiement Portfolio sur Vercel

## 📋 Prérequis

- Compte Vercel (gratuit)
- Compte Sanity (gratuit)
- Compte Gmail (pour l'envoi d'emails)
- Git repository (GitHub, GitLab, ou Bitbucket)

## 🏗️ Architecture du Déploiement

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Sanity CMS   │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Studio)     │
│   Vercel        │    │   Vercel        │    │   Sanity.io    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Configuration des Variables d'Environnement

### 1. Backend (.env)
```bash
# Copiez backend.env.example vers backend/.env
SANITY_PROJECT_ID=votre_project_id_sanity
SANITY_DATASET=production
SANITY_API_TOKEN=votre_token_sanity
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app_gmail
FRONTEND_URL=https://votre-portfolio.vercel.app
```

### 2. Frontend (.env.local)
```bash
# Copiez frontend.env.example vers frontend_react/.env.local
REACT_APP_SANITY_PROJECT_ID=votre_project_id_sanity
REACT_APP_SANITY_DATASET=production
REACT_APP_SANITY_API_TOKEN=votre_token_sanity
REACT_APP_API_URL=https://votre-portfolio.vercel.app/api
```

### 3. Sanity Studio (.env.local)
```bash
# Copiez sanity.env.example vers backend_saniy/.env.local
SANITY_STUDIO_PROJECT_ID=votre_project_id_sanity
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2025-02-19
SANITY_STUDIO_API_TOKEN=votre_token_sanity
```

## 🚀 Étapes de Déploiement

### Étape 1: Préparation Sanity

1. **Créer un projet Sanity** :
   ```bash
   cd backend_saniy
   npm install
   npm run dev
   ```

2. **Configurer Sanity Studio** :
   - Ouvrez http://localhost:3333
   - Créez votre projet Sanity
   - Notez le `Project ID` et `Dataset`

3. **Obtenir le token API** :
   - Allez dans Sanity Management Console
   - Créez un token avec permissions de lecture/écriture

### Étape 2: Configuration Gmail

1. **Activer l'authentification à 2 facteurs** sur Gmail
2. **Générer un mot de passe d'application** :
   - Paramètres Google → Sécurité → Mots de passe d'application
   - Créez un mot de passe pour "Mail"

### Étape 3: Déploiement Vercel

1. **Connecter le repository** :
   ```bash
   # Poussez votre code sur GitHub/GitLab
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Déployer sur Vercel** :
   - Connectez-vous à [vercel.com](https://vercel.com)
   - Importez votre repository
   - Vercel détectera automatiquement la configuration

3. **Configurer les variables d'environnement** :
   - Dans le dashboard Vercel → Settings → Environment Variables
   - Ajoutez toutes les variables du fichier `.env`

### Étape 4: Déploiement Sanity Studio

1. **Déployer le Studio** :
   ```bash
   cd backend_saniy
   npm run deploy
   ```

2. **Configurer le domaine personnalisé** (optionnel) :
   ```bash
   npm run deploy -- --studio-host your-studio-domain.com
   ```

## 🔍 Vérification du Déploiement

### Tests à effectuer :

1. **Frontend** : `https://votre-portfolio.vercel.app`
2. **Backend API** : `https://votre-portfolio.vercel.app/api/`
3. **Contact Form** : Testez l'envoi d'un message
4. **Sanity Studio** : `https://votre-studio.sanity.studio`

### URLs importantes :

- **Portfolio** : `https://votre-portfolio.vercel.app`
- **API Contact** : `https://votre-portfolio.vercel.app/api/contact`
- **Sanity Studio** : `https://votre-studio.sanity.studio`

## 🛠️ Commandes Utiles

### Développement local :
```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend_react && npm start

# Sanity Studio
cd backend_saniy && npm run dev
```

### Déploiement :
```bash
# Vercel (automatique via Git)
git push origin main

# Sanity Studio
cd backend_saniy && npm run deploy
```

## 🔧 Dépannage

### Problèmes courants :

1. **CORS Error** : Vérifiez `FRONTEND_URL` dans les variables d'environnement
2. **Email non envoyé** : Vérifiez les credentials Gmail et le mot de passe d'application
3. **Sanity non connecté** : Vérifiez le `SANITY_PROJECT_ID` et `SANITY_API_TOKEN`
4. **Build failed** : Vérifiez que tous les `node_modules` sont installés

### Logs Vercel :
- Dashboard Vercel → Functions → Logs
- Vérifiez les erreurs dans les logs de déploiement

## 📊 Monitoring

- **Vercel Analytics** : Activé automatiquement
- **Sanity Usage** : Dashboard Sanity
- **Email Delivery** : Logs Gmail

## 🔄 Mises à jour

Pour mettre à jour votre portfolio :

1. **Code** : `git push origin main` (déploiement automatique)
2. **Sanity Studio** : `npm run deploy` dans `backend_saniy/`
3. **Variables d'environnement** : Mise à jour via dashboard Vercel

---

## 🎉 Félicitations !

Votre portfolio est maintenant déployé avec :
- ✅ Frontend React sur Vercel
- ✅ Backend Node.js sur Vercel
- ✅ Sanity CMS pour la gestion de contenu
- ✅ Système de contact par email
- ✅ Déploiement automatique via Git

**URL de votre portfolio** : `https://votre-portfolio.vercel.app`
