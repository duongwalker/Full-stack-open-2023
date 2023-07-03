import { useState, useEffect } from "react";
import Country from "./Country";

const Countries = ({ filter, countriesData }) => {
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

  const countriesToShow = names.filter((name) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  if (!filter) {
    return null;
  }

  const handleShowCountry = (name) => {
    const country = countriesData.find((country) => {
      return country.name.common === name;
    });
    setName(name);
    setCapital(country.capital);
    setArea(country.area);
    setLanguages(country.languages);
    setFlag(country.flags.svg);
    setSelectedCountry(true);

    // return (
    //   <Country name={name} capital={capital} area={area} languages={languages} flag={flag}/>
    // )
  };

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <div>
        {countriesToShow.map((name, index) => {
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
