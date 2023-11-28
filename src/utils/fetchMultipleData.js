import axios from 'axios';

export const fetchMultipleData = async (searchQuery, translateTo) => {
    const translationOptions = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            'to[0]': translateTo,
            'api-version': '3.0',
            profanityAction: 'NoAction',
            textType: 'plain',
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '32da4efdc7msh1edfa7d58e939cbp16f30fjsn436e11bb4d76',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
        },
        data: [
            {
                Text: searchQuery,
            },
        ],
    };

    const unsplashOptions = {
        method: 'GET',
        url: `${process.env.REACT_APP_UNSPLASH_BASE_URL}/search/photos?page=1&per_page=1&orientation=landscape&query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_KEY_ID}`,
    };

    try {
        const [translationResponse, unsplashResponse] = await Promise.all([
            axios.request(translationOptions),
            axios.request(unsplashOptions),
        ]);

        const response = {
            word: searchQuery,
            // id: unsplashResponse?.data?.results[0]?.id || Date.now().toString(),
            translation: translationResponse?.data[0]?.translations[0]?.text,
            picture: unsplashResponse?.data?.results[0]?.urls?.regular,
        };

        return response;
    } catch (error) {
        console.error('fetchMultipleData', error);
    }
};
