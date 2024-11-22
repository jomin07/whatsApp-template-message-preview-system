import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import templateRoutes from "./routes/templateRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use("/api/templates", templateRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server started");
});
