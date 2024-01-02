import axios from "axios"
import { useState, useEffect } from "react"

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountry = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);

        console.log('fetched successfully');
        console.log(fetchedCountry)
        setCountry(fetchedCountry.data);
        setFound(true)
      } 
      catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Country not found');
        } else {
          console.error('An error occurred while fetching data:', error.message);
        }
        setFound(false)
      }
    };

    if (name === '') {
      setCountry(null);
    } else {
      fetchData();
    }
  }, [name]);

  return{
   country,
   found
  }
    
}
