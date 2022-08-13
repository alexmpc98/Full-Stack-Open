import { useState, useEffect } from "react";
import Filter from "./Filter";
import Countries from "./Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryNameSearch, setCountryNameSearch] = useState("");
  const [countryInfoToShow, setCountryInfoToShow] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Find Countries</h2>
      <Filter
        value={countryNameSearch}
        onChange={(event) => {setCountryNameSearch(event.target.value); setCountryInfoToShow("")}}
      />
      <h2>Countries</h2>
      <Countries countries={countries} countryNameSearch={countryNameSearch} countryInfoToShow={countryInfoToShow} setCountryInfoToShow={setCountryInfoToShow}/>
    </div>
  );
};

export default App;
