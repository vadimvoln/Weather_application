function WeatherDetails({ currentWeather }) {
  const humidity = Object.keys(currentWeather).length ? `${currentWeather.main.humidity}%` : 0
  const wind = Object.keys(currentWeather).length ? `${Math.round(currentWeather.wind.speed)}km/h` : 0
  return (
    <>
      <h1 className="detailsTitle">Weather Details</h1>
      <ul className="detailsList">
        <li>
          <span>Humidity</span>
          <span>{humidity}</span>
        </li>
        <li>
          <span>Wind</span>
          <span>{wind}</span>
        </li>
      </ul>
    </>

  )
}

export default WeatherDetails