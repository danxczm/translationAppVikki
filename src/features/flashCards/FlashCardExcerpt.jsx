import { Link } from 'react-router-dom';
import { useDeleteFlashCardMutation } from './flashCardsSlice';

import { LuBookMarked } from 'react-icons/lu';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { LiaGoogle } from 'react-icons/lia';

import { toast } from 'react-toastify';
import { toastInitialSettings } from 'utils/utils';
import { Rings } from 'react-loader-spinner';

const FlashCardExcerpt = ({ card }) => {
    const [deleteFlashCard, { isLoading, isSuccess }] = useDeleteFlashCardMutation();

    const deleteFlashCardHandler = async id => {
        try {
            await deleteFlashCard(id).unwrap();
        } catch (error) {
            console.log(`Failed to delete the card: `, error);
        }
    };

    const copyTextToClipboard = async text => {
        toast.success('The word is copied!', toastInitialSettings);
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    };

    return (
        <li
            key={card?.id}
            className="relative group overflow-hidden rounded-lg transition duration-200 hover:shadow-xl hover:shadow-blue-600"
        >
            {(isLoading || isSuccess) && (
                <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Rings
                        visible={true}
                        height="240"
                        width="240"
                        color="white"
                        ariaLabel="rings-loading"
                    />
                </div>
            )}
            <div className={`${(isLoading || isSuccess) && 'blur-sm'}`}>
                <img
                    loading="lazy"
                    className="rounded relative w-full object-cover aspect-square transition duration-200 group-hover:scale-110 "
                    src={card?.picture}
                    alt={card?.word}
                />
                {/* delete button */}
                <button
                    type="button"
                    onClick={() => {
                        deleteFlashCardHandler(card?.id);
                    }}
                    className="h-5 w-5 bg-white absolute top-2 right-2 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <AiOutlineDelete />
                </button>

                {/* edit button */}
                <Link
                    className="h-5 w-5 bg-white absolute top-2 left-2 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    to={`edit/${card.id}`}
                >
                    <AiOutlineEdit />
                </Link>
                <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full h-36">
                    <div className="relative flex">
                        <h1
                            onClick={() => copyTextToClipboard(card?.word)}
                            title="Click to copy."
                            className="cursor-pointer p-1 text-white bg-gradient-to-r from-teal-400/50 to-blue-500/20 font-semibold text-xl"
                        >
                            {card?.word}
                        </h1>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://dictionary.cambridge.org/dictionary/english/${card.word}`}
                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-8 hover:bg-blue-300"
                        >
                            <LuBookMarked size="20px" color="white" />
                        </a>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={`https://www.google.com.ua/search?q=${card.word}`}
                            className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md flex items-center justify-center absolute right-0 top-1.5 hover:bg-blue-300"
                        >
                            <LiaGoogle size="20px" color="white" />
                        </a>
                    </div>
                    <p className="text-gray-200 text-2xl mt-3 leading-6	">
                        {card?.translation?.toLowerCase()}
                    </p>
                </div>
            </div>
        </li>
    );
};

export default FlashCardExcerpt;
