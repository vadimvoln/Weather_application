import { formatDate, formatSecToDay } from '../../logic/formatDate'
import iconSelection from '../../logic/iconSelection'
function WeatherDays({ currentWeather, fourDaysWeather, city }) {
  const temp = Object.keys(currentWeather).length ? Math.round(currentWeather.main.temp) : ''
  const date = formatDate()
  return (
    <div className="weatherDays">
      <div className="weatherDays__city">{city}</div>
      <ul className="daysList">
        {Object.keys(currentWeather).length
          ?
          <li className="daysItem daysItem-today">
            <div className="daysItem__date">{date}</div>
            <div className="daysItem__temp">{temp}&#176;</div>
            <div className="daysItem__icon">
              {iconSelection(currentWeather)}
            </div>
          </li>
          : ''
        }
        {
          fourDaysWeather.map((obj, index) => {
            return <li key={index} className='daysItem'>
              <div className="daysItem__date">{formatSecToDay(obj.dt)}</div>
              <div className="daysItem__temp">{Math.round(obj.main.temp)}&#176;</div>
              <div className="daysItem__icon">
                {iconSelection(obj)}
              </div>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default WeatherDays