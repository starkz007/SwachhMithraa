# Launching SwachhMitra on GitHub Pages

This guide explains how to publish your industrial-grade SwachhMitra platform to GitHub Pages.

---

## 1. Quick Launch (GitHub Actions - Recommended)

Because we have already configured `.github/workflows/deploy.yml` in this repository, GitHub will build and host your site automatically:

1. **Create a new repository** on [GitHub.com](https://github.com/new) (e.g. `swachhmitra` or `internal-quest`).
2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SwachhMitra full-stack platform with GitHub Pages deploy"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - In your GitHub repo, go to **Settings** &rarr; **Pages** (in the left sidebar).
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
   - Your site will automatically build and publish to:
     `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`

---

## 2. One-Command Deploy (via `gh-pages`)

If you prefer pushing pre-built assets directly to a `gh-pages` branch:

```bash
npm run deploy
```

---

## 3. Dual-Mode Architecture in Action

- **On GitHub Pages**: The application functions seamlessly in **Autonomous Edge Mode** using the in-browser database engine with full localStorage persistence. The header displays:
  `?? Edge Mode (Local DB)`
- **When running locally or with Python**: Start the FastAPI backend:
  ```bash
  python -m uvicorn server.main:app --port 8000
  ```
  The frontend automatically connects to the live REST API and SQLite database (`server/swachhmitra.db`). The header displays:
  `?? FastAPI Backend: Online`
- **Swagger Documentation**: Explore the live API at `http://127.0.0.1:8000/docs`.
