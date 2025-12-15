# 🚀 Netlify Deployment Guide - Car Insurance App with SignStation

This guide will walk you through deploying your Car Insurance application to Netlify with SignStation integration.

## 📋 Prerequisites

1. A GitHub account
2. A Netlify account (free tier works fine)
3. SignStation API credentials (clientId, clientSecret, departmentId, certificateId)

---

## 🔧 Step 1: Prepare Your Code

Your code is already set up with:
- ✅ Netlify functions in `/netlify/functions/`
- ✅ Frontend code configured to use these functions
- ✅ CORS handling in place

---

## 📦 Step 2: Push Code to GitHub

### 2.1 Create a New GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Name it: `car-insurance-app`
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README (your code already has files)
7. Click **"Create repository"**

### 2.2 Connect Your Local Code to GitHub

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit - Car Insurance App with SignStation"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/car-insurance-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**🎉 Your code is now on GitHub!**

---

## 🌐 Step 3: Deploy to Netlify

### 3.1 Connect GitHub to Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Click **"Sign up"** or **"Log in"**
3. Sign in with your GitHub account
4. Click **"Add new site"** → **"Import an existing project"**

### 3.2 Select Your Repository

1. Click **"Deploy with GitHub"**
2. Authorize Netlify to access your GitHub repositories
3. Search for `car-insurance-app` and click on it

### 3.3 Configure Build Settings

Netlify should auto-detect the settings, but verify:

- **Branch to deploy:** `main`
- **Build command:** `npm run build` (or leave empty if auto-detected)
- **Publish directory:** `dist` (or auto-detected)
- **Functions directory:** `netlify/functions` (should be auto-detected)

Click **"Deploy site"**

**⏳ Wait 2-3 minutes for the initial deployment...**

---

## 🔐 Step 4: Add Environment Variables

After deployment, you need to add your SignStation credentials:

### 4.1 Navigate to Environment Variables

1. In your Netlify site dashboard, click **"Site configuration"**
2. In the left sidebar, click **"Environment variables"**
3. Click **"Add a variable"** → **"Add a single variable"**

### 4.2 Add SignStation Credentials

Add these 4 environment variables one by one:

#### Variable 1: Client ID
- **Key:** `SIGNSTATION_CLIENT_ID`
- **Value:** `MockDemoForWebsite`
- Click **"Create variable"**

#### Variable 2: Client Secret
- **Key:** `SIGNSTATION_CLIENT_SECRET`
- **Value:** `fLPAlrhw9BbnzKvj7BpeC3nZR9HixnjJfbE5Mi2zgik`
- Click **"Create variable"**

#### Variable 3: Department ID
- **Key:** `SIGNSTATION_DEPARTMENT_ID`
- **Value:** `2089eab5-9728-451e-b06c-f85cf43ed2a9`
- Click **"Create variable"**

#### Variable 4: Certificate ID
- **Key:** `SIGNSTATION_CERTIFICATE_ID`
- **Value:** `d3f60b7e-1b41-47e2-830f-39dbdd75602e`
- Click **"Create variable"**

### 4.3 Trigger Rebuild

After adding all environment variables:
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes for the rebuild

---

## ✅ Step 5: Test Your App

### 5.1 Get Your Live URL

1. In your Netlify dashboard, you'll see your site URL
2. It will look like: `https://random-name-123456.netlify.app`
3. Click on it to open your live app!

### 5.2 Test the SignStation Workflow

1. Fill out the insurance application form
2. Click through to the **Proposal** page
3. Click **"View Policy"** button
4. Check browser console for logs:
   - 🔐 Should fetch auth token
   - 📝 Should sign the document
   - 📥 Should get download URL
5. A new tab should open with your signed PDF!

---

## 🎨 Step 6: Customize Your Domain (Optional)

### 6.1 Change the Netlify Subdomain

1. In Netlify dashboard, go to **"Site configuration"**
2. Click **"Change site name"**
3. Enter a custom name like: `car-insurance-demo`
4. Your URL becomes: `https://car-insurance-demo.netlify.app`

### 6.2 Add a Custom Domain (Optional)

1. In Netlify dashboard, go to **"Domain management"**
2. Click **"Add a domain"**
3. Follow the instructions to connect your own domain

---

## 🔄 Step 7: Making Updates

Whenever you make changes to your code:

```bash
# Save your changes
git add .
git commit -m "Description of changes"
git push

# Netlify will automatically rebuild and deploy! 🎉
```

---

## 🐛 Troubleshooting

### Issue: Functions not working

**Solution:** Make sure you added all 4 environment variables and triggered a rebuild.

### Issue: CORS errors

**Solution:** Check that your site URL is in the `allowedOrigins` array in the Netlify functions.

To add your custom URL:

1. Edit each function file in `/netlify/functions/`
2. Add your Netlify URL to the `allowedOrigins` array:
   ```javascript
   const allowedOrigins = [
     // ... existing origins
     "https://your-site-name.netlify.app", // 👈 Add this
   ];
   ```
3. Commit and push the changes

### Issue: "Failed to fetch" errors

**Solution:** Open browser DevTools → Network tab → Check the failed request for details.

---

## 📊 Monitoring

### View Function Logs

1. In Netlify dashboard, go to **"Functions"**
2. Click on any function to see invocations and logs
3. Check for errors or successful requests

### View Deployment Logs

1. Go to **"Deploys"** tab
2. Click on the latest deploy
3. View the build logs for any errors

---

## 🎉 Success Checklist

- ✅ Code pushed to GitHub
- ✅ Site deployed to Netlify
- ✅ Environment variables added
- ✅ Site rebuilt after adding variables
- ✅ App loads correctly
- ✅ SignStation workflow works
- ✅ PDF opens in new tab

---

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Check Netlify function logs
3. Verify all environment variables are set correctly
4. Ensure your SignStation credentials are valid

---

## 🔗 Useful Links

- **Netlify Dashboard:** https://app.netlify.com/
- **Netlify Functions Docs:** https://docs.netlify.com/functions/overview/
- **GitHub Repo:** (your repository URL)
- **Live Site:** (your Netlify URL)

---

**Happy Deploying! 🚀**
