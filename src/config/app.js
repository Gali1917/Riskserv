import express from "express";
import userRouter from "../routes/user.routes.js";
import authRouter from "../routes/auth.routes.js";
import examRouter from "../routes/exam.ruotes.js";
import { createRoles } from "../libs/initialSetup.js";
import cors from 'cors';

const app = express();
createRoles();

//Configuracion del CORS
app.use(cors());

// app.use(cors({
//   origin: 'https://evolunteers.org',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

//Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home of M");
});
//Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/exam', examRouter);


//JWT
export default app;
