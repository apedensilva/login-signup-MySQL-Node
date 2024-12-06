import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the provided URL
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError('There was an error fetching data!');
        console.error(error);
      });
  }, [url]);

  return { data, error };
};

export default useFetchData;
