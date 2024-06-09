const inputFieldElement = document.querySelector(".input-field");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const windElement = document.querySelector(".wind");
const humidityElement = document.querySelector(".humidity");
const weatherElement = document.querySelector(".weather");
const weatherIconElement = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".errorMsg");
const apiKey = "bdf7705227c240a468b46961eeb36ca9";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

async function getWeather() {
  let finalUrl = apiUrl + `q=${inputFieldElement.value}` + `&appid=${apiKey}`;
  const response = await fetch(finalUrl);
  const data = await response.json();
  console.log(data);
   // Handle city not found error
   if(!response.ok){
	   cityNotFound();
   }
   else {
	   updateWeather();
   }
    function cityNotFound(){
    errorElement.innerHTML = "City not found";
	weatherElement.style.display= "none";
	errorElement.classList.add("errorMsg");
	} 
	function updateWeather() {
	errorElement.innerHTML = "";
	errorElement.classList.remove("errorMsg");
	cityElement.innerHTML = data.name;
	tempElement.innerHTML = data.main.temp.toFixed() + "°C";
	humidityElement.innerHTML = data.main.humidity + "%";
	windElement.innerHTML = data.wind.speed.toFixed() + " km/h";
	}
	//Animated icons for weather
	switch(data.weather[0].main){
		case"Clouds":
			weatherIconElement.src = "images/cloudy.svg";
			break;
		case "Clear":
			weatherIconElement.src="images/clear-day.svg";
			break;
		case "Rain":
			weatherIconElement.src= "images/rain.svg";
			break;
		case "Drizzle":
			weatherIconElement.src ="images/drizzle.svg";
			break;
		case "Snow":
			weatherIconElement.src = "images/snow.svg";
			break;
			default:
			weatherIconElement.src = '';
		}
}
	inputFieldElement.value = "";

inputFieldElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeather();
	weatherElement.style.display= "block";
  }
});
