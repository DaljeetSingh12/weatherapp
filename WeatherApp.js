const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})
app.post("/",function(req,res){
    
    const cityName=req.body.cityName
    const unit="metric"
    const appkey="26eea41c17e56fa52b6390598e546427"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+appkey+"&units="+unit

    https.get(url,function(response){
    console.log(response.statusCode)
    
    response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    const desc=weatherdata.weather[0].description
    const temp=weatherdata.main.temp
    const imageicon=weatherdata.weather[0].icon
    const imageurl= "http://openweathermap.org/img/wn/"+imageicon+"@2x.png"

    res.write("<h1>temperature in "+ cityName + " is : "+temp+" degree celcius</h1>")
    res.write("<p>weather descriptin is : "+desc+"</p>")
    res.write("<img src="+imageurl+">")
    res.send()
    })
})

})


app.listen(process.env.PORT||3000,function(){
    console.log("server is working")
})