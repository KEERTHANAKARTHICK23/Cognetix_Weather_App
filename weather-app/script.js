let unit = "metric";
const API_KEY = "8a6be721305d181e215bfc0b94b2965e";

function setUnit(selectedUnit) {
    unit = selectedUnit;
    const city = document.getElementById("cityInput").value;
    if (city.trim() !== "") {
        getWeather();
    }
}

async function getWeather() {

    const city = document.getElementById("cityInput").value;
    const errorBox = document.getElementById("error");
    const card = document.getElementById("weatherResult");

    if (city.trim() === "") {
        errorBox.innerText = "Please enter a city name";
        card.classList.add("hidden");
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        errorBox.innerText = "";

        // Background
        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes("cloud")) {
            document.body.style.background =
                "linear-gradient(to bottom right, #bdc3c7, #2c3e50)";
        } else if (weatherMain.includes("rain")) {
            document.body.style.background =
                "linear-gradient(to right, #4b79a1, #283e51)";
        } else if (weatherMain.includes("clear")) {
            document.body.style.background =
                "linear-gradient(to right, #56ccf2, #2f80ed)";
        } else {
            document.body.style.background =
                "linear-gradient(to right, #74ebd5, #acb6e5)";
        }

        // Display weather
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("description").innerText = data.weather[0].description;
        document.getElementById("temp").innerText =
            data.main.temp + (unit === "metric" ? " °C" : " °F");
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText =
            data.wind.speed + (unit === "metric" ? " m/s" : " mph");

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        card.classList.remove("hidden");

    } catch (err) {
        errorBox.innerText = err.message;
        card.classList.add("hidden");
    }
}
