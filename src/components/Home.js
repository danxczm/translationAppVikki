import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="mt-28 text-center">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
                    SKYLANG
                </span>
                Learning App
            </h1>
            <h2 className="mb-4">This is a WIP project! Let see how it grows and where it goes!</h2>
            <Link
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-emerald-600 px-24 py-2 text-center text-base font-medium text-white "
                to="login"
            >
                Log in to start
                <svg
                    className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
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

export default Home;
