const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors")

const path = require("path")

const router = require("./routes/expenseRoutes");

const app = express();

app.use(cors())
app.use(bodyParser.json({ extended: false }));
app.use(express.static("public"));

app.use(router)

app.listen(3000);