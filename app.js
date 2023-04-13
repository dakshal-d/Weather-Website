const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")

});
app.post("/", function(req,res){
    console.log(req.body.cityname);
    const query=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid=bac684aea79ab8a127d4581544983030&units=metric";
    https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp= weatherData.main.temp;
        const weatherdescription= weatherData.weather[0].description;
        const icon= weatherData.weather[0].icon;
        res.write("<h1>The temperature in "+query+" is "+ temp+" degree Celsius.</h1>");
        res.write("<p> The Weather is currently "+ weatherdescription+"</p");
        res.write("<img src=https://openweathermap.org/img/wn/" +icon+ "@2x.png>");
        res.send()
    })
})

})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})