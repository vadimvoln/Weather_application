import { formatDate } from '../../logic/formatDate'
import iconSelection from '../../logic/iconSelection'
function TodayWeather({ currentWeather, city }) {
  const temp = Object.keys(currentWeather).length ? Math.round(currentWeather.main.temp) : ''
  const date = formatDate()

  return (
    Object.keys(currentWeather).length
      ?
      <div className="weather">
        <div className="temp">{temp}&#176;</div>
        <div className="locateInfo">
          <div className="city">{city}</div>
          <div className="date">{date}</div>
        </div>
        <div className="weatherIcon">
          {iconSelection(currentWeather)}
        </div>
      </div>
      :
      ""
  )
}

export default TodayWeather