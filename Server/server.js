import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './Routes/userRoutes.js'

const port = process.env.PORT || 4000
const app = express()

/**
 * CRITICAL: Webhook route MUST use express.raw() BEFORE express.json()
 * This is required because Svix needs the raw, unparsed body for signature verification
 * 
 * Order matters:
 * 1. Raw body parser for webhooks (must be FIRST for this path)
 * 2. JSON body parser for other routes
 * 3. CORS middleware
 * 4. Route handlers
 */

// ⚠️ WEBHOOK MIDDLEWARE - Must come BEFORE express.json()
app.use('/api/user/webhooks',
  express.raw({ type: 'application/json' })
)

// Standard middleware
app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Connect to MongoDB
await connectDB()

/**
 * Health check endpoint
 * Verify API is running
 */
app.get('/', (req, res) => {
  res.json({
    message: "API Working 🚀",
    timestamp: new Date().toISOString()
  })
})

// User routes: authentication, credits, webhooks
app.use('/api/user', userRouter)

/**
 * Error handling middleware
 * Catches unhandled errors and returns proper JSON response
 */
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
})