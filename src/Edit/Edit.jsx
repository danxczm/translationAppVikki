import React, { useContext, useState } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { ContextData } from '../App';
import { dataBase } from '../Firebase/firebaseConfig';

const Edit = () => {
    const { data, setData, setIsEditing, selectedDataItem } = useContext(ContextData);

    const id = selectedDataItem.id;

    const [newWord, setNewWord] = useState(selectedDataItem.word);
    const [newTranslation, setNewTranslation] = useState(selectedDataItem.translation);
    const [newPicture, setNewPicture] = useState(selectedDataItem.picture);

    const handleUpdate = async e => {
        e.preventDefault();

        const editedData = {
            word: newWord,
            translation: newTranslation,
            picture: newPicture,
        };

        await updateDoc(doc(dataBase, 'data', id), {
            ...editedData,
        });

        setData(data);
        setIsEditing(false);
        // getDataFireBase();
    };

    return (
        <div>
            <button
                onClick={() => setIsEditing(false)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5"
            >
                Back
            </button>
            <form onSubmit={handleUpdate} className="max-w-sm mx-auto m-10">
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

export default Edit;
