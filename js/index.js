"use strict";

// ======================================================
// current weather condition forecast with XMLHttpRequest
// ====================================================

// API key from open weather map api
let apiKey = 'b0bf22f7c57cde029bd7c6027fbaf41b';
let cityCode = 84653;
let weatherConditionurl = `http://api.openweathermap.org/data/2.5/weather?zip=${cityCode}&appid=${apiKey}&units=imperial`;
let cObj;
let weatherCondition = new XMLHttpRequest();
weatherCondition.open("GET", weatherConditionurl, true);
weatherCondition.responseType = "text";
weatherCondition.onload = function(){
    if(weatherCondition.status === 200){
        cObj = JSON.parse(weatherCondition.responseText);

        // display the current weather details here
        document.getElementById("location").innerText = cObj.name;
        document.getElementById("weather").innerText = cObj.weather[0].description;
        document.getElementById("temperature").innerText = cObj.main.temp;
        document.getElementById("desc").innerText = "Wind Speed " + cObj.wind.speed;
    }else{
        // http status error is been handled here
        console.log("Error: ", weatherCondition.statusText)
    }
}
// Request is been sent here
weatherCondition.send();

// ====================================================
// XML request to get five days forecast
// ==================================================
let fObj;
let weatherForecasturl = `http://api.openweathermap.org/data/2.5/forecast?zip=${cityCode}&appid=${apiKey}`;
let weatherForecast = new XMLHttpRequest();
weatherForecast.open("GET", weatherForecasturl, true);
weatherForecast.responseType = "text";

weatherForecast.onload = function (){
    if(weatherForecast.status === 200){
        fObj = JSON.parse(weatherForecast.responseText);

        // =================================================
        // Function that handles image display component
        // ==================================================
        function displayImg(index){
            let imgUrl = fObj.list[index].weather[0].icon;
            let imgPath = `http://openweathermap.org/img/w/${imgUrl}.png`;
            return imgPath;
        }

        // ==========================================================
        // Function that handles date display and formatting component
        // =========================================================
        function dateFormatting(index){
            let date_raw = fObj.list[index].dt_txt;
            date_raw = date_raw.substr(5, 6);
            return date_raw;
        }

        // ========================================================
        // Function that handles min temperature display component
        // ========================================================
        function minTemp(index){
            let min = fObj.list[index].main.temp_min;
            return Math.floor(Number.parseFloat(min)) + "<span>"+"&deg;"+"</span>";
        }

        // ============================================================
        // Function that handles max temperature display component
        // ============================================================
        function maxTemp(index){
            let max = fObj.list[index].main.temp_max;
            return Math.floor(Number.parseFloat(max)) + "&deg;";
        }

        //Forecast 1;
        document.getElementById("r1c1").innerText = dateFormatting(0);
        document.getElementById("r1c2").src = displayImg(0);
        document.getElementById("r1c3").innerHTML = minTemp(0);
        document.getElementById("r1c4").innerHTML = maxTemp(0);


        // Forecast 2
        document.getElementById("r2c1").innerText = dateFormatting(8);
        document.getElementById("r2c2").src = displayImg(8);
        document.getElementById("r2c3").innerHTML = minTemp(8);
        document.getElementById("r2c4").innerHTML = maxTemp(8);

        // Forecast 3
        document.getElementById("r3c1").innerText = dateFormatting(16);
        document.getElementById("r3c2").src = displayImg(16);
        document.getElementById("r3c3").innerHTML = minTemp(16);
        document.getElementById("r3c4").innerHTML = maxTemp(16);
    }
    else{
        // Error is been display here
        console.log("Error: ", weatherForecast.statusText);
    }
}

// Request is been sent here
weatherForecast.send();