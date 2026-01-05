# 🚀 TrueSpace - AI & Automation Learning Platform

> Modern educational platform for AI automation and no-code tools. Learn N8n, Make, Zapier, and AI integrations.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## ✨ Features

### 🎓 Course Management
- **YouTube Integration** - Stream videos directly from YouTube
- **Progress Tracking** - Track lesson completion and course progress
- **Favorites System** - Save courses for quick access
- **Search & Filters** - Find courses by category, level, or keywords

### 🔐 Authentication & Access
- **User Registration/Login** - Secure JWT-based authentication
- **Promo Code System** - Control access to premium content
- **Role-Based Access** - Admin and user roles

### 👨‍💼 Admin Panel
- **Course Management** - CRUD operations for courses
- **Promo Code Management** - Create and manage access codes
- **Analytics Dashboard** - View platform statistics

### 🎨 Modern UI
- **Light Theme** - Beautiful gradient backgrounds
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Powered by Framer Motion
- **Glass Morphism** - Modern UI effects

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Backend
- **Next.js API Routes** - Serverless backend
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Secure authentication

### Hosting
- **Vercel** - Automatic deployments
- **GitHub** - Version control

---

## 📚 Course Topics

Focused on **AI Automation** and **No-Code Tools**:

- ✅ N8n Workflow Automation
- ✅ Make.com (Integromat) 
- ✅ Zapier Automation
- ✅ ChatGPT & AI APIs
- ✅ Business Automation
- ✅ No-Code Data Science

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/truespace.git
cd truespace

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your MongoDB URI and secrets

# Run development server
npm run dev
```

Visit `http://localhost:3000`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables
   - Deploy!

📖 **Detailed Guide:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

---

## 🔐 Environment Variables

Create `.env` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/truespace

# Authentication
JWT_SECRET=your-secret-key-min-32-characters
NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars  
NEXTAUTH_URL=https://your-domain.vercel.app

# Email (optional - currently disabled)
EMAIL_SERVER=smtp://user:pass@smtp.gmail.com:587
EMAIL_FROM=noreply@truespace.com
```

---

## 📂 Project Structure

```
truespace/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── courses/           # Course pages
│   ├── admin/             # Admin panel
│   └── ...
├── components/            # React components
├── lib/                   # Utilities & database
├── models/                # MongoDB models
├── sample-courses.json    # Sample course data
└── README.md
```

---

## 📚 Adding Courses

We've prepared 6 ready-to-use courses about AI & Automation!

**See:** [HOW_TO_ADD_COURSES.md](HOW_TO_ADD_COURSES.md)

Quick steps:
1. Open MongoDB Atlas
2. Go to `truespace` → `courses` collection
3. Insert documents from `sample-courses.json`
4. Update video URLs with your YouTube videos

---

## 👨‍💼 Admin Setup

### 1. Create User
Register on your deployed site

### 2. Make Admin
In MongoDB Atlas:
- Find your user in `users` collection
- Edit document
- Change `"role": "user"` to `"role": "admin"`

### 3. Create Promo Code
In MongoDB Atlas `promocodes` collection:
```json
{
  "code": "WELCOME2024",
  "isActive": true,
  "maxUses": -1,
  "currentUses": 0
}
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  accent: {
    primary: '#6366f1',  // Your brand color
    secondary: '#818cf8',
  }
}
```

### Update Branding
- Logo: `components/Navbar.tsx`
- Favicon: `app/favicon.ico`
- Meta tags: `app/layout.tsx`

---

## 📖 Documentation

- **[VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)** - Deployment guide
- **[VERCEL_QUICK.md](VERCEL_QUICK.md)** - Quick deployment
- **[HOW_TO_ADD_COURSES.md](HOW_TO_ADD_COURSES.md)** - Add courses
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture
- **[YOUTUBE_GUIDE.md](YOUTUBE_GUIDE.md)** - YouTube setup

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### MongoDB Connection
- Check `MONGODB_URI` in environment variables
- Verify Network Access in MongoDB Atlas (allow `0.0.0.0/0`)
- Test connection string

### Deployment Issues
- Verify all environment variables in Vercel
- Check build logs for errors
- Ensure Node.js version >= 18

---

## 📝 License

MIT License - see [LICENSE](LICENSE)

---

## 🤝 Support

Need help? Check the documentation files or create an issue.

---

## 🎉 What's Next?

- [ ] Add more AI automation courses
- [ ] Enable email notifications
- [ ] Add course certificates
- [ ] Implement comments/discussions
- [ ] Create mobile app

---

**Made with ❤️ for AI & Automation enthusiasts**

🚀 **Live Demo:** [https://truespace.vercel.app](https://truespace.vercel.app)
