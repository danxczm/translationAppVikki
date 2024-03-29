import { Link } from 'react-router-dom';

const HomeTitle = () => {
    return (
        <div className="text-center mt-28">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    SKYLANG
                </span>
                Learning App
            </h1>
            <h2 className="mb-4">This is a WIP project! Let see how it grows and where it goes!</h2>
            <Link
                className="inline-flex items-center justify-center px-24 py-2 text-base font-medium text-center text-white bg-gradient-to-r to-emerald-600 from-sky-400 rounded-lg "
                to="flashCards"
            >
                Lets start
                <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </Link>
        </div>
    );
};

export default HomeTitle;
