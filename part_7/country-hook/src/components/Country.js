const Country = ({ country }) => {
  if (!country.country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country.name.common} </h3>
      <div>capital {country.country.capital[0]} </div>
      <div>population {country.country.population}</div> 
      <img src={country.country.flags.svg} height='100' alt={`flag of ${country.country.name.common}`}/>  
    </div>
  )
}

export default Country