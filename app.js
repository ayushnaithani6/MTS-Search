require("dotenv").config();
const express = require("express");
// const request = require("request");
const app = express();
const flash = require("connect-flash");
const indexRoutes = require("./routes/index");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "This is movie searcher",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    next();
});

app.use("/", indexRoutes);

// Port listener
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("MTS Search Started");
});