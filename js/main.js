
let todayName = document.getElementById("todayName")
let todayNumber = document.getElementById("todayNum")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("temp")
let todayConditionImg = document.getElementById("todayImg")
let todayConditionText = document.getElementById("todayText")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")


let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")


let searchInput = document.getElementById("search")



async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c68ae9ef20de409ab4d214748232108&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}





function displayTodayData(data)
{
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    // todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir
    console.log(todayDate);
    

}




function displayNextData(data)
{
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}



async function startApp(city="london")
{
    let weatherData = await getWeatherData(city)
    if(!weatherData.error)
    {
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}

startApp()


searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})