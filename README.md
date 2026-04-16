# EduStay - Find Your Urban Sanctuary

EduStay helps students discover verified PGs, hostels, and accommodations near Academy of Technology. Experience biophilic living designed for the modern student.

## Project Info

**Repository**: [https://github.com/soumen-tech/EduStay](https://github.com/soumen-tech/EduStay)

## Tech Stack

This project is built with:

- **Vite** — Fast build tool and dev server
- **React 18** — UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS framework
- **shadcn/ui** — Accessible UI components built on Radix UI
- **Firebase** — Authentication & Firestore database
- **React Router** — Client-side routing
- **React Query** — Data fetching and caching

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/soumen-tech/EduStay.git

# Step 2: Navigate to the project directory
cd EduStay

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.


## How to Edit This Code

### Use your preferred IDE

Clone this repo and push changes. The project uses standard Vite + React tooling, so any modern IDE will work well.

### Edit directly on GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit.

### Use GitHub Codespaces

- Navigate to the main page of the repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Firebase Setup

This project uses Firebase for authentication and data storage. To configure Firebase:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Authentication (Email/Password and Google Sign-In).
3. Set up Cloud Firestore.
4. Add your Firebase config to the project's environment.

## Deployment

You can deploy this project using any static hosting provider:

- **Firebase Hosting** — `firebase deploy`
- **Vercel** — Connect your GitHub repo
- **Netlify** — Connect your GitHub repo
- **GitHub Pages** — Build and deploy the `dist` folder

### Build for Production

```sh
npm run build
```

The output will be in the `dist/` directory.

## License

This project is private.
