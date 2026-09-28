# GitHub Setup

Recommended repository name:
`rowad-business-platform`

## Initial commands
```bash
git init
git add .
git commit -m "chore: prepare Rowad Business for AI Studio"
git branch -M main
git remote add origin <YOUR_GITHUB_REPOSITORY>
git push -u origin main
```

Do not commit `.env`, API keys, service-account JSON, `node_modules`, build output, or ZIP artifacts.
