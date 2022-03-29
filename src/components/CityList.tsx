/* eslint-disable indent */
import React, {useState} from 'react'
import {useWeather} from '../hooks/ApiHooks'
import City from './City'
import DropDown from './DropDown'

const CityList = () => {
  const {cities} = useWeather()
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
          ? cities.map((e, i) => <City key={i} city={e} />)
          : cities
              .filter((e) => e.name == chosenCity)
              .map((e, i) => <City key={i} city={e} />)}
      </div>
    </div>
  )
}

export default CityList
