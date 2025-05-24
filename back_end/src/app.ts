import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/index.route";
import morgan from "morgan";

const app: Application = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Healthcare API is running");
});

export default app;
