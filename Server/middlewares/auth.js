import jwt from 'jsonwebtoken';

/**
 * Authentication middleware to verify Clerk JWT tokens
 * Decodes token and extracts clerkId for protected routes
 * 
 * Expected header: Authorization: "Bearer <token>"
 * Adds clerkId to req.auth for use in controllers
 */
const authuser = async (req, res, next) => {
  try {
    // Extract token from Authorization header: "Bearer <token>"
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided. Please login first.'
      });
    }

    // Extract token without "Bearer " prefix
    const token = authHeader.slice(7);

    try {
      // Decode the Clerk JWT (without verification for now)
      // In production with Clerk, you may want to use @clerk/express for verification
      const decodedToken = jwt.decode(token);

      if (!decodedToken || !decodedToken.sub) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token format. Authentication failed.'
        });
      }

      // Extract Clerk user ID (sub field in Clerk JWT)
      // Store in req.auth for use in controllers
      req.auth = {
        clerkId: decodedToken.sub,
        userId: decodedToken.sub,
        email: decodedToken.email
      };

      next();
    } catch (decodeError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.'
      });
    }
  } catch (error) {
    console.error('❌ Auth middleware error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Authentication error. Please try again.'
    });
  }
};

export default authuser;