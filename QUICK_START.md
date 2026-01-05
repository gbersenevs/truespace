# ⚡ БЫСТРЫЙ СТАРТ

## 1️⃣ ЗАПУШЬТЕ КОД

```bash
cd /Users/glebbersenev/Dropbox/Mac/Documents/GitHub/truespace
git add .
git commit -m "Final: ready for deployment"
git push origin main
```

---

## 2️⃣ НАСТРОЙТЕ RENDER

👉 https://dashboard.render.com/

### Settings → Build & Deploy:

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

---

## 3️⃣ ДОБАВЬТЕ ENV VARIABLES

```
MONGODB_URI=mongodb+srv://gleb:Gleb2026@clusterts.mhxbrxh.mongodb.net/truespace?retryWrites=true&w=majority&appName=ClusterTS

JWT_SECRET=a7f3d8e9c2b5a1f4e8d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2

NEXTAUTH_SECRET=e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7

NEXTAUTH_URL=https://truespace.onrender.com
```

(Измените URL если у вас другой!)

---

## 4️⃣ ДЕПЛОЙ

**Manual Deploy** → Deploy latest commit

Ждите 3-5 минут ⏱️

---

## 5️⃣ ОТКРОЙТЕ САЙТ

https://truespace.onrender.com

---

## ✅ ГОТОВО!

📖 **Полная инструкция:** [FINAL_DEPLOY.md](FINAL_DEPLOY.md)

