# Quick Start - City Image Card 🚀

## ⚡ 3-Step Setup

### 1️⃣ Get Unsplash API Key
1. Go to: https://unsplash.com/developers
2. Sign up / Log in
3. Create new application
4. Copy your **Access Key**

### 2️⃣ Add to .env File
Open `.env` and replace:
```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

With your actual key:
```bash
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=YOUR_ACTUAL_KEY_HERE
```

### 3️⃣ Restart Server
```bash
# Press Ctrl+C to stop
# Then restart:
npm run dev
```

## ✅ Test It

1. Open http://localhost:3000
2. Search "Miami Beach"
3. See a **real Miami Beach photo**! 🏖️

## 🎯 What You'll See

### For Miami Beach:
- ✅ Beach scenes
- ✅ Palm trees
- ✅ Ocean views
- ✅ Miami skyline

### For Tokyo:
- ✅ City skyline
- ✅ Modern buildings
- ✅ Urban landscape

### For Any City:
- ✅ Relevant landscape photos
- ✅ Professional quality
- ✅ Photographer attribution
- ✅ Different photo each search

## 📊 Features

- **Loading State**: "Fetching image…" with spinner
- **Error Handling**: Shows message if API key missing
- **Attribution**: "Photo by [Name] on Unsplash"
- **Fallback**: Default image if API fails
- **Responsive**: Works on all devices

## 🔧 Component Details

### API Call:
```typescript
GET https://api.unsplash.com/photos/random
  ?query={cityName} landscape
  &orientation=landscape
  &content_filter=high
```

### Search Examples:
- "Miami Beach landscape"
- "Tokyo landscape"
- "New York landscape"

### Response:
- Random photo matching the query
- High-quality image
- Photographer info
- Different each time

## ⚠️ Important Notes

1. **API Key Format**: Must start with `NEXT_PUBLIC_`
2. **Rate Limit**: 50 requests/hour (free tier)
3. **Restart Required**: After adding API key
4. **Attribution Required**: Per Unsplash guidelines

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "API key not configured" | Add key to `.env`, restart server |
| Images not loading | Check API key, verify internet |
| Wrong images | Normal - random photos per query |
| Rate limit exceeded | Wait 1 hour or upgrade plan |

## 📝 .env File Example

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-proj-...

# Unsplash API Key (ADD THIS!)
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=YOUR_KEY_HERE
```

## 🎉 That's It!

Your city image card will now show **real, relevant photos** for every city you search!

**No more tigers for Miami Beach!** 🐅❌ → 🏖️✅

---

Need help? Check `UNSPLASH_SETUP_GUIDE.md` for detailed instructions.
