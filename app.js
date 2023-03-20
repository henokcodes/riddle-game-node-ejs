const express = require('express');
const routes = require("./routes/routes")
const app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.static('public'))



app.listen(80, () => {
    console.log('Your Server is running on 80');
})

//Read the parameters from post request
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use("/",routes);