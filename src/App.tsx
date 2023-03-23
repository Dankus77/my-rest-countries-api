import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import './App.css';
import Country from './Country/Country';
import { Routes, Route } from 'react-router-dom';
import CountryDetails from './Country/CountryDetails';

interface CountryData {
  alpha3Code: string;
  name: string;
  nativeName: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  flag: string;
  topLevelDomain: string;
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [allCountries, setAllCountries] = useState<CountryData[]>([]);
  const countriesInputRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const noCountry = countries.length === 0;

  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/all');
      const data = await response.json();
      if (data.status === 404) {
        setCountries([]);
        return;
      }
      setCountries(data);
      setAllCountries(data); // Store all the countries in a variable
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const showDetails = (code: string) => {
    navigate(`/${code}`);
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current?.value;
    if (searchValue?.trim()) {
      const filteredCountries = allCountries.filter((country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCountries(filteredCountries);
    } else {
      setCountries(allCountries);
    }
  };
  

  const selectRegion = () => {
    const selectValue = regionRef.current?.value;
    if (selectValue?.trim()) {
      if (selectValue === 'Filter by Region') {
        setCountries(allCountries);
      } else {
        const filteredCountries = allCountries.filter((country) => country.region === selectValue);
        setCountries(filteredCountries);
      }
    }
  };
  
  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };  
  
  return (
    <div className={`app ${darkMode ? 'darkMode': ""}`}>
      <Header onClick={switchMode} darkMode={darkMode}/>

<Routes>

  <Route path='/' element={
    <div className='app-body'>
        <div className='inputs'>
          <div className={`search-input ${darkMode ? 'darkMode': ""}`}>
<input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries} />
<i className="fa fa-search" aria-hidden="true"></i>
          </div>
          <div className={`select-region ${darkMode ? 'darkMode': ""}`}>
<select ref={regionRef} onChange={selectRegion}>
  <option>Filter by Region</option>
  <option>Africa</option>
  <option>Americas</option>
  <option>Asia</option>
  <option>Europe</option>
  <option>Oceania</option>
</select>
          </div>
        </div>

        <div className='countries'>
        {!noCountry ? (countries.map((country, index) => (
          <Country 
          darkMode={darkMode}
          key={country.alpha3Code}
          code={country.alpha3Code}
          name={country.name}
          capital={country.capital}
          population={country.population}
          region={country.region}
          flag={country.flag}
          showDetails={showDetails}
          />
  ))):(<p>No Country found...</p>) }
        </div>
      </div>
  }/>
<Route path='/:countryCode' element={<CountryDetails 
darkMode={darkMode}
 countries={countries}
 refetch={fetchData}
 />}/>
</Routes>

      
    </div>
  );
}

export default App;
