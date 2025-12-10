# Setup Instructions for Weather Dashboard with Chatbot

## 🔑 Adding Your OpenAI API Key

**IMPORTANT:** Follow these steps to securely add your API key:

### Step 1: Get Your API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key (if you don't have one)
3. Copy the key (it starts with `sk-proj-...`)

### Step 2: Add to .env File
1. Open the `.env` file in the project root
2. Replace `your_api_key_here` with your actual API key
3. The file should look like this:
   ```
   OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
   ```
4. Save the file

### Step 3: Restart the Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

## 🔒 Security Best Practices

### ✅ DO:
- Keep your `.env` file in the project root
- Never commit `.env` to git (it's already in `.gitignore`)
- Revoke and regenerate keys if they're ever exposed
- Use environment variables for all sensitive data

### ❌ DON'T:
- Share your API key in chat, email, or messages
- Commit `.env` files to version control
- Hardcode API keys in your code
- Share screenshots that show your API key

## 🤖 Using the Chatbot

Once your API key is configured:

1. Look for the blue chat button in the bottom-right corner
2. Click it to open the weather assistant chatbot
3. Ask questions like:
   - "What should I wear in rainy weather?"
   - "Explain what UV index means"
   - "Is 70% humidity high?"
   - "What causes thunderstorms?"

## 💰 Cost Information

- The chatbot uses GPT-3.5-turbo (most cost-effective model)
- Typical cost: ~$0.002 per conversation
- Monitor usage at: https://platform.openai.com/usage

## 🐛 Troubleshooting

### "OpenAI API key not configured" error
- Make sure `.env` file is in the project root (not in `/types/`)
- Check that the variable name is exactly `OPENAI_API_KEY` (with underscores)
- Restart the development server after adding the key

### Chatbot not responding
- Check browser console for errors
- Verify your API key is valid at https://platform.openai.com/api-keys
- Make sure you have credits in your OpenAI account

## 📝 Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Make sure the development server restarted after adding the key
