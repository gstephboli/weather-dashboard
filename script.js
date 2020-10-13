$(document).ready(function () {
  console.log("this is working");
  // DOM Variables
  var cityName = document.getElementById("city-input");
  var city = "";
  // JS Variables
  moment().format("L");

  // Function Definitions
  function searchCity() {
    city = cityName.value;
    // citySearch = $(".form-control").val();
    console.log(city);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    var queryURLForecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //   console.log(queryURL);
      $("#temperature").text("Temperature: " + response.main.temp + " ℉");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#windspeed").text("Wind Speed: " + response.wind.speed + " MPH");

      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURLUV =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=64e3a7c79c8f571f0448e808d7de35f8";
      console.log(lat, lon);

      $.ajax({
        url: queryURLUV,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        console.log(queryURLUV);
        $("#uvindex-display").empty();
        var uviResults = response.value;
        var uviEl = $("<div></div>").text("UV Index: " + response.value);
        $("#uvindex-display").html(uviEl);
      });
    });

    $.ajax({
      url: queryURLForecast,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(queryURLForecast);
      var results = response.list;
      $("#5day").empty();
      for (var i = 0; i < results.length; i += 9) {
        var fiveDayDiv = $(
          "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
        );

        var date = results[i].dt_txt;
        var setDate = date.substr(0, 10);
        var temp = results[i].main.temp;
        var hum = results[i].main.humidity;
        console.log(temp);
        console.log(hum);
        console.log(setDate);

        var h5Date = $("<h5 class='card-title'>").text(setDate);
        fiveDayDiv.append(h5Date);

        if (weather === "Rain") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/09d.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weather === "Clouds") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/03d.png"
            );
          } else if (weather === "Clear") {
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weather === "Clear") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/01d.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weather === "Drizzle") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/10d.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weather === "Snow") {
            var icon = $("<img class=>").attr(
              "src",
              "http://openweathermap.org/img/wn/13d.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          }
          fiveDayDiv.append(icon);

        var pTemp = $("<p class='card-text'>").text("Temp: " + temp + " ℉");
        fiveDayDiv.append(pTemp);
        var pHum = $("<p class='card-text'>").text("Humidity: " + hum + "%");
        fiveDayDiv.append(pHum);
        var weather = results[i].weather[0].main;

        $("#5day").append(fiveDayDiv);

        
      }
    });
  }

  // Function Calls

  // Event Listeners
  $("#submitWeather").on("click", function (event) {
    event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());
  });
});
