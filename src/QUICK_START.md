# ⚡ Quick Start Guide

## 🎯 Deploy in 5 Minutes

### Step 1: Push to GitHub (2 min)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/car-insurance-app.git
git push -u origin main
```

### Step 2: Deploy to Netlify (2 min)
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub → Select your repo
4. Click "Deploy site"

### Step 3: Add Environment Variables (1 min)
In Netlify dashboard → Site configuration → Environment variables:

```
SIGNSTATION_CLIENT_ID = MockDemoForWebsite
SIGNSTATION_CLIENT_SECRET = fLPAlrhw9BbnzKvj7BpeC3nZR9HixnjJfbE5Mi2zgik
SIGNSTATION_DEPARTMENT_ID = 2089eab5-9728-451e-b06c-f85cf43ed2a9
SIGNSTATION_CERTIFICATE_ID = d3f60b7e-1b41-47e2-830f-39dbdd75602e
```

### Step 4: Rebuild
Deploys tab → Trigger deploy → Deploy site

### Step 5: Test! 🎉
Open your Netlify URL and test the "View Policy" feature!

---

## 📋 Files Created

✅ **Netlify Functions:**
- `/netlify/functions/signstation-auth.js` - Get access token
- `/netlify/functions/signstation-sign.js` - Sign documents  
- `/netlify/functions/signstation-download.js` - Get download URL
- `/netlify/functions/package.json` - Dependencies

✅ **Frontend:**
- `/utils/leegalitySignStation.ts` - Updated to use Netlify functions

✅ **Configuration:**
- `/netlify.toml` - Netlify build config
- `/.gitignore` - Ignore node_modules, env files
- `/DEPLOYMENT_GUIDE.md` - Detailed guide
- `/README.md` - Project documentation

---

## 🔍 How It Works

```
User clicks "View Policy"
    ↓
Frontend calls /.netlify/functions/signstation-auth
    ↓
Netlify Function calls SignStation API (no CORS!)
    ↓
Returns access token to frontend
    ↓
Frontend calls /.netlify/functions/signstation-sign with PDF
    ↓
Netlify Function signs document via SignStation
    ↓
Returns document ID
    ↓
Frontend calls /.netlify/functions/signstation-download
    ↓
Netlify Function gets S3 presigned URL
    ↓
Opens signed PDF in new tab! 🎉
```

---

## 🐛 Troubleshooting

**Functions not found?**
→ Make sure `netlify.toml` is in the root directory

**Environment variables not working?**
→ Rebuild the site after adding them

**CORS errors?**
→ Add your Netlify URL to `allowedOrigins` in function files

---

## 📞 Support

Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

**Happy deploying! 🚀**
