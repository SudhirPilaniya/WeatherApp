// import logo from "./logo.svg";
import bg from './assets/paper-style-3d-clouds-background-blue-sky_1017-38298.webp'
import "./App.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
// import { Button,InputGroup,Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import getformateddata from "./Weatherfile";

export default function App() {
  const [city, setCity] = useState("Bikaner");
  const [weather, setweather] = useState(null);
  const [units, setUnits] = useState("metric");
  useEffect(() => {
    const fetchweatherdata = async () => {
      const data = await getformateddata(city, units);
      setweather(data);
    };
    fetchweatherdata();
  }, [units,city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterkeyPressed=(e)=>{
    if(e.keyCode === 13){
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  }

  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";

  return (
    <div className="App"  style={{backgroundImage:`url(${bg})`}}>
      <div className="main_container">
        {weather && (
          <div className="container">
            <div className="container-1">
              <input
              onKeyDown={enterkeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}> <CgArrowsExchangeAltV/> °F</button>
            </div>
            <div className="container-2">
              <div className="info">
                <h5>{`${weather.name},${weather.country}`}</h5>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h5>{weather.description}</h5>
              </div>
              <div className="info">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <div className="container-3">
              <div className="container-31">
                <div className="info">
                  <FaArrowDown />
                  <small>Min</small>
                  <h3>{`${weather.temp_min} ${tempUnit}`}</h3>
                </div>
                <div className="info">
                  <FaArrowUp />
                  <small>Max</small>
                  <h3>{`${weather.temp_max} ${tempUnit}`}</h3>
                </div>
                <div className="info">
                  <BiHappy />
                  <small>Feels Like</small>
                  <h3>{`${weather.feels_like} ${tempUnit}`}</h3>
                </div>
              </div>
              <div className="container-32">
                <div className="info">
                  <MdCompress />
                  <small>Pressure</small>
                  <h3>{`${weather.pressure} hPa`}</h3>
                </div>
                <div className="info">
                  <MdOutlineWaterDrop />
                  <small>Humidity</small>
                  <h3>{`${weather.humidity} %`}</h3>
                </div>
                <div className="info">
                  <FaWind />
                  <small>Wind Speed</small>
                  <h3>{`${weather.speed} ${windUnit}`}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  );
}
