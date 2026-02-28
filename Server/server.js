import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './Routes/userRoutes.js'

const port = process.env.PORT || 4000
const app = express()

// ⚠️ Webhook route MUST use raw BEFORE express.json()
app.use('/api/user/webhooks',
  express.raw({ type: 'application/json' })
)

// Normal middlewares
app.use(express.json())
app.use(cors())

await connectDB()

app.get('/', (req, res) => {
  res.send("API Working 🚀")
})

app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log('Server running on port ' + port)
})