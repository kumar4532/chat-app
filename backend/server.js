import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectDB from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

connectDB()
    .then(() => {
        server.listen(PORT, () =>{
            console.log(`Server is running at port : ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed !!!", err);
    })