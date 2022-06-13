const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Database Connection
mongoose.connect(
    "mongodb+srv://twojay:PtTS83QW2JVJsB7j@cluster0.ueoejsn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: "bookshelf" }
  )
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const booksRouter = require("./routes/booksRouter.js");
app.use("/bookshelf", booksRouter);

app.use((err, req, res, next) => {
  let errorObj;
  Object.assign(errorObj, {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  });
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message.json());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
