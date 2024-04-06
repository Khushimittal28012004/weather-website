const express = require("express");
const path = require('path');
const app = express();
const port  = process.env.PORT || 3000;

// public static path
const static_path = path.join(__dirname, "../public");

app.set('view engine', 'hbs');   

app.use(express.static(static_path));



// routing
app.get("/", (req , res) => {  //first parameter always be request and second parameter is always be response
   res.render("index");
})

app.get("/about", (req , res) => {  //first parameter always be request and second parameter is always be response
   res.render("about");
})

app.get("/weather", (req , res) => {  //first parameter always be request and second parameter is always be response
   res.render("weather");
})
app.get("*", (req , res) => {  //first parameter always be request and second parameter is always be response
   res.render("404error" , {
      errorMag: "OOPS Page Not Found"
   });
})

app.listen(port , () => {
    console.log(`listening to the port at ${port}`);
})



