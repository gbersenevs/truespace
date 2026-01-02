# 🏗️ Архитектура TrueSpace

Подробное описание архитектуры образовательной платформы TrueSpace.

## 📐 Общая архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                        │
│                   React + Next.js 14                         │
│              TypeScript + Tailwind CSS                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    RENDER (Hosting)                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           Next.js Application                       │    │
│  │                                                      │    │
│  │  ┌──────────────┐         ┌──────────────┐        │    │
│  │  │   Frontend   │         │   Backend    │        │    │
│  │  │  (Pages/UI)  │◄───────►│  (API Routes)│        │    │
│  │  └──────────────┘         └──────┬───────┘        │    │
│  │                                   │                 │    │
│  └───────────────────────────────────┼─────────────────┘    │
│                                      │                       │
└──────────────────────────────────────┼───────────────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
         ┌──────────────────┐ ┌──────────────┐ ┌──────────────┐
         │  MongoDB Atlas   │ │   AWS S3     │ │ SMTP Server  │
         │   (Database)     │ │   (Videos)   │ │   (Email)    │
         └──────────────────┘ └──────────────┘ └──────────────┘
```

## 🗂️ Структура проекта

```
truespace/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   │
│   ├── api/                     # API Routes
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   └── me/route.ts
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── promo/
│   │   │   └── validate/route.ts
│   │   ├── favorites/
│   │   │   └── route.ts
│   │   └── admin/
│   │       └── promo-codes/route.ts
│   │
│   ├── login/                   # Auth pages
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── promo-access/
│   │   └── page.tsx
│   │
│   ├── courses/                 # Course pages
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   │
│   ├── profile/                 # User pages
│   │   └── page.tsx
│   │
│   └── admin/                   # Admin pages
│       ├── page.tsx
│       └── promo-codes/page.tsx
│
├── components/                   # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Navbar.tsx
│   ├── CourseCard.tsx
│   ├── VideoPlayer.tsx
│   └── Loading.tsx
│
├── lib/                         # Utility libraries
│   ├── mongodb.ts              # MongoDB connection
│   ├── auth.ts                 # JWT utilities
│   ├── email.ts                # Email sending
│   └── s3.ts                   # AWS S3 utilities
│
├── models/                      # Mongoose models
│   ├── User.ts
│   ├── Course.ts
│   ├── Lesson.ts
│   ├── PromoCode.ts
│   └── Progress.ts
│
├── public/                      # Static files
│
├── .env                         # Environment variables
├── .gitignore
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── package.json
├── render.yaml                 # Render deployment config
├── README.md
├── DEPLOYMENT.md
└── ARCHITECTURE.md
```

## 🔄 Data Flow

### 1. User Authentication Flow

```
User Registration:
┌──────────┐      ┌──────────────┐      ┌──────────┐      ┌────────────┐
│  Client  │─────►│ /api/auth/   │─────►│  Bcrypt  │─────►│  MongoDB   │
│          │      │  register    │      │  Hash    │      │            │
│          │◄─────┤              │◄─────┤          │◄─────┤            │
│  JWT     │      │  JWT Sign    │      │          │      │  User      │
└──────────┘      └──────────────┘      └──────────┘      └────────────┘

User Login:
┌──────────┐      ┌──────────────┐      ┌──────────┐      ┌────────────┐
│  Client  │─────►│ /api/auth/   │─────►│  Bcrypt  │─────►│  MongoDB   │
│          │      │    login     │      │  Compare │      │            │
│          │◄─────┤              │◄─────┤          │◄─────┤   Query    │
│  JWT     │      │  JWT Sign    │      │          │      │            │
└──────────┘      └──────────────┘      └──────────┘      └────────────┘
```

### 2. Promo Code Validation Flow

```
┌──────────┐      ┌──────────────┐      ┌────────────┐      ┌────────────┐
│  Client  │─────►│ /api/promo/  │─────►│  PromoCode │─────►│    User    │
│          │      │  validate    │      │   Model    │      │   Model    │
│          │      │              │      │            │      │            │
│          │      │  1. Verify   │      │ 2. Check   │      │ 3. Grant   │
│          │      │     JWT      │      │   Valid    │      │   Access   │
│          │      │              │      │            │      │            │
│          │◄─────┤  5. Return   │◄─────┤ 4. Update  │◄─────┤            │
│          │      │   Success    │      │   Uses     │      │            │
└──────────┘      └──────────────┘      └────────────┘      └────────────┘
```

### 3. Course Access Flow

```
┌──────────┐      ┌──────────────┐      ┌────────────┐      ┌────────────┐
│  Client  │─────►│ /api/courses │─────►│  MongoDB   │─────►│    AWS     │
│          │      │    /[id]     │      │            │      │     S3     │
│          │      │              │      │            │      │            │
│  Browse  │      │ 1. Auth      │      │ 2. Query   │      │ 3. Video   │
│  Watch   │      │    Check     │      │   Course   │      │    URL     │
│  Track   │      │              │      │            │      │            │
│          │◄─────┤ 5. Return    │◄─────┤ 4. With    │◄─────┤            │
│          │      │   Data       │      │   Lessons  │      │            │
└──────────┘      └──────────────┘      └────────────┘      └────────────┘
```

## 🔐 Security Architecture

### Authentication Layer

```
┌─────────────────────────────────────────────────────────────┐
│                     Security Layers                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Client Side:                                            │
│     - JWT stored in localStorage                            │
│     - Token sent in Authorization header                    │
│     - Automatic redirect if not authenticated               │
│                                                              │
│  2. API Routes:                                             │
│     - getUserFromRequest() middleware                       │
│     - JWT verification                                      │
│     - Role-based access control (RBAC)                      │
│                                                              │
│  3. Database Layer:                                         │
│     - Password hashing with bcrypt (salt rounds: 10)        │
│     - MongoDB Atlas network security                        │
│     - Connection string with credentials                    │
│                                                              │
│  4. S3 Security:                                            │
│     - IAM user with limited permissions                     │
│     - Bucket policies for public read                       │
│     - CORS configuration                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Role-Based Access Control (RBAC)

