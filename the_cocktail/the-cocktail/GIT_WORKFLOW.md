# Git and GitHub Workflow (project requirement checklist)

Rules from the instructions: public repository, **never commit directly to `main`**, work on feature branches, merge with Pull Requests, and use conventional commit prefixes (`feat:`, `fix:`, `style:`, `docs:`).

## First-time setup (one person)

```bash
git init
git add .
git commit -m "docs: add initial project files"
git branch -M main
git remote add origin <your-public-repo-url>
git push -u origin main
```

## Suggested feature branches and commits

| Branch | Example commit messages |
|---|---|
| `feature/api-fetch` | `feat: add TheCocktailDB api module` |
| `feature/search-bar` | `feat: add debounced search bar` |
| `feature/category-filter` | `feat: add category filter and sorting` |
| `feature/pagination` | `feat: add client-side pagination` |
| `feature/favorites` | `feat: save favorites in localStorage` |
| `feature/details-page` | `feat: add cocktail details route` |
| `feature/loading-error-ui` | `feat: add loading skeletons and error retry` |
| `style/theme` | `style: add dark theme and responsive layout` |
| `docs/readme` | `docs: write README and team contributions` |

## Every feature

```bash
git checkout main
git pull
git checkout -b feature/search-bar
# ...make changes...
git add .
git commit -m "feat: add debounced search bar"
git push -u origin feature/search-bar
```

Then open a Pull Request on GitHub, ask your partner to review it, and merge it. Both partners should have commits and PRs so the history shows the collaboration.
