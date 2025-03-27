import React from 'react';

const NeighborsI = ({ countries, codeMap }) => {
  return (
    <div>
      <h2>Countries with Neighbors Starting with I</h2>
      {countries.map((country, index) => (
        <div key={index} className="country-card">
          <h3>{country.name.official}</h3>
          <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
          <img src={country.flags.svg} alt={`Flag of ${country.name.official}`} width="100" />
          <p>Neighbors:</p>
          <ul>
            {country.borders && country.borders.map(code => (
              <li key={code}>{codeMap[code]}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NeighborsI;
