import React, { useState } from 'react';
import './CountrySearch.css';

function CountrySearch() {
  const [searchInput, setSearchInput] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
      
      if (!response.ok) {
        throw new Error('Country not found');
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setCountryData(data[0]);
        setError('');
      } else {
        setCountryData(null);
        setError('No country found with this keyword.');
      }
    } catch (error) {
      setCountryData(null);
      setError('No country found with this keyword.');
    }
  };

  const formatCurrencies = (currencies) => {
    if (!currencies) return 'N/A';
    return Object.values(currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  };

  const formatLanguages = (languages) => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for a country"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Submit
        </button>
      </form>

      <div className="result">
        {error && <p className="error">{error}</p>}
        
        {countryData && (
          <div className="card">
            <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} className="flag" />
            <h2>{countryData.name.common}</h2>
            <p><strong>Capital:</strong> {countryData.capital ? countryData.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {countryData.area.toLocaleString()} km²</p>
            <p><strong>Currency:</strong> {formatCurrencies(countryData.currencies)}</p>
            <p><strong>Languages:</strong> {formatLanguages(countryData.languages)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountrySearch;
