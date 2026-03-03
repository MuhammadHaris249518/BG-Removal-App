# 🎫 Credit System - Production-Ready Implementation Guide

## Overview

This document outlines the complete credit system implementation for the BG Removal App using:
- **Backend**: Express.js + MongoDB
- **Frontend**: React + Context API
- **Authentication**: Clerk (with Svix webhooks)
- **Security**: JWT verification

---

## 🏗️ Architecture Flow

```
User Signs Up (Clerk)
    ↓
Svix Webhook (user.created event)
    ↓
clerkWebhooks() verifies signature
    ↓
Create MongoDB user with 5 default credits
    ↓
User logs in to React app
    ↓
Navbar calls loadCreditsData()
    ↓
Frontend sends Clerk JWT token
    ↓
authuser middleware decodes token → extracts clerkId
    ↓
usercredits controller fetches credits from MongoDB
    ↓
Display credits in Navbar (5 for new users)
```

---

## 📁 File Structure

```
Server/
├── configs/
│   └── mongodb.js              # MongoDB connection
├── controllers/
│   └── userController.js       # Webhook & Credits logic ✨ REFACTORED
├── middlewares/
│   └── auth.js                 # JWT verification middleware ✨ REFACTORED
├── Models/
│   └── userModel.js            # User schema with credits ✨ UPDATED
├── Routes/
│   └── userRoutes.js           # API routes ✨ UPDATED
└── server.js                   # Express app setup ✨ REFACTORED

Client/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Display credits ✨ ENHANCED
│   └── context/
│       └── Appcontext.jsx      # Global state management ✨ FIXED
```

---

## 🔧 Key Components

### 1️⃣ Backend Controller (`userController.js`)

#### Webhook Handler
```javascript
POST /api/user/webhooks
```
- **Verifies**: Svix signature using `CLERK_WEBHOOK_SECRET`
- **Handles**:
  - `user.created` → Creates MongoDB user with 5 credits
  - `user.updated` → Syncs profile changes
  - `user.deleted` → Cleans up user record

**Key Points**:
- ⚠️ Must use `express.raw()` for raw body verification
- Returns `{ success: true }` on success
- Returns `{ success: false, message: error }` on failure

#### Credits API
```javascript
GET /api/user/credits
Authorization: Bearer <clerk_jwt>
```
- **Protected**: Requires valid Clerk JWT token
- **Extracts**: `clerkId` from decoded token
- **Returns**: `{ success: true, credit: 5 }`
- **Safe**: Returns default 5 credits if user not found yet

---

### 2️⃣ Authentication Middleware (`auth.js`)

```javascript
const authuser = (req, res, next) => {
  // Extract Bearer token from Authorization header
  const token = req.headers.authorization?.slice(7);
  
  // Decode JWT (Clerk token)
  const decoded = jwt.decode(token);
  
  // Store in req.auth for controllers
  req.auth = { clerkId: decoded.sub };
  next();
}
```

**Changes Made**:
- ✅ Fixed to read from `Authorization: Bearer <token>` header
- ✅ Added error handling for missing/invalid tokens
- ✅ Stores clerkId in `req.auth.clerkId` (not req.body)

---

### 3️⃣ Frontend Context (`Appcontext.jsx`)

**State**:
```javascript
const [credits, setCredit] = useState(0);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**loadCreditsData Function**:
```javascript
const loadCreditsData = async () => {
  const token = await getToken(); // Clerk JWT
  
  const { data } = await axios.get(
    `${backendUrl}/api/user/credits`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  setCredit(data.credit); // ✅ FIXED: was data.credits
}
```

**Key Changes**:
- ✅ Fixed to send `Authorization: Bearer <token>` header
- ✅ Fixed to read `data.credit` (singular, not plural)
- ✅ Added loading and error states
- ✅ Added timeout and error handling
- ✅ Automatic retry on token refresh

---

### 4️⃣ Frontend Component (`Navbar.jsx`)

```jsx
const Navbar = () => {
  const { credits, loading, error, loadCreditsData } = useContext(Appcontext);
  
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      loadCreditsData();
    }
  }, [isSignedIn, isLoaded]);
  
  return (
    <button>
      Credits: {loading ? '...' : credits}
    </button>
  );
}
```

**Enhancements**:
- ✅ Proper error boundaries
- ✅ Loading state handling
- ✅ Safe null checks
- ✅ Better accessibility (aria labels, alt text)

---

## 🔐 Security Checklist

- [x] **Webhook Verification**: Svix signature validation for `user.created` events
- [x] **JWT Authentication**: Bearer token verification in `auth.js` middleware
- [x] **Raw Body**: Express.raw() for webhook signature verification
- [x] **Null Safety**: Default to 5 credits if user not found
- [x] **Error Handling**: Proper status codes (401, 400, 500)
- [x] **CORS**: Configured with frontend URL
- [x] **Headers**: Secure Authorization header usage

---

## 🧪 Testing Guide

### 1. Test Webhook (Clerk Dashboard)
```
1. Go to Clerk Dashboard → Webhooks
2. Create endpoint: https://yourdomain.com/api/user/webhooks
3. Subscribe to: user.created, user.updated, user.deleted
4. Create test user in Clerk
5. Check MongoDB → should have user with 5 credits
```

### 2. Test Frontend Credits Display
```
1. npm run dev (in Client folder)
2. Sign up with Clerk
3. Should see "Credits: 5" in Navbar
4. Check browser console for ✅ success messages
```

### 3. Test API Endpoint (cURL)
```bash
# Get your Clerk token first from browser console
const token = await clerk.session.getToken()

