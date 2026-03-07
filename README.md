# EverGreenFindz — Affiliate Blog

A two-file affiliate blog with admin panel, connected via Netlify Functions + JSON file storage.

---

## File Structure

```
evergreenfindz/
├── index.html                    ← Public client site
├── admin.html                    ← Admin panel (CRUD)
├── netlify.toml                  ← Netlify config
├── data/
│   └── products.json             ← Shared data store
└── netlify/
    └── functions/
        ├── get-data.js           ← GET API: reads products.json
        └── save-data.js          ← POST API: writes products.json
```

---

## How to Deploy on Netlify (Step-by-Step)

### 1. Create a GitHub repo
- Go to github.com → New Repository
- Upload all these files keeping the folder structure exactly as above

### 2. Connect to Netlify
- Go to netlify.com → Sign up (free)
- Click "Add new site" → "Import from Git"
- Select your GitHub repo
- Build settings:
  - Build command: *(leave blank)*
  - Publish directory: `.`
- Click **Deploy**

### 3. Set your Admin Secret
In Netlify dashboard → Site settings → Environment variables → Add:
```
Key:   ADMIN_SECRET
Value: (choose a strong secret, e.g. mySecret2026!)
```

### 4. Update the secret in admin.html
In `admin.html`, find this line and update it to match your env var:
```js
const secret = 'changeme123'; // ← change to match ADMIN_SECRET
```

### 5. Change admin credentials
In `admin.html`, find and update:
```js
const ADMIN_USER = 'admin';       // ← your username
const ADMIN_PASS = 'pickwise2026'; // ← your password
```

---

## How to Use the Admin Panel

1. Go to `yoursite.netlify.app/admin.html`
2. Login with your credentials
3. Use the sidebar to manage:
   - **Products** — Add/edit/delete products with image, name, description, category, affiliate links
   - **Categories** — Add/edit/delete categories (they appear as filter pills on the client site)
4. Changes save to `products.json` via Netlify Functions and immediately show on `index.html`

---

## Affiliate Links
Each product supports 3 shop buttons:
- 📦 Amazon
- 🎵 TikTok Shop  
- 🛍 Shopee

Leave a link blank to hide that button automatically on the product page.

---

## Color Scheme
- White `#ffffff`
- Sage Green `#4a8050` (primary), `#3a6640` (hover)
- Black `#0f0f0f`

---

## Local Development (Optional)
Install Netlify CLI:
```bash
npm install -g netlify-cli
netlify dev
```
Then open `http://localhost:8888`

---

## Important Notes
- The `data/products.json` file is the single source of truth
- Admin changes are written back to this file via the `save-data` function
- The admin panel also saves to `localStorage` as a backup if the server is unreachable
- For stronger auth, consider adding Netlify Identity to protect `admin.html`
