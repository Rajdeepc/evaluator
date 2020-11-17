const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

// local port
const port = process.env.PORT || 4000;


// routes
const submitContent = require("./routes/submitContent");
const getQuestions = require("./routes/getQuestions");
const getInReviewItems = require("./routes/getReviewItems");
const updateReviewItems = require("./routes/updateReviewItems");
const getAllApprovedItems = require("./routes/getAllApproved");
const updateLikes = require("./routes/updateLikes");
const pusherMessage = require("./routes/pusherMessage");

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/submitContent", submitContent);
app.use("/getQuestions", getQuestions);
app.use("/getInReviewItems", getInReviewItems);
app.use("/updateReviewItems", updateReviewItems);
app.use("/getAllApprovedItems", getAllApprovedItems);
app.use("/updateLikes", updateLikes);
app.use("/pusherMessage", pusherMessage);



// Serve static files assets on heroku
app.use(express.static(path.join(__dirname, "client/build")));

// MongoDB connection strings
const MONGO_LOCAL_URI = `mongodb://localhost:27017/evaluator`;

mongoose
  .connect(process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : MONGO_LOCAL_URI)
  .then(() => console.log("New Mongodb connection established"))
  .catch((err) => console.log("Something went wrong" + err));


// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
app.listen(port, () => console.log(`Listening on port ${port}...`));
