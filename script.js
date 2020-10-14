$(document).ready(function () {
  //-----------------------Search Function for Current City Weather----------------------------------//
  function searchCity(cityname) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityname +
      "&units=imperial&appid=1b2f2d7eb094d92e430dbf1d1a519e0b";
    var queryURLforcast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityname +
      "&units=imperial&appid=1b2f2d7eb094d92e430dbf1d1a519e0b";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      console.log(queryURL);
      //empty divs and ids that we need to dump content into.....
      $("#current").empty();
      var mainDate = moment().format("L");

      //create HTML for city information......
      var cityNameEl = $("<h2>").text(response.name);
      var displayMainDate = cityNameEl.append(" " + mainDate);
      var tempEL = $("<p>").text(
        "Temperature: " + response.main.temp + " \xB0F"
      );
      var humEl = $("<p>").text("Humidity: " + response.main.humidity + "%");
      var windEl = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
      var currentweather = response.weather[0].main;

      if (currentweather === "Rain") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/09d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Clouds") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/03d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Clear") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/01d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Drizzle") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/10d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      } else if (currentweather === "Snow") {
        var currentIcon = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/wn/13d.png"
        );
        currentIcon.attr("style", "height: 60px; width: 60px");
      }
      //create HTML div to append new elements to render on page....
      var newDiv = $("<div>");

      newDiv.append(displayMainDate, currentIcon, tempEL, humEl, windEl);

      $("#current").html(newDiv);
      //---------------------------------------------UV call ---------------------------------------//
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryURLUV =
        "https://api.openweathermap.org/data/2.5/uvi?&appid=1b2f2d7eb094d92e430dbf1d1a519e0b&lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: queryURLUV,
        method: "GET",
      }).then(function (response) {
        $("#uvl-display").empty();
        var uvlEl = $("<div>").addClass("lead uv-index").text("UV Index: ");
        var uvValue = $("<span class='badge' id='current-uv-level'>").text(
          response.value
        );
        uvlEl.append(uvValue);
        console.log(uvlEl);

        $("#uvl-display").html(uvlEl);

        if (response.value >= 0 && response.value < 3) {
          uvValue.addClass("favorable p-2");
        } else if (response.value >= 3 && response.value < 6) {
          uvValue.addClass("moderate p-2");
        } else {
          uvValue.addClass("severe p-2");
        }
        newDiv.append(uvlEl);
      });
    });

    //--------------------------------------------5 Day forecast call ---------------------------------------//

    $.ajax({
      url: queryURLforcast,
      method: "GET",
    }).then(function (response) {
      // Storing an array of results in the results variable
      var results = response.list;
      //empty 5day div--------
      $("#5day").empty();
      //create HTML for 5day forecast................
      for (var i = 0; i < results.length; i += 9) {
        var fiveDayDiv = $(
          "<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
        );

        //Storing the responses date temp and humidity.......
        var date = new Date(results[i].dt * 1000).toLocaleDateString();
        var setD = date.substr(0, 10);
        var temp = results[i].main.temp;
        var hum = results[i].main.humidity;

        //creating tags with the result items information.....
        var h5date = $("<h5 class='card-title'>").text(setD);
        var pTemp = $("<p class='card-text'>").text("Temp: " + temp + " \xB0F");
        var pHum = $("<p class='card-text'>").text("Humidity " + hum + "%");
        var weather = results[i].weather[0].main;

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

        fiveDayDiv.append(h5date);
        fiveDayDiv.append(icon);
        fiveDayDiv.append(pTemp);
        fiveDayDiv.append(pHum);
        $("#5day").append(fiveDayDiv);
      }
    });
  }
  pageLoad();

  //----------------------------------------Event handler for user city search-----------------------//

  $("#select-city").on("click", function (event) {
    event.preventDefault();
    // Storing the city name........
    var cityInput = $("#city-input").val().trim();
    //save search term to local storage.....
    var textContent = $(this).siblings("input").val();
    var storearr = [];
    storearr.push(textContent);
    localStorage.setItem("cityName", JSON.stringify(storearr));

    searchCity(cityInput);
    pageLoad();
  });
  //---------------------------Call stored items on page load-------------------------------------//
  function pageLoad() {
    var lastSearch = JSON.parse(localStorage.getItem("cityName"));
    var searchDiv = $(
      "<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>"
    ).text(lastSearch);
    var psearch = $("<div>");
    psearch.append(searchDiv);
    $("#searchhistory").append(psearch);
  }
  
  $("#searchhistory").on("click", ".btn", function (event) {
    event.preventDefault();
    searchCity($(this).text());
  });
});
