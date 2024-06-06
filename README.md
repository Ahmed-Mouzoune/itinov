# Projet ITINOV : Application de Banque en Ligne

J'ai choisi de réaliser ce projet en me basant sur le thème de l'application bancaire car j'ai tout de suite pensé à l'interface de Revolut, que j'apprécie particulièrement. Pour ce projet, j'ai utilisé Next.js pour la partie front-end et Strapi pour la partie back-end. J'ai également réalisé la partie back-end, car Strapi permet de générer une API fonctionnelle de manière assez rapide pour ce type de projet et aussi parce que je voulais me créer un boilerplate Next/Strapi en parallèle du test (C'est une stack que j'utilise souvent).

## Table des matières

- [Technologies Utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [Structure du Projet](#structure-du-projet)

## Technologies Utilisées

### Front-end
- **Next.js** : Framework React pour le rendu côté serveur et la génération de sites statiques.
- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
- **Shadcn/ui & Tailwindcss** : Pour un style modulaire et réutilisable.
- **Recharts** : Librairie pour l'affichage des graphiques.

### Back-end
- **Strapi** : CMS headless pour la gestion des contenus et la création d'APIs.
- **SQLite** : Base de données utilisée par défaut par Strapi pour le développement.
- **PostgreSQL** : Base de données utilisée par Strapi en production avec docker.

## Installation

### Prérequis

- Node.js
- npm ou yarn
- Git

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/Ahmed-Mouzoune/itinov.git
   cd itinov
   ```
2. **Installer les dépendances du front-end :**
   ```bash
   cd itinov/front
   npm install
   ```
3. **Installer les dépendances du back-end :**
   ```bash
   cd itinov/back
   npm install
   ```
4. **Lancer l'application Strapi (back-end) :**
   ```bash
   cd itinov/back
   npm run develop
   ```
5. **Lancer l'application Next.js (front-end) :**
   ```bash
   cd itinov/front
   npm run dev
   ```
## Utilisation

Après avoir suivi les étapes d'installation, vous pouvez accéder à l'application via :
- Front-end (Next.js) : [http://localhost:3000](http://localhost:3000)
- Back-end (Strapi) : [http://localhost:1337](http://localhost:1337)

## Fonctionnalités

### Front-end
- **Dashboard des Comptes :**
  - Voir la liste des comptes avec leurs soldes.
  - Voir les dernières opérations effectuées pour chaque compte.
  - Effectuer des retraits, des dépôts et des virements entre comptes.
  - Indicateur visuel pour les soldes débiteurs.

- **Vues spécifiques :**
  - Vue pour le retrait d'argent.
  - Vue pour le dépôt d'argent.
  - Vue pour le transfert d'argent entre comptes.

<!-- - **Bonus (Optionnel) :**
  - Graphique des opérations effectuées sur le solde dans le mois courant. -->

### Back-end
- **Gestion des Comptes :**
  - Gestion des opérations de dépôt, retrait et virement.
  - Historique des opérations avec détails (date, montant, type, auteur, solde).

## Structure du Projet

### Dossier principal Front-end (Next.js)
```
front/
│── public/
│── src/
│ ├── actions/
│ ├── app/
│ ├── components/
│ ├── context/
│ ├── interfaces/
│ ├── lib/
│ └── services/
```
#### public
Ce dossier contient les fichiers statiques qui sont accessibles publiquement, comme les images, les fichiers CSS et JavaScript.

#### src
Le dossier principal pour le code source de l'application.

- **actions/** : Contient les fichiers d'actions pour la gestion des actions liées aux formulaires.
- **app/** : Contient les fichiers de routing et de page pour Next.js (App Router).
- **components/** : Contient les composants réutilisables de l'application.
- **context/** : Contient les contextes React pour la gestion globale de l'état de l'application.
- **lib/** : Contient les bibliothèques et les utilitaires partagés.
- **types/** : Contient les définitions de types TypeScript pour l'application.

### Dossier principal Back-end (Strapi)
```
back/
│── config/
│── database/
│── public/
│── src/
│ ├── admin/
│ ├── api/
│ ├── extensions/
│ ├── middlewares/
│ └── index.ts
│── tests/
└── types/
```
#### config
Ce dossier contient les configurations de l'application, y compris les configurations de la base de données, les configurations des serveurs, etc.

#### database
Ce dossier contient les fichiers relatifs à la base de données, comme les fichiers de migration.

#### public
Ce dossier contient les fichiers statiques qui sont accessibles publiquement, comme les images, les fichiers CSS et JavaScript.

#### src
Le dossier principal pour le code source de l'application.

- **admin/** : Contient les fichiers relatifs à l'interface d'administration de Strapi.
- **api/** : Contient les collections de données et les fichiers relatifs aux APIs créées dans Strapi (controllers, routes, services).
- **extensions/** : Contient les extensions et les personnalisations spécifiques à l'application.
- **middlewares/** : Contient les middlewares personnalisés utilisés dans l'application.
- **index.ts** : Point d'entrée principal pour le code source TypeScript.

#### tests
Ce dossier contient les tests unitaires et d'intégration pour l'application.

#### types
Ce dossier contient les définitions de types TypeScript pour l'application.

---

Merci d'avoir consulté ce projet. N'hésitez pas à me contacter pour toute question ou suggestion.