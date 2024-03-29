import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useGetSingleFlashCardQuery, useUpdateFlashCardMutation } from './flashCardsSlice';
import { skipToken } from '@reduxjs/toolkit/query';

const FlashCardEditForm = () => {
    const { flashCardId } = useParams();
    const navigate = useNavigate();

    const {
        data: {
            word = '',
            translation = '',
            picture = '',
            phonetic = '',
            partOfSpeech = '',
            definition = '',
        } = '',
        isLoading: flashCardDataLoading,
    } = useGetSingleFlashCardQuery(flashCardId ?? skipToken);
    const [updateFlashCard, { isLoading }] = useUpdateFlashCardMutation();

    const [newWord, setNewWord] = useState(word);
    const [newTranslation, setNewTranslation] = useState(translation);
    const [newPicture, setNewPicture] = useState(picture);
    const [newPhonetic, setNewPhonetic] = useState(picture);
    const [newPartOfSpeech, setNewPartOfSpeech] = useState(picture);
    const [newDefinition, setNewDefinition] = useState(picture);

    useEffect(() => {
        setNewWord(word);
        setNewTranslation(translation);
        setNewPicture(picture);
        setNewPhonetic(phonetic);
        setNewPartOfSpeech(partOfSpeech);
        setNewDefinition(definition);
    }, [word, translation, picture, phonetic, partOfSpeech, definition]);

    const canUpdate =
        [newWord, newTranslation, newPicture, newPhonetic, newPartOfSpeech, newDefinition].every(
            Boolean
        ) && !flashCardDataLoading;

    const handleUpdateFlashCard = async e => {
        e.preventDefault();

        if (canUpdate) {
            const newData = {
                word: newWord,
                translation: newTranslation,
                picture: newPicture,
                phonetic: newPhonetic,
                partOfSpeech: newPartOfSpeech,
                definition: newDefinition,
            };

            try {
                await updateFlashCard({ flashCardId, newData }).unwrap();
                if (!isLoading) navigate('/flashCards');
            } catch (error) {
                console.log(`Update flash card is failed: `, error);
            }
        }
    };

    return (
        <div>
            <Link
                to={'/flashCards'}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
            >
                Back
            </Link>
            <form onSubmit={handleUpdateFlashCard} className="max-w-sm m-10 mx-auto">
                <div className="mb-5">
                    <label htmlFor="word" className="block mb-2 text-sm font-medium text-gray-900">
                        Word that you are translating
                    </label>
                    <input
                        id="word"
                        type="text"
                        name="word"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="word"
                        value={newWord}
                        onChange={e => setNewWord(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="translation"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Translation that you need
                    </label>
                    <input
                        id="translation"
                        type="text"
                        name="translation"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="translation"
                        value={newTranslation}
                        onChange={e => setNewTranslation(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">
                        Image that you need - link format
                    </label>
                    <input
                        id="picture"
                        type="text"
                        name="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="image"
                        value={newPicture}
                        onChange={e => setNewPicture(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="phonetic"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Phonetic
                    </label>
                    <input
                        id="phonetic"
                        type="text"
                        name="phonetic"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="phonetic"
                        value={newPhonetic}
                        onChange={e => setNewPhonetic(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="partOfSpeech"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Part - Of - Speech
                    </label>
                    <input
                        id="partOfSpeech"
                        type="text"
                        name="partOfSpeech"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="part of speech"
                        value={newPartOfSpeech}
                        onChange={e => setNewPartOfSpeech(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="definition"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Definition
                    </label>
                    <input
                        id="definition"
                        type="text"
                        name="definition"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="definition"
                        value={newDefinition}
                        onChange={e => setNewDefinition(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FlashCardEditForm;
