const http = require("./app.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(
    process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASS),
    () => {
      console.log("DB CONNECTED ");
    }
  )
  .catch((err) => console.log(err));

http.listen(3000, () => {
  console.log("server is running");
});
