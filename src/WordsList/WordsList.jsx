import { useContext } from 'react';
import { deleteDocumentFireBase } from '../Firebase/firebaseActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiCopy } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { toastInitialSettings } from '../utils/utils';
import { ContextData } from '../App';

const WordsList = () => {
    const { data, setData, handleEditItem } = useContext(ContextData);

    const deleteItem = id => {
        deleteDocumentFireBase(id);
        const filteredData = data.filter(item => item.id !== id);
        setData(filteredData);
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
        <div>
            {data.length === 0 ? (
                <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                    You haven't added any words yet
                </h1>
            ) : (
                <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3">
                    {data?.map(item => (
                        <div key={item?.id} className="relative h-[270px] w-[270px] group">
                            <img
                                className="object-cover object-center rounded h-[270px] w-[270px]"
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
                                <div className="relative">
                                    <h1 className="p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-xl">
                                        {item?.word}
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={() => copyTextToClipboard(item?.word)}
                                        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 rounded-md flex items-center justify-center bg-white absolute -right-2 -top-1"
                                    >
                                        <BiCopy size="14px" />
                                    </button>
                                </div>
                                <p className="text-gray-200 text-2xl mt-3 leading-6	">
                                    {item?.translation?.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WordsList;
