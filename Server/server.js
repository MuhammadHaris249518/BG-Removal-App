import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
//App configuaration
const port=process.env.PORT || 4000
const app=express()
//Initialize middleware
app.use(express.json())
app.use(cors())
await connectDB()
//API ROUTES
app.get('/',(req,res)=>{
    res.send("api working")
})
app.listen(port,()=>{

    console.log('server running on port'+port)
})