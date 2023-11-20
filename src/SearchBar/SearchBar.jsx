import { useContext, useState } from 'react';
import { ContextData } from '../App';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { fetchDataUnsplash, setSearchWord } = useContext(ContextData);

    const handleInputChange = e => {
        setSearchQuery(e.target.value);
    };

    const handleButtonSearch = e => {
        e.preventDefault();
        fetchDataUnsplash(
            `/search/photos?page=1&per_page=1&orientation=landscape&query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_KEY_ID}`
        );
        setSearchQuery('');
        setSearchWord(searchQuery);
        // ! I get response as undefined when trying to add to FB Cloud
    };

    return (
        <div className="w-10/12 ml-auto mr-auto">
            <form>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        value={searchQuery}
                        onChange={handleInputChange}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-xl text-gray-900 focus:outline-none"
                        placeholder="Search..."
                        required
                    />
                    <button
                        disabled={!searchQuery}
                        onClick={handleButtonSearch}
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-8 py-2"
                    >
                        Add word
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
