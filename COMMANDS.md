# 🛠️ TrueSpace - Справочник команд

Быстрый справочник всех необходимых команд для работы с проектом.

## 📦 Установка и запуск

### Начальная установка
```bash
# Клонирование репозитория
git clone https://github.com/yourusername/truespace.git
cd truespace

# Установка зависимостей
npm install

# Копирование .env
cp .env.local.example .env

# Отредактируйте .env файл
# nano .env  или  code .env
```

### Запуск в режиме разработки
```bash
# Запуск dev сервера
npm run dev

# Dev сервер на другом порту
PORT=3001 npm run dev

# Dev сервер с turbo
npm run dev --turbo
```

### Production сборка
```bash
# Сборка проекта
npm run build

# Запуск production сервера
npm start

# Сборка + запуск
npm run build && npm start
```

## 🧹 Код качество

### Линтинг
```bash
# Проверка ESLint
npm run lint

# Автоматическое исправление
npm run lint -- --fix

# Проверка конкретного файла
npx eslint app/page.tsx

# Проверка конкретной директории
npx eslint app/
```

### Форматирование (если добавите Prettier)
```bash
# Установка Prettier
npm install -D prettier

# Создание .prettierrc
echo '{"semi": true, "singleQuote": true}' > .prettierrc

# Форматирование
npx prettier --write .

# Проверка без изменений
npx prettier --check .
```

## 🗄️ База данных

### MongoDB команды (MongoDB Shell)
```bash
# Подключение к MongoDB Atlas
mongosh "mongodb+srv://cluster.mongodb.net/truespace" --username YOUR_USERNAME

# Показать все базы
show dbs

# Использовать базу truespace
use truespace

# Показать коллекции
show collections

# Найти всех пользователей
db.users.find()

# Найти пользователя по email
db.users.findOne({ email: "admin@truespace.com" })

# Обновить роль пользователя на admin
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin", hasAccessToCourses: true } }
)

# Создать промокод
db.promocodes.insertOne({
  code: "WELCOME2024",
  isActive: true,
  maxUses: -1,
  currentUses: 0,
  createdBy: ObjectId("YOUR_ADMIN_ID"),
  createdAt: new Date(),
  updatedAt: new Date()
})

# Удалить все курсы
db.courses.deleteMany({})

# Подсчитать пользователей
db.users.countDocuments()

# Найти активные промокоды
db.promocodes.find({ isActive: true })
```

### Backup и Restore
```bash
# Экспорт базы данных
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/truespace"

# Импорт базы данных
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/truespace" dump/

# Экспорт коллекции в JSON
mongoexport --uri="mongodb+srv://cluster.mongodb.net/truespace" --collection=users --out=users.json

# Импорт коллекции из JSON
mongoimport --uri="mongodb+srv://cluster.mongodb.net/truespace" --collection=users --file=users.json
```

## 🔐 Генерация секретов

### JWT секреты
```bash
# Генерация JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Генерация NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Генерация 64-byte секрета
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Генерация промокода (8 символов)
node -e "console.log(Math.random().toString(36).substring(2, 10).toUpperCase())"
```

### Хеширование паролей (для ручного создания пользователей)
```bash
# Установка bcryptjs глобально (опционально)
npm install -g bcryptjs

# Хеширование в Node.js
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## 🪣 AWS S3 команды

### AWS CLI
```bash
# Установка AWS CLI
# macOS
brew install awscli

# Linux
sudo apt-get install awscli

# Конфигурация
aws configure

# Загрузка файла
aws s3 cp video.mp4 s3://truespace-videos/videos/

# Загрузка папки
aws s3 cp videos/ s3://truespace-videos/videos/ --recursive

# Список файлов
aws s3 ls s3://truespace-videos/

# Удаление файла
aws s3 rm s3://truespace-videos/videos/old-video.mp4

# Синхронизация папки
aws s3 sync videos/ s3://truespace-videos/videos/

# Установка публичного доступа
aws s3api put-object-acl --bucket truespace-videos --key video.mp4 --acl public-read
```

## 📧 Email тестирование

### Отправка тестового email
```bash
# Используя curl
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com"}'

# Используя Node.js скрипт (создайте test-email.js)
node test-email.js
```

Создайте `test-email.js`:
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

transporter.sendMail({
  from: 'noreply@truespace.com',
  to: 'test@example.com',
  subject: 'Test Email',
  text: 'This is a test email from TrueSpace'
}, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
```

## 🐛 Отладка

### Next.js отладка
```bash
# Запуск с расширенным логированием
DEBUG=* npm run dev

# Только Next.js логи
DEBUG=next:* npm run dev

# Очистка кэша Next.js
rm -rf .next

# Полная очистка
rm -rf .next node_modules package-lock.json
npm install
```

