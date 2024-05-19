// CovidData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './covidData.css';

const CovidData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');  // Adicione um estado para o filtro

  useEffect(() => {
    axios.get('https://covid19-brazil-api.now.sh/api/report/v1')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredData = data.data.filter(item => item.state.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="covid-data-container">
      <h1>COVID-19 Data for Brazil</h1>
      <input
        type="text"
        placeholder="Filter by state"
        value={filter}
        onChange={handleFilterChange}
        className="filter-input"
      />
      <div className="states-data">
        {filteredData.map((item, index) => (
          <div key={index} className="state-data">
            <h2>{item.state}</h2>
            <p>Confirmed: {item.cases}</p>
            <p>Deaths: {item.deaths}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CovidData;
