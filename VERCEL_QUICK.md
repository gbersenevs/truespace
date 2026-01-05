# ⚡ VERCEL - БЫСТРАЯ ИНСТРУКЦИЯ

## 1️⃣ ЗАПУШЬТЕ КОД

```bash
cd /Users/glebbersenev/Dropbox/Mac/Documents/GitHub/truespace
git add .
git commit -m "Ready for Vercel"
git push origin main
```

---

## 2️⃣ ОТКРОЙТЕ VERCEL

👉 **https://vercel.com/signup**

**Continue with GitHub** → авторизуйте

---

## 3️⃣ ИМПОРТИРУЙТЕ ПРОЕКТ

**Add New** → **Project** → найдите **`truespace`** → **Import**

---

## 4️⃣ ДОБАВЬТЕ ENV VARIABLES

Раскройте **"Environment Variables"** и добавьте:

```
MONGODB_URI=mongodb+srv://gleb:Gleb2026@clusterts.mhxbrxh.mongodb.net/truespace?retryWrites=true&w=majority&appName=ClusterTS

JWT_SECRET=a7f3d8e9c2b5a1f4e8d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2

NEXTAUTH_SECRET=e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7

NEXTAUTH_URL=https://truespace.vercel.app
```

(Для каждой выберите: **All**)

---

## 5️⃣ ДЕПЛОЙ

Нажмите **"Deploy"**

Ждите **1-2 минуты** ⏱️

---

## 6️⃣ ОТКРОЙТЕ САЙТ

**https://truespace.vercel.app** 🎉

(Или ваш URL который дал Vercel)

---

## ✅ ГОТОВО!

Сайт работает! 🚀

📖 **Полная инструкция:** [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

