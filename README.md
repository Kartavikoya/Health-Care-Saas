# Healthcare SaaS UI

A React + TypeScript frontend assignment project that simulates a B2B healthcare operations platform. The app includes Firebase Authentication, protected routes, analytics dashboards, a patient details module with grid/list views, Zustand state management, and service worker powered local notifications.

## Features

- Firebase Authentication login flow with validation, error handling, and session restoration
- Protected application shell for dashboard, analytics, and patient details
- Responsive patient module with grid view, list view, search, filters, and a selected profile panel
- Recharts analytics for admissions, discharges, utilization, and risk distribution
- Zustand store for auth, patient data, analytics data, and notification history
- Service worker registration plus a working local notification use case

## Run locally

```bash
npm install
npm run dev
```

If you want to use your own Firebase project, copy `.env.example` to `.env` and supply the values below:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Verification

```bash
npm run lint
npm run build
```

## Notification flow

The service worker is registered in `src/main.tsx`, and local notifications are triggered through `registration.showNotification(...)`. Clicking a notification routes the user back into the patient workspace.