```
Roles:
┌──────────────────────────────────────────────────────────┐
│                                                           │
│  USER (Default):                                         │
│  ✓ View courses (if hasAccessToCourses = true)          │
│  ✓ Add to favorites                                      │
│  ✓ Track progress                                        │
│  ✓ Update own profile                                    │
│  ✗ Access admin panel                                    │
│  ✗ Create/edit courses                                   │
│                                                           │
│  ADMIN:                                                   │
│  ✓ All USER permissions                                  │
│  ✓ Access admin panel                                    │
│  ✓ Create/edit/delete courses                           │
│  ✓ Create/manage promo codes                            │
│  ✓ View user analytics                                   │
│  ✓ Manage all content                                    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

## 💾 Database Schema

### Collections Relationships

```
┌────────────────┐
│     Users      │
│ ─────────────  │
│ _id            │◄──────────┐
│ email          │           │
│ password       │           │ createdBy
│ role           │           │
│ favorites[]    │───┐       │
│ savedLessons[] │   │       │
└────────────────┘   │       │
                     │       │
         references  │       │
                     │       │
                     ▼       │
            ┌────────────────┴───┐
            │      Courses       │
            │ ─────────────────  │
            │ _id                │◄──────┐
            │ title              │       │
            │ description        │       │ courseId
            │ thumbnail          │       │
            │ lessons[]          │───────┤
            │ createdBy          │       │
            └────────────────────┘       │
                                         │
                                references│
                                         │
                                         ▼
                                ┌────────────────┐
                                │    Lessons     │
                                │ ────────────── │
                                │ _id            │
                                │ title          │
                                │ videoUrl       │
                                │ courseId       │
                                │ order          │
                                └────────────────┘

┌────────────────┐
│  PromoCodes    │
│ ─────────────  │
│ _id            │
│ code           │
│ isActive       │
│ maxUses        │
│ currentUses    │
│ expiresAt      │
│ createdBy      │
└────────────────┘

┌────────────────┐
│   Progress     │
│ ─────────────  │
│ userId         │
│ courseId       │
│ lessonId       │
│ completed      │
│ watchedDuration│
└────────────────┘
```

### Indexes

```javascript
// User Model
users.createIndex({ email: 1 }, { unique: true });

// Course Model
courses.createIndex({ title: 'text', description: 'text' });
courses.createIndex({ category: 1 });
courses.createIndex({ tags: 1 });
courses.createIndex({ isPublished: 1 });

// Lesson Model
lessons.createIndex({ courseId: 1, order: 1 });

// PromoCode Model
promocodes.createIndex({ code: 1 }, { unique: true });
promocodes.createIndex({ isActive: 1 });

