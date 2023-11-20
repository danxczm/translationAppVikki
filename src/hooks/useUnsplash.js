import axios from 'axios';
import { useState } from 'react';

const useUnsplash = _ => {
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    axios.defaults.baseURL = process.env.REACT_APP_UNSPLASH_BASE_URL;

    const fetchDataUnsplash = async url => {
        try {
            setIsLoading(true);
            const res = await axios.get(url);
            setResponse(res.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        response,
        isLoading,
        error,
        fetchDataUnsplash: url => fetchDataUnsplash(url),
    };
};

export default useUnsplash;
