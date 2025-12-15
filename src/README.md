# 🚗 Car Insurance Application with Digital Signing

A modern, multi-screen mobile car insurance application with integrated Leegality consent collection and SignStation document signing.

## ✨ Features

- **6-Screen Application Flow:**
  - 🏠 Home/Landing page with car number input
  - 📋 Insurance plan selection
  - 📝 Comprehensive application form with document uploads
  - ✅ KYC completion success screen
  - 📄 Detailed proposal view
  - 🎯 Final KYC completion with next steps

- **Leegality Integration:**
  - ✅ Real-time consent collection SDK
  - ✅ Optimized load times with dynamic script loading
  - ✅ Seamless KYC workflow

- **SignStation Integration:**
  - ✅ Digital document signing via Netlify serverless functions
  - ✅ 3-page policy document generation
  - ✅ Automatic signature placement
  - ✅ Secure download of signed documents

- **Modern UI/UX:**
  - 🎨 Clean Ditto insurance aesthetic
  - 💙 Light blue backgrounds with white cards
  - 📱 Mobile-first responsive design
  - ⚡ Golden tooltips on key actions
  - 🔄 Consistent header and footer across all screens

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS v4.0
- **Backend:** Netlify Serverless Functions
- **APIs:** Leegality Consent SDK, SignStation API
- **Icons:** Lucide React

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed step-by-step deployment instructions.

### Quick Deploy to Netlify

1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Add environment variables:
   - `SIGNSTATION_CLIENT_ID`
   - `SIGNSTATION_CLIENT_SECRET`
   - `SIGNSTATION_DEPARTMENT_ID`
   - `SIGNSTATION_CERTIFICATE_ID`
4. Deploy! 🎉

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

**Note:** SignStation features require deployment to Netlify to work (due to CORS restrictions).

## 📁 Project Structure

```
/
├── components/          # React components
│   ├── Header.tsx      # Shared header component
│   ├── Footer.tsx      # Shared footer with reset/contact
│   └── ...
├── screens/            # Main application screens
│   ├── Screen1Home.tsx
│   ├── Screen2Selection.tsx
│   └── ...
├── utils/              # Utility functions
│   ├── leegality.ts           # Consent SDK integration
│   └── leegalitySignStation.ts # SignStation integration
├── netlify/
│   └── functions/      # Serverless functions
│       ├── signstation-auth.js
│       ├── signstation-sign.js
│       └── signstation-download.js
├── styles/
│   └── globals.css     # Global styles & Tailwind config
├── App.tsx             # Main app component
├── netlify.toml        # Netlify configuration
└── DEPLOYMENT_GUIDE.md # Detailed deployment guide
```

## 🎯 Application Flow

1. **Home Screen** - User enters car number and requests quote
2. **Selection Screen** - Choose from Basic/Standard/Comprehensive plans
3. **Application Form** - Fill personal details, upload documents, complete KYC
4. **Success Screen** - KYC completion confirmation
5. **Proposal Screen** - Review policy details, digitally sign document
6. **Completion Screen** - Next steps and policy activation timeline

## 🔐 Security

- Client secrets are stored as environment variables in Netlify
- All API calls are proxied through Netlify serverless functions
- CORS protection on all function endpoints
- Allowed origins whitelist for API access

## 📝 Environment Variables

Required environment variables for Netlify deployment:

```
SIGNSTATION_CLIENT_ID=your_client_id
SIGNSTATION_CLIENT_SECRET=your_client_secret
SIGNSTATION_DEPARTMENT_ID=your_department_id
SIGNSTATION_CERTIFICATE_ID=your_certificate_id
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Leegality for consent collection and digital signing APIs
- Ditto Insurance for design inspiration
- Netlify for serverless function hosting

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
