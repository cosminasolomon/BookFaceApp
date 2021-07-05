const express = require("express");
const app = express();

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render('index.ejs');
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.post('/',(req, res) => {console.log(req.body);});

app.listen(3800, () => console.log("Server Up and running"));