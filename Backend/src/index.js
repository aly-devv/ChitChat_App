import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routers/auth.route.js";
import connectDb from "./lib/db.js";
import cookieParser from 'cookie-parser'
import messageRoutes from "./routers/message.route.js";
import cors from 'cors'
import {app, server } from './lib/socket.js'
import path from 'path'
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
))
dotenv.config();
const __dirname = path.resolve();
app.use(express.json({limit: "10mb"}));
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")))
     app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
server.listen(process.env.PORT,()=>{
    console.log("Server is running on Port:" + process.env.PORT)
    connectDb();
})