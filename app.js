import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();
app.use(express.json());



app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.use("/", (req, res, next) => {
    res.send("Hello Everyone");
});


mongoose.connect("mongodb+srv://admin848101:admin123@cluster0.6wwsdj0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(5000);
        console.log("Connected to database and listening on localhost:5000");
    })
    .catch((err) => console.log(err));