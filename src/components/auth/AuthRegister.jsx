import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../app/authContext';
import { doCreateUserWithEmailAndPassword } from '../../Firebase/auth';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const { userLoggedIn } = useAuth();

    useEffect(() => {
        if (userLoggedIn) navigate('/');
    }, [userLoggedIn, navigate]);

    const onSubmit = async e => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                let cleanedMessage = error.message.replace('Firebase: ', '');
                toast.error(cleanedMessage);
            } finally {
                setIsRegistering(false);
                setPassword('');
                setconfirmPassword('');
            }
        }
    };

    return (
        <>
            <main className="flex w-full place-content-center place-items-center self-center">
                <div className="w-96 space-y-5 rounded-xl border p-4 text-gray-600 shadow-xl">
                    <div className="mb-6 text-center">
                        <div className="mt-2">
                            <h3 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                                Create a New Account
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                className="focus:indigo-600 mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Password</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }}
                                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none transition duration-300 focus:border-indigo-600"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={e => {
                                    setconfirmPassword(e.target.value);
                                }}
                                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none transition duration-300 focus:border-indigo-600"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full rounded-lg px-4 py-2 font-medium text-white ${
                                isRegistering
                                    ? 'cursor-not-allowed bg-gray-300'
                                    : 'bg-blue-600 transition duration-300 hover:bg-blue-700 hover:shadow-xl'
                            }`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-center text-sm">
                            Already have an account? {'   '}
                            <Link
                                to={'/login'}
                                className="text-center text-sm font-bold hover:underline"
                            >
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
