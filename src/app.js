const express = require('express');
const path =require('path');
const morgan=require('morgan');
const app = express();



//setting
app.set("port",4000);
app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

//middlewear
app.use(morgan("dev"));
app.use(express.urlencoded({extended:"false"}));
app.use(express.json());

//routes
app.use(require('./routes/routes'));

//static
app.use(express.static(path.join(__dirname,'public')));
 
module.exports=app;