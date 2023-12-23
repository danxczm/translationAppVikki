import axios from 'axios';

const translateText = async (text, toLanguage = 'en') => {
    const translationOptions = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            'to[0]': toLanguage,
            'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain',
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
        },
        data: [
            {
                Text: text,
            },
        ],
    };

    try {
        const response = await axios.request(translationOptions);
        return response?.data[0]?.translations[0]?.text;
    } catch (error) {
        console.error('translateText', error);
        return null;
    }
};

const fetchUnsplashPhoto = async searchQuery => {
    const unsplashOptions = {
        method: 'GET',
        url: `${process.env.REACT_APP_UNSPLASH_BASE_URL}/search/photos?page=1&per_page=1&orientation=landscape&query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_KEY_ID}`,
    };

    try {
        const response = await axios.request(unsplashOptions);
        return response?.data?.results[0]?.urls?.regular || 'https://i.ibb.co/2NVKDq2/1.png';
    } catch (error) {
        console.error('fetchUnsplashPhoto', error);
        return 'https://i.ibb.co/2NVKDq2/1.png';
    }
};

export const fetchMultipleData = async (searchQuery, translateTo) => {
    try {
        const translation = await translateText(searchQuery, translateTo);
        const getPictureInEng = await translateText(searchQuery);
        const unsplashPhoto = await fetchUnsplashPhoto(getPictureInEng);

        const response = {
            word: searchQuery,
            id: Date.now(),
            translation,
            picture: unsplashPhoto,
        };

        return response;
    } catch (error) {
        console.error('fetchMultipleData', error);
    }
};
