import { useState } from 'react';
import { createClient } from 'pexels';

const PexelApiGetPic = () => {
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');

    const API_KEY = 'jJaa1j3Eq7fCWH0hLFV533Us2zRX9EyjI5laDtXNYtTweuyPNvtqQOzM';

    const getPrexelApiData = createClient(API_KEY);

    const getPicture = async e => {
        e.preventDefault();
        if (query === '') {
            setError('There is no text');
            return;
        }
        try {
            const pictures = await getPrexelApiData.photos.search({ query, per_page: 10 });
            console.log(`pictures: `, pictures);
            if (pictures.photos.length > 0) {
                setPicture(pictures?.photos[0]?.src?.tiny);
            } else {
                setError('No photos found');
            }
        } catch (error) {
            setError('Error fetching data');
            console.error('Error fetching data:', error);
        }
    };

    const onChangeHandler = e => {
        e.preventDefault();
        setQuery(e.target.value);
    };

    return (
        <div>
            <form onSubmit={getPicture}>
                <input value={query} type="text" onChange={onChangeHandler} />
                <button type="submit">getPicture</button>
            </form>
            <h1>{query}</h1>
            {error ? (
                <h1>{error}</h1>
            ) : (
                picture && (
                    <div>
                        <img alt="pic" src={picture} />
                    </div>
                )
            )}
        </div>
    );
};

export default PexelApiGetPic;
