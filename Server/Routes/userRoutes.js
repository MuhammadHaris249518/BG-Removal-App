import express from 'express'
import { clerkWebhooks, usercredits } from '../controllers/userController.js'
import authuser from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credits',authuser,usercredits)

export default userRouter