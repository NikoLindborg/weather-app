import React, { useEffect, useState } from 'react'
interface cityList {
  cities: String[]
  chosenCity: String
  setChosenCity: React.Dispatch<React.SetStateAction<string>>
}

const DropDown: React.FC<cityList> = ({
  cities,
  chosenCity,
  setChosenCity,
}) => {
  const [display, setDisplay] = useState('none')

  const handleClick = () => {
    if (display == 'none') {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }
  const handleChange = (city: string) => {
    setChosenCity(city)
    handleClick()
  }
  useEffect(() => {
    if (!cities.includes('Kaikki Kaupungit')) {
      cities.unshift('Kaikki Kaupungit')
    }
  }, [chosenCity])

  return (
    <div className="dropdown-wrapper">
      <button className="dropdown-button" onClick={handleClick}>
        <div className="buttonText">{chosenCity}</div> <div className="arrow">^</div>
      </button>
      <div style={{ display: display }}>
        {cities.map((e, i) => (
          <button
            className="dropdown-list"
            key={i}
            onClick={() => {
              handleChange(e.toString())
            }}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DropDown
