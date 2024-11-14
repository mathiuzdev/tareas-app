import express, { Request, Response } from "express";
import { userRoutes, taskRoutes, tagRoutes } from "./routes/index";
import cors from "cors";


const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //
};

app.use(cors(corsOptions));
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", tagRoutes);



export default app;
