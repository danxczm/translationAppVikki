import { useContext, useState } from 'react';
import { ContextData } from '../App';

import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => {
    const [open, setOpen] = useState(false);

    const {
        searchWord,
        setSearchWord,
        fetchData,
        getDataFireBase,
        languageTranslation,
        setLanguageTranslation,
    } = useContext(ContextData);

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

    const handleButtonSearch = async e => {
        e.preventDefault();
        await fetchData();
        setSearchWord('');
        getDataFireBase();
    };

    return (
        <div className="flex justify-between py-3 bg-white">
            <div className="w-32 rounded relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="px-5 rounded-md text-6xl hover:bg-blue-600 hover:text-white flex justify-center items-center cursor-pointer"
                >
                    {languageTranslation.icon}
                </div>

                {open ? (
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
                ) : null}
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
                        value={searchWord}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-xl text-gray-900 focus:outline-none"
                        placeholder={`Translate into ${languageTranslation.fullName}`}
                        required
                    />

                    <button
                        disabled={!searchWord}
                        onClick={handleButtonSearch}
                        className="text-white absolute end-0 bottom-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-8 py-2"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
