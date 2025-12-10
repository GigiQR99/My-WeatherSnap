# Unsplash API Setup Guide 🖼️

## Overview

The City Image Card component now uses the **Unsplash API** to fetch real, relevant landscape photos for each city you search or locate. This ensures you see actual Miami Beach photos for Miami Beach, Tokyo skylines for Tokyo, etc.

## ✅ What Was Fixed

### Before:
- ❌ Random images (tigers, mountains, etc.)
- ❌ No relevance to the actual city
- ❌ No photographer attribution

### After:
- ✅ Real city landscape photos from Unsplash
- ✅ Relevant to the searched/located city
- ✅ Proper photographer attribution (required by Unsplash)
- ✅ Loading states and error handling
- ✅ Fallback images if API fails

## 🔑 Getting Your Unsplash API Key

### Step 1: Create an Unsplash Account
1. Go to [https://unsplash.com](https://unsplash.com)
2. Click "Sign up" (top right)
3. Create a free account

### Step 2: Register as a Developer
1. Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. Click "Register as a developer"
3. Accept the API terms

### Step 3: Create a New Application
1. Click "New Application" or "Your apps"
2. Fill out the application form:
   - **Application name**: Weather Dashboard
   - **Description**: A weather dashboard that displays city photos
   - **Accept terms**: Check all boxes
3. Click "Create application"

### Step 4: Get Your Access Key
1. On your application page, you'll see:
   - **Access Key** (this is what you need!)
   - **Secret Key** (you don't need this for client-side)
2. Copy the **Access Key**

### Step 5: Add to .env File
1. Open your `.env` file in the project root
2. Find this line:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
3. Replace `your_unsplash_access_key_here` with your actual Access Key:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=YOUR_ACTUAL_KEY_HERE
   ```
4. Save the file

### Step 6: Restart Your Dev Server
```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## 📊 API Limits

### Demo/Development Mode:
- **50 requests per hour**
- Perfect for development and testing
- Resets every hour

### Production Mode (if you upgrade):
- **5,000 requests per hour**
- More than enough for most applications
- Free tier available

## 🎯 How It Works

### Search Query Format:
```
{cityName} landscape
```

### Examples:
- **Miami Beach** → "Miami Beach landscape"
- **Tokyo** → "Tokyo landscape"
- **New York** → "New York landscape"
- **Paris** → "Paris landscape"

### API Endpoint:
```
https://api.unsplash.com/photos/random?query={searchQuery}&orientation=landscape&content_filter=high
```

### What You Get:
- Random photo matching the city + landscape
- Different photo each time you search (variety!)
- High-quality, professional images
- Photographer information for attribution

## 🎨 Component Features

### 1. **Loading State**
- Shows spinner with "Fetching image…" text
- Appears while API call is in progress

### 2. **Image Display**
- Full-width, object-cover for best fit
- Landscape orientation (horizontal)
- High content filter (family-friendly)

### 3. **Attribution** (Required by Unsplash)
- Photographer name with link to their profile
- "Photo by [Name] on Unsplash" format
- UTM parameters for tracking

### 4. **Error Handling**
- Shows error message if API key is missing
- Shows error if API call fails
- Fallback to default city image

### 5. **City Name Overlay**
- City name displayed on image
- "Explore more photos" link to Unsplash
- Dark gradient for text readability

## 🔍 Testing

### Test Cases:

1. **Miami Beach**
   - Should show: beaches, palm trees, ocean views
   - Should NOT show: mountains, tigers, random objects

2. **Tokyo**
   - Should show: city skyline, buildings, urban landscape
   - Should NOT show: unrelated content

3. **New York**
   - Should show: Manhattan, skyscrapers, city views
   - Should NOT show: random nature photos

4. **Paris**
   - Should show: Eiffel Tower, city views, architecture
   - Should NOT show: unrelated images

## 🐛 Troubleshooting

### Problem: "Unsplash API key not configured"
**Solution**: 
- Make sure you added your API key to `.env` file
- Check that the key starts with `NEXT_PUBLIC_`
- Restart your dev server after adding the key

### Problem: Images not loading
**Solution**:
- Check browser console for errors
- Verify your API key is correct
- Check if you've exceeded rate limit (50/hour)
- Wait an hour if rate limit exceeded

### Problem: Wrong images showing
**Solution**:
- This is normal - Unsplash returns random photos matching the query
- Each search gives a different photo for variety
- All photos will be landscape/city-related

### Problem: "Failed to load image"
**Solution**:
- Check your internet connection
- Verify API key is valid
- Component will show fallback image automatically

## 📝 Code Structure

### Component Breakdown:

```typescript
// 1. State Management
const [imageData, setImageData] = useState<UnsplashPhoto | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

// 2. API Call (useEffect)
useEffect(() => {
  fetchCityImage(); // Runs when cityName changes
}, [cityName]);

// 3. Fetch Function
const fetchCityImage = async () => {
  // Get API key from env
  // Build search query
  // Call Unsplash API
  // Handle response
  // Handle errors
};

// 4. Render
return (
  // Loading state
  // Error state
  // Image display
  // Attribution
);
```

### Key Features:

1. **TypeScript interfaces** for type safety
2. **Environment variables** for API key security
3. **Error boundaries** for graceful failures
4. **Loading states** for better UX
5. **Fallback images** for reliability
6. **Proper attribution** per Unsplash guidelines

## 🎉 Benefits

### For Users:
- ✅ See relevant city photos
- ✅ Beautiful, professional images
- ✅ Variety (different photo each time)
- ✅ Fast loading with spinner feedback

### For Developers:
- ✅ Clean, well-commented code
- ✅ TypeScript for type safety
- ✅ Proper error handling
- ✅ Follows Unsplash API guidelines
- ✅ Easy to maintain and extend

## 📚 Resources

- **Unsplash API Docs**: https://unsplash.com/documentation
- **API Guidelines**: https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
- **Get API Key**: https://unsplash.com/developers
- **Rate Limits**: https://unsplash.com/documentation#rate-limiting

## 🚀 Next Steps

1. **Get your Unsplash API key** (see steps above)
2. **Add it to `.env` file**
3. **Restart your dev server**
4. **Test with different cities**
5. **Enjoy real city photos!** 🌆

---

**Remember**: The API key must start with `NEXT_PUBLIC_` to be accessible in the browser!

Example:
```
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=abc123xyz789...
```

Happy coding! 🎨✨
