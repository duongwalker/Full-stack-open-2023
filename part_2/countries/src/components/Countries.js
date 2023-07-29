import { useState, useEffect } from "react";
import Country from "./Country";

const Countries = ({ filter, countriesData, onShowButtonClick }) => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [capital, setCapital] = useState([]);
  const [area, setArea] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [flag, setFlag] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(false);

  useEffect(() => {
    const countriesNames = countriesData.map((country) => {
      return country.name.common;
    });
    setNames(countriesNames);
  }, [countriesData]);

  useEffect(() => {
    if (filter !== "" && filter !== null) {
      setSelectedCountry(false);
    }
  }, [filter]);

  const countriesToShow = names.filter((name) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filter && !selectedCountry) {
    return null;
  }

  const handleShowCountry = (name) => {
    const country = countriesData.find((country) => {
      return country.name.common === name;
    });

    if (country) {
      setName(name);
      setCapital(country.capital);
      setArea(country.area);
      setLanguages(country.languages);
      setFlag(country.flags.svg);
      setSelectedCountry(true);
      onShowButtonClick()
    }
  };

  if (countriesToShow.length > 10 && !selectedCountry) {
    return <div>Too many matches, specify another filter</div>;
  }
  else if (countriesToShow.length === 1) {
    const country = countriesData.find((country) => {
      return country.name.common === countriesToShow[0];
    });

    return(
      <Country
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flag={country.flags.svg}
          />
    )
  }
  else {
    return (
      <div>
        {!selectedCountry && countriesToShow.map((name, index) => {
          return (
            <table key={index}>
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>
                    <button onClick={() => handleShowCountry(name)}>
                      show
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}

        {selectedCountry && (
          <Country
            name={name}
            capital={capital}
            area={area}
            languages={languages}
            flag={flag}
          />
        )}
      </div>
    );
  }
};

export default Countries;
