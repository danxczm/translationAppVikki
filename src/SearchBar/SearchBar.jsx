import { useRef, useState } from 'react';

import { fetchMultipleData } from '../utils/fetchMultipleData';

import { HiOutlineSearch } from 'react-icons/hi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useAddFlashCardMutation } from '../services/cardsCloudFirestoreApi';

const SearchBar = () => {
    const [searchWord, setSearchWord] = useState('');
    const [languageTranslation, setLanguageTranslation] = useState({
        language: 'uk',
        icon: '🇺🇦',
        fullName: 'Ukrainian',
    });
    const [open, setOpen] = useState(false);

    const [addCard, { isLoading }] = useAddFlashCardMutation();

    const inputRef = useRef(null);

    const languageOptions = [
        { language: 'uk', icon: '🇺🇦', fullName: 'Ukrainian' },
        { language: 'en', icon: '🇬🇧', fullName: 'English' },
        { language: 'ru', icon: '🪆', fullName: 'hru-hru' },
        { language: 'ko', icon: '🇰🇷', fullName: 'Korean' },
        { language: 'es', icon: '🇪🇸', fullName: 'Spanish' },
    ];

    const getCardInformation = async () => {
        try {
            const result = await fetchMultipleData(searchWord, languageTranslation.language);
            // const { translation, word } = result;

            // if (translation === word) {
            //     return toast.error(
            //         `You can't translate ${languageTranslation.fullName} to ${languageTranslation.fullName}! Click the checkbox to select a language for translation!`
            //     );
            // }

            addCard(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = e => {
        setSearchWord(e.target.value);
    };

    const handleSubmitButton = async e => {
        e.preventDefault();
        await getCardInformation();
        // await getDataFireBase();
        setSearchWord('');

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    return (
        <div className="flex justify-between py-3 bg-background-blue">
            <div className="w-32 rounded relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="px-5 rounded-md text-6xl hover:bg-blue-600 hover:text-white flex justify-center items-center cursor-pointer"
                >
                    {languageTranslation.icon}
                </div>

                {open && (
                    <ul className="bg-white absolute">
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
                        autoFocus
                        autoComplete="off"
                        ref={inputRef}
                        value={searchWord}
                        disabled={isLoading}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-xl text-gray-900 focus:outline-none bg-background-blue disabled:bg-background-blue"
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
