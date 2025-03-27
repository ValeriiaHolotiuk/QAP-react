import React, { useEffect, useState } from 'react';
import NeighborsA from './components/NeighborsA';
import NeighborsI from './components/NeighborsI';
import './App.css';



const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [codeToNameMap, setCodeToNameMap] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
  
        setAllCountries(data);
  
        const map = {};
        data.forEach((country) => {
          if (country.cca3) {
            map[country.cca3] = country.name.official;
          }
        });
        setCodeToNameMap(map);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
  
    fetchCountries();
  }, []);
  

  const filterByNeighborLetter = (letter) => {
    return allCountries.filter(country => {
      if (!country.borders) return false;
      return country.borders.some(code => {
        const name = codeToNameMap[code];
        return name && name.startsWith(letter);
      });
    });
  };

  const handleClick = (letter) => {
    setSelectedFilter(letter);
  };

  const filteredCountries = selectedFilter ? filterByNeighborLetter(selectedFilter) : [];

  return (
    <div className="app-container">
      <h1>Neighboring Countries</h1>
      <button onClick={() => handleClick('A')}>NEIGHBORS STARTING WITH A</button>
      <button onClick={() => handleClick('I')}>NEIGHBORS STARTING WITH I</button>

      {selectedFilter === 'A' && <NeighborsA countries={filteredCountries} codeMap={codeToNameMap} />}
      {selectedFilter === 'I' && <NeighborsI countries={filteredCountries} codeMap={codeToNameMap} />}
    </div>
  );
};

export default App;
