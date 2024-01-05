import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useDispatch } from 'react-redux';
// import { getCardsThunk, getCardsCollectionThunk } from './redux/features/cards/Thunk';

import AppContainer from './AppContainer/AppContainer';
import SearchBar from './SearchBar/SearchBar';
import WordListFunctionality from './WordListFunctionality/WordListFunctionality';
import WordsList from './WordsList/WordsList';
import Edit from './Edit/Edit';
import CollectionList from './CollectionList/CollectionList';

export const ContextData = createContext();

const App = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDataItem, setSelectedDataItem] = useState(null);
    // const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     dispatch(getCardsThunk());
    //     dispatch(getCardsCollectionThunk());
    // }, [dispatch]);

    const value = {
        isEditing,
        setIsEditing,
        selectedDataItem,
        setSelectedDataItem,
        // data,
        // setData,
        // isLoading,
        // setIsLoading,
    };

    return (
        <ContextData.Provider value={value}>
            <ToastContainer />
            <AppContainer>
                {isEditing ? (
                    <Edit />
                ) : (
                    <>
                        <CollectionList />
                        <div className="sticky top-0 z-10">
                            <WordListFunctionality />
                            <SearchBar />
                        </div>
                        <WordsList />
                    </>
                )}
            </AppContainer>
        </ContextData.Provider>
    );
};

export default App;
