import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import countryService from "./services/countries";
const App = () => {
  
  const [filter, setFilter] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountriesData(response.data);
    });
  }, []);

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countriesData={countriesData} filter={filter} />
    </div>
  );
};

export default App;
