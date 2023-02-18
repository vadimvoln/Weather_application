function WeatherDetails() {
  return (
    <>
      <h1 className="detailsTitle">Weather Details</h1>
      <ul className="detailsList">
        <li>
          <span>Cloudy</span>
          <span>12%</span>
        </li>
        <li>
          <span>Humidity</span>
          <span>78%</span>
        </li>
        <li>
          <span>Wind</span>
          <span>1km/h</span>
        </li>
        <li>
          <span>Rain</span>
          <span>0mm</span>
        </li>
      </ul>
    </>

  )
}

export default WeatherDetails