# Deploy to Firebase Hosting

This is a React + Vite + TypeScript project. Follow these steps to deploy to Firebase Hosting.

## 1. Prerequisites

- Node.js 18+ (or Bun)
- A Firebase account: https://firebase.google.com/
- Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```

## 2. Install & build locally

```bash
npm install
npm run build
```

The production build is emitted to `dist/`.

You can preview it locally with:

```bash
npm run preview
```

## 3. Create a Firebase project

1. Go to https://console.firebase.google.com/ and create a new project.
2. Copy the **Project ID** (e.g. `my-portfolio-123`).
3. Open `.firebaserc` in this repo and replace `your-firebase-project-id` with your Project ID:

   ```json
   {
     "projects": {
       "default": "my-portfolio-123"
     }
   }
   ```

## 4. Log in and deploy

```bash
firebase login
firebase deploy --only hosting
```

That's it — your site will be live at `https://<your-project-id>.web.app`.

## 5. (Optional) Custom domain

In the Firebase Console → Hosting → **Add custom domain**, then update
`SITE_URL` in `src/lib/siteConfig.ts` to the new domain so SEO tags and the
sitemap use the correct canonical URLs. Rebuild and redeploy.

## Notes

- `firebase.json` already configures SPA rewrites (all routes → `index.html`)
  and long-term caching for static assets.
- The `dist/` folder is the deploy target; do not commit it.
- If you use GitHub Actions, run `firebase init hosting:github` after the first
  manual deploy to auto-generate a workflow.
