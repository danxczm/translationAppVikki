import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';

import { BiSave } from 'react-icons/bi';
import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaGoogle } from 'react-icons/lia';

import { toastInitialSettings } from '../utils/utils';
import { ContextData } from '../App';
import ReactToPrint from 'react-to-print';
import { deleteCardThunk, getCardsThunk } from '../redux/features/cards/Thunk';
import { Hourglass } from 'react-loader-spinner';
import * as selector from '../redux/features/cards/Selector';

const WordsList = () => {
    const { handleEditItem } = useContext(ContextData);

    const { entities: data, status } = useSelector(selector.selectCards);

    console.log(`status: `, status);

    const dispatch = useDispatch();

    const componentRef = useRef();

    const deleteItem = id => {
        dispatch(deleteCardThunk(id));
        // dispatch(getCardsThunk());
    };

    async function copyTextToClipboard(text) {
        toast.success('The word is copied!', toastInitialSettings);
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    return (
        <>
            <div className="bg-background-blue" ref={componentRef}>
                {data.length === 0 ? (
                    <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                        You haven't added any words yet
                    </h1>
                ) : (
                    <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 place-items-center">
                        {data?.map(item => (
                            <li
                                key={item?.id}
                                className="relative group overflow-hidden rounded-lg shadow-xl transition duration-200 hover:shadow-blue-600"
                            >
                                <img
                                    loading="lazy"
                                    className="rounded relative w-full object-cover aspect-square transition duration-200 group-hover:scale-110 "
                                    src={item?.picture}
                                    alt={item?.word}
                                />
                                {/* delete button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        deleteItem(item?.id);
                                    }}
                                    className="h-5 w-5 bg-white absolute top-2 right-2 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <AiOutlineDelete />
                                </button>

                                {/* edit button */}
                                <button
                                    type="button"
                                    onClick={() => handleEditItem(item?.id)}
                                    className="h-5 w-5 bg-white absolute top-2 left-2 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <AiOutlineEdit />
                                </button>
                                <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full h-36">
                                    <div className="relative flex">
                                        <h1
                                            onClick={() => copyTextToClipboard(item?.word)}
                                            title="Click to copy."
                                            className="cursor-pointer p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-xl"
                                        >
                                            {item?.word}
                                        </h1>
                                        <a
                                            rel="noreferrer"
                                            target="_blank"
                                            href={`https://dictionary.cambridge.org/dictionary/english/${item.word}`}
                                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-8 hover:bg-blue-300"
                                        >
                                            <LuBookMarked size="20px" color="white" />
                                        </a>
                                        <a
                                            rel="noreferrer"
                                            target="_blank"
                                            href={`https://www.google.com.ua/search?q=${item.word}`}
                                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-1.5 hover:bg-blue-300"
                                        >
                                            <LiaGoogle size="20px" color="white" />
                                        </a>
                                    </div>
                                    <p className="text-gray-200 text-2xl mt-3 leading-6	">
                                        {item?.translation?.toLowerCase()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ReactToPrint
                trigger={() =>
                    data.length !== 0 ? (
                        <div className="flex items-center justify-center mt-5 sticky bottom-5">
                            <button className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
                                <BiSave size="20px" className="mr-2" />
                                <p className="font-semibold">Save as PDF</p>
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
                content={() => componentRef.current}
            />
        </>
    );
};

export default WordsList;
