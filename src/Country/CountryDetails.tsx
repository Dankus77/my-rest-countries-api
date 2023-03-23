import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router';

interface Country {
  alpha3Code: string;
  name: string;
  flag: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string;
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
}

interface Detail {
  darkMode: boolean;
  countries: Country[];
  refetch: () => void;
}

const CountryDetails: FC<Detail> = ({ darkMode, countries, refetch }) => {
  const params = useParams<{ countryCode: string }>();
  const navigate = useNavigate();

  let name = '';
  let flagImg = '';
  let nativeName = '';
  let population = 0;
  let region = '';
  let subregion = '';
  let capital = '';
  let topLevelDomain = '';
  let currencies: string[] = [];
  let languages: string[] = [];
  let borders: string[] = [];


countries.forEach(country => {
    if(country.alpha3Code === params.countryCode) {
        name = country.name;
        flagImg = country.flag;
        nativeName = country.nativeName;
        population = country.population;
        region = country.region;
        subregion = country.subregion;
        capital = country.capital;
        topLevelDomain = country.topLevelDomain;

        country.currencies?.forEach(currency => {
            currencies.push(currency.name)
        })

        country.languages?.forEach(language => {
            languages.push(language.name)
        })

        country.borders?.forEach(border => {
            borders.push(border)
        })
    }
})


const goBack = () => {
    navigate("/");
}

return (
    <div className='country-details'>
<button className={`back ${darkMode ? 'darkMode': ""}`} onClick={goBack}>
<i className="fa fa-arrow-left" aria-hidden="true">
</i>
Back
</button>

<div className='country-details-body'>
<div className='img-container'>
    <img src={flagImg} alt='' />
</div>

<div className='info'>
<h2>{name}</h2>
<div className='info-container'>
<div className='left-info'>
    <p>Native Name:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{nativeName}</span>
    </p>

    <p>Population:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{population}</span>
    </p>

    <p>Region:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{region}</span>
    </p>

    <p>Sub-region:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{subregion}</span>
    </p>
</div>
<div className='right-info'>
<p>Capital:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{capital}</span>
    </p>

    <p>Top-level Domain:{" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{topLevelDomain}</span>
    </p>

    <p>Currencies:
    {currencies.map((currency, index) => {
        if(currencies.indexOf(currency) !== currencies.length - 1){
            return (
                <span key={index} className={`values ${darkMode ? 'darkMode': ""}`}>
                    {" "}
                    {currency},
                    </span>
            );
        } else {
            return (
                <span className={`values ${darkMode ? 'darkMode': ""}`}>
                    {" "}
                    {currency}
                    </span>
            );
        }
    })}
    </p>

    <p>Languages:
    {languages.map((language, index) => {
        if(languages.indexOf(language) !== languages.length - 1){
            return (
                <span key={index} className={`values ${darkMode ? 'darkMode': ""}`}>
                    {" "}
                    {language},
                    </span>
            );
        } else {
            return (
                <span className={`values ${darkMode ? 'darkMode': ""}`}>
                    {" "}
                    {language}
                    </span>
            );
        }
    })}
    </p>
</div>
</div>

Border Countries:
{borders.length ? (
    borders.map((border, index) => (
        <div className={`border-country ${darkMode ? 'darkMode': ""}`}
        key={index}
        onClick={() => {
            refetch();
            navigate(`/${border}`)
        }}
        >
            {border}
        </div>
    ))
) : (
<div className={`values ${darkMode ? 'darkMode': ""}`}>
            <p>No borders...</p>
        </div>
)}

</div>
</div>
    </div>
)
}

export default CountryDetails;