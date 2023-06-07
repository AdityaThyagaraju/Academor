require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const { log } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home");
});

app.post(`/city`, async (req, res) => {
  var city = req.body.city;
  await https.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`,
    (response) => {
      var response_list = [];
      const chunks = [];
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });
      response.on("end", function () {
        var i = 0;
        const data = Buffer.concat(chunks);
        var weatherData = JSON.parse(data);
        weatherData.list.forEach((e) => {
          var dat_list = e.dt_txt.split(" ");
          var date = dat_list[0];
          var time = dat_list[1];
          response_list.push({
            date: date,
            time: time,
            main: e.weather[0].main,
            icon: e.weather[0].icon,
            temp: e.main.temp,
            humidity: e.main.humidity,
            visibility: e.visibility,
            wind: e.wind.speed,
          });
        });
        res.render("weather", { data: response_list, city: weatherData.city.name });
      });
    }
  );
});

app.post("/latLong", (req, res) => {
  var lat = req.body.lat;
  var long = req.body.long;
  var chunks = [];
  var response_list = [];
  https.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`,
    (response) => {
      response.on("data", (rData) => {
        chunks.push(rData);
      });

      response.on("end", () => {
        let data = Buffer.concat(chunks);
        var weatherData = JSON.parse(data);
        weatherData.list.forEach((e) => {
          var dat_list = e.dt_txt.split(" ");
          var date = dat_list[0];
          var time = dat_list[1];
          response_list.push({
            date: date,
            time: time,
            main: e.weather[0].main,
            icon: e.weather[0].icon,
            temp: e.main.temp,
            humidity: e.main.humidity,
            visibility: e.visibility,
            wind: e.wind.speed,
          });
        });
        res.render("weather", { data: response_list, city: weatherData.city.name });
      });
    }
  );
});

app.listen(3000, () => {
  console.log("server started at 3000");
});
