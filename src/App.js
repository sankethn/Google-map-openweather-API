import { useState } from "react";
import WrapperMap from "./components/Maps";
import Weather from "./components/Weather";
import CurrencyConversion from "./components/CurrencyConversion";

import "./App.css";

function App() {
  const [countryCode, setCountryCode] = useState("");
  const getCountryCodeHandler = (code) => {
    setCountryCode(code);
  };

  return (
    <div className="App">
      <Weather getCountryCode={getCountryCodeHandler} />
      {/* <h1>Weather</h1> */}

      <div>
        <WrapperMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOUR_API_KEY`}
          loadingElement={<div style={{ height: `100%`, width: "80%" }} />}
          containerElement={<div style={{ height: `300px` }} />}
          mapElement={
            <div
              style={{
                height: `100%`,
                width: "80%",
                borderRadius: "10px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            />
          }
        />

        <CurrencyConversion countryCode={countryCode} />
      </div>

    </div>
  );
}

export default App;
