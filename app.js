const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");

const app = express();


app.use(express.json());

mongoose.connect(
  "mongodb+srv://vlad22petru:BnxRFnAqWdmF25ak@cluster0.tx7gmon.mongodb.net/myapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


app.use("/users", usersRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});

