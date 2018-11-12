const express = require("express");
const htmlGraphql = require("express-graphql");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();

mongoose.connect(
  "mongodb://marco:giorgia0812@ds215093.mlab.com:15093/silverdb",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("database connected");
});

const PORT = 4000;

//allow cross origin requests
app.use(cors())

app.use(
  "/graphql",
  htmlGraphql({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
