import React, { useEffect, useState } from 'react'
import { useWeather } from '../hooks/ApiHooks'
import City from './City'
import DropDown from './DropDown'

const CityList = () => {
  const { cities } = useWeather()
  const [chosenCity, setChosenCity] = useState('Kaikki Kaupungit')

  return (
    <div className="card-wrapper">
      <div className="dropdown-card-wrapper">
        <DropDown
          cities={cities.map((e) => e.name)}
          chosenCity={chosenCity}
          setChosenCity={setChosenCity}
        />
        {chosenCity == 'Kaikki Kaupungit'
          ? cities.map((e, i) => (
              <City
                key={i}
                weather={e.weather}
                name={e.name}
                dt={e.dt}
                main={e.main}
                list={e.list}
                wind={e.wind}
                snow={e.snow}
                rain={e.rain}
              />
            ))
          : cities
              .filter((e) => e.name == chosenCity)
              .map((e, i) => (
                <City
                  key={i}
                  weather={e.weather}
                  name={e.name}
                  dt={e.dt}
                  main={e.main}
                  list={e.list}
                  wind={e.wind}
                  snow={e.snow}
                  rain={e.rain}
                />
              ))}
      </div>
    </div>
  )
}

export default CityList
