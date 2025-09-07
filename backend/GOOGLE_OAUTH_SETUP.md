# Google OAuth Setup Guide

## 1. Configure Google OAuth in Supabase

### Step 1: Enable Google Auth in Supabase
1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list and click to configure it
4. Toggle **Enable sign in with Google** to ON

### Step 2: Get Google OAuth Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** (if not already enabled)
4. Go to **APIs & Services** → **Credentials**
5. Click **Create Credentials** → **OAuth client ID**
6. Select **Web application** as the application type
7. Set the authorized redirect URIs:
   - Add: `https://mpvbpgypuaurujvnrwxw.supabase.co/auth/v1/callback`
   - Replace `mpvbpgypuaurujvnrwxw` with your actual Supabase project ID
8. Copy the **Client ID** and **Client Secret**

### Step 3: Configure Google in Supabase
1. Back in your Supabase dashboard → **Authentication** → **Providers** → **Google**
2. Paste your **Google Client ID**
3. Paste your **Google Client Secret**
4. **IMPORTANT:** In the "Site URL" field, set it to: `http://127.0.0.1:5000`
5. **IMPORTANT:** In the "Redirect URLs" field, add: `http://127.0.0.1:5000/auth/google/callback`
6. Click **Save**

### Additional Supabase Configuration:
1. Go to **Authentication** → **Settings**
2. In the **Site URL** field, set: `http://127.0.0.1:5000`
3. In the **Redirect URLs** field, add: `http://127.0.0.1:5000/auth/google/callback`
4. Save the changes

## 2. Update Your Redirect URLs

### For Development:
- Google Cloud Console authorized redirect URIs:
  - `https://mpvbpgypuaurujvnrwxw.supabase.co/auth/v1/callback`
  
### For Production:
- Update both Google Cloud Console and this Flask app callback URL:
  - `https://yourdomain.com/auth/google/callback`

## 3. Test the Integration

1. Restart your Flask server
2. Go to http://127.0.0.1:5000/login
3. Click the **Continue with Google** button
4. You should be redirected to Google's OAuth consent screen
5. After authentication, you'll be redirected back to your app

## 4. Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch"**: Check that your redirect URIs match exactly in Google Cloud Console

2. **"Invalid OAuth state" or "bad_oauth_state"**: 
   - This indicates the Site URL in Supabase is incorrect
   - Go to Supabase Dashboard → Authentication → Settings
   - Set Site URL to: `http://127.0.0.1:5000`
   - Set Redirect URLs to: `http://127.0.0.1:5000/auth/google/callback`

3. **Redirecting to localhost:3000 instead of localhost:5000**:
   - This means Supabase Site URL is set to localhost:3000
   - Update Site URL in Supabase Authentication Settings to `http://127.0.0.1:5000`

4. **"OAuth failed"**: Check Supabase logs and ensure Google provider is properly configured

### Quick Fix for Current Error:
The error you're seeing (`localhost:3000/?error=invalid_request&error_code=bad_oauth_state`) means:
1. Go to your Supabase Dashboard
2. Navigate to Authentication → Settings  
3. Change "Site URL" from `http://localhost:3000` to `http://127.0.0.1:5000`
4. Add `http://127.0.0.1:5000/auth/google/callback` to "Redirect URLs"
5. Save and try the OAuth flow again

### Debug Logs:
Check the Flask server console for detailed error messages when testing OAuth flow.

## 5. Security Notes

- The OAuth state parameter is used for CSRF protection
- User sessions are stored server-side in Flask sessions
- Tokens are handled securely through Supabase Auth
- Never expose your Google Client Secret in frontend code
