import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotnet from 'dotenv';
import { connectDB } from './db/connection.js';
import ChatRoute from './routes/chat.js';
import UserRoute from './routes/user.js';
import path from 'path';

dotnet.config();

let app = express();
let port = process.env.PORT;

// Middleware
app.use(express.static('dist'));
app.use(cors({ credentials: true, origin: process.env.SITE_URL, optionsSuccessStatus: 200 }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api/chat/', ChatRoute);
app.use('/api/user/', UserRoute);

// Frontend route
// app.get('/*',(req,res)=>{
//     res.sendFile(path.join(`${path.resolve(path.dirname(''))}/dist/index.html`))
// })

// Dark and Light Mode Toggle
app.get('/dark-mode', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dark-mode.html'));
});

// Connect to MongoDB
connectDB((err) => {
    if (err) return console.log("MongoDB Connect Failed : ", err);
    console.log("MongoDB Connected");

    // Start the server
    app.listen(port, () => {
        console.log("Server started on port", port);
    });
});
