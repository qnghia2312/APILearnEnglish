import express from "express";
import vocabularyRouter from "./routers/vocabulary";
import UserRouter from "./routers/user";
import FavoriteRouter from "./routers/favorite";
import QuestionRouter from "./routers/question";
import TopicRouter from "./routers/topic";
import HistoryRouter from "./routers/history";

import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 8080;

//middleware
app.use(express.json());

//connectDB
connectDB(process.env.DB_URI);

//routes
app.use("/api/vocabulary", vocabularyRouter);
app.use("/api/user", UserRouter);
app.use("/api/favorite", FavoriteRouter);
app.use("/api/question", QuestionRouter);
app.use("/api/topic", TopicRouter);
app.use("/api/history", HistoryRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});

export const viteNodeApp = app;