# Healthcare SaaS UI

A frontend assignment project for a B2B healthcare operations platform built with React and TypeScript. The application demonstrates Firebase Authentication, protected routing, analytics dashboards, patient management views, Zustand-based state management, and service worker powered local notifications.

## Project Summary

This project simulates a healthcare operations workspace used by care coordinators and internal teams to monitor patient programs, review analytics, and manage alerts. The UI is designed as a multi-page SaaS dashboard with responsive layouts and reusable components.

## Assignment Coverage

The application covers the requested assignment scope:

- React + TypeScript application
- Login using Firebase Authentication
- Service Worker registration
- Local notification support
- Login page
- Home / Dashboard page
- Analytics page
- Patient Details page
- Patient Details grid view
- Patient Details list view
- View toggle between grid and list
- Shared state management using Zustand

## Features

### Authentication

- Firebase Authentication with email/password login
- Input validation and friendly login error states
- Auth session restoration using `onAuthStateChanged`
- Protected routes for authenticated pages
- Logout flow

### Dashboard

- KPI summary cards
- Care team action center
- Recent notifications panel
- In-app navigation to the patient workspace from alert cards

### Analytics

- Admissions, discharges, and satisfaction trends
- Department utilization chart
- Patient risk distribution chart
- Responsive Recharts visualizations

### Patient Details

- Grid view
- List view
- Toggle between both views
- Search by patient name, condition, or ID
- Status filtering
- Selected patient detail panel
- Escalation notification action

### Notifications

- Service worker registration in the app entry point
- Local notifications using `ServiceWorkerRegistration.showNotification(...)`
- Notification click handling back into the application
- In-app alert cards also route to the patient page

### State Management

- Zustand store for:
  - authenticated user
  - auth readiness
  - patient data
  - selected patient
  - patient view mode
  - analytics data
  - notification permission
  - recent notifications

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Zustand
- Firebase Authentication
- Recharts
- Tailwind CSS v4
- ESLint

## Pages

### 1. Login

- Firebase email/password sign-in
- Validation and error feedback
- Redirect to dashboard after successful login

### 2. Dashboard

- Overview metrics
- Care coordination priorities
- Notification test action
- Recent alerts

### 3. Analytics

- Monthly operational trends
- Utilization comparison
- Risk breakdown

### 4. Patient Details

- Grid and list presentation
- Search/filter support
- Selected patient summary panel

## Folder Structure

```text
src/
  app/
    components/
      AppShell.tsx
      MetricCard.tsx
      StatusBadge.tsx
    data/
      mockData.ts
    features/
      analytics/
        Analytics.tsx
      auth/
        Login.tsx
      dashboard/
        Dashbaord.tsx
      patients/
        Patients.tsx
    hooks/
      useAuthSession.ts
      useNotificationCenter.ts
    routes/
      AppRoutes.tsx
    services/
      firebase.ts
    store/
      useStore.ts
    types/
      models.ts
  main.tsx
  index.css
public/
  sw.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the app

Vite will usually run at:

```text
http://localhost:5173
```

## Firebase Setup

This project uses Firebase Authentication for login.

### Environment variables

Create a `.env` file using `.env.example`:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

If environment variables are not provided, the app currently falls back to the Firebase values defined in [firebase.ts](/f:/healthcare-saas/src/app/services/firebase.ts). For submission, it is better to use your own Firebase project values through `.env`.

### Enable email/password authentication

In Firebase Console:

1. Open your Firebase project.
2. Go to `Authentication`.
3. Click `Get started` if needed.
4. Open `Sign-in method`.
5. Enable `Email/Password`.
6. Open the `Users` tab.
7. Add a test user.

Use that email and password to log in to the app.

## Service Worker and Notifications

The app includes a working local notification flow.

### Registration

The service worker is registered in [main.tsx](/f:/healthcare-saas/src/main.tsx).

The worker file is:

- [sw.js](/f:/healthcare-saas/public/sw.js)

### Notification use cases

There are at least two working notification use cases:

- `Trigger local notification` button on the Dashboard
- `Send escalation notification` button on the Patient Details page

### How to test notifications

1. Run the app locally.
2. Log in with a Firebase user.
3. Click `Enable notifications`.
4. Allow browser notification permission.
5. Click `Trigger local notification` on the dashboard.
6. Confirm the browser notification appears.
7. Click the browser notification or the in-app notification card.
8. You should be taken to the Patient Details page.

### Important note

This project implements local notifications through the browser service worker. It does not implement a remote push backend such as Firebase Cloud Messaging server-side delivery.

## Available Scripts

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run lint checks

```bash
npm run lint
```

### Preview production build

```bash
npm run preview
```

## Verification

The project has been validated with:

```bash
npm run lint
npm run build
```

## Deployment

This project can be deployed on:

- Vercel
- Netlify

### Deployment notes

- Add the Firebase environment variables in the hosting platform settings.
- Ensure the deployed domain is allowed in Firebase Authentication authorized domains if required.
- Test login and notifications again after deployment.

## Submission Checklist

Before submitting:

- Push code to GitHub
- Add a clean `README.md`
- Deploy the app to Vercel or Netlify
- Confirm Firebase login works
- Confirm notification permission works
- Confirm at least one notification use case works
- Share:
  - GitHub repository link
  - Live deployed link

## Possible Improvements

If you want to extend the project further, good follow-up improvements would be:

- route-level code splitting
- remote push notifications
- unit/component tests
- stronger Firebase environment separation
- reusable table and filter components
- micro-frontend exploration

## Author

Update this section with your own details before submission:

```text
Name: Your Name
Role: Frontend Developer
GitHub: https://github.com/your-username
Live Demo: https://your-deployment-link
```
