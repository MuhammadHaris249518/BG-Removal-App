import { Webhook } from "svix";
import userModel from "../Models/userModel.js";

/**
 * Webhook handler for Clerk user events
 * Verifies Svix signature and syncs user data to MongoDB
 * 
 * Handles:
 * - user.created: Creates new user record with 5 default credits
 * - user.updated: Updates user profile information
 * - user.deleted: Removes user record (cleanup)
 */
const clerkWebhooks = async (req, res) => {
  try {
    // Initialize Svix webhook verifier with secret
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Extract Svix headers for webhook verification
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // ⚠️ CRITICAL: Must verify using RAW BODY (not JSON parsed)
    // Raw body middleware must be configured in server.js before express.json()
    const event = webhook.verify(req.body, headers);

    const { data, type } = event;

    // Handle different Clerk webhook event types
    switch (type) {
      case "user.created":
        // Create new user in MongoDB when Clerk user is created
        // Default credits: 5 (set by schema default)
        await userModel.create({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          credits: 5 // Explicitly set 5 default credits for new users
        });
        console.log(`✅ User created: ${data.id}`);
        break;

      case "user.updated":
        // Update user profile information
        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          },
          { new: true } // Return updated document
        );
        console.log(`✅ User updated: ${data.id}`);
        break;

      case "user.deleted":
        // Delete user record when Clerk user is deleted
        await userModel.findOneAndDelete({ clerkId: data.id });
        console.log(`✅ User deleted: ${data.id}`);
        break;

      default:
        console.log(`⚠️ Unhandled webhook event: ${type}`);
    }

    // Always return 200 to acknowledge webhook receipt
    res.status(200).json({ success: true, message: 'Webhook processed' });

  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    // Return 400 for validation errors, 500 for server errors
    res.status(error.message.includes('signature') ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * GET /api/user/credits
 * Fetch user's available credits
 * 
 * Protected route - requires valid Clerk JWT token
 * Auth middleware extracts clerkId from token
 * 
 * Response: { success: boolean, credit: number }
 */
const usercredits = async (req, res) => {
  try {
    // Get clerkId from auth middleware (req.auth.clerkId)
    const { clerkId } = req.auth;

    if (!clerkId) {
      return res.status(400).json({
        success: false,
        message: 'ClerkId not found in authentication'
      });
    }

    // Find user by clerkId in MongoDB
    const userData = await userModel.findOne({ clerkId });

    // Handle user not found gracefully
    // Return default 5 credits if user doesn't exist yet
    if (!userData) {
      console.warn(`⚠️ User not found for clerkId: ${clerkId}, returning default credits`);
      return res.json({
        success: true,
        credit: 5, // Default credits for new users
        isDefault: true
      });
    }

    // Return user's actual credit balance
    res.json({
      success: true,
      credit: userData.credits || 0,
      isDefault: false
    });

  } catch (error) {
    console.error("❌ Error fetching user credits:", error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credits. Please try again.'
    });
  }
};

export { clerkWebhooks, usercredits };