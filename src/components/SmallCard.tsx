import React, { useEffect } from 'react'
import { IfList } from '../hooks/ApiHooks'

const SmallCard: React.FC<IfList> = ({
  dt,
  main,
  weather,
  wind,
  snow,
  rain,
}) => {
  const time = new Date(dt * 1000).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  })
  const precipitationCheck = () => {
    if (snow) {
      if (snow['1h'] !== undefined) {
        return { length: '1h', amount: snow['1h'] }
      }

      if (snow['3h'] !== undefined) {
        return { length: '3h', amount: snow['3h'] }
      }
    } else if (rain) {
      if (rain['1h'] !== undefined) {
        return { length: '1h', amount: rain['1h'] }
      }
      if (rain['3h'] !== undefined) {
        return { length: '3h', amount: rain['3h'] }
      }
    }
    return { length: '1h', amount: 0 }
  }
  const precipitation = precipitationCheck()

  return (
    <div className="smallCardContainer">
      <div className="time">{time}</div>
      <img
        className="weatherImg"
        src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt="weather icon"
      />
      <div className="smallWeather">{Math.round(main.temp)} °C</div>
      <div className="bottomPart">
        <div>{wind.speed.toFixed(1)} m/s</div>
        <div>{main.humidity}%</div>
        <div>{Math.round(precipitation?.amount)}mm</div>
      </div>
    </div>
  )
}

export default SmallCard