### Node.js отладка
```bash
# Запуск с инспектором
node --inspect node_modules/.bin/next dev

# Открыть Chrome DevTools
# chrome://inspect
```

## 🔍 Полезные команды

### Поиск в коде
```bash
# Найти TODO комментарии
grep -r "TODO" app/ components/ lib/

# Найти console.log
grep -r "console.log" app/ components/ lib/

# Найти использование компонента
grep -r "import.*Button" app/ components/

# Подсчитать строки кода
find app components lib -name "*.tsx" -o -name "*.ts" | xargs wc -l
```

### Git команды
```bash
# Инициализация
git init
git add .
git commit -m "Initial commit"

# Подключение удаленного репозитория
git remote add origin https://github.com/yourusername/truespace.git
git branch -M main
git push -u origin main

# Обновление
git add .
git commit -m "Update features"
git push

# Создание ветки
git checkout -b feature/new-feature

# Слияние
git checkout main
git merge feature/new-feature

# Просмотр изменений
git status
git diff
git log --oneline
```

### npm команды
```bash
# Обновление зависимостей
npm update

# Проверка устаревших пакетов
npm outdated

# Аудит безопасности
npm audit

# Автоматическое исправление уязвимостей
npm audit fix

# Очистка кэша
npm cache clean --force

# Переустановка зависимостей
rm -rf node_modules package-lock.json
npm install

# Добавление новой зависимости
npm install package-name

# Добавление dev зависимости
npm install -D package-name

# Удаление зависимости
npm uninstall package-name
```

## 🚀 Деплой команды

### Render
```bash
# Автоматический деплой через Git
git push origin main
# Render автоматически задеплоит

# Ручной деплой (из Render Dashboard)
# Deploy → Manual Deploy → Deploy latest commit
```

### Vercel (альтернатива)
```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel

# Production деплой
vercel --prod

# Просмотр логов
vercel logs
```

### Docker (если нужен)
```bash
# Создание Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
EOF

# Сборка образа
docker build -t truespace .

# Запуск контейнера
docker run -p 3000:3000 --env-file .env truespace

# Остановка
docker stop $(docker ps -q --filter ancestor=truespace)
```

## 📊 Мониторинг и логи

### Просмотр логов Render
```bash
# Через веб-интерфейс
# Dashboard → Your Service → Logs

# Или через API (требует API key)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.render.com/v1/services/YOUR_SERVICE_ID/logs
```

### Локальные логи
```bash
# Просмотр логов в реальном времени
npm run dev | tee app.log

# Grep по логам
grep "ERROR" app.log
grep "User" app.log

# Последние 100 строк
tail -n 100 app.log

# Следить за логами
tail -f app.log
```

## 🧪 Тестирование (будущее)

### Jest (если добавите)
```bash
# Установка Jest
npm install -D jest @testing-library/react @testing-library/jest-dom

# Запуск тестов
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Cypress E2E (если добавите)
```bash
# Установка Cypress
npm install -D cypress

# Открыть Cypress
npx cypress open

# Запуск headless
npx cypress run
```

## 🔧 Troubleshooting команды

### Проблемы с портом
```bash
# Найти процесс на порту 3000
lsof -i :3000

# Убить процесс на порту 3000
lsof -ti:3000 | xargs kill -9

# Альтернатива (Linux)
sudo netstat -tulpn | grep :3000
sudo kill -9 PID
```

### Проблемы с Node
```bash
# Проверка версии Node
node -v

# Проверка версии npm
npm -v

# Переустановка Node (через nvm)
nvm install 18
nvm use 18
nvm alias default 18
```

### Проблемы с зависимостями
```bash
# Очистка и переустановка
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Проверка конфликтов
npm ls

# Обновление npm
npm install -g npm@latest
```

## 📝 Быстрые скрипты

### Создание backup .env
```bash
cp .env .env.backup.$(date +%Y%m%d)
```

### Массовое переименование файлов
```bash
# Пример: переименовать все .js в .ts
find . -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
```

### Подсчет компонентов
```bash
find components -name "*.tsx" | wc -l
```

---

## 💡 Полезные алиасы

Добавьте в `.bashrc` или `.zshrc`:

```bash
# Быстрый запуск
alias dev='npm run dev'
alias build='npm run build'
alias start='npm start'

# Очистка
alias clean='rm -rf .next node_modules'
alias fresh='clean && npm install'

# Git
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Логи
alias logs='npm run dev | tee app.log'
```

---

**Сохраните этот файл как справочник!** 📖

