import { useState } from 'react';

import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAddFlashCardMutation } from '../features/flashCards/flashCardsSlice';

const SearchBar = () => {
    const [searchWord, setSearchWord] = useState('');
    const [open, setOpen] = useState(false);
    const [languageTranslation, setLanguageTranslation] = useState({
        language: 'uk',
        icon: '🇺🇦',
        fullName: 'Ukrainian',
    });

    const [addCard, { isLoading }] = useAddFlashCardMutation();

    const languageOptions = [
        { language: 'uk', icon: '🇺🇦', fullName: 'Ukrainian' },
        { language: 'en', icon: '🇬🇧', fullName: 'English' },
        { language: 'ru', icon: '🪆', fullName: 'hru-hru' },
        { language: 'ko', icon: '🇰🇷', fullName: 'Korean' },
        { language: 'es', icon: '🇪🇸', fullName: 'Spanish' },
    ];

    const handleInputChange = e => {
        setSearchWord(e.target.value);
    };

    const handleSubmitButton = async e => {
        e.preventDefault();

        try {
            addCard({
                searchWord,
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
            <div className="w-32 rounded relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="px-5 rounded-md text-6xl hover:bg-blue-600 hover:text-white flex justify-center items-center cursor-pointer"
                >
                    {languageTranslation.icon}
                </div>

                {open && (
                    <ul className="bg-white absolute z-50">
                        {languageOptions
                            .filter(item => item.language !== languageTranslation.language)
                            .map(item => (
                                <li
                                    key={item.language}
                                    className="flex justify-center items-center px-7 rounded-md text-6xl hover:bg-blue-600 hover:text-white cursor-pointer"
                                    onClick={() => {
                                        if (item.language !== languageTranslation.language) {
                                            setLanguageTranslation(item);
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
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <HiOutlineSearch size="20px" />
                    </div>
                    <input
                        autoComplete="off"
                        value={searchWord}
                        disabled={isLoading}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-xl text-gray-900 focus:outline-none"
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
                            <AiOutlineLoading3Quarters className="inline w-4 h-4 me-3 text-white animate-spin" />
                            Loading...
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
