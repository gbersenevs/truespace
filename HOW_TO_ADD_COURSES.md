# 📚 How to Add Sample Courses to MongoDB

## ✨ You have 6 ready-to-use courses!

All about **AI Automation** and **No-Code Tools**:
- N8n Automation Mastery
- Make.com Pro
- Zapier Blueprint  
- AI Tools Integration
- Business Automation
- Data Science with No-Code

---

## 🚀 Quick Method: Import via MongoDB Atlas

### Step 1: Open MongoDB Atlas
👉 https://cloud.mongodb.com/

### Step 2: Navigate to your database
1. **Browse Collections**
2. Select database: `truespace`
3. Select collection: `courses`

### Step 3: Insert Documents

1. Click **"INSERT DOCUMENT"**
2. Switch to **JSON view** (toggle at the top)
3. Copy content from `sample-courses.json` (one course at a time)
4. Paste and click **"Insert"**
5. Repeat for all 6 courses

---

## 📋 Alternative: Copy-Paste Individual Courses

### Course 1: N8n Automation Mastery

```json
{
  "title": "N8n Automation Mastery: From Zero to Hero",
  "description": "Master n8n workflow automation from scratch. Learn to build powerful automations connecting hundreds of apps without code.",
  "category": "AI & Automation",
  "level": "Beginner",
  "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
  "isPublished": true,
  "instructor": {
    "name": "Alex Johnson",
    "avatar": "https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff"
  },
  "duration": 18000,
  "rating": 4.9,
  "studentsCount": 1250,
  "lessons": [
    {
      "title": "Introduction to N8n",
      "description": "Learn what n8n is and why it's powerful",
      "videoUrl": "https://www.youtube.com/watch?v=RpjQTGKm-ok",
      "duration": 600,
      "order": 1
    },
    {
      "title": "Your First Workflow",
      "description": "Build your first automation step by step",
      "videoUrl": "https://www.youtube.com/watch?v=RpjQTGKm-ok",
      "duration": 900,
      "order": 2
    },
    {
      "title": "Advanced Nodes & Logic",
      "description": "Master complex workflows with conditional logic",
      "videoUrl": "https://www.youtube.com/watch?v=RpjQTGKm-ok",
      "duration": 1200,
      "order": 3
    }
  ],
  "createdAt": {"$date": "2024-01-05T14:00:00.000Z"},
  "updatedAt": {"$date": "2024-01-05T14:00:00.000Z"}
}
```

*(See `sample-courses.json` for all 6 courses)*

---

## 🎥 Update Video URLs

The sample courses use placeholder YouTube URLs. Replace with your actual videos:

1. Upload your course videos to YouTube (can be Unlisted)
2. Copy video IDs from URLs: `https://www.youtube.com/watch?v=VIDEO_ID`
3. Update `videoUrl` in MongoDB for each lesson

---

## ✅ After Adding Courses

1. **Refresh your website** - courses should appear!
2. **Test the courses** - click, watch videos
3. **Create a promo code** if you haven't:

```json
{
  "code": "WELCOME2024",
  "isActive": true,
  "maxUses": -1,
  "currentUses": 0
}
```

---

## 🎨 Customize Courses

You can edit in MongoDB Atlas:
- Change titles, descriptions
- Update thumbnails (use Unsplash or your own images)
- Add more lessons
- Adjust difficulty levels

---

## 🔮 Your courses are ready to use!

Just add them to MongoDB and they'll appear on your site immediately! 🚀

