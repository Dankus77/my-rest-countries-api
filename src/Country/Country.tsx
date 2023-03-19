import React from "react";



interface Args {
    darkMode: boolean;
    name: string;
    capital: string;
    population: number;
    region: string;
    flag: string;
    showDetails: (code: string) => void;
    code: string;
    }


const Country:React.FC<Args> = ({darkMode, name, capital, population, region, flag, showDetails, code}) => {

const showDetailsHandler = () => {
    showDetails(code);
}

return <div className={`country ${darkMode ? 'darkMode': ""}`} onClick={showDetailsHandler}>
<div className="flag-container">
<img src={flag} alt="" />
</div>

<div className="details">
<h3 className="name">{name}</h3>
<p>Population: {" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{population}</span>
</p>

<p>Region: {" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{region}</span>
</p>

<p>Capital: {" "}
    <span className={`values ${darkMode ? 'darkMode': ""}`}>{capital}</span>
</p>


</div>

</div>

}

export default Country;