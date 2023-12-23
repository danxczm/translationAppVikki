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
        isLoading,
        setIsLoading,
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
        setIsLoading(true);
        e.preventDefault();
        await fetchData();
        setSearchWord('');
        await getDataFireBase();
        setIsLoading(false);
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
                        autoComplete="false"
                        value={searchWord}
                        disabled={isLoading}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-xl text-gray-900 focus:outline-none disabled:bg-white"
                        placeholder={`Translate into ${languageTranslation.fullName}`}
                        required
                    />

                    {!isLoading ? (
                        <button
                            disabled={!searchWord}
                            onClick={handleButtonSearch}
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
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 me-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"
                                />
                            </svg>
                            Loading...
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