// Progress Model
progress.createIndex({ userId: 1, lessonId: 1 }, { unique: true });
progress.createIndex({ userId: 1, courseId: 1 });
```

## 🎨 Frontend Architecture

### Component Hierarchy

```
App Layout
│
├── Navbar (persistent)
│   ├── Logo
│   ├── Navigation Links
│   └── User Menu
│
├── Page Content (dynamic)
│   │
│   ├── Home Page
│   │   ├── Hero Section
│   │   ├── Stats
│   │   ├── Featured Courses
│   │   └── CTA Section
│   │
│   ├── Courses Page
│   │   ├── Search Bar
│   │   ├── Filters
│   │   └── Course Grid
│   │       └── CourseCard (repeated)
│   │
│   ├── Course Detail Page
│   │   ├── Video Player
│   │   ├── Course Info
│   │   └── Lessons Sidebar
│   │       └── Lesson Item (repeated)
│   │
│   ├── Profile Page
│   │   ├── User Info Card
│   │   ├── Stats Cards
│   │   ├── Tabs (Favorites/Saved)
│   │   └── Course Grid
│   │
│   └── Admin Pages
│       ├── Dashboard
│       ├── Course Management
│       └── Promo Code Management
│
└── Footer
```

### State Management

```javascript
// Global State (Client-side)
localStorage:
  - token: JWT authentication token

// Component State (React useState)
Pages:
  - user: Current user data
  - loading: Loading state
  - error: Error messages
  - data: Page-specific data

// Server State (SWR)
useSWR('/api/courses', fetcher)
  - Automatic revalidation
  - Cache management
  - Error handling
```

### Animation Strategy

```javascript
// Framer Motion Animations

1. Page Transitions:
   - Fade in: initial={{ opacity: 0 }} animate={{ opacity: 1 }}
   - Slide up: initial={{ y: 20 }} animate={{ y: 0 }}

2. Component Animations:
   - Card hover: whileHover={{ y: -8 }}
   - Button press: whileTap={{ scale: 0.98 }}
   - Scale in: initial={{ scale: 0.95 }} animate={{ scale: 1 }}

3. List Animations:
   - Staggered children with delay
   - Sequential appearance

4. Loading States:
   - Shimmer effect with CSS
   - Pulse animation for placeholders
```

## 🚀 Performance Optimization

### Next.js Features

```javascript
// 1. Server Components (default in App Router)
- Reduced JavaScript bundle
- Faster initial page load
- Better SEO

// 2. Image Optimization
<Image 
  src="/thumbnail.jpg" 
  width={300} 
  height={200}
  loading="lazy"
/>

// 3. Route Prefetching
<Link href="/courses"> // Automatically prefetches

// 4. API Route Caching
export const revalidate = 3600; // Cache for 1 hour
```

### Database Optimization

```javascript
// 1. Connection Pooling
mongoose.connect(MONGODB_URI, {
  bufferCommands: false,
  maxPoolSize: 10
});

// 2. Selective Field Projection
User.findById(id).select('name email role');

// 3. Populate Only When Needed
Course.find().populate('lessons', 'title duration');

// 4. Pagination
Course.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

## 📊 Monitoring & Logging

### Application Logs

```javascript
// Structured Logging
console.log('[AUTH]', 'User login:', email);
console.error('[DB]', 'Connection error:', error);
console.info('[API]', 'Course created:', courseId);

// Render Logs Dashboard
- Real-time log streaming
- Search and filter
- Error tracking
```

### Metrics to Monitor

```
1. Performance:
   - Response time
   - Database query time
   - API endpoint latency

2. Usage:
   - Active users
   - Course views
   - Video plays

3. Errors:
   - Failed requests
   - Database errors
   - Authentication failures

4. Resources:
   - Memory usage
   - CPU usage
   - Disk space
```

## 🔄 CI/CD Pipeline

```
Developer → Git Push → GitHub → Render Auto-Deploy

Steps:
1. git push origin main
2. GitHub webhook triggers Render
3. Render pulls latest code
4. npm install (dependencies)
5. npm run build (Next.js build)
6. Health check
7. Switch to new deployment
8. Old deployment gracefully shutdown
```

## 🛡️ Error Handling

### API Error Responses

```typescript
// Success Response
{
  success: true,
  data: { ... },
  message: "Operation successful"
}

// Error Response
{
  success: false,
  error: "Error message",
  details: "Detailed error information"
}

// HTTP Status Codes
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
500 - Internal Server Error
```

### Frontend Error Handling

```typescript
try {
  const response = await fetch('/api/endpoint');
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error);
  }
  
  // Handle success
} catch (error) {
  // Show user-friendly error message
  setError(error.message);
}
```

## 📱 Responsive Design Strategy

```
Breakpoints (Tailwind CSS):
- sm: 640px   (mobile landscape)
- md: 768px   (tablet)
- lg: 1024px  (desktop)
- xl: 1280px  (large desktop)
- 2xl: 1536px (extra large)

Layout Strategy:
- Mobile First: base styles for mobile
- Progressive Enhancement: add complexity for larger screens
- Flexible Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Responsive Typography: text-base md:text-lg lg:text-xl
```

---

Эта архитектура обеспечивает:
- ✅ Масштабируемость
- ✅ Безопасность
- ✅ Производительность
- ✅ Поддерживаемость
- ✅ Расширяемость

