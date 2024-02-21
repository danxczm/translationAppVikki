import { useEffect, useState } from 'react';

import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAddFlashCardMutation } from './flashCardsSlice';

const languageOptions = [
    { language: 'uk', icon: '🇺🇦', fullName: 'Ukrainian' },
    { language: 'en', icon: '🇬🇧', fullName: 'English' },
    { language: 'ru', icon: '🪆', fullName: 'hru-hru' },
    { language: 'ko', icon: '🇰🇷', fullName: 'Korean' },
    { language: 'es', icon: '🇪🇸', fullName: 'Spanish' },
];

const FlashCardAddForm = () => {
    const [searchWord, setSearchWord] = useState('');
    const [open, setOpen] = useState(false);
    const [languageTranslation, setLanguageTranslation] = useState(
        JSON.parse(localStorage.getItem('languageTranslation')) || {
            language: 'uk',
            icon: '🇺🇦',
            fullName: 'Ukrainian',
        }
    );

    useEffect(() => {
        localStorage.setItem('languageTranslation', JSON.stringify(languageTranslation));
    }, [languageTranslation]);

    const [addCard, { isLoading }] = useAddFlashCardMutation();

    const handleInputChange = e => {
        setSearchWord(e.target.value);
    };

    const handleSubmitButton = async e => {
        e.preventDefault();
        const trimmedWord = searchWord.trim();

        try {
            addCard({
                trimmedWord,
                language: languageTranslation.language,
                languageFullName: languageTranslation.fullName,
            }).unwrap();
            setSearchWord('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="flex justify-between py-3">
            <div className="relative w-32 rounded">
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center px-5 text-6xl rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                    {languageTranslation.icon}
                </div>

                {open && (
                    <ul className="absolute z-50 bg-white">
                        {languageOptions
                            .filter(item => item.language !== languageTranslation.language)
                            .map(item => (
                                <li
                                    key={item.language}
                                    className="flex items-center justify-center text-6xl rounded-md cursor-pointer px-7 hover:bg-blue-600 hover:text-white"
                                    onClick={() => {
                                        if (item.language !== languageTranslation.language) {
                                            setLanguageTranslation(item);
                                            console.log(`item: `, item);
                                        }
                                        setOpen(false);
                                    }}
                                >
                                    {item.icon}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <form className="w-full">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <HiOutlineSearch size="20px" />
                    </div>
                    <input
                        autoFocus
                        autoComplete="off"
                        value={searchWord}
                        disabled={isLoading}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 text-xl text-gray-900 ps-10 focus:outline-none disabled:bg-inherit"
                        placeholder={`Translate into ${languageTranslation.fullName}`}
                        required
                    />

                    {!isLoading ? (
                        <button
                            disabled={!searchWord}
                            onClick={handleSubmitButton}
                            className="text-white absolute end-0 bottom-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-[132px] h-[44px]"
                        >
                            Add
                        </button>
                    ) : (
                        <button
                            disabled
                            type="button"
                            className="text-white absolute end-0 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center w-[132px] h-[44px]"
                        >
                            <AiOutlineLoading3Quarters className="inline w-4 h-4 text-white me-3 animate-spin" />
                            Loading...
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FlashCardAddForm;
