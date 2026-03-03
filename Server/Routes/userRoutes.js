import express from 'express'
import { clerkWebhooks, usercredits } from '../controllers/userController.js'
import authuser from '../middlewares/auth.js'

const userRouter = express.Router()

/**
 * POST /api/user/webhooks
 * Handles Clerk webhook events (user creation, updates, deletion)
 * 
 * No auth required - Svix signature verification is used instead
 * Required body: Raw JSON (express.raw() in server.js)
 * Headers: svix-id, svix-timestamp, svix-signature
 * 
 * Events handled:
 * - user.created: Create user in MongoDB with 5 default credits
 * - user.updated: Sync profile updates to MongoDB
 * - user.deleted: Delete user from MongoDB
 */
userRouter.post('/webhooks', clerkWebhooks)

/**
 * GET /api/user/credits
 * Retrieve the current user's available credits
 * 
 * Protected route - requires Clerk JWT token
 * Header: Authorization: Bearer <clerk_jwt_token>
 * 
 * Response:
 * {
 *   success: boolean,
 *   credit: number,
 *   isDefault?: boolean (true if returning default 5 credits for new user)
 * }
 * 
 * Error handling:
 * - 401: No token or invalid token
 * - 400: ClerkId missing from authentication
 * - 500: Database error
 */
userRouter.get('/credits', authuser, usercredits)

export default userRouter