import React, { useState } from 'react';
import axios from 'axios';
import AppNavBar from '../component/AppNavBar';

const DiarySearch = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!query && !startDate) {
      setError('Please provide either a query or a start date.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/search/', {
        params: {
          query,
          startDate,
        },
      });

      setResults(response.data.results);
    } catch (err) {
      setError(
        err.response?.data?.error || err.response?.data?.message || 'An error occurred while fetching data.'
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppNavBar />

      <div
        style={{
          maxWidth: '600px',
          margin: '20px auto',
          padding: '20px',
          border: '2px solid #ddd',
          borderRadius: '12px',
          backgroundColor: '#fdfdfd',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
            fontWeight: 'bold',
          }}
        >
          Diary Search
        </h2>
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <input
            type="text"
            placeholder="Search by title or content"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <input
            type="text"
            placeholder="Search by Date (DD/MM/YYYY)"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#007bff';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && (
          <div
            style={{
              color: 'red',
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            marginTop: '20px',
          }}
        >
          {results.length > 0 ? (
            results.map((entry, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  margin: '10px 0',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: '#555',
                    marginBottom: '5px',
                  }}
                >
                  {entry.content}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#888',
                  }}
                >
                  {new Date(entry.entry_date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            !error && (
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '16px',
                  color: '#555',
                }}
              >
                No results found.
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DiarySearch;
