<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8e696ff6-7d1d-4086-95a6-c9089c5a2c40

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

The GitHub Actions workflow builds and deploys the app to GitHub Pages whenever
changes are pushed to the `main` branch, or when started manually from the
Actions tab.

In the repository settings, enable **Pages** and select **GitHub Actions** as
the build and deployment source. The Vite build automatically uses the
repository path for project sites and the root path for `*.github.io` sites.
