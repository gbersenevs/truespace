# 🚀 ДЕПЛОЙ НА RENDER - Быстрая инструкция

## ⚡ За 15 минут от кода до работающего сайта!

---

## 📋 Что нужно (подготовьте заранее):

1. ✅ Аккаунт на [GitHub.com](https://github.com)
2. ✅ Аккаунт на [Render.com](https://render.com)
3. ✅ MongoDB URI (у вас уже есть): `mongodb+srv://gleb:Gleb2026@...`

---

## 🎯 Шаг 1: GitHub (5 минут)

### 1.1 Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Repository name: `truespace`
3. Description: `Educational video platform`
4. Visibility: **Public** или **Private** (неважно)
5. **НЕ СТАВЬТЕ галочки** (README, .gitignore, license)
6. Нажмите **Create repository**

**Скопируйте URL вашего репозитория:**
```
https://github.com/ВАШ_USERNAME/truespace.git
```

### 1.2 Откройте терминал

```bash
# Перейдите в папку проекта
cd /Users/glebbersenev/Dropbox/Mac/Documents/GitHub/truespace
```

### 1.3 Инициализируйте Git

```bash
# Инициализация
git init

# Добавьте все файлы
git add .

# Первый коммит
git commit -m "Initial commit: TrueSpace educational platform"

# Переименуйте ветку в main
git branch -M main

# Подключите GitHub репозиторий (замените ВАШ_USERNAME!)
git remote add origin https://github.com/ВАШ_USERNAME/truespace.git

# Отправьте код на GitHub
git push -u origin main
```

**Если попросит логин:**
- Username: ваш GitHub username
- Password: [Personal Access Token](https://github.com/settings/tokens) (НЕ обычный пароль!)

**Как создать Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Generate new token (classic)
3. Note: `truespace-deploy`
4. Expiration: `90 days`
5. Select scopes: ✅ `repo` (все подпункты)
6. Generate token
7. **СКОПИРУЙТЕ токен!** (больше не увидите)

### ✅ Проверка:

Обновите страницу репозитория на GitHub - должны увидеть весь код!

---

## 🚀 Шаг 2: Render (10 минут)

### 2.1 Создайте аккаунт на Render

1. Перейдите на https://render.com
2. Нажмите **Get Started for Free**
3. Войдите через **GitHub** (проще всего!)
4. Разрешите доступ к репозиториям

### 2.2 Создайте Web Service

1. В Dashboard нажмите **New +** → **Web Service**
2. Выберите ваш репозиторий: **truespace**
3. Если не видите - нажмите **Configure account** и дайте доступ

### 2.3 Настройте параметры

**Basic Settings:**
```
Name: truespace
Region: Oregon (US West)
Branch: main
Root Directory: (оставьте пустым)
Runtime: Node
```

**Build & Deploy:**
```
Build Command: npm install && npm run build
Start Command: npm start
```

**Plan:**
```
Instance Type: Starter (Free - $0/month)
```

### 2.4 Environment Variables

Прокрутите вниз до **Environment Variables** и нажмите **Add Environment Variable**.

Добавьте ВСЕ эти переменные:

#### 1. MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://gleb:Gleb2026@clusterts.mhxbrxh.mongodb.net/truespace?retryWrites=true&w=majority&appName=ClusterTS
```

#### 2. JWT_SECRET
```
Key: JWT_SECRET
Value: a7f3d8e9c2b5a1f4e8d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2
```

#### 3. NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: e5d8c1b4a7f3d9e6c2b5a8f1e4d7c3b9a6f2e5d8c1b4a7f3d9e6c2b5a8f1e4d7
```

#### 4. NEXTAUTH_URL
```
Key: NEXTAUTH_URL
Value: https://truespace.onrender.com
```
⚠️ **ВАЖНО:** Замените `truespace` на ваше имя service если оно другое!

#### 5. EMAIL_SERVER (опционально)
```
Key: EMAIL_SERVER
Value: smtp://your.email@gmail.com:password@smtp.gmail.com:587
```
(Можно настроить позже)

#### 6. EMAIL_FROM (опционально)
```
Key: EMAIL_FROM
Value: noreply@truespace.com
```

### 2.5 Нажмите Create Web Service

**Render начнет деплой!** ⏳

Вы увидите логи в реальном времени:

```
==> Cloning from https://github.com/...
==> Downloading cache...
==> Running 'npm install && npm run build'
    npm WARN deprecated...
    added 512 packages in 45s
==> Running 'npm run build'
    Creating an optimized production build...
    ✓ Compiled successfully
==> Build successful 🎉
==> Starting service with 'npm start'
    > truespace@1.0.0 start
    > next start
    ✓ Ready in 1.2s
```

**Подождите 5-10 минут** (первый деплой долгий)

### ✅ Успех!

Когда увидите:
```
Your service is live 🎉
```

Ваш сайт доступен по адресу:
```
https://truespace.onrender.com
```

(или другое имя которое вы выбрали)

---

## 🎉 ГОТОВО! Сайт работает!

### Проверьте:

1. Откройте ваш URL: `https://truespace.onrender.com`
2. Должна открыться главная страница
3. Темный дизайн, анимации работают ✅

### Что работает:
- ✅ Главная страница
- ✅ Регистрация (MongoDB подключена!)
- ✅ Вход
- ✅ Промокоды
- ✅ Профиль

---

## 🔄 Обновление сайта

Когда меняете код:

```bash
git add .
git commit -m "Добавил новую функцию"
git push origin main
```

**Render автоматически обновит сайт!** (2-3 минуты)

---

## 👨‍💼 Создание первого админа

### Вариант 1: Через Render Shell

1. В Render Dashboard → ваш service
2. Вкладка **Shell**
3. Нажмите **Launch Shell**
4. Выполните:

```javascript
// Подключитесь к MongoDB
const mongoose = require('mongoose');
await mongoose.connect(process.env.MONGODB_URI);

// Найдите пользователя по email
const User = require('./models/User').default;
const user = await User.findOne({ email: 'your@email.com' });

// Сделайте админом
user.role = 'admin';
user.hasAccessToCourses = true;
await user.save();

console.log('Done!');
```

### Вариант 2: Через MongoDB Atlas

1. Откройте [MongoDB Atlas](https://cloud.mongodb.com/)
2. Browse Collections
3. Найдите базу `truespace` → коллекцию `users`
4. Найдите вашего пользователя
5. Нажмите Edit
6. Измените:
   ```json
   "role": "admin"
   "hasAccessToCourses": true
   ```
7. Update

---

## 🎟️ Создание промокода

### Через MongoDB Atlas:

1. Browse Collections → `truespace` → `promocodes`
2. Insert Document
3. Вставьте:

```json
{
  "code": "WELCOME2024",
  "isActive": true,
  "maxUses": -1,
  "currentUses": 0,
  "expiresAt": null,
  "description": "Welcome promo code",
  "createdBy": "YOUR_ADMIN_USER_ID",
  "createdAt": {"$date": "2024-01-01T00:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-01T00:00:00.000Z"}
}
```

Замените `YOUR_ADMIN_USER_ID` на ваш ObjectId из коллекции users.

---

## 📊 Мониторинг

### Render Dashboard:

**Logs** - реальные логи приложения  
**Metrics** - использование ресурсов  
**Events** - история деплоев  
**Settings** - настройки

### Полезные ссылки:

- Ваш сайт: https://truespace.onrender.com
- Render Dashboard: https://dashboard.render.com/
- GitHub Repo: https://github.com/ВАШ_USERNAME/truespace
- MongoDB Atlas: https://cloud.mongodb.com/

---

## 🐛 Troubleshooting

### Сайт не открывается

**Проблема:** ERR_CONNECTION_REFUSED

**Решение:**
1. Проверьте Render Dashboard → Logs
2. Ищите ошибки
3. Убедитесь что build успешен

### Ошибка MongoDB

**Проблема:** MongoServerError: bad auth

**Решение:**
1. Проверьте MONGODB_URI в Environment Variables
2. Убедитесь что пароль правильный
3. Проверьте Network Access в MongoDB Atlas (0.0.0.0/0)

### Build failed

**Проблема:** Build command failed

**Решение:**
1. Проверьте что package.json корректный
2. Проверьте что все файлы на GitHub
3. Посмотрите логи build

### Сайт тормозит

**Проблема:** Медленная загрузка

**Решение:**
- Бесплатный план Render "засыпает" после 15 минут
- Первый запрос после сна занимает ~30 секунд
- Решение: апгрейд на Starter plan ($7/месяц)

---

## 💰 Стоимость

### Бесплатно:
- ✅ GitHub: неограниченные репозитории
- ✅ Render: 750 часов/месяц (достаточно!)
- ✅ MongoDB Atlas: 512MB данных

### Когда нужно платить:
- Render: когда нужен 24/7 uptime без засыпания ($7/мес)
- MongoDB: когда база больше 512MB ($9/мес)

---

## ✅ Финальный чек-лист

- [ ] Код на GitHub
- [ ] Web Service создан на Render
- [ ] Environment Variables добавлены
- [ ] Build успешен
- [ ] Сайт открывается
- [ ] Регистрация работает
- [ ] Первый админ создан
- [ ] Промокод создан
- [ ] Первый курс добавлен (с YouTube URL)

---

## 🎓 Что дальше?

### 1. Добавьте курсы:
- Загрузите видео на YouTube (Unlisted)
- В админ-панели создайте курсы
- Добавьте YouTube URLs

### 2. Настройте Email:
- Для восстановления пароля
- Gmail App Password или SendGrid

### 3. Custom Domain:
- Купите домен (например, на Namecheap)
- В Render → Custom Domains
- Настройте DNS

### 4. Мониторинг:
- Следите за логами
- Проверяйте метрики
- Обновляйте зависимости

---

## 📚 Полезные ссылки

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Docs](https://docs.github.com/)

---

## 🆘 Нужна помощь?

- 📧 Render Support: https://render.com/support
- 💬 MongoDB Support: https://support.mongodb.com/
- 📖 Документация проекта: README.md

---

**Поздравляю! Ваша платформа TrueSpace теперь в интернете!** 🎉

**URL:** https://truespace.onrender.com

Делитесь ссылкой, приглашайте пользователей, создавайте курсы! 🚀

---

**P.S.** Не забудьте создать промокод и дать доступ первым пользователям! 🎟️

