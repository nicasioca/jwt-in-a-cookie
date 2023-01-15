// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/csrf-token');
      console.log(data.csrfToken);
      console.log('i fire once');
      axios.defaults.headers.post['x-csrf-token'] = data.csrfToken;
     };
    getCsrfToken();
  }, []);

  const getJwt = async () => {
      const { data } = await axios.get(`/jwt`);
      console.log(data);
    };

  const getCookies = async () => {
    const { data } = await axios.get(`/cookie`);
    console.log(data);
  };

  const [foods, setFoods] = useState([]);
  const getFoods = async () => {
      try {
        const { data } = await axios.get(`/food`);
        setFoods(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };

  const [newFoodMessage, setNewFoodMessage] = useState(null);
  const createFood = async () => {
    try {
      const { data } = await axios.post('/foods');
      setNewFoodMessage(data.message);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
    };

  return (
      <>
        <section style={{ marginBottom: '10px' }}>
          <button onClick={() => getJwt()}>Get JWT</button>
        </section>
        <section style={{ marginBottom: '10px' }}>
          <button onClick={() => getCookies()}>Get Cookies</button>
        </section>
        <section>
          <button onClick={() => getFoods()}>
            Get Foods
          </button>
          <ul>
            {foods.map((food, i) => (
              <li>{food.description}</li>
            ))}
          </ul>
          {fetchError && (
            <p style={{ color: 'red' }}>{fetchError}</p>
          )}
        </section>
        <section>
          <button onClick={() => createFood()}>
            Create New Food
          </button>
          {newFoodMessage && <p>{newFoodMessage}</p>}
        </section>
      </>
    );
}
export default App;