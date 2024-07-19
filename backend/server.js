import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import connectDB from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // to parse the incoming requests with json pyloads (from req.body)

app.use("/api/auth", authRouter);

connectDB()
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })