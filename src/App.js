import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';

// import { useDispatch } from 'react-redux';
// import { getCardsThunk, getCardsCollectionThunk } from './redux/features/cards/Thunk';

import Layout from 'components/Layout';
import WordsList from './features/flashCards/FlashCardsList';
import CollectionList from './CollectionList/CollectionList';
import HomeTitle from 'components/HomeTitle';
import EditFlashCard from 'features/flashCards/EditFlashCard';

export const ContextData = createContext();

const App = () => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [selectedDataItem, setSelectedDataItem] = useState(null);
    // const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     dispatch(getCardsThunk());
    //     dispatch(getCardsCollectionThunk());
    // }, [dispatch]);
    // const value = {
    //     isEditing,
    //     setIsEditing,
    //     selectedDataItem,
    //     setSelectedDataItem,
    // data,
    // setData,
    // isLoading,
    // setIsLoading,
    // };
    // return (
    //     <ContextData.Provider value={value}>
    //             {isEditing ? (
    //                 <Edit />
    //             ) : (
    //                 <>
    //                     <CollectionList />
    //                     <div className="sticky top-0 z-10">
    //                         <WordListFunctionality />
    //                         <SearchBar />
    //                     </div>
    //                     <WordsList />
    //                 </>
    //             )}
    //     </ContextData.Provider>
    // );
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomeTitle />} />

                    <Route path="flashCards">
                        <Route index element={<WordsList />} />
                        {/* <Route path=":postId" element={<SinglePostPage />} />*/}
                        <Route path="edit/:flashCardId" element={<EditFlashCard />} />
                    </Route>
                    <Route path="cardsCollections">
                        <Route index element={<CollectionList />} />
                        {/* <Route path="edit/:flashCardId" element={<EditFlashCard />} /> */}
                        {/* <Route path=":postId" element={<SinglePostPage />} /> */}
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
