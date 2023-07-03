let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let express = require("express");
const res = require("express/lib/response");
let apiRoutes = require("./api-routes")
//ME gGUSTAN LOS CACAHUETES

let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/netalmix', {useNewUrlParser:true, useUnifiedTopology:true});

let db = mongoose.connection;
if(!db){
    console.log("Error connecting db")
}else{
    console.log("Connected db")
}

var port = process.env.PORT || 2334;
app.use('/', apiRoutes)



app.listen(port, function(){
    console.log("Running on port" + port)
})