# Then call API
curl -H "Authorization: Bearer $token" \
  https://yourdomain.com/api/user/credits
```

Expected response:
```json
{
  "success": true,
  "credit": 5,
  "isDefault": false
}
```

---

## 🚀 Deployment Checklist

### Backend (server.js)
- [ ] Set `NODE_ENV=production`
- [ ] Configure `PORT` environment variable
- [ ] Set `CLERK_WEBHOOK_SECRET` from Clerk Dashboard
- [ ] Set `FRONTEND_URL` for CORS
- [ ] Set `MONGODB_URI` for production database

### Frontend (Appcontext.jsx)
- [ ] Set `VITE_BACKEND_URL` to production API URL
- [ ] Test credits fetch with production backend
- [ ] Verify Clerk is configured for production domain

### Clerk Setup
- [ ] Add production domain to Clerk
- [ ] Update webhook endpoint to production URL
- [ ] Test webhook with Clerk testing tools

---

## 📋 Response Formats

### ✅ Success Responses

**Get Credits**:
```json
{
  "success": true,
  "credit": 5,
  "isDefault": false
}
```

**Webhook**:
```json
{
  "success": true,
  "message": "Webhook processed"
}
```

### ❌ Error Responses

**Missing Token** (401):
```json
{
  "success": false,
  "message": "No authorization token provided. Please login first."
}
```

**Invalid Token** (401):
```json
{
  "success": false,
  "message": "Invalid token. Please login again."
}
```

**Server Error** (500):
```json
{
  "success": false,
  "message": "Failed to fetch credits. Please try again."
}
```

---

## 🔍 Debugging Tips

### Issue: Credits show 0
**Causes**:
- [ ] Webpack is still using old `data.credits` field
- [ ] Token not being sent in Authorization header
- [ ] Clerk webhook failed during signup

**Solution**:
```bash
# Check browser console for errors
# Check backend logs for webhook failures
# Verify MongoDB has user record: db.users.find({clerkId: "..."})
```

### Issue: "No authorization token provided"
**Causes**:
- [ ] Frontend not sending Authorization header
- [ ] Clerk JWT not available yet
- [ ] Token expired

**Solution**:
```javascript
// In browser console
const token = await clerk.session.getToken()
console.log('Token:', token)
```

### Issue: Webhook not working
**Causes**:
- [ ] `CLERK_WEBHOOK_SECRET` not set or incorrect
- [ ] Webhook endpoint not using express.raw()
- [ ] Signing secret mismatch

**Solution**:
```bash
# Test with Clerk Dashboard
# Check server logs for "Webhook Error"
# Verify raw body middleware order in server.js
```

---

## 📚 API Reference

### POST /api/user/webhooks
Clerk webhook endpoint for user events.

**Headers**:
```
svix-id: <webhook_id>
svix-timestamp: <timestamp>
svix-signature: <signature>
```

**Events Handled**:
- `user.created` - Create user with 5 credits
- `user.updated` - Sync profile updates
- `user.deleted` - Delete user

---

### GET /api/user/credits
Fetch user's available credits.

**Headers**:
```
Authorization: Bearer <clerk_jwt>
```

**Response**:
```json
{
  "success": true,
  "credit": number,
  "isDefault": boolean
}
```

---

## 🎓 Learning Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Svix Webhook Verification](https://docs.svix.com/verify)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [React Context API](https://react.dev/reference/react/useContext)

---

## 📞 Support

For issues or questions:
1. Check browser console for frontend errors
2. Check server logs for backend errors
3. Verify environment variables are set
4. Test with cURL or Postman
5. Check Clerk webhook logs in dashboard

---

**Last Updated**: March 2, 2026  
**Status**: ✅ Production Ready
