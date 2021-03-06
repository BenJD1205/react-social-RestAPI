
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();


mongoose 
 .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
 })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

//midleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req,res) => {
    res.send("Welcome to homepage")
})

app.get("/users", (req,res)=>{
    res.send("Welcome user page")
})

app.listen(5000, () => {
    console.log('Backend server is running');
})