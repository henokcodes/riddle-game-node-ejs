const express = require('express');
var path = require("path");
let app = express.Router();


app.get("/", (req, res, next) => {
    res.cookie("history", {});
    res.sendFile(path.join(__dirname, "../html", "index.html"))
})

app.get("/error", (req, res, next) => {
    res.status(401).sendFile(path.join(__dirname, "../html", "error.html"))
})

app.use((err,req, res, next) => {
    res.redirect("/");
})

app.use((req, res, next) => {
    res.status(404).send("404, resource not found")
})

module.exports = app;
