import { useContext, useEffect, useState } from 'react';
import { deleteDocumentFireBase } from '../Firebase/firebaseActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiCopy } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

import { toastInitialSettings } from '../utils/utils';
import { ContextData } from '../App';
import { TailSpin } from 'react-loader-spinner';

const WordsList = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, handleEditItem, getDataFireBase } = useContext(ContextData);

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

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(async () => {
            if (data.length === 0) {
                await getDataFireBase();
                setIsLoading(false);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {data.length === 0 ? (
                isLoading ? (
                    // <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    //     <div
                    //         role="status"
                    //         className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    //     >
                    //         <div className="flex items-center justify-center bg-gray-400 rounded h-[270px] w-[270px]">
                    //             <svg
                    //                 className="w-10 h-10 text-gray-200"
                    //                 aria-hidden="true"
                    //                 xmlns="http://www.w3.org/2000/svg"
                    //                 fill="currentColor"
                    //                 viewBox="0 0 20 18"
                    //             >
                    //                 <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    //             </svg>
                    //         </div>
                    //     </div>
                    // </div>
                    <TailSpin
                        height="100"
                        width="100"
                        color="gray"
                        ariaLabel="tail-spin-loading"
                        wrapperClass="flex items-center justify-center p-4"
                        visible={true}
                    />
                ) : (
                    <h1 className="p-5 text-center font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-200 to-purple-800">
                        You haven't added any words yet
                    </h1>
                )
            ) : (
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
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
