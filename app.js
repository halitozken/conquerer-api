import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js"

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Conquerer API")
})

app.use("/api", routes);