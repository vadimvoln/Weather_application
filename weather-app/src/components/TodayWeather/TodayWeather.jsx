import formatDate from '../../formatDate'
import iconSelection from '../../iconSelection'
function TodayWeather({ currentWeather, city }) {
  const temp = currentWeather() ? Math.round(currentWeather().main.temp) : ''
  const date = formatDate()

  return (
    currentWeather()
      ?
      <div className="weather">
        <div className="temp">{temp}&#176;</div>
        <div className="locateInfo">
          <div className="city">{city}</div>
          <div className="date">{date}</div>
        </div>
        <div className="weatherIcon">
          {iconSelection(currentWeather())}
        </div>
      </div>
      :
      ""
  )
}

export default TodayWeather