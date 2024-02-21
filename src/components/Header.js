import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../app/authContext';
import { doSignOut } from '../Firebase/auth';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <header>
            <nav className="bg-white border-gray-200 px-6 py-2.5">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://media.istockphoto.com/id/1178218677/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D1%81%D0%B8%D0%BC%D0%BF%D0%B0%D1%82%D0%B8%D1%87%D0%BD%D1%96-%D1%81%D0%B8%D0%B1%D1%96%D1%80%D1%81%D1%8C%D0%BA%D1%96-%D1%85%D0%B0%D1%81%D0%BA%D1%96-%D1%81%D0%BE%D0%B1%D0%B0%D1%87%D1%96-%D0%BB%D0%B0%D0%BF%D0%B8-%D0%BD%D0%B0%D0%B4-%D1%81%D1%82%D1%96%D0%BD%D0%BE%D1%8E-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0-%D1%96%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D1%96%D1%8F.jpg?s=612x612&w=0&k=20&c=gmIIGrGzfUTd0IYqW8TqdGp-RLwpfYzfSyxwwRo6Y7w="
                            className="mr-3 w-14"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-sm font-semibold underline whitespace-nowrap underline-offset-4 decoration-4 decoration-blue-400">
                            SKYLANG
                        </span>
                    </Link>
                    <nav className="flex items-center justify-between w-auto">
                        <ul className="flex flex-row items-center mt-0 space-x-5 font-medium">
                            {userLoggedIn ? (
                                <>
                                    <li>
                                        <NavLink
                                            className="text-gray-700 hover:underline underline-offset-4 decoration-4 decoration-blue-400"
                                            to="/"
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-gray-700 hover:underline underline-offset-4 decoration-4 decoration-blue-400"
                                            to="flashCards"
                                        >
                                            Flash Cards
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-gray-700 hover:underline underline-offset-4 decoration-4 decoration-blue-400"
                                            to="descriptionCards"
                                        >
                                            Cards Details
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-gray-700 hover:underline underline-offset-4 decoration-4 decoration-blue-400"
                                            to="cardsCollections"
                                        >
                                            Collections
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            className="px-3 py-1 text-white duration-300 bg-blue-600 rounded-xl hover:bg-blue-400"
                                            onClick={() => {
                                                doSignOut().then(() => {
                                                    navigate('/');
                                                });
                                            }}
                                        >
                                            Log out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="px-3 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                                            to="login"
                                        >
                                            Sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="px-3 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                                            to="register"
                                        >
                                            Sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    );
};

export default Header;
