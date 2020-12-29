"use strict";

let mongoose = require("mongoose");
let app = require("./app");
let port = process.env.PORT || 3999;

mongoose.set("useFindAndModify", false);
mongoose.Promise = global.Promise;
var db = "mongodb://localhost:27017/api_rest_aprendelibre";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database successfully...");

    // Creacion del servidor
    app.listen(port, () => {
      console.log(`Server running in: localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
